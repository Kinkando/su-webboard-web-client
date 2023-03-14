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
    latestUpdatedDate: Date
    forumCount: number
}