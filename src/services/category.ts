import type { Category, CategoryDetail } from "@models/category";
import api from "@util/api";

const baseURL = import.meta.env.VITE_API_HOST

export async function getAllCategories() {
    const res = await api<Category[]>({
        url: `${baseURL}/category`,
        method: "GET",
    })
    return res.data
}

export async function getCategoryByID(categoryID: number): Promise<Category|undefined> {
    const categories = await getAllCategoryDetails()
    return categories.find(category => category.categoryID === categoryID)
}

export async function getAllCategoryDetails(): Promise<CategoryDetail[]> {
    const categories: CategoryDetail[] = [
        {
            categoryID: 1,
            categoryName: "ชีวิตประจำวัน",
            categoryHexColor: "#86D97F",
            forumCount: 123,
            latestUpdatedDate: new Date(),
        },
        {
            categoryID: 2,
            categoryName: "กีฬา",
            categoryHexColor: "#4C52E0",
            forumCount: 456,
            latestUpdatedDate: new Date(),
        },
        {
            categoryID: 3,
            categoryName: "อาหาร",
            categoryHexColor: "#857800",
            forumCount: 789,
            latestUpdatedDate: new Date(),
        },
        {
            categoryID: 4,
            categoryName: "การศึกษา",
            categoryHexColor: "#E04C6F",
            forumCount: 159,
            latestUpdatedDate: new Date(),
        },
        {
            categoryID: 5,
            categoryName: "โปรแกรมมิ่ง",
            categoryHexColor: "#48D7E0",
            forumCount: 357,
            latestUpdatedDate: new Date(),
        },
        {
            categoryID: 6,
            categoryName: "เกม",
            categoryHexColor: "#994a",
            forumCount: 321,
            latestUpdatedDate: new Date(),
        },
        {
            categoryID: 7,
            categoryName: "การทำงาน",
            categoryHexColor: "#abcd",
            forumCount: 612,
            latestUpdatedDate: new Date(),
        },
        {
            categoryID: 8,
            categoryName: "การท่องเที่ยว",
            categoryHexColor: "#1296",
            forumCount: 253,
            latestUpdatedDate: new Date(),
        },
        {
            categoryID: 9,
            categoryName: "การทำอาหาร",
            categoryHexColor: "#4685",
            forumCount: 999,
            latestUpdatedDate: new Date(),
        },
        {
            categoryID: 10,
            categoryName: "การอ่าน",
            categoryHexColor: "#a9ff",
            forumCount: 111,
            latestUpdatedDate: new Date(),
        },
    ]
    return categories
}