import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    type: "dark",
    primary: { main: "#EC2127", light: "#EF4D52", dark: "#A5171B" },
    secondary: { main: "#F8DB25", light: "#F9E250", dark: "#AD9919" },
    background: { default: "#4c69f6", paper: "#4c94f6" },
    text: { primary: "#ffffff" },
    wild: {
      red: "rgb(234, 50, 60)",
      green: "rgb(51, 152, 75)",
      blue: "rgb(0, 152, 220)",
      yellow: "rgb(255, 200, 37)",
    },
    error: { main: "#ffffff" },
  },
});
