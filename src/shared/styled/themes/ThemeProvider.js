import { ThemeProvider } from "@mui/material/styles";

export const ThemeProvider = (props) => {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
