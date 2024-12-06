"use client"
import { roleAtom } from "@/lib/jotai/atoms";
import { useAtomValue } from "jotai";
import React from "react"

export default function OnlineCountBox({onlineCount}: {onlineCount: number;}){
    const role = useAtomValue(roleAtom)
    
    return (
        <>
        {role === "admin" && (
            <div className="border border-border text-green-600 text-center font-bold whitespace-nowrap fixed bg-background p-2 right-10 bottom-20 rounded-lg">
                {onlineCount} online
            </div>
        )}
        </>
    )
}
