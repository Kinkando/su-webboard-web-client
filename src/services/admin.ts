import type { Category } from "@models/category";
import type { ForumReport } from "@models/forum";
import type { User } from "@models/user";
import type { Cookies } from "@sveltejs/kit";
import api from "@util/api";
import { sleep } from "./forum";

const baseURL = import.meta.env.VITE_API_HOST

export async function getUsers(userType: string, search: string, offset: number, limit: number, cookies?: Cookies) {
    const res = await api<{ total: number, data: User[] }>({
        url: `${baseURL}/admin/user?offset=${offset}&limit=${limit}&userType=${userType}${search ? '&search='+search : ''}`,
        method: "GET",
        cookies,
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

export async function getCategories(search: string, offset: number, limit: number, cookies?: Cookies) {
    const res = await api<{ total: number, data: Category[] }>({
        url: `${baseURL}/admin/category?offset=${offset}&limit=${limit}${search ? '&search='+search : ''}`,
        method: "GET",
        cookies,
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

export async function getForumReport(offset: number, limit: number) {
    const total = 0;
    const data: ForumReport[] = []
    await sleep()
    return { data, total }
}