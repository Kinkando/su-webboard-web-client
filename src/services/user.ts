import type { User } from "@models/user";
import type { Cookies } from "@sveltejs/kit";
import api from "@util/api";

const baseURL = import.meta.env.VITE_API_HOST

export async function getUserProfile(cookie?: Cookies) {
    const response = await api<User>({
        url: `${baseURL}/user/profile`,
        method: 'GET',
        cookie,
    })
    return response.data!
}

export async function updateUserProfile(userDisplayName: string, isAnonymous: boolean, userImage?: File) {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ userDisplayName, isAnonymous }))
    if (userImage) {
        formData.append("file", userImage)
    }
    await api<User>({
        url: `${baseURL}/user/profile`,
        method: 'PATCH',
        data: formData,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
}

export async function getAvatars(): Promise<string[]> {
    const avartarURLs: string[] = [];

    return avartarURLs
}