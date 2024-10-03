import React from "react"
import { UserRound } from "lucide-react"
import { cn } from "@/lib/utils";

export function UserIcon({ className, size }: { className?: string; size?: number | string | undefined; }) {
    return (
        <div className={cn("rounded-full p-2 bg-muted border-border", className)}>
            <UserRound size={size || 48} />
        </div>
    )

}
