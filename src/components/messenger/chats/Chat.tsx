import React from "react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { UserIcon } from "@/components/messenger/UserIcon"

export function Chat() {
    return (
        <Card className="flex gap-4 border-none shadow-none items-center py-2 w-11/12 mx-auto">
            <CardHeader className="p-0">
                <UserIcon />
            </CardHeader>
            <CardContent className="p-0">
                <CardTitle className="text-lg">Chat Name</CardTitle>
                <p className="text-muted-foreground text-sm">last message</p>
            </CardContent>
        </Card>

    )
}
