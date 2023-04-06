import type { JWT } from "@models/auth";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY

export async function verifyToken(idToken: string) {
    return await axios.request<JWT>({
        url: `/authen/token/verify`,
        method: 'POST',
        headers: {'X-Api-Key': apiKey},
        data: { idToken },
    })
}

export async function verifyGoogle(accessToken: string) {
    const response = await axios.request<JWT>({
        url: `/authen/token/google`,
        method: 'POST',
        headers: {'X-Api-Key': apiKey},
        data: { accessToken },
    })
    return response.data
}

export async function refreshToken(refreshToken: string) {
    const response = await axios.request<JWT>({
        url: `/authen/token/refresh`,
        method: 'POST',
        data: { refreshToken },
    })
    return response.data
}

export async function revokeToken(accessToken?: string, refreshToken?: string) {
    try {
        await axios.request({
            url: `/authen/token/revoke`,
            method: 'POST',
            data: { accessToken, refreshToken },
        })
    } catch (error) {}
}

export async function registerUser(userDisplayName: string, userFullName: string, studentID: string, idToken: string) {
    return await axios.request<JWT>({
        url: `/authen/user`,
        method: 'POST',
        headers: {'X-Api-Key': apiKey},
        data: { userDisplayName, userFullName, studentID, idToken },
    })
}