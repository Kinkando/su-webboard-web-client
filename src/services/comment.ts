import type { Comment } from "@models/comment";
import type { Document } from "@models/forum";
import api from "@util/api";

const baseURL = import.meta.env.VITE_API_HOST

export async function getComments(forumUUID: string, offset: number, limit: number) {
    const res = await api<{ total: number, data: Comment[]}>({
        url: `${baseURL}/comment/${forumUUID}?limit${limit}&offset=${offset}`,
        method: "GET",
    })
    return res.data
}

export async function upsertComment(comment: Comment, files: File[]) {
    const formData = new FormData();
    formData.append("data", JSON.stringify(comment))
    if (files) {
        for(let file of files) {
            formData.append("files", file)
        }
    }
    return await api<{ commentUUID: string, documents: Document[] }>({
        url: `${baseURL}/comment`,
        method: "PUT",
        data: formData,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
}

export async function deleteComment(commentUUID: string) {
    return await api({
        url: `${baseURL}/comment`,
        method: "DELETE",
        data: { commentUUID },
    })
}

export async function likeComment(commentUUID: string, isLike: boolean) {
    return await api({
        url: `${baseURL}/comment/like`,
        method: "PATCH",
        data: { commentUUID, isLike },
    })
}