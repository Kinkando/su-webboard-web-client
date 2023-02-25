import { UserType } from "@models/auth";
import type { Handle } from "@sveltejs/kit";
import { getUserType } from "@util/token";
import { authGuard } from "./middleware/auth-guard";

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event)
    const { userType, isValid } = getUserType(event.cookies)

    const redirectURL = authGuard(event?.route?.id!, userType, isValid)
    if (redirectURL) {
        return new Response('Redirect', {status: 303, headers: { Location: redirectURL }})
    }

    return response
}