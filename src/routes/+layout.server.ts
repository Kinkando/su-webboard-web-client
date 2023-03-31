
// import { UserType } from "@models/auth";
// import type { Notification } from "@models/notification";
// import type { User } from "@models/user";
// import { getNotiList } from "@services/notification";
// import { getUserProfile } from "@services/user";
// import { getUserType } from "@util/cookies";
import type { LayoutServerLoad } from "./$types";
// import userStore from '@stores/user'
// import notificationStore from '@stores/notification'

// interface Layout {
//     user?: User
//     notification?: Notification
//     routeID: string
//     userType: string
//     isValid: boolean
// }
// export const ssr = false

export const load: LayoutServerLoad = async ({ cookies, route }) => {
    // const { userType, isValid } = getUserType(cookies)
    // const res: Layout = { routeID: route?.id!, userType, isValid }
    // if ([UserType.STUDENT, UserType.TEACHER].includes(userType as UserType) && isValid) {
    //     res.user = await getUserProfile(cookies)
    //     res.notification = await getNotiList()
    //     userStore.set({...res.user})
    //     notificationStore.set({...res.notification})
    // }
    // return res
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

// แสดงชื่อของคนที่กดถูกใจกระทู้หรือคอมเมนต์ในหน้า ForumDetail (แสดงเฉพาะชื่อคนที่เราติดตาม)
// เมื่อกดเข้าไปที่ข้อความแสดงชื่อคนกดถูกใจ ให้แสดง popup รายชื่อคนทั้งหมดที่คนถูกใจกระทู้/คอมเมนต์นั้นๆ
// เพิ่ม gallery สำหรับ view รูปภาพในหน้า new forum / new announcement (สามารถคลิกหรือกดลูกศรบนคีย์บอร์ดเพื่อเลื่อนรูปภาพได้)
// เพิ่มคลิกรูปเพื่อขยาย สำหรับหน้า update profile
// Text Editor Component

// เพิ่มหน้า internal server error กรณีที่ call APIs return status 500
// Check permission before delete comment or forum (only yourself, author or admin can remove its)
// edit loading screen on create/update/delete data admin
// admin add form validation
// admin portal ui on modal open and resize (backdrop animate) and modal overlap on sidebar
// admin portal modal form validation
// admin portal error not found page
// admin portal internal server error page

// change profile image with providing avatar from backend
// เพิ่ม Notification List Page
// report view on admin page

// onMount twice

// SETTING PAGE
// - change theme
// - set sorting comment (default comment #1-#10), can set by latest comment first
// - ปักหมุด topbar ให้ไม่หุบเมื่อเลื่อนลง

// เพิ่มหน้า Sign Up สำหรับนักศึกษา โดยสามารถ sign up ได้ผ่านเมลมหาวิทยาลัยเท่านั้น และหลังจาก verify จะให้กรอก
// - รหัสนักศึกษา (โดยมี warning ว่า ไม่สามารถเปลี่ยนได้ด้วยตนเองในภายหลัง และต้องมีการ validate format เพิ่ม)
// - userDisplayName
// - userFullName
// โดยที่ userFullName จะ prefill ให้จาก ชื่อใน gmail (googleUserProfile)