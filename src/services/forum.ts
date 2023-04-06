import { Field, Order } from "@commons/order";
import type { Forum, ForumDetail, ForumRequest, Document } from "@models/forum";
import type { Home } from "@models/home";
import type { Cookies } from "@sveltejs/kit";
import api from "@util/api";

const baseURL = import.meta.env.VITE_API_HOST

export async function getHomeData(): Promise<Home> {
    const res = await api<Home>({
        url: `${baseURL}/home`,
        method: "GET",
    })
    return res.data!
}

export async function upsertForum(forum: ForumRequest, files: File[]) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(forum))
    if (files) {
        for(let file of files) {
            formData.append("files", file)
        }
    }
    return await api<{ forumUUID: string, documents: Document[] }>({
        url: `${baseURL}/forum`,
        method: "PUT",
        data: formData,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
}

export async function deleteForum(forumUUID: string) {
    return await api({
        url: `${baseURL}/forum`,
        method: "DELETE",
        data: { forumUUID },
    })
}

export async function likeForum(forumUUID: string, isLike: boolean) {
    return await api({
        url: `${baseURL}/forum/like`,
        method: "PATCH",
        data: { forumUUID, isLike },
    })
}

export async function favoriteForum(forumUUID: string, isFavorite: boolean) {
    return await api({
        url: `${baseURL}/forum/favorite`,
        method: "PATCH",
        data: { forumUUID, isFavorite },
    })
}

export async function getForumListByCategoryID(categoryID: number, offset: number, limit: number) {
    return _getForumList(offset, limit, `${Field.CreatedAt}@${Order.DESC}`, { categoryID })
}

export async function getForumListByPopular(offset: number, limit: number) {
    return _getForumList(offset, limit, `${Field.Ranking}@${Order.DESC}`)
}

export async function getForumListByUserUUID(offset: number, limit: number, userUUID: string) {
    return _getForumList(offset, limit, `${Field.CreatedAt}@${Order.DESC}`, { userUUID })
}

export async function getForumListByFavoriteUserUUID(offset: number, limit: number, favoriteUserUUID: string) {
    return _getForumList(offset, limit, `${Field.CreatedAt}@${Order.DESC}`, { favoriteUserUUID })
}

export async function searchForum(search: string, sortBy: string, offset: number, limit: number) {
    return _getForumList(offset, limit, sortBy, { search })
}

async function _getForumList(offset: number, limit: number, sortBy: string, query?: { categoryID?: number, search?: string, userUUID?: string, favoriteUserUUID?: string }) {
    const queryString = `${query?.categoryID ? `&categoryID=${query.categoryID}` : ''}${query?.search ? `&search=${query.search}` : ''}${query?.userUUID ? `&userUUID=${query.userUUID}` : ''}${query?.favoriteUserUUID ? `&favoriteUserUUID=${query.favoriteUserUUID}` : ''}`
    const res = await api<{ total: number, data: Forum[] }>({
        url: `${baseURL}/forum?limit=${limit}&offset=${offset}&sortBy=${sortBy}${queryString}`,
        method: "GET",
    })
    return res.data || { total: 0, data: [] as Forum[] }
}

export async function getForumDetail(forumUUID: string, cookies?: Cookies) {
    const res = await api<ForumDetail>({
        url: `${baseURL}/forum/${forumUUID}`,
        method: "GET",
        cookies,
    })
    return res.data
}

export async function reportForum(forumUUID: string, reportReason: string) {
    return await api({
        url: `${baseURL}/forum/report/${forumUUID}`,
        method: "POST",
        data: { reportReason }
    })
}