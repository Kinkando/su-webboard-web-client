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
    await api({
        url: `${baseURL}/admin/user/${userType}`,
        method: "POST",
        data: user,
    })
}

export async function updateUser(user: User) {
    user.userType = undefined
    user.userImageURL = undefined
    await api({
        url: `${baseURL}/admin/user`,
        method: "PATCH",
        data: user,
    })
}

export async function deleteUser(userUUID: string) {
    await api({
        url: `${baseURL}/admin/user`,
        method: "DELETE",
        data: { userUUID },
    })
}

export async function getForumReport(offset: number, limit: number) {
    const total = 0;
    const data: ForumReport[] = []
    await sleep()
    return { data, total }
}

export async function getCategories(offset: number, limit: number) {
    const total = 5;
    const data: Category[] = [
        {
            categoryID: 1,
            categoryName: "ชีวิตประจำวัน",
            categoryHexColor: "#86D97F",
        },
        {
            categoryID: 2,
            categoryName: "กีฬา",
            categoryHexColor: "#4C52E0",
        },
        {
            categoryID: 3,
            categoryName: "อาหาร",
            categoryHexColor: "#857800",
        },
        {
            categoryID: 4,
            categoryName: "การศึกษา",
            categoryHexColor: "#E04C6F",
        },
        {
            categoryID: 5,
            categoryName: "โปรแกรมมิ่ง",
            categoryHexColor: "#48D7E0",
        },
    ]
    await sleep()
    return { data, total }
}