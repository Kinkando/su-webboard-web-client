import { getCategoryByName } from '@services/category';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    const categoryName = url.pathname.substring(url.pathname.lastIndexOf("/")+1).toLowerCase().replaceAll("-", " ").replaceAll("%20", " ")
    const response = await getCategoryByName(categoryName)
    if (!response) {
        throw error(404, "not found")
    }
    return response
}