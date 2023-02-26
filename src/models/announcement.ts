export interface Announcement {
    forumUUID: string
    authorUUID: string
    authorName: string
    authorImageURL: string
    createdAt: Date
    title: string
    description?: string
}