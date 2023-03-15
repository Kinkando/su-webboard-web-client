import { revokeToken } from "@services/authen";
import { json } from "@sveltejs/kit";
import { getToken, revokeToken as revokeCookie } from "@util/cookies";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
    try {
        const token = getToken(cookies)
        if (token) {
            revokeToken(token.accessToken, token.refreshToken)
        }
    } catch (error) {}
    revokeCookie(cookies)
    return json({ message: "success" })
}