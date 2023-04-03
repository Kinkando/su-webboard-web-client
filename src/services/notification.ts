import type { NotificationItem } from "../models/notification";
import api from "../util/api";

const baseURL = import.meta.env.VITE_API_HOST

export async function getUnreadNotiCount() {
    const res = await api<{ count: number }>({
        url: `${baseURL}/notification/count`,
        method: "GET",
    })
    return res.data?.count || 0
}

export async function getNotiList(limit: number, offset: number): Promise<{ total: number, data: NotificationItem[] }> {
    const res = await api<{ total: number, data: NotificationItem[] }>({
        url: `${baseURL}/notification?limit${limit}&offset=${offset}`,
        method: "GET",
    })
    return res.data || { total: 0, data: [] }
}

export async function getNotiDetail(notiUUID: string): Promise<NotificationItem | undefined> {
    const res = await api<NotificationItem>({
        url: `${baseURL}/notification/${notiUUID}`,
        method: "GET",
    })
    return res.data
}

export async function readNoti(notiUUID: string) {
    return await api({
        url: `${baseURL}/notification/${notiUUID}`,
        method: "PATCH",
    })
}
