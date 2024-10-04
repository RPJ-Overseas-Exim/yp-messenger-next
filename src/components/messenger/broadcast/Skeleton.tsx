import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export function BroadcastSkeleton() {
    return (
        <div className="w-full h-full flex flex-col items-center gap-y-4 pt-3">
            <div className="w-full ">
                <Skeleton className="w-[120px] h-[50px] rounded-full m-auto" />
            </div>

            <div className="w-full px-3 flex flex-col gap-y-3">
                <div className="w-full min-h-[250px] h-1/2 rounded-lg">
                    <Skeleton className="w-full h-full rounded-lg" />
                </div>

                <div className="w-full text-lg font-bold">
                    <Skeleton className="w-full h-[60px] rounded-xl" />
                </div>
            </div>

        </div>
    )
}
