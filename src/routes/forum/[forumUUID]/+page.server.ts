import type { PageServerLoad } from "./$types";
import { getForumDetail } from '@services/forum';
import { error } from "@sveltejs/kit";
import { getAllCategories } from "@services/category";

export const load: PageServerLoad = async ({ url }) => {
    const forumUUID = url.pathname?.substring(url.pathname?.lastIndexOf("/")+1);
    const forumDetail = await getForumDetail(forumUUID)
    const categories = await getAllCategories()
    if (forumDetail) {
        const categoryIDs = forumDetail.categories.map(category => category.categoryID)
        categories.forEach(category => {
            category.isActive = categoryIDs.includes(category.categoryID);
        })
        return { forumDetail, categories }
    }
    throw error(404, "not found")
}