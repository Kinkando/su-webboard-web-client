import type { User } from "@models/user";
import api from "@util/api";

const baseURL = import.meta.env.VITE_API_HOST

export async function getUserProfile(userUUID?: string) {
    const response = await api<User>({
        url: `${baseURL}/user/profile${userUUID ? `?userUUID=${userUUID}` : ''}`,
        method: 'GET',
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

export async function followingUser(userUUID: string, isFollowing: boolean) {
    return await api<User>({
        url: `${baseURL}/user/following`,
        method: 'PATCH',
        data: { userUUID, isFollowing }
    })
}

export async function notificationUser(userUUID: string, isNoti: boolean) {
    return await api<User>({
        url: `${baseURL}/user/notification`,
        method: 'PATCH',
        data: { userUUID, isNoti }
    })
}

export async function getFollowUsers(userUUID: string, type: 'following' | 'follower', offset: number, limit: number) {
    const res = await api<{total: number, data: User[]}>({
        url: `${baseURL}/user/${type}?userUUID=${userUUID}&offset=${offset}&limit=${limit}`,
        method: 'GET',
    })
    return res.data
}

export async function getAvatars(): Promise<string[]> {
    const avartarURLs: string[] = [];

    return avartarURLs
}