import { revokeUsers } from "@services/admin";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
    const body = await request.json()

    const res = await revokeUsers(body.userUUIDs, cookies)
    return new Response(JSON.stringify(res.data ?? res.error), {status: res.status})
}
