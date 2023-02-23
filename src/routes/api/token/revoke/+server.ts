import { json } from "@sveltejs/kit";
import { revokeToken } from "@util/token";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
    revokeToken(cookies)
    return json({ message: "success" })
}