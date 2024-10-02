import React from "react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { UserIcon } from "@/components/messenger/UserIcon"
import Link from "next/link"

export function Chat({ name, lastMessage, chatId }: { name: string, lastMessage?: string, chatId: string }) {
    return (
        <Link href={`/messenger/${chatId}`} className="block active:bg-muted">
            <Card className="flex active:bg-muted gap-4 border-none shadow-none items-center py-2 w-11/12 mx-auto">
                <CardHeader className="p-0">
                    <UserIcon />
                </CardHeader>
                <CardContent className="hover:bg-muted focus:bg-muted p-0">
                    <CardTitle className="text-lg">{name}</CardTitle>
                    <p className="text-muted-foreground text-sm">{lastMessage || "No Messages, Say Hi!"}</p>
                </CardContent>
            </Card>
        </Link>
    )
}
