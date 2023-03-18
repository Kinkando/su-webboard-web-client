import type { Forum, ForumDetail, ForumFilter, ForumRequest, Document } from "@models/forum";
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

export async function getForumListByCategoryID(categoryID: number, offset: number, limit: number) {
    return _getForumList(offset, limit, 'createdAt@DESC', categoryID)
}

export async function getForumListByPopular(offset: number, limit: number) {
    return _getForumList(offset, limit, 'ranking@ASC')
}

export async function searchForum(filter: ForumFilter, offset: number, limit: number) {
    return _getForumList(offset, limit, 'createdAt@DESC', undefined, filter.searchText)
}

async function _getForumList(offset: number, limit: number, sortBy: string, categoryID?: number, search?: string) {
    const res = await api<{ total: number, data: Forum[] }>({
        url: `${baseURL}/forum?limit${limit}&offset=${offset}&sortBy=${sortBy}${categoryID ? `&categoryID=${categoryID}` : ''}${search ? `&search=${search}` : ''}`,
        method: "GET",
    })
    return res.data || { total: 0, data: [] as Forum[] }
}

export async function getForumDetail(forumUUID: string, cookie?: Cookies) {
    const res = await api<ForumDetail>({
        url: `${baseURL}/forum/${forumUUID}`,
        method: "GET",
        cookie,
    })
    return res.data
}

export const sleep = async (time?: number) => {
    if (!time) {
        time = 500
    }
    return await new Promise(resolve => setTimeout(() => resolve(""), time))
}
