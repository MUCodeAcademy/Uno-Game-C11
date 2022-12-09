import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { LibraryMusicRounded } from "@mui/icons-material";
import { theme } from "../../shared/styled/themes/Theme";

export default function GabePopover() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <IconButton aria-describedby={id} color="secondary" onClick={handleClick}>
                <LibraryMusicRounded></LibraryMusicRounded>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
            >
                <Typography sx={{ p: 2 }}>
                    Gabes Music:
                    <br></br>
                    <a
                        href="https://nowhere-noise.bandcamp.com/"
                        target="_blank"
                        style={{ color: theme.palette.secondary.main }}
                    >
                        Nowhere
                    </a>
                    <br></br>
                    <a
                        href="https://gabebierman.bandcamp.com/"
                        target="_blank"
                        style={{ color: theme.palette.secondary.main }}
                    >
                        Gabe Bierman
                    </a>
                    <br></br>
                    <a
                        href="https://runner-ne.bandcamp.com/album/runner"
                        target="_blank"
                        style={{ color: theme.palette.secondary.main }}
                    >
                        runner
                    </a>
                    <br></br>
                    <a
                        href="https://adminadmin-ne.bandcamp.com/track/burn"
                        target="_blank"
                        style={{ color: theme.palette.secondary.main }}
                    >
                        admin admin
                    </a>
                </Typography>
            </Popover>
        </>
    );
}
