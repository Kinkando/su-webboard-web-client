import type { User } from "@models/user";
import { createUser } from "@services/admin";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies, params }) => {
    const body = await request.json()
    const user = body.user as User

    const res = await createUser(user, params.userType as any, cookies)
    return new Response(JSON.stringify(res.data ?? res.error), {status: res.status})
}