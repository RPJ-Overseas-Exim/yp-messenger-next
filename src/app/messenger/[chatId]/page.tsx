import React from "react"
import { MessageList } from "@/components/messenger/chat-message/MessageList"
import { MessageBox } from "@/components/messenger/chat-message/MessageBox"

export default function ChatMessages() {
    return (
        <div className="max-h-full overflow-auto flex flex-col justify-between">
            <MessageList />
            <MessageBox />
        </div>
    )
}
