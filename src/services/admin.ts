import type { Category } from "@models/category";
import type { Report, ReportDetail, ReportStatistic, ReportStatus } from "@models/report";
import type { User } from "@models/user";
import type { Cookies } from "@sveltejs/kit";
import api from "@util/api";

export async function getUsers(userType: string, search: string, offset: number, limit: number, sortBy?: string) {
    const res = await api<{ total: number, data: User[] }>({
        url: `/admin/user?offset=${offset}&limit=${limit}&userType=${userType}${search ? '&search='+search : ''}${queryParams('sortBy', sortBy)}`,
        method: "GET",
    })
    return res.data
}

export async function createUser(user: User, userType: 'std' | 'tch', cookies?: Cookies) {
    user.userType = undefined
    user.userImageURL = undefined
    return await api({
        url: `/admin/user/${userType}`,
        method: "POST",
        data: user,
        cookies,
    })
}

export async function updateUser(user: User, cookies?: Cookies) {
    user.userType = undefined
    user.userImageURL = undefined
    return await api({
        url: `/admin/user`,
        method: "PATCH",
        data: user,
        cookies,
    })
}

export async function deleteUsers(userUUIDs: string[], cookies?: Cookies) {
    return await api({
        url: `/admin/user`,
        method: "DELETE",
        data: { userUUIDs },
        cookies,
    })
}

export async function revokeUsers(userUUIDs: string[], cookies?: Cookies) {
    return await api({
        url: `/admin/user/revoke`,
        method: "POST",
        data: { userUUIDs },
        cookies,
    })
}

export async function getCategories(search: string, offset: number, limit: number, sortBy?: string) {
    const res = await api<{ total: number, data: Category[] }>({
        url: `/admin/category?offset=${offset}&limit=${limit}${search ? '&search='+search : ''}${queryParams('sortBy', sortBy)}`,
        method: "GET",
    })
    return res.data
}

export async function upsertCategory(category: Category, cookies?: Cookies) {
    return await api({
        url: `/admin/category`,
        method: "PUT",
        data: category,
        cookies,
    })
}

export async function deleteCategories(categoryIDs: number[], cookies?: Cookies) {
    return await api({
        url: `/admin/category`,
        method: "DELETE",
        data: { categoryIDs },
        cookies,
    })
}

export async function getReports(search: string, offset: number, limit: number, sortBy: string, filter?: {reportStatus: string, type: string}) {
    const res = await api<{ total: number, data: Report[] }>({
        url: `/admin/report?offset=${offset}&limit=${limit}${search ? '&search='+search : ''}${queryParams('sortBy', sortBy)}${queryParams('reportStatus', filter?.reportStatus)}${queryParams('type', filter?.type)}`,
        method: "GET",
    })
    return res.data
}

export async function getReportDetail(reportUUID: string) {
    return await api<ReportDetail>({
        url: `/admin/report/${reportUUID}`,
        method: "GET",
    })
}

export async function updateReportStatus(reportUUID: string, reportStatus: ReportStatus) {
    return await api({
        url: `/admin/report/${reportUUID}/${reportStatus}`,
        method: "PATCH",
    })
}

export async function deleteReport(reportUUIDs: string[]) {
    return await api({
        url: `/admin/report`,
        method: "DELETE",
        data: { reportUUIDs },
    })
}

export async function getHomeAdminData() {
    const res = await api<ReportStatistic>({
        url: '/admin/home',
        method: "GET",
    })
    return res.data!
}

const queryParams = (key: string, value?: any): string => {
    if (value?.length > 0) {
        return `&${key}=${value}`
    }
    return ""
}