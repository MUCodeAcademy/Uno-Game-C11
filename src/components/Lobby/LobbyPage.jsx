import { InputUnstyled } from "@mui/base";
import { Card, FormControl } from "@mui/material";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { Button } from "../../shared/styled/components/Button";
import { Input } from "../../shared/styled/components/Input";
import { theme } from "../../shared/styled/themes/Theme";

function LobbyPage() {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <div>Join a room</div>
                <Button onClick={() => navigate("/GameRoom/static")}>Join static room</Button>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    justifyItems: "center",
                }}
            >
                <div
                    style={{
                        backgroundColor: theme.palette.background.paper,
                        flexBasis: "45%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h4>Select from active games</h4>
                    <div>
                        <div
                            style={{
                                border: "1px solid black",
                                flexBasis: "90%",
                                margin: "5px 0px",
                            }}
                        >
                            Game 1
                        </div>
                        <div>Game 2</div>
                        <div>Game 3</div>
                        <div>Game 4</div>
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: theme.palette.background.paper,
                        flexBasis: "45%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <h4>Create your own game</h4>
                    <div>
                        <label htmlFor="roomname">Room name</label>
                        <Input label="roomname"></Input>
                    </div>
                    <div>
                        <Button>Create Room</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LobbyPage;
