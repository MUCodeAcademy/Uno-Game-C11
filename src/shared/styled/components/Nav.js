import styled from "@emotion/styled";

export const Nav = styled("nav")(({ theme }) => ({
    width: "auto",
    display: "flex",
    border: "1px solid black",
    background: theme.palette.primary.main,
    borderRadius: "5px",
    justifyContent: "space-around",
    verticalAlign: "middle",
    minHeight: "50px",
    padding: "10px",
    margin: "10px",
}));
