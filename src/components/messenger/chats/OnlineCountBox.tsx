"use client"
import React from "react"

export default function OnlineCountBox({onlineCount}: {onlineCount: number;}){
    
    return (
        <div className="border border-border text-green-600 text-center font-bold whitespace-nowrap fixed bg-background p-2 right-10 bottom-20 rounded-lg">
            {onlineCount} online
        </div>
    )
}
