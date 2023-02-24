import { getNotiList } from "@services/notification";
import { getUserProfile } from "@services/user";
import { getUserType } from "@util/token";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
    const { userType } = getUserType(cookies)
    const user = await getUserProfile()
    const notification = await getNotiList()
    user.userType = userType
    return { user, notification }
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

// เพิ่ม transition ตอนเปิด popup ที่ menu icon บน topbar
// เพิ่ม gallery สำหรับ view รูปภาพในหน้า new forum / new announcement (สามารถคลิกหรือกดลูกศรบนคีย์บอร์ดเพื่อเลื่อนรูปภาพได้)
// เพิ่ม animation loading เวลา navigate ไปหน้าอื่น (เหมือนในแอพมอของเจได)
// เพิ่มหน้าดู profile user คนอื่น และเพิ่ม feature ติดตามผู้ใช้งานคนอื่น
// load data before render layout on user general page