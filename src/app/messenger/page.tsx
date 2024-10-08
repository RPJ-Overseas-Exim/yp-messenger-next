import React from "react"
import { Chat } from "@/components/messenger/chats/Chat"
import { GetRequest } from "@/lib/server-actions/request-helpers/GetRequest"
import { Chat as ChatType } from "@/lib/types/dto"

export default async function Chats({ searchParams }: { searchParams: { [x: string]: string; } }) {
    let chats: ChatType[] | undefined = undefined;
    const query = searchParams["q"]

    try {
        const res = await GetRequest(`/chats${query ? `?q=${query.toLowerCase()}` : ""}`)
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
