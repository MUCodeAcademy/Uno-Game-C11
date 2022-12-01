import { useContext, createContext, useState } from "react";

const MessageContext = useContext;

export function useMessageContext() {
    return useContext(MessageContext);
}
