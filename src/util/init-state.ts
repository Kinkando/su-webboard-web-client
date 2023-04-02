import { io } from 'socket.io-client'
import { getUserUUID } from './localstorage'
import { getNotiList, getUnreadNotiCount } from '@services/notification'
import { getUserProfile } from '@services/user'
import notificationStore from '@stores/notification'
import userStore from '@stores/user'

export async function initState(userType: 'adm' | 'std' | 'tch') {
    if (userType && userType !== 'adm') {
        userStore.set(await getUserProfile())
        const noti = await getNotiList(10, 0)
        notificationStore.set({ notiList: noti.data, total: noti.total, unreadNotiCount: await getUnreadNotiCount() })

        const socket = io(`${import.meta.env.VITE_API_HOST}/notification`)

        socket.on('connect', () => socket.emit('join', { room: getUserUUID() }))
    }
}