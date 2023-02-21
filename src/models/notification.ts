export interface Notification {
    unreadNotiCount?: number
    notiList: NotificationItem[]
}

export interface NotificationItem {
    notiUUID: string
    postUUID: string
    userImageProfile?: string
    username?: string
    content?: string
    createAt?: Date
    isRead?: boolean
}