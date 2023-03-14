export interface User {
    userUUID?: string
    userImageURL?: string
    userDisplayName?: string
    userFullName: string
    userEmail: string
    studentID?: string
    isAnonymous?: boolean
    userType?: string
}

export enum StatusGroup {
    anonymous = "anonymous",
    nominate = "nominate",
}