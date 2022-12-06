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
    const [room, setRoom] = useState([])
    const [err, setErr] = useState(true)
    const [roomNum, setRoomNum] = useState("")
    let x = "hi"
    useEffect(() => {
        socketRef.current = io("localhost:8080", {})
        socketRef.current.on("rooms", (rooms) => {
            setRoom(rooms)
            console.log();
        })



    }, [])
    function roomCheck() {
        console.log(roomNum);
        console.log(room.indexOf(roomNum) == -1);
        if (room.indexOf(roomNum) == false) {
            setErr("Room Already Exists")
        } else {
            navigate(`/GameRoom/${roomNum}`)
        }
    }

    console.log(room);
    return (
        <>
            <div>
                <div>Join a room</div>
                <Button onClick={() => { navigate("/GameRoom/static") }
                }>Join static room</Button>
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

                            <div>{Array.from(room)?.map((rooms) => <div key={rooms}><Button onClick={() => { navigate(`/GameRoom/${rooms}`) }}>{rooms}</Button></div>)}</div>
                        </div>
                        <Button onClick={() => {
                            window.location.reload(false);
                        }}>Refresh</Button>
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
                        <Input label="roomname" value={roomNum} onChange={(e) => setRoomNum(e.target.value)}></Input>
                    </div>
                    <div>
                        <Button onClick={() => {
                            roomCheck()
                        }} >Create Room</Button>
                        <div>{err}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LobbyPage;
