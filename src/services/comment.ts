import type { Comment } from "@models/comment";
import api from "@util/api";

const baseURL = import.meta.env.VITE_API_HOST

export async function getComments(forumUUID: string, offset: number, limit: number) {
    const res = await api<{ total: number, data: Comment[]}>({
        url: `${baseURL}/comment/${forumUUID}?limit${limit}&offset=${offset}`,
        method: "GET",
    })
    return res.data
}