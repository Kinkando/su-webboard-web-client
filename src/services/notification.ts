import type { NotificationItem } from "../models/notification";
import api from "../util/api";

export async function getUnreadNotiCount() {
    const res = await api<{ count: number }>({
        url: `/notification/count`,
        method: "GET",
    })
    return res.data?.count || 0
}

export async function getNotiList(limit: number, offset: number, isRead?: 'all' | 'unread' | 'read'): Promise<{ total: number, data: NotificationItem[] }> {
    const res = await api<{ total: number, data: NotificationItem[] }>({
        url: `/notification?limit=${limit}&offset=${offset}&isRead=${isRead ?? 'all'}`,
        method: "GET",
    })
    return res.data || { total: 0, data: [] }
}

export async function getNotiDetail(notiUUID: string): Promise<NotificationItem | undefined> {
    const res = await api<NotificationItem>({
        url: `/notification/${notiUUID}`,
        method: "GET",
    })
    return res.data
}

export async function readNoti(notiUUID: string) {
    return await api({
        url: `/notification/${notiUUID}`,
        method: "PATCH",
    })
}

export async function readAllNoti() {
    return await api({
        url: `/notification`,
        method: "PATCH",
    })
}

export async function deleteNoti(notiUUID: string) {
    return await api({
        url: `/notification/${notiUUID}`,
        method: "DELETE",
    })
}
