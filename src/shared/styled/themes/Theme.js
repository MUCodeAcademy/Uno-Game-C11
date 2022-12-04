import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        type: "dark",
        primary: { main: "#EC2127", light: "#EF4D52", dark: "#A5171B" },
        secondary: { main: "#F8DB25", light: "#F9E250", dark: "#AD9919" },
        background: { default: "#4c69f6", paper: "#4c94f6" },
        text: { primary: "fff" },
    },
    // palette: {
    //     type: "theme",
    //     primary: {},
    //     secondary: {},
    //     background: {},
    //     text: {},
    // },
});
