import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const MenuLink = styled(NavLink)(({ theme }) => ({
  flexBasis: "auto",
  padding: "5px",
  textAlign: "center",
  textDecoration: "none",
  border: "1px solid",
  borderColor: theme.palette.primary.main,
  borderRadius: "5px",
  color: theme.palette.secondary.main,
  "&:not(.active):hover, &.logout:hover": {
    color: "white",
  },
  "&.active:not(.logout)": {
    color: "white",
  },
}));
