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
    const categories = await getAllCategoryDetails()
    return categories.find(category => category.categoryID === categoryID)
}

export async function getAllCategoryDetails(): Promise<CategoryDetail[]> {
    // mock up
    const categories = await getAllCategories()
    const categoriesDetail = categories?.map(category => {
        return {
            categoryID: category.categoryID,
            categoryName: category.categoryName,
            categoryHexColor: category.categoryHexColor,
            forumCount: Math.floor(Math.random() * 1000),
            lastActive: new Date(),
        } as CategoryDetail
    }) || []
    return categoriesDetail
}