import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function ChatListSkeleton() {
    return (
        <div className="w-full h-[100px] rounded-lg flex flex-row items-center gap-x-4" >
            <Skeleton className="w-[60px] h-[60px] rounded-full" />

            <div className="flex flex-col gap-y-2 flex-1">
                <Skeleton className="w-[100px] h-[25px] rounded-full" />
                <Skeleton className="w-11/12 h-[15px] rounded-full" />
            </div>
        </div>
    )
}
