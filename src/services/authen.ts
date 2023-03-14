import type { JWT } from "@models/auth";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_HOST
const apiKey = import.meta.env.VITE_API_KEY

export async function verifyToken(idToken: string) {
    const response = await axios.request<JWT>({
        url: `${baseURL}/authen/token/verify`,
        method: 'POST',
        headers: {'X-Api-Key': apiKey},
        data: { idToken },
    })
    return response.data
}

export async function refreshToken(refreshToken: string) {
    const response = await axios.request<JWT>({
        url: `${baseURL}/authen/token/refresh`,
        method: 'POST',
        data: { refreshToken },
    })
    return response.data
}