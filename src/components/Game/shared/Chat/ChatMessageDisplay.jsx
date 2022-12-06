import React from "react";
import { theme } from "../../../../shared/styled/themes/Theme";

export function ChatMessageDisplay({ username, body }) {
  return (
    <div style={{ margin: "2px" }}>
      <span style={{ color: "red", fontWeight: "bold" }}>
        {username ?? "SYSTEM"}
      </span>
      <div style={{ color: theme.palette.background.default }}>{body}</div>
    </div>
  );
}

export default ChatMessageDisplay;
