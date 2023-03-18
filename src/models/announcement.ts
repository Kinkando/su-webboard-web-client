import type { Document } from './forum'

export interface Announcement {
    announcementUUID: string
    authorUUID: string
    authorName: string
    authorImageURL: string
    announcementImages?: Document[]
    createdAt: Date
    title: string
    description?: string
}

export interface AnnouncementRequest {
    announcementUUID?: string
    title: string
    description: string
    announcementImageUUIDs?: string[]
}