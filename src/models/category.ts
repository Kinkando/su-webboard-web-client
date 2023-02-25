export interface Category {
    categoryID: number
    categorySeq?: number
    categoryName: string
    categoryHexColor: string
}

export interface CategoryDetail {
    categoryID: number
    categorySeq?: number
    categoryName: string
    categoryHexColor: string
    latestUpdatedDate: Date
    forumCount: number
}