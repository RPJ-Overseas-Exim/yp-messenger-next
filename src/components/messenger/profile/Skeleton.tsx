import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

export function ProfileSkeleton() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-y-4">
                <Skeleton className="w-[100px] h-[100px] rounded-full" />

                <div className="flex flex-col gap-y-2">
                    <Skeleton className="w-[200px] h-[30px] rounded-lg" />
                    <Skeleton className="w-[200px] h-[30px] rounded-lg" />
                </div>

                <div>
                    <Skeleton className="w-[150px] h-[50px] rounded-full" />
                </div>
            </div>

        </div>
    )
}
