import React from "react"
import { Chat } from "@/components/messenger/chats/Chat"
import { GetRequest } from "@/lib/server-actions/request-helpers/GetRequest"
import { Chat as ChatType } from "@/lib/types/dto"
import OnlineCountBox from "@/components/messenger/chats/OnlineCountBox";

export default async function Chats({ searchParams }: { searchParams: { [x: string]: string; } }) {
    let chats: ChatType[] | undefined = undefined;
    let onlineCount = 0;
    const query = searchParams["q"]

    try {
        const res = await GetRequest(`/chats${query ? `?q=${query.toLowerCase()}` : ""}`)
        if (res?.data){
            chats = res.data.chats ?? []
            onlineCount = res.data?.onlineCount ? res.data.onlineCount : 0
        }
        //console.log(res?.data)
    } catch (e) {
        console.log(e)
    }

    return (
        <main className="h-full overflow-auto">
            <OnlineCountBox onlineCount={onlineCount} />

            {
                chats?.map(chat => {
                    return <Chat key={chat.id} chat={chat} />
                })
            }
        </main>
    )
}
