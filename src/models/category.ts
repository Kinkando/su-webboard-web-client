export interface Category {
    categoryID?: number
    categoryName: string
    categoryHexColor: string
    isActive?: boolean
}

export interface CategoryDetail {
    categoryID: number
    categoryName: string
    categoryHexColor: string
    lastActive: Date
    forumCount: number
    ranking: number
    total: number
}