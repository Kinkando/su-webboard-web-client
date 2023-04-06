import type { Order } from "@commons/order";
import type { Comment } from "@models/comment";
import type { Document } from "@models/forum";
import api from "@util/api";

const baseURL = import.meta.env.VITE_API_HOST

export async function getComment(forumUUID: string, commentUUID: string) {
    const res = await api<Comment>({
        url: `${baseURL}/comment/${forumUUID}/${commentUUID}`,
        method: "GET",
    })
    return res.data
}

export async function getComments(forumUUID: string, offset: number, limit: number, orderBy: Order) {
    const res = await api<{ total: number, data: Comment[]}>({
        url: `${baseURL}/comment/${forumUUID}?limit${limit}&offset=${offset}&sortBy=createdAt@${orderBy}`,
        method: "GET",
    })
    return res.data
}

export async function upsertComment(forumUUID: string, comment: Comment, files: File[], commentImageUUIDs?: string[], replyCommentUUID?: string) {
    const formData = new FormData();
    const data: any = {
        forumUUID,
        replyCommentUUID,
        commentUUID: comment.commentUUID || undefined,
        commentText: comment.commentText,
    };
    if (commentImageUUIDs) {
        data.commentImageUUIDs = commentImageUUIDs;
    }
    formData.append("data", JSON.stringify(data))
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

export async function reportComment(commentUUID: string, reportReason: string) {
    await api({
        url: `${baseURL}/comment/report/${commentUUID}`,
        method: "POST",
        data: { reportReason }
    })
}