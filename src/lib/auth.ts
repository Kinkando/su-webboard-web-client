import { goto } from "$app/navigation"

export const authGuard = () => {
    if (!localStorage.getItem("token")) {
        goto('/login')
    }
}