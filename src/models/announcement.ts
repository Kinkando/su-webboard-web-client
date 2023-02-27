export interface Announcement {
    forumUUID: string
    authorUUID: string
    authorName: string
    authorImageURL: string
    announcementImageURLs?: string[]
    createdAt: Date
    title: string
    description?: string
}