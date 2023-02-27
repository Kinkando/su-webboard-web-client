import type { PageServerLoad } from "./$types";
import { getForumDetail } from '@services/forum';
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url }) => {
    const forumUUID = url.pathname?.substring(url.pathname?.lastIndexOf("/")+1);
    const forumDetail = await getForumDetail(forumUUID)
    if (forumDetail) {
        return { forumDetail }
    }
    throw error(404, "not found")
}