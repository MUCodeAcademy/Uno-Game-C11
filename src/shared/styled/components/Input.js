import InputUnstyled from "@mui/base/InputUnstyled";
import styled from "@emotion/styled";
import { borderColor } from "@mui/system";

export const Input = styled("input")(({ theme }) => ({
    padding: "10px",
    borderRadius: "15px",
    color: theme.palette.secondary.main,
    background: theme.palette.background.default,

    "&:hover": {
        borderColor: theme.palette.primary.main,
    },

    "&:focus": {
        borderColor: theme.palette.primary.main,
        outline: "2px solid" && theme.palette.primary.main,
    },
}));
