import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getEmail } from "@services/firebase";
import { HttpStatusCode } from "axios";

export const load: PageServerLoad = async ({ url }) => {
    try {
        const oobCode = url.searchParams.get('oobCode')!
        const email = await getEmail(oobCode)
        if (!email) {
            throw Error("invalid code")
        }
        return { email }
    } catch (error) {
        throw redirect(HttpStatusCode.Found, '/login')
    }
}