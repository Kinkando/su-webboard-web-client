export interface User {
    userUUID?: string
    userImageURL?: string
    userDisplayName?: string
    userFullName: string
    userEmail: string
    studentID?: string
    userType?: string
    lastLogin?: Date
    isFollowing?: boolean
    isSelf?: boolean
    isNoti?: boolean
    followingUserUUIDs?: string[]
    followerUserUUIDs?: string[]
}

export enum StatusGroup {
    anonymous = "anonymous",
    nominate = "nominate",
}