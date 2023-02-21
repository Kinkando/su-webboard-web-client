import type { User } from "@models/user";

export async function getUserProfile(): Promise<User> {
    const user: User = {
        userUUID: "xxx-xxx-xxx-xxx",
        userType: "std",
        userImageURL: "https://ps.w.org/user-avatar-reloaded/assets/icon-128x128.png?rev=2540745"
    }
    return user
}