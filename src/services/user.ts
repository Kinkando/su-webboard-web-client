import type { User } from "@models/user";

export async function getUserProfile(): Promise<User> {
    const user: User = {
        userDisplayName: "Kook Kai",
        userFullName: "Todsapon Prajin",
        userEmail: "test@email.com",
        userImageURL: "https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745",
        studentID: "620710001",
        isAnnonymous: false
    }
    return user
}

export async function getAvatars(): Promise<string[]> {
    const avartarURLs: string[] = [];

    return avartarURLs
}