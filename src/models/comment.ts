export interface Comment {
    // forumUUID: string
    // replyCommentUUID?: string
    commentUUID: string
    commentText: string
    commentImageURLs?: string[]
    commenterUUID: string
    commenterName: string
    commenterImageURL: string
    isLike: boolean
    likeCount: number
    commentCount: number
    createdAt: Date
    replyComments?: Comment[]
    replyCursor?: number
}