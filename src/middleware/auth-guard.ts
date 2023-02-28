import { UserType } from "@models/auth"

export function authGuard(routeID: string, userType: string, isValidToken: boolean): string {
    if (routeID?.startsWith("/api")) {
        return ""
    }

    if (routeID === "/login" && isValidToken && userType) {
        return userType === UserType.ADMIN ? "/admin-portal" : "/"
    }

    if ((!userType || !isValidToken) && routeID !== "/login") {
        return '/login'
    }

    if (userType === UserType.ADMIN && !routeID?.startsWith("/admin-portal")) {
        return '/admin-portal'
    }

    if ([UserType.TEACHER, UserType.STUDENT].includes(userType as UserType) && routeID?.startsWith("/admin-portal")) {
        return '/'
    }

    if (userType !== UserType.TEACHER && routeID === "/announcement") {
        return '/'
    }

    return ""
}