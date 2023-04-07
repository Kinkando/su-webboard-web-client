import { io } from 'socket.io-client'
import { getUserUUID, isOpenPushNotification } from './localstorage'
import { getNotiDetail, getNotiList, getUnreadNotiCount } from '@services/notification'
import { getUserProfile } from '@services/user'
import notificationStore from '@stores/notification'
import userStore from '@stores/user'
import { SocketEvent } from '@commons/socket-event'
import { pushNotification } from '@stores/toast'
import notificationSocket from '@stores/notification_socket'
import type { User } from '@stores/admin_socket'
import adminSocket from '@stores/admin_socket'

export async function initAdminSocket() {
    const socket = io(`${import.meta.env.VITE_API_HOST}/admin`)
    socket.on('connect', () => socket.on(SocketEvent.AdminConnect, (users: User[]) => {
        const uniqueUser: User[] = [];
        users.forEach(user => {
            const findIndex = uniqueUser.findIndex(u => u.userUUID === user.userUUID)
            if (findIndex !== -1) {
                uniqueUser[findIndex].socketIDs.push((user as any).socketID)
            } else {
                const newUser = {...user}
                newUser.socketIDs = [(user as any).socketID]
                uniqueUser.push(newUser)
            }
        })
        adminSocket.set(uniqueUser)
    }))

    socket.on(SocketEvent.UserConnect, (data: {user: User, socketID: string}) => adminSocket.update(all => {
        const findIndex = all.findIndex(u => u.userUUID === data.user.userUUID)
        if (findIndex !== -1) {
            all[findIndex].socketIDs.push(data.socketID)
            return all
        }
        const newUser = {...data.user}
        newUser.socketIDs = [data.socketID]
        return [...all, newUser]
    }))

    socket.on(SocketEvent.UserDisconnect, (socketID: string) => adminSocket.update(all => {
        const findIndex = all.findIndex(user => user.socketIDs.includes(socketID))
        if (findIndex !== -1) {
            if (all[findIndex].socketIDs?.length === 1) {
                return all.filter((_, index) => index !== findIndex) || []
            }
            all[findIndex].socketIDs = all[findIndex].socketIDs.filter(id => socketID !== id)
        }
        return all
    }))
}

export async function initNotificationSocket(userType: 'adm' | 'std' | 'tch') {
    if (userType && userType !== 'adm') {
        userStore.set(await getUserProfile())
        const noti = await getNotiList(10, 0)
        notificationStore.set({ notiList: noti.data, total: noti.total, unreadNotiCount: await getUnreadNotiCount() })

        const socket = io(`${import.meta.env.VITE_API_HOST}/notification`)
        notificationSocket.set(socket)

        socket.on('connect', () => socket.emit('join', { room: getUserUUID() }))

        socket.on(SocketEvent.CreateNotification, async(notiUUID: string) => {
            const notiDetail = await getNotiDetail(notiUUID)
            if (notiDetail) {
                notificationStore.update(all => {
                    all.unreadNotiCount++
                    all.total++
                    all.notiList = [notiDetail, ...all.notiList]
                    return all
                })
                if (isOpenPushNotification()) {
                    pushNotification({ notification: notiDetail })
                }
            }
        })

        socket.on(SocketEvent.UpdateNotification, async(data: {notiUUID: string, action: 'push' | 'pop'}) => {
            const notiDetail = await getNotiDetail(data.notiUUID)
            const count = await getUnreadNotiCount()
            if (notiDetail) {
                notificationStore.update(all => {
                    if (data.action === 'push') {
                        all.notiList = [notiDetail, ...all.notiList.filter(noti => noti.notiUUID !== notiDetail.notiUUID)]
                    } else {
                        all.notiList = all.notiList.map(noti => noti.notiUUID === notiDetail.notiUUID ? notiDetail : noti)
                    }
                    all.unreadNotiCount = count
                    return all
                })
                if (data.action === 'push' && isOpenPushNotification()) {
                    pushNotification({ notification: notiDetail })
                }
            }
        })

        socket.on(SocketEvent.ReadNotification, async(notiUUID?: string) => {
            if (notiUUID) {
                // const notiDetail = await getNotiDetail(notiUUID)
                const count = await getUnreadNotiCount()
                // if (notiDetail) {
                    notificationStore.update(all => {
                        all.notiList.forEach((noti, index) => {
                            if (noti.notiUUID === notiUUID) {
                                if (!all.notiList[index].isRead) {
                                    // all.unreadNotiCount--;
                                    all.notiList[index].isRead = true;
                                    return;
                                }
                            }
                        })
                        all.unreadNotiCount = count
                        return all
                    })
                // }
            } else {
                notificationStore.update(all => {
                    all.notiList = all.notiList.map(noti => {
                        noti.isRead = true;
                        return noti
                    })
                    all.unreadNotiCount = 0
                    return all
                })
            }
        })

        socket.on(SocketEvent.DeleteNotification, async(notiUUID: string) => {
            const noti = await getNotiList(10, 0)
            const count = await getUnreadNotiCount()
            notificationStore.set({ notiList: noti.data, total: noti.total, unreadNotiCount: count })
            // const noti = await getNotiList(10, 0)
            // const count = await getUnreadNotiCount()
            // notificationStore.update(all => {
            //     // const length = all.notiList.length
            //     all.notiList = all.notiList.filter(noti => {
            //         // if (noti.notiUUID === notiUUID && !noti.isRead) {
            //         //     all.unreadNotiCount--;
            //         // }
            //         return noti.notiUUID !== notiUUID
            //     })
            //     all.unreadNotiCount = count
            //     all.total = noti.total
            //     return all
            // })
        })

        socket.on(SocketEvent.RefreshNotification, async() => {
            const noti = await getNotiList(10, 0)
            const count = await getUnreadNotiCount()
            notificationStore.set({ notiList: noti.data, total: noti.total, unreadNotiCount: count })
        })
    }
}