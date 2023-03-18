import { getCategoryByID } from '@services/category';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
    // const categoryID = Number(url.pathname.substring(url.pathname.lastIndexOf("/")+1));
    // const response = await getCategoryByID(categoryID)
    // if (!response) {
    //     throw error(404, "not found")
    // }
    // return response
}