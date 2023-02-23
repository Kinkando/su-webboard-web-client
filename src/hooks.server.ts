import { UserType } from "@models/auth";
import type { Handle } from "@sveltejs/kit";
import { getUserType } from "@util/token";

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event)
    const { userType, isValid } = getUserType(event.cookies)

    if (event.route.id === "/login" && isValid) {
        return new Response('Redirect', {status: 303, headers: { Location: '/' }})
    }

    if ((!userType || !isValid) && event.route.id !== "/login") {
        return new Response('Redirect', {status: 303, headers: { Location: '/login' }})
    }

    if (userType === UserType.ADMIN && !event.route.id?.startsWith("/admin-portal")) {
        return new Response('Redirect', {status: 303, headers: { Location: '/admin-portal' }})
    }

    if ([UserType.TEACHER, UserType.STUDENT].includes(userType as UserType) && event.route.id?.startsWith("/admin-portal")) {
        return new Response('Redirect', {status: 303, headers: { Location: '/' }})
    }

    return response
}