import { cn } from "@/lib/utils";
import React from "react"

export function Spinner({ className }: { className?: string; }) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className={cn("w-10 h-10 animate-spin border-4 border-t-amber-500 rounded-full", className)}>
            </div>
        </div>
    )
}
