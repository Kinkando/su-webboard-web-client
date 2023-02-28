export interface Category {
    categoryID: number
    categorySeq?: number
    categoryName: string
    categoryHexColor: string
    isActive?: boolean
}

export interface CategoryDetail {
    categoryID: number
    categorySeq?: number
    categoryName: string
    categoryHexColor: string
    latestUpdatedDate: Date
    forumCount: number
}