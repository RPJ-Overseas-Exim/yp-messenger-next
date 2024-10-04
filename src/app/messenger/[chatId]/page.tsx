import React from "react"
import { MessageList } from "@/components/messenger/chat-message/MessageList"
import { MessageBox } from "@/components/messenger/chat-message/MessageBox"
import { GetRequest } from "@/lib/server-actions/request-helpers/GetRequest"
import { Message } from "@/lib/types/dto"

export default async function ChatMessages({ params }: { params: { [x: string]: string } }) {
    let messages: Message[] | undefined = undefined
    let userId: string | undefined = undefined
    try {
        const res = await GetRequest("/messages/" + params?.chatId)
        if (res?.data) {
            messages = res.data.messages
            userId = res.data.userId
        }
    } catch (e) {
        console.log(e)
    }

    return (
        <div className="max-h-full overflow-auto flex flex-col justify-between">
            <MessageList messages={messages} userId={userId} chatId={params.chatId} />
            <MessageBox chatId={params.chatId} />
        </div>
    )
}
