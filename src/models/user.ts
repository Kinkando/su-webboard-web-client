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
}

export enum StatusGroup {
    anonymous = "anonymous",
    nominate = "nominate",
}