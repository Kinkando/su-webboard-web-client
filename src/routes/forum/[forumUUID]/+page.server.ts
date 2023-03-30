import type { PageServerLoad } from "./$types";
import { getForumDetail } from '@services/forum';
import { error } from "@sveltejs/kit";
import { getAllCategories } from "@services/category";
// import { io } from "socket.io-client";
// import { VITE_API_HOST } from '$env/static/private'
export const prerender = false;
export const ssr = false;
export const load: PageServerLoad = async ({ url, cookies }) => {
    // const forumUUID = url.pathname?.substring(url.pathname?.lastIndexOf("/")+1);
    // const forumDetail = await getForumDetail(forumUUID, cookies)
    // const categories = await getAllCategories(cookies)
    // if (forumDetail) {
    //     const categoryIDs = forumDetail.categories.map(category => category.categoryID)
    //     categories?.forEach(category => {
    //         category.isActive = categoryIDs.includes(category.categoryID);
    //     })
    //     return { forumDetail, categories }
    // }
    // throw error(404, "not found")
    // return {
    //     socket: io(VITE_API_HOST)
    // }
}