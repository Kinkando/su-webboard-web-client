import type { Forum, ForumDetail, ForumFilter, ForumRequest, Document } from "@models/forum";
import type { Home } from "@models/home";
import type { Cookies } from "@sveltejs/kit";
import api from "@util/api";
import { getCategoryByID } from "./category";

const baseURL = import.meta.env.VITE_API_HOST
const authorImageURL = "https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745";

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
    const res = await api<{ total: number, data: Forum[] }>({
        url: `${baseURL}/forum?limit${limit}&offset=${offset}&categoryID=${categoryID}`,
        method: "GET",
    })
    return res.data || { total: 0, data: [] as Forum[] }
}

export async function getForumListByPopular(offset: number, limit: number) {
    const res = await api<{ total: number, data: Forum[] }>({
        url: `${baseURL}/forum?limit${limit}&offset=${offset}&sortBy=ranking@ASC`,
        method: "GET",
    })
    return res.data || { total: 0, data: [] as Forum[] }
}

// Mock
export async function searchForum(filter: ForumFilter, offset: number, limit: number) {
    const data: Forum[] = [];
    const total = 97;

    const category1 = await getCategoryByID(1)
    const category2 = await getCategoryByID(2)

    const forum: Forum = {
        forumUUID: "xxx-xxx-xxx-xxx",
        title: "ค้นหากระทู้อยู่ล่ะสิ หึๆ แต่ไม่เจอหรอก เอาไปซะ กระทู้ทิพย์",
        authorUUID: "yyy-yyy-yyy-yyy",
        authorName: "Kook Kai",
        authorImageURL,
        categories: [ category1!, category2! ],
        commentCount: 123,
        likeCount: 9999,
        createdAt: new Date(),
    }

    for(let i=offset; i<Math.min(total, offset+limit); i++) {
        data.push(forum)
    }

    await sleep()
    return { data, total }
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
