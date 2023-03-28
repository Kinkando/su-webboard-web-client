
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

// onMount twice

// SETTING PAGE
// - change theme
// - set sorting comment (default comment #1-#10), can set by latest comment first
// - ปักหมุด topbar ให้ไม่หุบเมื่อเลื่อนลง

// แก้ไขหน้า home ให้ API Calculate โพสต์ล่าสุดกับจำนวนโพสต์ใน category นั้นๆ ให้ถูกต้อง (ปัจจุบัน mock ไว้ที่โค้ดหลังบ้าน)

// เพิ่มหน้า Sign Up สำหรับนักศึกษา โดยสามารถ sign up ได้ผ่านเมลมหาวิทยาลัยเท่านั้น และหลังจาก verify จะให้กรอก
// - รหัสนักศึกษา (โดยมี warning ว่า ไม่สามารถเปลี่ยนได้ด้วยตนเองในภายหลัง และต้องมีการ validate format เพิ่ม)
// - userDisplayName
// - userFullName
// โดยที่ userFullName จะ prefill ให้จาก ชื่อใน gmail (googleUserProfile)

// ทำให้ text editor รองรับการเว้นบรรทัด เวลาแสดงผลในหน้า home, announcement detail
// add delete all forum and announcement when admin delete user

// remove all posts and comments when delete user by admin (and pull out notiUserUUIDs, followerUserUUIDs, followingUserUUIDs of related all users)
// remove all related post when delete category (popup or modal to warning before delete)
// ถ้าลบ category ต้องลบ categoryID ออกจากทุกโพสต์ที่มี categoryID ดังกล่าว (กรณีโพสต์นั้นมี category เดียว และ category นั้นโดนลบ ให้ลบโพสต์ด้วย)
// admin portal ui on modal open and resize (backdrop animate) and modal overlap on sidebar
// admin portal modal form validation
// admin portal error not found page
// admin portal internal server error page

// admin add form validation

// change profile image with providing avatar from backend
// เพิ่ม Notification List Page

// เพิ่ม gallery สำหรับ view รูปภาพในหน้า new forum / new announcement (สามารถคลิกหรือกดลูกศรบนคีย์บอร์ดเพื่อเลื่อนรูปภาพได้)
// เพิ่มคลิกรูปเพื่อขยาย สำหรับหน้า update profile