import React from "react"
import { ChatListSkeleton } from "./ChatListSkeleton"

export function ChatsSkeleton() {
    return (
        <div className="w-full h-full max-h-full overflow-auto flex flex-col gap-y-2 p-2 items-center justify-center">
            <ChatListSkeleton />
            <ChatListSkeleton />
            <ChatListSkeleton />
            <ChatListSkeleton />
            <ChatListSkeleton />
            <ChatListSkeleton />
        </div>
    )
}
