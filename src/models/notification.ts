export interface Notification {
    unreadNotiCount?: number
    notiList: NotificationItem[]
    total: number
}

export interface NotificationItem {
    notiUUID: string
    notiBody: string
    notiUserDisplayName: string
    notiUserImageURL: string
    notiLink: string
    notiAt: Date
    isRead: boolean
}