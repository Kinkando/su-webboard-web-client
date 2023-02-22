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