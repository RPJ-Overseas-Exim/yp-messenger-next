import React from "react"
import { Chat } from "@/components/messenger/chats/Chat"
import { GetRequest } from "@/lib/server-actions/request-helpers/GetRequest"
import { Chat as ChatType } from "@/lib/types/dto"

export default async function Chats() {
    let chats: ChatType[] | undefined = undefined;

    try {
        const res = await GetRequest("/chats")
        if (res?.data) chats = res.data
    } catch (e) {
        console.log(e)
    }

    return (
        <main className="h-full">
            {
                chats?.map(chat => {
                    return <Chat key={chat.id} chat={chat} />
                })
            }
        </main>
    )
}
