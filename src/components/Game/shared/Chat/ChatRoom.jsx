import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../../../firebase.config";
import { Button } from "../../../../shared/styled/components/Button";
import { ChatTextBox } from "../../../../shared/styled/components/ChatTextBox";
import ChatMessageDisplay from "./ChatMessageDisplay";

export function ChatRoom({ messages, sendMessage }) {
    const { id } = useParams();
    const bottomRef = useRef(null);
    const [body, setBody] = useState("");

    useEffect(() => {
        bottomRef.current?.scrollTo({
            top: bottomRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    return (
        <div style={{ border: "1px solid black" }}>
            <div
                ref={bottomRef}
                style={{
                    width: "300px",
                    height: "400px",
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
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "space-evenly",
                }}
            >
                <label htmlFor="msg"></label>
                <ChatTextBox
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></ChatTextBox>
                <Button
                    disabled={body.length === 0}
                    onClick={() => {
                        sendMessage(body);
                        setBody("");
                    }}
                >
                    Send
                </Button>
            </form>
        </div>
    );
}

export default ChatRoom;
