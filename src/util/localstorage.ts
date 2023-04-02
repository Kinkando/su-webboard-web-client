import { TokenType, type AccessJWT, type RefreshJWT } from "@models/auth";
import jwtDecode from "jwt-decode"

export function getUser(): { userUUID: string, userType: string, isValid: boolean, sessionUUID: string } {
    let userUUID = "";
    let userType = "";
    let sessionUUID = "";
    let isValid = false;
    try {
        const accessToken = localStorage.getItem(TokenType.AccessToken)
        if (accessToken) {
            const decodeJWT = jwtDecode(accessToken) as AccessJWT
            const now = new Date().getTime() / 1000;
            isValid = now <= decodeJWT.exp;
            userType = decodeJWT.userType
            userUUID = decodeJWT.userUUID
            sessionUUID = decodeJWT.sessionUUID
        }
        if (isValid) {
            return { userUUID, userType, isValid, sessionUUID };
        }
        const refreshToken = localStorage.getItem(TokenType.RefreshToken)
        if (refreshToken) {
            const decodeJWT = jwtDecode(refreshToken) as RefreshJWT
            const now = new Date().getTime() / 1000;
            isValid = now <= decodeJWT.exp
            userType = decodeJWT.userType
            userUUID = decodeJWT.userUUID
            // sessionUUID = decodeJWT.sessionUUID
        }
    } catch (error) { }
    return { userUUID, userType, isValid, sessionUUID }
}

export function getUserUUID(): string {
    const { userUUID } = getUser()
    return userUUID
}

export function getUserType(): { userType: string, isValid: boolean } {
    const { userType, isValid } = getUser()
    return { userType, isValid }
}

export function getSessionUUID(): string {
    const { sessionUUID } = getUser()
    return sessionUUID
}

export function getToken(): { accessToken: string|undefined, refreshToken: string|undefined } {
    const token: any = {};
    try {
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
    } catch (error) { }
    return token
}

export function setToken(accessToken: string, refreshToken: string) {
    localStorage.setItem(TokenType.AccessToken, accessToken)
    localStorage.setItem(TokenType.RefreshToken, refreshToken)
}

export function revokeToken() {
    localStorage.removeItem(TokenType.AccessToken);
    localStorage.removeItem(TokenType.RefreshToken);
}

export function isPushNotification(): boolean {
    const pushNoti = localStorage.getItem('push-notification')
    return pushNoti === null || pushNoti === 'open'
}

export function setPushNotification(isOpen: boolean) {
    localStorage.setItem('push-notification', isOpen ? 'open' : 'close')
}