import { verifyGoogle } from "@services/authen";
import { json } from "@sveltejs/kit";
import { setToken } from "@util/cookies";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
    const body = await request.json()
    const accessToken = body.accessToken

    const jwt = await verifyGoogle(accessToken)
    if (jwt) {
        setToken(cookies, jwt.accessToken, jwt.refreshToken)
        return json(jwt)
    }
    return json({ error: "unable to verify firebase token" })
}