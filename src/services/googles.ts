import axios from "axios";
import qs from 'qs'

interface GoogleOAuth {
    access_token: string
    expires_in: number
    id_token: string
    refresh_token: string
    scope: string
    token_type: string
}

const googleCredential = {
    redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
}

export const redirectGoogleLogin = (() => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

    const options = {
        redirect_uri: googleCredential.redirectUri,
        client_id: googleCredential.clientId,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
        state: '/',
    };

    return `${rootUrl}?${new URLSearchParams(options).toString()}`;
})();

export const getGoogleOauthToken = async (code: string) => {
    const rootURl = 'https://oauth2.googleapis.com/token';
    // const rootURl = 'https://www.googleapis.com/oauth2/v4/token';

    const options = {
        code,
        client_id: googleCredential.clientId,
        client_secret: googleCredential.clientSecret,
        redirect_uri: googleCredential.redirectUri,
        grant_type: 'authorization_code',
    };

    try {
        const { data } = await axios.post<GoogleOAuth>(
            rootURl,
            qs.stringify(options),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return data;

    } catch (err) {
        return undefined
    }
};