import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.config";
import React from "react";
import { useUserContext } from "../../shared/context";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "./UNO.png";
import { getUserInfo } from "../../shared/functions/database";

const provider = new GoogleAuthProvider();

function LoginPage() {
  const { setUser } = useUserContext();
  async function signIn() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      getUserInfo(user);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "10px",
      }}
    >
      <img style={{ width: "200px" }} src={logo} alt="Legally Distinct Logo" />
      <Button
        sx={{ margin: "10px" }}
        variant="contained"
        onClick={() => signIn()}
      >
        <GoogleIcon sx={{ marginRight: "5px" }} /> Log in with Google
      </Button>
      <Typography variant="p" color="secondary" textAlign="center" width="50%">
        Don't have a Google Account? Currently we require one to play but check
        back with us later as we're always adding more functionality
      </Typography>
    </div>
  );
}

export default LoginPage;
