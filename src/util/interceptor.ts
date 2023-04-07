import axios, { AxiosError } from 'axios'
import type { AxiosRequestCustomConfig } from './api';
import http from '@commons/http';
import { TokenType } from '@models/auth';
import { refreshToken as refreshJWT } from '@services/authen';
import * as LocalStorage from './localstorage';
import * as Cookies from './cookies';
import { alert } from '@stores/alert';
import { goto } from '$app/navigation';

const baseURL = import.meta.env.VITE_API_HOST

const instance = axios.create({
    baseURL,
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
})

const redirectURL = () => {
    if (window.location.pathname.length > 1) {
        return '?redirect=' + window.location.pathname
    }
    return ''
}

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
        if (config.cookies) {
            accessToken = config.cookies.get(TokenType.AccessToken)
        } else {
            let { accessToken: token } = LocalStorage.getToken()
            accessToken = token
        }
		if (accessToken) {
            if (!config.headers) {
                config.headers = { "Content-Type": "application/json" }
            }
            config.headers.Authorization = `Bearer ${accessToken}`
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
                    if (config.cookies) {
                        Cookies.revokeToken(config.cookies);
                    } else {
                        LocalStorage.revokeToken()
                    }
                    await goto(`/login` + redirectURL())
                    alert({
                        type: 'warning',
                        message: 'Session ของคุณหมดอายุ, กรุณาเข้าสู่ระบบใหม่อีกครั้ง!',
                    })
                    return Promise.reject(error);
                }
                config._isRefreshing = true;

                let refreshToken = config.cookies ? config.cookies.get(TokenType.RefreshToken) : localStorage.getItem(TokenType.RefreshToken)
                if (!refreshToken) {
                    throw new Error("No refresh token");
                }

                const jwt = await refreshJWT(refreshToken)
                if (!jwt) {
                    throw new Error("Refresh Token is invalid")
                }
                if (config.cookies) {
                    Cookies.setToken(config.cookies, jwt.accessToken, jwt.refreshToken)
                } else {
                    LocalStorage.setToken(jwt.accessToken, jwt.refreshToken)
                }

                if (!config.headers) {
                    config.headers = { "Content-Type": "application/json" }
                }
                config.headers.Authorization = `Bearer ${jwt.accessToken}`

                return instance.request(config)

            } catch (error: any) {
                if (config.cookies) {
                    Cookies.revokeToken(config.cookies);
                } else {
                    LocalStorage.revokeToken()
                }
                await goto(`/login` + redirectURL())
                alert({
                    type: 'warning',
                    message: 'Session ของคุณหมดอายุ, กรุณาเข้าสู่ระบบใหม่อีกครั้ง!',
                })
                return Promise.reject(error)
            }
        }
        return Promise.reject(error)
    }
)

export default instance