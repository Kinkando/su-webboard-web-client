import { TokenType, type AccessJWT, type RefreshJWT } from "@models/auth";
import jwtDecode from "jwt-decode"

function getUser(): { userUUID: string, userType: string, isValid: boolean } {
    let userUUID = "";
    let userType = "";
    let isValid = false;
    const accessToken = localStorage.getItem(TokenType.AccessToken)
    if (accessToken) {
        const decodeJWT = jwtDecode(accessToken) as AccessJWT
        const now = new Date().getTime();
        isValid = now <= decodeJWT.exp
        userType = decodeJWT.userType
        userUUID = decodeJWT.userUUID
    }
    if (isValid) {
        return { userUUID, userType, isValid };
    }
    const refreshToken = localStorage.getItem(TokenType.RefreshToken)
    if (refreshToken) {
        const decodeJWT = jwtDecode(refreshToken) as RefreshJWT
        const now = new Date().getTime() / 1000;
        isValid = now <= decodeJWT.exp
        userType = decodeJWT.userType
        userUUID = decodeJWT.userUUID
    }
    return { userUUID, userType, isValid }
}

export function getUserUUID(): string {
    const { userUUID } = getUser()
    return userUUID
}

export function getUserType(): { userType: string, isValid: boolean } {
    const { userType, isValid } = getUser()
    return { userType, isValid }
}

export function getToken(): { accessToken: string|undefined, refreshToken: string|undefined } {
    const token: any = {};
    const accessToken = localStorage.getItem(TokenType.AccessToken)
    if (accessToken) {
        const decodeJWT = jwtDecode(accessToken) as AccessJWT
        const now = new Date().getTime() / 1000;
        if (now <= decodeJWT.exp) {
            token.accessToken = accessToken;
        }
    }
    const refreshToken = localStorage.getItem(TokenType.RefreshToken)
    if (refreshToken) {
        const decodeJWT = jwtDecode(refreshToken) as RefreshJWT
        const now = new Date().getTime() / 1000;
        if (now <= decodeJWT.exp) {
            token.refreshToken = refreshToken;
        }
    }
    return token
}

export function setToken(accessToken: string, refreshToken: string) {
    localStorage.setItem(TokenType.AccessToken, accessToken)
    localStorage.setItem(TokenType.RefreshToken, refreshToken)
}

export function revokeToken() {
    localStorage.clear();
}