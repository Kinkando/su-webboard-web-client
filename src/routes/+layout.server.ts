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