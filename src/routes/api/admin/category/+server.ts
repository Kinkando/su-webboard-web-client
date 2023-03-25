import type { Category } from "@models/category";
import { deleteCategories, getCategories, upsertCategory } from "@services/admin";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, cookies }) => {
    const search = url.searchParams.get('search')!
    const limit = Number(url.searchParams.get('limit')!)
    const offset = Number(url.searchParams.get('offset')!)

    const res = await getCategories(search, offset, limit, cookies)
    return json(res)
}

export const PUT: RequestHandler = async ({ request, cookies }) => {
    const body = await request.json()
    const category = body.category as Category

    const res = await upsertCategory(category, cookies)
    return new Response(JSON.stringify(res.data ?? res.error), {status: res.status})
}

export const DELETE: RequestHandler = async ({ request, cookies }) => {
    const body = await request.json()

    const res = await deleteCategories(body.categoryIDs, cookies)
    return new Response(JSON.stringify(res.data ?? res.error), {status: res.status})
}
