import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"

const env = import.meta.env;

interface FirebaseConfiguration {
  readonly apiKey: string
  readonly authDomain: string
  readonly projectId: string
  readonly storageBucket: string
  readonly messagingSenderId: string
  readonly appId: string
  readonly measurementId: string
}

const firebaseConfig: FirebaseConfiguration = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
}

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase)
auth.useDeviceLanguage()

export async function signinFirebase(username: string, password: string): Promise<string> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, username, password)
        const idToken = (userCredential as any)._tokenResponse.idToken
        // const email = userCredential.user.email || "";

        return idToken
    } catch(err) {
        return ""
    }
}

export async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email)
}
