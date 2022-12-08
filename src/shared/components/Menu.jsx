import React from "react";
import { auth } from "../../firebase.config";
import { useUserContext } from "../context";
import LogoutIcon from "@mui/icons-material/Logout";
import { MenuLink } from "../styled/components/MenuLink";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";

function Menu() {
    const location = useLocation();
    const { clearUser, setUser } = useUserContext();
    auth.onAuthStateChanged((activeUser) => {
        setUser(activeUser);
    });

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-evenly" }}>
                <MenuLink to={"/about"}>About</MenuLink>
                {!auth?.currentUser && (
                    <>
                        <MenuLink to="/login">Login</MenuLink>
                    </>
                )}
                {auth?.currentUser && (
                    <>
                        <MenuLink to="/lobby">Game Finder</MenuLink>
                        <MenuLink to="/leader-board">Leader Board</MenuLink>
                        <MenuLink
                            style={{ display: "flex", alignItems: "center" }}
                            to={location}
                            className="logout"
                            color="secondary"
                            onClick={() => {
                                clearUser();
                                auth.signOut();
                            }}
                        >
                            {auth.currentUser?.displayName}
                            <LogoutIcon sx={{ paddingLeft: "5px" }} />
                        </MenuLink>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Menu;
