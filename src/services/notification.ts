import type { Notification } from "@models/notification";

export async function getNotiList(): Promise<Notification> {
    // mock
    const username = "Kook Kai"
    const userImageProfile = "https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745"
    const noti: Notification = {
        unreadNotiCount: 2,
        notiList: [
            {
                notiUUID: "xxx-xxx-xxx-xxx",
                postUUID: "yyy-yyy-yyy-yyy",
                content: "comment on your topic",
                isRead: false,
                createAt: new Date(),
                userImageProfile,
                username,
            },
            {
                notiUUID: "xxx-xxx-xxx-xxx",
                postUUID: "yyy-yyy-yyy-yyy",
                content: "like your comment",
                isRead: false,
                createAt: new Date(),
                userImageProfile,
                username,
            },
            {
                notiUUID: "xxx-xxx-xxx-xxx",
                postUUID: "yyy-yyy-yyy-yyy",
                content: "reply on your comment",
                isRead: true,
                createAt: new Date(),
                userImageProfile,
                username,
            },
        ]
    }
    return noti
}