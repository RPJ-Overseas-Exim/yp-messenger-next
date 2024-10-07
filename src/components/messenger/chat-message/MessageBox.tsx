"use client"
import React from "react";
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { toast } from "sonner";
import { z } from "zod";
import { useAtomValue } from "jotai";
import { socketAtom } from "@/lib/jotai/atoms";
import { Textarea } from "@/components/ui/textarea";

const messageValidator = z.string().min(1, "").max(1000, "Message Length Cannot be more than 1000 characters")

export function MessageBox({ chatId }: { chatId: string }) {
    const [message, setMessage] = React.useState("")
    const socket = useAtomValue(socketAtom)

    const handleSend = async () => {
        const messageResults = messageValidator.safeParse(message)
        if (messageResults?.error) {
            const errMsg = JSON.parse(messageResults?.error?.message)?.message
            if (errMsg?.length > 0) toast.error(errMsg)
            return
        }
        socket?.emit("sendMessage", { chatId: chatId, message: message })
        setMessage("")
    }
    return (
        <div className="border-t border-border">
            <section className="flex gap-2 items-center w-11/12 mx-auto py-4 ">
                <Textarea className="min-h-12" maxLength={1000} value={message} onChange={(e) => setMessage(e.target.value)} />
                <Button size={"icon"} onClick={handleSend}>
                    <Send size={"20"} />
                </Button>
            </section>
        </div>
    )
}
