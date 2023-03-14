import { UserType } from "@models/auth"

export function authGuard(routeID: string, userType: string, isValidToken: boolean): string {
    const commonRoutes = ["/login", "/forgot-password"]

    if (routeID?.startsWith("/api") || routeID === '/reset-password') {
        return ""
    }

    if (commonRoutes.includes(routeID) && isValidToken && userType) {
        return userType === UserType.ADMIN ? "/admin-portal" : "/"
    }

    if ((!userType || !isValidToken) && !commonRoutes.includes(routeID)) {
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