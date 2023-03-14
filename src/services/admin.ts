import type { Category } from "@models/category";
import type { ForumReport } from "@models/forum";
import type { User } from "@models/user";
import api from "@util/api";
import { sleep } from "./forum";

const baseURL = import.meta.env.VITE_API_HOST

export async function getUser(userType: string, search: string, offset: number, limit: number) {
    const res = await api<{ total: number, data: User[] }>({
        url: `${baseURL}/admin/user?offset=${offset}&limit=${limit}&userType=${userType}${search ? '&search='+search : ''}`,
        method: "GET",
    })
    return res.data
}

export async function createUser(user: User, userType: 'std' | 'tch') {
    user.userType = undefined
    user.userImageURL = undefined
    return await api({
        url: `${baseURL}/admin/user/${userType}`,
        method: "POST",
        data: user,
    })
}

export async function updateUser(user: User) {
    user.userType = undefined
    user.userImageURL = undefined
    return await api({
        url: `${baseURL}/admin/user`,
        method: "PATCH",
        data: user,
    })
}

export async function deleteUser(userUUID: string) {
    return await api({
        url: `${baseURL}/admin/user`,
        method: "DELETE",
        data: { userUUID },
    })
}

export async function getCategories(search: string, offset: number, limit: number) {
    const res = await api<{ total: number, data: Category[] }>({
        url: `${baseURL}/admin/category?offset=${offset}&limit=${limit}${search ? '&search='+search : ''}`,
        method: "GET",
    })
    return res.data
}

export async function upsertCategory(category: Category) {
    return await api({
        url: `${baseURL}/admin/category`,
        method: "PUT",
        data: category,
    })
}

export async function deleteCategory(categoryID: number) {
    return await api({
        url: `${baseURL}/admin/category`,
        method: "DELETE",
        data: { categoryID },
    })
}

export async function getForumReport(offset: number, limit: number) {
    const total = 0;
    const data: ForumReport[] = []
    await sleep()
    return { data, total }
}