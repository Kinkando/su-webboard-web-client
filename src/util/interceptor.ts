import axios, { AxiosError } from 'axios'
import type { AxiosRequestCustomConfig } from './api';
import http from '@commons/http';
import { TokenType } from '@models/auth';
import { refreshToken as refreshJWT } from '@services/authen';
import * as LocalStorage from './localstorage';
import * as Cookies from './cookies';

const instance = axios.create({
	timeout: 6000,
	headers: {
		"Content-Type": "application/json",
	},
})

instance.interceptors.request.use(
    (config: any) => {
        if (config.params) {
            for (const [key, value] of Object.entries(config.params)) {
                if (!value || (typeof value === 'string' && value.length === 0)) {
                    config.params[key] = null;
                }
            }
        }
        let accessToken;
        if (config.cookie) {
            accessToken = config.cookie.get(TokenType.AccessToken)
        } else {
            let { accessToken: token } = LocalStorage.getToken()
            accessToken = token
        }
		if (accessToken) {
			config.headers = {
                'Authorization': `Bearer ${accessToken}`,
                // "Content-Type": "application/json",
            }
		}
		return config
    },
    (error) => Promise.reject(error)
)

instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
		const config = { ...error.config } as AxiosRequestCustomConfig
        if (error.response?.status === http.StatusUnauthorized) {
            try {
                if (config._isRefreshing) {
                    if (config.cookie) {
                        Cookies.revokeToken(config.cookie);
                    } else {
                        LocalStorage.revokeToken()
                    }
                    return Promise.reject(error);
                }
                config._isRefreshing = true;

                let refreshToken;
                if (config.cookie) {
                    refreshToken = config.cookie.get(TokenType.RefreshToken)
                } else {
                    let { refreshToken: token } = LocalStorage.getToken()
                    refreshToken = token
                }
                if (!refreshToken) {
                    throw new Error("No refresh token");
                }

                const jwt = await refreshJWT(refreshToken)
                if (!jwt) {
                    throw new Error("Refresh Token is invalid")
                }
                if (config.cookie) {
                    Cookies.setToken(config.cookie, jwt.accessToken, jwt.refreshToken)
                } else {
                    LocalStorage.setToken(jwt.accessToken, jwt.refreshToken)
                }

                config.headers = {
                    Authorization: `Bearer ${jwt.accessToken}`,
                    // "Content-Type": "application/json",
                }
                return instance.request(config)

            } catch (error: any) {
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export default instance