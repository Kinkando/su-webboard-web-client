import type { PageServerLoad } from "./$types";
import { getAnnouncementDetail } from '@services/announcement';
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url, cookies }) => {
    const announcementUUID = url.pathname?.substring(url.pathname?.lastIndexOf("/")+1);
    const announcement = await getAnnouncementDetail(announcementUUID, cookies)
    if (announcement) {
        return { announcement }
    }
    throw error(404, "not found")
}