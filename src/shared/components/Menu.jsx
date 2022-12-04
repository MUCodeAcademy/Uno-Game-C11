import React from "react";
import { MenuLink } from "../styled/components/MenuLink";
import { Nav } from "../styled/components/Nav";

function Menu() {
    return (
        <>
            <Nav>
                <MenuLink>Game Finder</MenuLink>
                <MenuLink>Profile</MenuLink>
                <MenuLink>About</MenuLink>
            </Nav>
        </>
    );
}

export default Menu;
