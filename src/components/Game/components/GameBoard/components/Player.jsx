import React from "react";
import playerNameCard from "./cards/player_name.png";
import Typography from "@mui/material/Typography";
import Crown from "./Crown";
import CodeIcon from "@mui/icons-material/Code";

function Player({ playerName, numCards, isHost, isDev }) {
    return (
        <div
            style={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
                width: "100px",
                padding: "2px",
            }}
        >
            <Typography
                textAlign="center"
                height="15px"
                paddingBottom="5px"
                lineHeight="15px"
                color="secondary"
            >
                {isHost && <Crown />}
                {isDev && <CodeIcon style={{ height: "15px" }} />}
            </Typography>
            <Typography fontSize="12px" color="secondary">
                {playerName}
            </Typography>
            <div
                style={{
                    backgroundImage: `url(${playerNameCard})`,
                    backgroundRepeat: "no-repeat",
                    height: "100px",
                    backgroundSize: "75px 100px",
                    backgroundPosition: "center center",
                    textAlign: "center",
                }}
            >
                <Typography
                    width="50px"
                    fontSize="16px"
                    lineHeight="1"
                    margin="30px auto"
                    textAlign="center"
                    color="primary"
                >
                    {numCards} cards
                </Typography>
            </div>
        </div>
    );
}

export default Player;
