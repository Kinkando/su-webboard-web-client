import type { Document } from "./forum"

export interface Announcement {
    forumUUID: string
    authorUUID: string
    authorName: string
    authorImageURL: string
    announcementImages?: Document[]
    createdAt: Date
    title: string
    description?: string
}