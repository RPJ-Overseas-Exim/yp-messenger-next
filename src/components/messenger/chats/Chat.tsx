"use client"
import React from "react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { UserIcon } from "@/components/messenger/UserIcon"
import Link from "next/link"
import { Chat as ChatType } from "@/lib/types/dto"
import { useAtomValue } from "jotai"
import { roleAtom } from "@/lib/jotai/atoms"

export function Chat({ chat }: { chat: ChatType | undefined }) {
    const role = useAtomValue(roleAtom)
    const name = role === "admin" ? chat?.memberTwo : chat?.memberOne
    const newMessage = chat !== undefined && chat?.lastSeen < chat?.lastMessageDate

    const getLastMessage = (lastMessage?: string) => {
        if (lastMessage && lastMessage.length > 35){
            return lastMessage.slice(0, 35) + "..."
        }
        return lastMessage
    }

    return (
        <Link href={`/messenger/${chat?.id}?name=${name}&lastSeen=${chat?.lastSeen}`} className="block active:bg-muted">
            <Card className="flex gap-4 border-none shadow-none items-center bg-transparent py-2 w-11/12 mx-auto">
                <CardHeader className="p-0 bg-transparent">
                    <UserIcon />
                </CardHeader>
                <CardContent className="p-0 flex items-center w-full justify-between bg-transparent">
                    <div >
                        <CardTitle className="text-lg">{name}</CardTitle>
                        <p className="text-muted-foreground text-sm">{getLastMessage(chat?.lastMessage)|| "No Messages, Say Hi!"}</p>
                    </div>

                    {/* green dot animation */}
                    {newMessage && <div className="relative">
                        <div className=" absolute top-0 left-0 animate-ping h-3 w-3 bg-green-500 rounded-full"></div>
                        <div className="relative h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>}

                </CardContent>
            </Card>
        </Link>
    )
}
