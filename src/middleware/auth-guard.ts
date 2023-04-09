import { UserType } from "@models/auth"

export function authGuard(routeID: string, userType: string, isValidToken: boolean): string {
    const commonRoutes = ["/login", "/forgot-password"]
    const adminRootPath = "/admin-portal"
    const adminRoutes = [`${adminRootPath}`, `${adminRootPath}/category`, `${adminRootPath}/report`, `${adminRootPath}/student`, `${adminRootPath}/teacher`]

    if (routeID?.startsWith("/api") || routeID === '/reset-password') {
        return ""
    }

    if (commonRoutes.includes(routeID) && userType) {
        return userType === UserType.ADMIN ? adminRootPath : "/"
    }

    if (!userType && !commonRoutes.includes(routeID)) {
        return `/login`
    }

    if (userType === UserType.ADMIN && (!routeID?.startsWith(adminRootPath) || !adminRoutes.includes(routeID))) {
        return '/admin-portal'
    }

    if ([UserType.TEACHER, UserType.STUDENT].includes(userType as UserType) && routeID?.startsWith(adminRootPath)) {
        return '/'
    }

    if (userType !== UserType.TEACHER && routeID === "/announcement") {
        return '/'
    }

    return ""
}