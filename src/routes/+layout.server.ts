import { UserType } from "@models/auth";
import type { Notification } from "@models/notification";
import type { User } from "@models/user";
import { getNotiList } from "@services/notification";
import { getUserProfile } from "@services/user";
import { getUserType } from "@util/token";
import type { LayoutServerLoad } from "./$types";
import userStore from '@stores/user'
import notificationStore from '@stores/notification'

interface Layout {
    user?: User
    notification?: Notification
    routeID: string
    userType: string
    isValid: boolean
}

export const load: LayoutServerLoad = async ({ cookies, route }) => {
    const { userType, isValid } = getUserType(cookies)
    const res: Layout = { routeID: route?.id!, userType, isValid }
    if ([UserType.STUDENT, UserType.TEACHER].includes(userType as UserType) && isValid) {
        res.user = await getUserProfile()
        res.notification = await getNotiList()
        userStore.set({...res.user})
        notificationStore.set({...res.notification})
    }
    return res
}

// /** @type {import('./$types').LayoutServerLoad} */
// export async function load() {
//     throw redirect(303, "/login")
//     return {
//         posts: ""
//     };
// }

// export const load = (async ({ cookies }) => {
//     const { userType, isValid } = getUserType(cookies)
//     const isTeacher = userType === UserType.TEACHER && isValid
//     return isTeacher
// }) satisfies LayoutServerLoad;