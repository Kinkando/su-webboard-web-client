import type { PageServerLoad } from "./$types";
import { getAnnouncementDetail } from '@services/forum';
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url }) => {
    const forumUUID = url.pathname?.substring(url.pathname?.lastIndexOf("/")+1);
    const announcement = await getAnnouncementDetail(forumUUID)
    if (announcement) {
        return { announcement }
    }
    throw error(404, "not found")
}