import type { User } from "@models/user";
import { deleteUsers, getUsers, updateUser } from "@services/admin";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ cookies, url }) => {
    const userType = url.searchParams.get('userType')!
    const search = url.searchParams.get('search')!
    const limit = Number(url.searchParams.get('limit')!)
    const offset = Number(url.searchParams.get('offset')!)

    const res = await getUsers(userType, search, offset, limit, cookies)
    return json(res)
}

export const PATCH: RequestHandler = async ({ request, cookies }) => {
    const body = await request.json()
    const user = body.user as User

    const res = await updateUser(user, cookies)
    return new Response(JSON.stringify(res.data ?? res.error), {status: res.status})
}

export const DELETE: RequestHandler = async ({ request, cookies }) => {
    const body = await request.json()

    const res = await deleteUsers(body.userUUIDs, cookies)
    return new Response(JSON.stringify(res.data ?? res.error), {status: res.status})
}
