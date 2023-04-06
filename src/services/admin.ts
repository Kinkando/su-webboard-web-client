import type { Category } from "@models/category";
import type { Report, ReportDetail, ReportStatus } from "@models/report";
import type { User } from "@models/user";
import type { Cookies } from "@sveltejs/kit";
import api from "@util/api";

const baseURL = import.meta.env.VITE_API_HOST

export async function getUsers(userType: string, search: string, offset: number, limit: number, sortBy?: string) {
    const res = await api<{ total: number, data: User[] }>({
        url: `${baseURL}/admin/user?offset=${offset}&limit=${limit}&userType=${userType}${search ? '&search='+search : ''}${queryParams('sortBy', sortBy)}`,
        method: "GET",
    })
    return res.data
}

export async function createUser(user: User, userType: 'std' | 'tch', cookies?: Cookies) {
    user.userType = undefined
    user.userImageURL = undefined
    return await api({
        url: `${baseURL}/admin/user/${userType}`,
        method: "POST",
        data: user,
        cookies,
    })
}

export async function updateUser(user: User, cookies?: Cookies) {
    user.userType = undefined
    user.userImageURL = undefined
    return await api({
        url: `${baseURL}/admin/user`,
        method: "PATCH",
        data: user,
        cookies,
    })
}

export async function deleteUsers(userUUIDs: string[], cookies?: Cookies) {
    return await api({
        url: `${baseURL}/admin/user`,
        method: "DELETE",
        data: { userUUIDs },
        cookies,
    })
}

export async function revokeUsers(userUUIDs: string[], cookies?: Cookies) {
    return await api({
        url: `${baseURL}/admin/user/revoke`,
        method: "POST",
        data: { userUUIDs },
        cookies,
    })
}

export async function getCategories(search: string, offset: number, limit: number, sortBy?: string) {
    const res = await api<{ total: number, data: Category[] }>({
        url: `${baseURL}/admin/category?offset=${offset}&limit=${limit}${search ? '&search='+search : ''}${queryParams('sortBy', sortBy)}`,
        method: "GET",
    })
    return res.data
}

export async function upsertCategory(category: Category, cookies?: Cookies) {
    return await api({
        url: `${baseURL}/admin/category`,
        method: "PUT",
        data: category,
        cookies,
    })
}

export async function deleteCategories(categoryIDs: number[], cookies?: Cookies) {
    return await api({
        url: `${baseURL}/admin/category`,
        method: "DELETE",
        data: { categoryIDs },
        cookies,
    })
}

export async function getReports(search: string, offset: number, limit: number, sortBy: string, filter?: {reportStatus: string, type: string}) {
    const res = await api<{ total: number, data: Report[] }>({
        url: `${baseURL}/admin/report?offset=${offset}&limit=${limit}${search ? '&search='+search : ''}${queryParams('sortBy', sortBy)}${queryParams('reportStatus', filter?.reportStatus)}${queryParams('type', filter?.type)}`,
        method: "GET",
    })
    return res.data
}

export async function getReportDetail(reportUUID: string) {
    return await api<ReportDetail>({
        url: `${baseURL}/admin/report/${reportUUID}`,
        method: "GET",
    })
}

export async function updateReportStatus(reportUUID: string, reportStatus: ReportStatus) {
    return await api({
        url: `${baseURL}/admin/report/${reportUUID}/${reportStatus}`,
        method: "PATCH",
    })
}

export async function deleteReport(reportUUIDs: string[]) {
    return await api({
        url: `${baseURL}/admin/report`,
        method: "DELETE",
        data: { reportUUIDs },
    })
}

const queryParams = (key: string, value?: any): string => {
    if (value?.length > 0) {
        return `&${key}=${value}`
    }
    return ""
}