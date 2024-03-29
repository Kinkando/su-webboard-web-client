import type { Document } from "./forum"

export interface Comment {
    // forumUUID: string
    // replyCommentUUID?: string
    commentUUID: string
    commentText: string
    commentImages?: Document[]
    commenterUUID: string
    commenterName: string
    commenterImageURL: string
    isLike?: boolean
    likeCount?: number
    commentCount?: number
    createdAt: Date
    updatedAt?: Date
    isAnonymous?: boolean
    replyComments?: Comment[]
    replyCursor?: number
}