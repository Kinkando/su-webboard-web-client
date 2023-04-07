import { writable } from "svelte/store";

export interface User {
    socketIDs: string[]
    userUUID: string
    userType: string
    userDisplayName: string
    userFullName: string
    userImageURL: string
    studentID?: string
}

export default writable<User[]>()