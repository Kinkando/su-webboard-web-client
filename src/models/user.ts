export interface User {
    userUUID?: string
    userImageURL?: string
    userDisplayName?: string
    userFullName: string
    userEmail: string
    studentID?: string
    isAnonymous?: boolean
    userType?: string
    lastLogin?: Date
    followerUserUUIDs?: string[] // ผู้ติดตาม
    followingUserUUIDs?: string[] // กำลังติดตาม
}

export enum StatusGroup {
    anonymous = "anonymous",
    nominate = "nominate",
}