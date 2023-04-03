import type { NotificationItem } from "./notification"

export interface Toast {
    id?: number
    dismissible?: boolean
    timeout?: number
}

export interface NotificationToast extends Toast {
    notification: NotificationItem
}