import type { Category } from "./category"

export interface Forum {
    forumUUID: string
    title: string
    forumImageURL?: string
    categories?: Category[]
    authorUUID: string
    authorName: string
    authorImageURL: string
    likeCount?: number
    commentCount?: number
    ranking?: number
    createdAt: Date
}

export interface ForumRequest {
    forumUUID?: string
    title: string
    description: string
    categoryIDs: number[]
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
    isLike: boolean
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

export interface ForumReport {
    reportUUID: string
    reporterUUID: string
    reporterName: string
    plaintiffUUID: string
    plaintiffName: string
    description: string
}

// Create Comment
// case 'comment forum': send only forumUUID
// case 'reply comment': send forumUUID and commentUUID to reference by replyCommentUUID