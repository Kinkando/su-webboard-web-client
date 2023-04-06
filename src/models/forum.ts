import type { Category } from "./category"

export interface Forum {
    forumUUID: string
    title: string
    forumImages?: Document[]
    categories?: Category[]
    authorUUID: string
    authorName: string
    authorImageURL: string
    likeCount?: number
    commentCount?: number
    ranking?: number
    isFavorite?: boolean
    isAnonymous?: boolean
    createdAt: Date
}

export interface ForumRequest {
    forumUUID?: string
    title: string
    description: string
    categoryIDs: number[]
    forumImageUUIDs?: string[]
    isAnonymous?: boolean
}

export interface ForumDetail {
    forumUUID: string
    title: string
    description: string
    forumImages?: Document[]
    categories: Category[]
    authorUUID: string
    authorName: string
    authorImageURL: string
    isLike: boolean
    likeCount: number
    commentCount: number
    createdAt: Date
    updatedAt?: Date
    isAnonymous?: boolean
    isFavorite?: boolean
}

export interface Document {
    url: string
    uuid: string
}