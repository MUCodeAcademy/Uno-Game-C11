import React from "react";

export function ChatMessageDisplay({ username, body }) {
  return (
    <div style={{ margin: "2px" }}>
      <span style={{ color: 'red', fontWeight: "bold" }}>
        {username ?? "SYSTEM"}
      </span>
      <div>{body}</div>
    </div>
  )
}

export default ChatMessageDisplay;
