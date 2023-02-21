import type { Category } from "./category"

export interface Forum {
    forumUUID: string
    title: string
    forumImageURL?: string
    categories: Category[]
    authorUUID: string
    authorName: string
    authorImageURL: string
    likeCount: number
    commentCount: number
    createdAt: Date
}

export interface ForumDetail {
    forumUUID: string
    title: string
    description: string
    forumImageURLs?: string[]
    categories: Category[]
    authorUUID: string
    authorName: string
    authorImageURL: string
    likeCount: number
    commentCount: number
    createdAt: Date
}