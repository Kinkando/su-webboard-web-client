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
    ranking?: number
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

export interface ForumFilter {
    category?: Category
    orderBy?: string // likeCount, commentCount
    filterBy?: string // author or topic title
    searchText?: string
}