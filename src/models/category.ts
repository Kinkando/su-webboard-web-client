export interface Category {
    categorySeq: number
    categoryUUID: string
    categoryName: string
    categoryHexColor: string
}

export interface CategoryDetail {
    categorySeq: number
    categoryUUID: string
    categoryName: string
    categoryHexColor: string
    latestUpdatedDate: Date
    forumCount: number
}