import { TokenType } from "@models/auth";
import { verifyToken } from "@services/authen";
import { json } from "@sveltejs/kit";
import { setToken } from "@util/token";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
    const body = await request.json()
    const idToken = body.idToken

    const jwt = await verifyToken(idToken)
    if (jwt) {
        setToken(cookies, jwt.accessToken, jwt.refreshToken)
        return json({ message: "success" })
    }
    return json({ error: "unable to verify firebase token" })
}