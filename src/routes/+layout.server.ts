import { UserType } from "@models/auth";
import type { Notification } from "@models/notification";
import type { User } from "@models/user";
import { getNotiList } from "@services/notification";
import { getUserProfile } from "@services/user";
import { getUserType } from "@util/cookies";
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
        res.user = await getUserProfile(cookies)
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

// admin add form validation

// change profile image with providing avatar from backend
// เพิ่ม Notification List Page
// เพิ่ม option sort by ในหน้า search/category/popular list page

// เพิ่ม gallery สำหรับ view รูปภาพในหน้า new forum / new announcement (สามารถคลิกหรือกดลูกศรบนคีย์บอร์ดเพื่อเลื่อนรูปภาพได้)
// เพิ่มคลิกรูปเพื่อขยาย สำหรับหน้า update profile

// เพิ่ม animation loading เวลา navigate ไปหน้าอื่น (เหมือนในแอพมอของเจได)
// เพิ่มหน้าดู profile user คนอื่น และเพิ่ม feature ติดตามผู้ใช้งานคนอื่น

// เพิ่มเมนูเปลี่ยนภาษา ไม่ก็เปลี่ยนแอพให้กลายเป็นภาษาไทย