import type { Handle } from "@sveltejs/kit";
import { getUserType } from "@util/token";
import { authGuard } from "@middleware/auth-guard";
import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `{"time": "${info.timestamp}", "level": "${info.level}", "message": {${info.message}}}`)
    ),
    transports: [new transports.Console()]
})

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event)
    const { userType, isValid } = getUserType(event.cookies)

    logger.info(`routeID: ${event?.route?.id}, userType: ${userType}, isValidToken: ${isValid}`)

    const redirectURL = authGuard(event?.route?.id!, userType, isValid)
    if (redirectURL) {
        return new Response('Redirect', {status: 303, headers: { Location: redirectURL }})
    }

    return response
}