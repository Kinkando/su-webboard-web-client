import { TokenType, type AccessJWT, type RefreshJWT } from "@models/auth";
import type { Cookies } from "@sveltejs/kit";
import jwtDecode from "jwt-decode"

export function getUserType(cookies: Cookies): { userType: string, isValid: boolean } {
    let userType = "";
    let isValid = false;
    const accessToken = cookies.get(TokenType.AccessToken)
    if (accessToken) {
        const decodeJWT = jwtDecode(accessToken) as AccessJWT
        const now = new Date().getTime();
        isValid = now <= decodeJWT.exp
        userType = decodeJWT.userType
    }
    if (isValid) {
        return { userType, isValid };
    }
    const refreshToken = cookies.get(TokenType.RefreshToken)
    if (refreshToken) {
        const decodeJWT = jwtDecode(refreshToken) as RefreshJWT
        const now = new Date().getTime() / 1000;
        isValid = now <= decodeJWT.exp
        userType = decodeJWT.userType
    }
    return { userType, isValid }
}

export function getToken(cookies: Cookies): { accessToken: string|undefined, refreshToken: string|undefined } {
    const token: any = {};
    const accessToken = cookies.get(TokenType.AccessToken)
    if (accessToken) {
        const decodeJWT = jwtDecode(accessToken) as AccessJWT
        const now = new Date().getTime() / 1000;
        if (now <= decodeJWT.exp) {
            token.accessToken = accessToken;
        }
    }
    const refreshToken = cookies.get(TokenType.RefreshToken)
    if (refreshToken) {
        const decodeJWT = jwtDecode(refreshToken) as RefreshJWT
        const now = new Date().getTime() / 1000;
        if (now <= decodeJWT.exp) {
            token.refreshToken = refreshToken;
        }
    }
    return token
}

export function setToken(cookies: Cookies, accessToken: string, refreshToken: string) {
    cookies.set(TokenType.AccessToken, accessToken, { path: '/', maxAge: 60*60*24*7 })
    cookies.set(TokenType.RefreshToken, refreshToken, { path: '/', maxAge: 60*60*24*7 })
}

export function revokeToken(cookies: Cookies) {
    cookies.delete(TokenType.AccessToken+" ", { path: "/" })
    cookies.delete(TokenType.RefreshToken+" ", { path: "/" })
}