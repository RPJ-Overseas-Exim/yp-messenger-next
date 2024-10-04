import React from "react"
import { MessageList } from "@/components/messenger/chat-message/MessageList"
import { MessageBox } from "@/components/messenger/chat-message/MessageBox"
import { Message } from "@/lib/types/dto"
import getMessages from "@/lib/server-actions/getMessages"

export default async function ChatMessages({params}:{params:{[x:string]:string}}) {
            let messages: Message[] | undefined = undefined
            let userId : string | undefined = undefined
            let count: number = 0
            try {
                const res = await getMessages(params?.chatId || "")
                if (res?.data) {
                    messages = res.data.messages
                    userId = res.data.userId
                    count = Number(res.data.count)
                }
            } catch (e) {
                console.log(e)
            }
    return (
        <div className="max-h-full overflow-auto flex flex-col justify-between">
        {
            messages &&
            <MessageList count={count} initialMessages={messages} userId={userId} chatId={params.chatId} />
        }
            <MessageBox chatId={params.chatId} />
        </div>
    )
}
