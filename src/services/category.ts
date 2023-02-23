import type { Category } from "@models/category";

export async function getAllCategories() {
    const categories: Category[] = [
        {
            categorySeq: 1,
            categoryUUID: "",
            categoryName: "Lifestyle",
            categoryHexColor: "#86D97F",
        },
        {
            categorySeq: 2,
            categoryUUID: "",
            categoryName: "Sport",
            categoryHexColor: "#4C52E0",
        },
        {
            categorySeq: 3,
            categoryUUID: "",
            categoryName: "Food",
            categoryHexColor: "#857800",
        },
        {
            categorySeq: 4,
            categoryUUID: "",
            categoryName: "Education",
            categoryHexColor: "#E04C6F",
        },
        {
            categorySeq: 5,
            categoryUUID: "",
            categoryName: "Coding",
            categoryHexColor: "#48D7E0",
        },
    ]
    await new Promise(resolve => setTimeout(() => resolve(""), 500))
    return categories
}

export async function getCategoryByName(categoryName: string): Promise<Category|undefined> {
    const categories: Category[] = [
        {
            categorySeq: 1,
            categoryUUID: "",
            categoryName: "Lifestyle",
            categoryHexColor: "#86D97F",
        },
        {
            categorySeq: 2,
            categoryUUID: "",
            categoryName: "Sport",
            categoryHexColor: "#4C52E0",
        },
        {
            categorySeq: 3,
            categoryUUID: "",
            categoryName: "Food",
            categoryHexColor: "#857800",
        }
    ]

    switch (categoryName) {
        case "123": return categories[0]
        case "456": return categories[1]
        case "789": return categories[2]
        default: return undefined
    }
}