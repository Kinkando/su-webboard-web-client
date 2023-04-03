import { io } from 'socket.io-client'
import { getUserUUID, isOpenPushNotification } from './localstorage'
import { getNotiDetail, getNotiList, getUnreadNotiCount } from '@services/notification'
import { getUserProfile } from '@services/user'
import notificationStore from '@stores/notification'
import userStore from '@stores/user'
import { SocketEvent } from '@commons/socket-event'
import { pushNotification } from '@stores/toast'

export async function initState(userType: 'adm' | 'std' | 'tch') {
    if (userType && userType !== 'adm') {
        userStore.set(await getUserProfile())
        const noti = await getNotiList(10, 0)
        notificationStore.set({ notiList: noti.data, total: noti.total, unreadNotiCount: await getUnreadNotiCount() })

        const socket = io(`${import.meta.env.VITE_API_HOST}/notification`)

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
                const notiDetail = await getNotiDetail(notiUUID)
                const count = await getUnreadNotiCount()
                if (notiDetail) {
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
                }
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
            notificationStore.update(all => {
                // const length = all.notiList.length
                all.notiList = all.notiList.filter(noti => {
                    // if (noti.notiUUID === notiUUID && !noti.isRead) {
                    //     all.unreadNotiCount--;
                    // }
                    return noti.notiUUID !== notiUUID
                })
                all.unreadNotiCount = count
                all.total = noti.total
                return all
            })
        })
    }
}