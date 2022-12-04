import styled from "@emotion/styled";
import { ButtonUnstyled } from "@mui/base";

export const Button = styled(ButtonUnstyled)(({ theme }) => ({
    maxWidth: "100px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    border: "2px solid black",
    borderRadius: "5px",
    ":hover": {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.dark,
    },
    ":active": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
    },
}));
