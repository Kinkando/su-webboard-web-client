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

export interface ForumFilter {
    category?: Category
    orderBy?: string // likeCount, commentCount
    filterBy?: string // author or topic title
    searchText?: string
}

export interface ForumReport {
    reportUUID: string
    reporterUUID: string
    reporterName: string
    plaintiffUUID: string
    plaintiffName: string
    description: string
}

export interface Document {
    url: string
    uuid: string
}

// Create Comment
// case 'comment forum': send only forumUUID
// case 'reply comment': send forumUUID and commentUUID to reference by replyCommentUUID