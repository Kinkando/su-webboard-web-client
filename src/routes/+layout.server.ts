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