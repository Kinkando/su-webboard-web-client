import { getAllCategories } from "@services/category";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const categories = await getAllCategories(cookies)
    return { categories }
}