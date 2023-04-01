import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    confirmPasswordReset,
    checkActionCode,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    signInWithPopup,
    GoogleAuthProvider,
    deleteUser,
    createUserWithEmailAndPassword,
    type User,
} from "firebase/auth"
import auth from "@util/firebase"

export async function signinFirebase(email: string, password: string): Promise<string> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const idToken = (userCredential as any)._tokenResponse.idToken
        // const email = userCredential.user.email || "";

        return idToken
    } catch(err) {
        return ""
    }
}

export async function sendResetPassword(email: string) {
    await sendPasswordResetEmail(auth, email)
}

export async function resetPassword(oobCode: string, password: string) {
    await confirmPasswordReset(auth, oobCode, password)
}

export async function getEmail(oobCode: string) {
    const res = await checkActionCode(auth, oobCode)
    return res?.data?.email
}

export async function changePassword(email: string, oldPassword: string, newPassword: string) {
    if (auth.currentUser) {
        try {
            const credential = EmailAuthProvider.credential(email, oldPassword)
            await reauthenticateWithCredential(auth.currentUser, credential)
            await updatePassword(auth.currentUser, newPassword)
            return true
        } catch (error) {
            return false
        }
    }
    return false
}

export async function signInGoogle() {
    const provider = new GoogleAuthProvider()
    const response = await signInWithPopup(auth, provider)
    if (response?.user) {
        return response.user
    }
}

export async function deleteUserFirebase(user: User) {
    await deleteUser(user)
}

export async function createUserFirebase(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password)
}
