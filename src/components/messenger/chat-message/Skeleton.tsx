import { Skeleton } from "@/components/ui/skeleton"
import React from "react"
import { MessageBoxSkeleton } from "./MessageBoxSkeleton"

export function ChatMessageSkeleton() {
    return (
        <div className="w-full h-full flex flex-col">

            <div className="flex-1 w-full p-3 flex flex-col gap-y-3">
                <MessageBoxSkeleton className={"w-1/3 rounded-messageReceived"} />
                <MessageBoxSkeleton className={"w-4/6 self-end rounded-messageSent"} />
                <MessageBoxSkeleton className={"w-2/3 rounded-messageReceived"} />
                <MessageBoxSkeleton className={"w-3/6 self-end rounded-messageSent"} />
                <MessageBoxSkeleton className={"w-1/4 rounded-messageReceived"} />
            </div>

            <div className="w-full h-[100px] px-3 flex gap-x-2 justify-between">
                <Skeleton className="w-5/6 h-[50px] rounded-lg" />
                <Skeleton className="w-1/6 h-[50px] rounded-lg" />
            </div>
        </div>
    )
}
