import type { Category, CategoryDetail } from "@models/category";
import type { Cookies } from "@sveltejs/kit";
import api from "@util/api";

const baseURL = import.meta.env.VITE_API_HOST

export async function getAllCategories(cookies?: Cookies) {
    const res = await api<Category[]>({
        url: `${baseURL}/category`,
        method: "GET",
        cookies,
    })
    return res.data
}

export async function getCategoryByID(categoryID: number): Promise<Category|undefined> {
    const res = await api<Category>({
        url: `${baseURL}/category/${categoryID}`,
        method: "GET",
    })
    return res.data
}