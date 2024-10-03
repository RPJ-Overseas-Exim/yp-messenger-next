import { cn } from "@/lib/utils";
import React from "react"

export function Spinner({ className }: { className?: string; }) {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className={cn("w-10 h-10 animate-spin", className)}>
            </div>
        </div>
    )
}
