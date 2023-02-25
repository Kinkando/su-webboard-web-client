import type { Category } from "@models/category";

export async function getAllCategories() {
    const categories: Category[] = [
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
    await new Promise(resolve => setTimeout(() => resolve(""), 500))
    return categories
}

export async function getCategoryByID(categoryID: number): Promise<Category|undefined> {
    const categories: Category[] = [
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
            categoryID: 999,
            categoryName: "การทำงาน",
            categoryHexColor: "#4569",
        },
    ]

    return categories.find(category => category.categoryID === categoryID)
}