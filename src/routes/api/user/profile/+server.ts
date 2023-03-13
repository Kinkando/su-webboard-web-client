import { getUserProfile } from "@services/user";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ cookies }) => {
    const res = await getUserProfile(cookies)
    return json(res)
}