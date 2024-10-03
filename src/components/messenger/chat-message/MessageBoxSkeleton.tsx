import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils";

export function MessageBoxSkeleton({ className }: { className?: string; }) {
    return <Skeleton className={cn("w-4/6 h-[50px] rounded-lg", className)} />
}
