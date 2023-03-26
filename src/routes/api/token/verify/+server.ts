import { verifyToken } from "@services/authen";
import { json } from "@sveltejs/kit";
import { setToken } from "@util/cookies";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
    const body = await request.json()
    const idToken = body.idToken

    const res = await verifyToken(idToken)
    if (res && res.data) {
        setToken(cookies, res.data.accessToken, res.data.refreshToken)
        return json(res.data)
    }
    return json({ error: "unable to verify firebase token" })
}