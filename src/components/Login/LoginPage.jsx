import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.config";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../shared/context";
import { ButtonUnstyled } from "@mui/base";
import { Button } from "../../shared/styled/components/Button";

const provider = new GoogleAuthProvider();

function LoginPage() {
    const { user, setUser } = useUserContext();
    // const navigate = useNavigate();
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {!user && <div>Sign in to play!</div>}
            <Button onClick={() => signIn()}>Sign in with Google</Button>
            {user && <div>Signed in as {user.displayName}</div>}
        </div>
    );
}

export default LoginPage;
