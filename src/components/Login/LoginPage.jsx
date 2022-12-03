import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.config";
import React from "react";
import { useUserContext } from "../../shared/context";

const provider = new GoogleAuthProvider();

export function LoginPage() {
    const { user, setUser } = useUserContext();
    async function signIn() {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user);
            setUser(user);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div>LoginPage</div>
            <button onClick={() => signIn()}>Sign in with Google</button>
            {!user && <div>No current user</div>}
            {user && <div>Signed in as {user.displayName}</div>}
        </div>
    );
}

export default LoginPage;
