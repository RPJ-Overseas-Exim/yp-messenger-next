import { cn } from "@/lib/utils"
import React from "react"

export function Message({children, self, time}:{children:Readonly<React.ReactNode>, self?:boolean, time:string}){
    return (
        <div className="grid grid-cols-1">
            <p className={cn("py-1 px-3 my-2 bg-background w-fit whitespace-pre-wrap max-w-[70%]", self && "justify-self-end rounded-messageSent" || "rounded-messageReceived")}>
                {children}
                <span className="text-xxs leading-none text-muted-foreground flex justify-end">{time}</span>
            </p>
        </div>
    )
}
