import React from "react";
import { auth } from "../../firebase.config";
import { useUserContext } from "../context";
import { Button } from "../styled/components/Button";
import { MenuLink } from "../styled/components/MenuLink";
import { Nav } from "../styled/components/Nav";

function Menu() {
    const { clearUser, setUser } = useUserContext();
    auth.onAuthStateChanged((activeUser) => setUser(activeUser));
    return (
        <>
            <Nav>
                <MenuLink>Game Finder</MenuLink>
                <MenuLink>Profile</MenuLink>
                <MenuLink>About</MenuLink>
                {auth.currentUser && (
                    <div>
                        <div>{auth.currentUser?.displayName}</div>
                        <Button
                            onClick={() => {
                                clearUser();
                                auth.signOut();
                            }}
                        >
                            Sign Out
                        </Button>
                    </div>
                )}
            </Nav>
        </>
    );
}

export default Menu;
