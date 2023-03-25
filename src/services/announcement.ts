import type { Document } from "@models/forum"
import type { Announcement, AnnouncementRequest } from "@models/announcement"
import api from "@util/api"
import type { Cookies } from "@sveltejs/kit"

const baseURL = import.meta.env.VITE_API_HOST

export async function getAnnouncements(offset: number, limit: number) {
    const res = await api<{ total: number, data: Announcement[] }>({
        url: `${baseURL}/announcement?limit${limit}&offset=${offset}`,
        method: "GET",
    })
    return res.data || { total: 0, data: [] as Announcement[] }
}

export async function getAnnouncementDetail(announcementUUID: string, cookies?: Cookies) {
    const res = await api<Announcement>({
        url: `${baseURL}/announcement/${announcementUUID}`,
        method: "GET",
        cookies,
    })
    return res.data
}

export async function upsertAnnouncement(announcement: AnnouncementRequest, files: File[]) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(announcement))
    if (files) {
        for(let file of files) {
            formData.append("files", file)
        }
    }
    return await api<{ announcementUUID: string, documents: Document[] }>({
        url: `${baseURL}/announcement`,
        method: "PUT",
        data: formData,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
}

export async function deleteAnnouncement(announcementUUID: string) {
    return await api({
        url: `${baseURL}/announcement`,
        method: "DELETE",
        data: { announcementUUID },
    })
}
