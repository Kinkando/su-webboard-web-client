import type { Document } from './forum'

export interface Announcement {
    announcementUUID: string
    authorUUID: string
    authorName: string
    authorImageURL: string
    announcementImages?: Document[]
    seeCount: number
    createdAt: Date
    updatedAt?: Date
    title: string
    description?: string
}

export interface AnnouncementRequest {
    announcementUUID?: string
    title: string
    description: string
    announcementImageUUIDs?: string[]
}