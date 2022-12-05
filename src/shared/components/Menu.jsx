import React from "react";
import { auth } from "../../firebase.config";
import { useUserContext } from "../context";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuLink } from "../styled/components/MenuLink";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

function Menu() {
  const { clearUser, setUser } = useUserContext();
  auth.onAuthStateChanged((activeUser) => setUser(activeUser));
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-evenly" }}>
        {!auth?.currentUser && (
          <>
            <MenuLink to={"/about"}>About</MenuLink>
            <MenuLink to="/login">Login</MenuLink>
          </>
        )}
        {auth?.currentUser && (
          <>
            <MenuLink to="/lobby">Game Finder</MenuLink>
            <MenuLink>Profile</MenuLink>
            <Button
              color="secondary"
              onClick={() => {
                clearUser();
                auth.signOut();
              }}
            >
              {auth.currentUser?.displayName}
              <LogoutIcon sx={{ paddingLeft: "5px" }} />
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
