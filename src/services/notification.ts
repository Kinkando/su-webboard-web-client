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
                forumUUID: "xxx-xxx-xxx-xxx",
                content: "คอมเมนต์บนกระทู้ของคุณ",
                isRead: false,
                createAt: new Date(),
                userImageProfile,
                username,
            },
            {
                notiUUID: "yyy-yyy-yyy-yyy",
                forumUUID: "yyy-yyy-yyy-yyy",
                content: "ถูกใจคอมเมนต์ของคุณ",
                isRead: false,
                createAt: new Date(),
                userImageProfile,
                username,
            },
            {
                notiUUID: "zzz-zzz-zzz-zzz",
                forumUUID: "zzz-zzz-zzz-zzz",
                content: "ตอบกลับคอมเมนต์ของคุณ",
                isRead: true,
                createAt: new Date(),
                userImageProfile,
                username,
            },
        ]
    }
    // await sleep()
    return noti
}

// const sleep = async (time?: number) => {
//     if (!time) {
//         time = 500
//     }
//     return await new Promise(resolve => setTimeout(() => resolve(""), time))
// }