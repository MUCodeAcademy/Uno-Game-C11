import { InputUnstyled } from "@mui/base";
import { Card, FormControl } from "@mui/material";
import { useEffect, useRef } from "react";
import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase.config";
import useSocketHook from "../../shared/hooks/useSocket";
import { Button } from "../../shared/styled/components/Button";
import { Input } from "../../shared/styled/components/Input";
import { theme } from "../../shared/styled/themes/Theme";
import io from "socket.io-client";
import { useState } from "react";

function LobbyPage() {
    const navigate = useNavigate();
    const { roomID } = useParams();
    const socketRef = useRef(null);
    const [room, setRoom] = useState("hi")
    useEffect(() => {
        socketRef.current = io("localhost:8080", {
            query: {
                username: auth.currentUser?.displayName,
                roomID: roomID,
                uid: auth.currentUser?.uid,
            },
        });
        socketRef.current.on("rooms", (rooms) => {
            console.log("skgb")
            setRoom(rooms)
        })



    }, [])

    console.log(room)
    return (
        <>
            <div>
                <div>Join a room</div>
                <Button onClick={() => { navigate("/GameRoom/static") }
                }>Join static room</Button>
            </div>
            <div>{room?.map((rooms) => <li key={rooms}>{rooms}</li>)}</div>
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
                            <Button onClick={() => navigate("/GameRoom/static1")}>Game 1</Button>
                        </div>
                        <div><Button onClick={() => navigate("/GameRoom/static2")}>Game 2</Button></div>
                        <div><Button onClick={() => navigate("/GameRoom/static3")}>Game 3</Button></div>
                        <div><Button onClick={() => navigate("/GameRoom/static4")}>Game 4</Button></div>
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
