export interface User {
    userUUID?: string
    userImageURL?: string
    userDisplayName: string
    userFullName: string
    userEmail: string
    studentID?: string
    isAnnonymous: boolean
    userType?: string
}