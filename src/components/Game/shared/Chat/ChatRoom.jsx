import { useState, useRef, useEffect } from "react";

import TextField from "@mui/material/TextField";

import { theme } from "../../../../shared/styled/themes/Theme";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import ChatMessageDisplay from "./ChatMessageDisplay";

export function ChatRoom({ messages, sendMessage }) {
    const bottomRef = useRef(null);
    const [body, setBody] = useState("");

    useEffect(() => {
        bottomRef.current?.scrollTo({
            top: bottomRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <>
            <div
                style={{
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "black",
                }}
            >
                <div
                    ref={bottomRef}
                    style={{
                        //   width: "300px",
                        height: "400px",
                        padding: "2px",
                        backgroundColor: theme.palette.secondary.light,
                        border: "1px solid back",
                        overflowY: "scroll",
                    }}
                >
                    {messages.map((v, idx) => (
                        <ChatMessageDisplay key={idx} {...v} />
                    ))}
                </div>
                <form
                    style={{
                        display: "flex",
                        padding: "5px",
                        justifyContent: "space-evenly",
                        backgroundColor: theme.palette.secondary.light,
                    }}
                >
                    <TextField
                        size="small"
                        value={body}
                        variant="standard"
                        color="primary"
                        sx={{
                            alignSelf: "center",
                            backgroundColor: theme.palette.primary.light,
                        }}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <IconButton
                        color="primary"
                        type="submit"
                        variant="filled"
                        disabled={body.length === 0}
                        onClick={(e) => {
                            e.preventDefault();
                            sendMessage(body);
                            setBody("");
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </form>
            </div>
        </>
    );
}

export default ChatRoom;
