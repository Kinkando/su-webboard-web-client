import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getEmail } from "@services/firebase";
import HTTP from "@commons/http";

export const load: PageServerLoad = async ({ url }) => {
    const oobCode = url.searchParams.get('oobCode')!
    const email = await getEmail(oobCode)
    if (!email) {
        throw error(HTTP.StatusInternalServerError, "request is invalid")
        // redirect(304, '/login')
        // return new Response('Redirect', {status: 303, headers: { Location: '/login' }})
    }
    return { email }
}