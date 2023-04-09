
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

// change profile image with providing avatar from backend
// เพิ่ม Notification List Page
// report view on admin page

// onMount twice

// เมื่อลบ user
// 1. ลบ file ที่เก็บใน cloud storage ของทุกกระทู้หรือคอมเมนต์ของ user คนนั้น
// 2. ลบกระทู้ทั้งหมดที่ user คนนั้นเป็นคนสร้าง
// 3. ลบคอมเมนต์ของ user คนนั้นทั้งหมด
// 4. ลบประกาศของ user คนนั้นทั้งหมด กรณีที่มี user type เป็นอาจารย์
// 5. ลบยอดไลค์ทั้งหมดออกจากกระทู้และคอมเมนต์ที่เกี่ยวข้องกับ user คนนั้น รวมถึงถอด user ออกจากรายการโปรดในกระทู้ที่เกี่ยวข้อง
// 6. ลบยอดการมองเห็นทั้งหมดที่เกี่ยวข้องกับ user คนนั้นออกจากประกาศจากทางมหาวิทยาลัย
// 7. ลบ user คนนั้น ออกจากผู้ติดตาม และกำลังติดตามของ user คนอื่น รวมถึงปิดการแจ้งเตือนทั้งหมดที่เกี่ยวข้องกับ user คนนั้น
// 8. ลบข้อมูล user ออกจาก database รวมถึง email และ link account google provider ที่ผูกไว้กับ firebase
// 9. revoke access token, refresh token ทั้งหมดของ user คนนั้น ออกจาก cache repository redis และ force logout
// 10. ส่ง event ผ่าน socket เพื่อ trigger ไป refresh หน้าจอบน browser สำหรับ user ทั้งหมดที่อยู่ในหน้ารายละเอียดของกระทู้ที่มีข้อมูลเกี่ยวข้องกับ user คนนั้น

// เมื่อลบ category
// 1. ลบ category ออกจากกระทู้ทั้งหมดที่เกี่ยวข้อง (กรณีที่กระทู้นั้นมีหลาย category)
// 2. ลบกระทู้ทั้งหมดที่มี category เดียว และเป็น category เดียวกับที่ต้องการลบ
// 3. ส่ง event ผ่าน socket เพื่อ trigger ไป refresh หน้าจอ