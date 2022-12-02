import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../../../firebase.config";
import useSocketHook from "../../../../shared/hooks/useSocket";
import ChatMessageDisplay from "./ChatMessageDisplay";

export function ChatRoom() {
  const { id } = useParams();
  const bottomRef = useRef(null)
  const [body, setBody] = useState("");
  const { sendMessage, messages } = useSocketHook(id, auth.currentUser?.displayName);
  useEffect(() => {
    bottomRef.current?.scrollTo({
      top: bottomRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages]);

  return (
    <div>
      <div ref={bottomRef} style={{ width: "300px", height: "400px", border: "1px solid back", overflowY: "scroll" }}>
        {messages.map((v, idx) => (
          <ChatMessageDisplay key={idx} {...v} />
        ))}
      </div>
      <form>
        <label htmlFor="msg"></label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)}>
        </textarea>
        <button
          disabled={body.length === 0}
          onClick={() => {
            sendMessage(body);
            setBody("");
          }}
        >Send</button>
      </form>
    </div>
  );
}

export default ChatRoom;
