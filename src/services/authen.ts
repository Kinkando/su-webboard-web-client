import type { JWT } from "@models/auth";
import type { Cookies } from "@sveltejs/kit";

export async function verifyToken(idToken: string) {
    if (idToken === "admin") {
        const jwt: JWT = {
            accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyVVVJRCI6Inl5eS15eXkteXl5LXl5eSIsInVzZXJUeXBlIjoiYWRtIiwiZXhwIjoiMTY3NzE4NDE5NDQxOSIsImlhdCI6IjE2NzcxNzQxOTQ0MTkifQ.ELQky-tF4luL7naGWmQDwKM6egl1GKK3EljXwIp8tLY",
            refreshToken: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyVVVJRCI6Inl5eS15eXkteXl5LXl5eSIsInVzZXJUeXBlIjoiYWRtIiwiZXhwIjoiMTY3NzE4NDE5NDQxOSIsImlhdCI6IjE2NzcxNzQxOTQ0MTkifQ.ELQky-tF4luL7naGWmQDwKM6egl1GKK3EljXwIp8tLY"
        }
        return jwt
    }
    const jwt: JWT = {
        accessToken: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyVVVJRCI6Inh4eC14eHgteHh4LXh4eCIsInVzZXJUeXBlIjoic3RkIiwiZXhwIjoiMTY3NzE4NDE5NDQxOSIsImlhdCI6IjE2NzcxNzQxOTQ0MTkifQ.3EiB5Zy0ve0P62q6FrNbkIKsUNxGprAEzvOAUmDfaso",
        refreshToken: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyVVVJRCI6Inh4eC14eHgteHh4LXh4eCIsInVzZXJUeXBlIjoic3RkIiwiZXhwIjoiMTY3NzE4NDE5NDQxOSIsImlhdCI6IjE2NzcxNzQxOTQ0MTkifQ.3EiB5Zy0ve0P62q6FrNbkIKsUNxGprAEzvOAUmDfaso",
    }
    return jwt
}

export async function refreshToken(refreshToken: string) {
    const jwt: JWT = {
        accessToken: "",
        refreshToken: "",
    }
    return jwt
}