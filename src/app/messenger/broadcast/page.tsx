"use client"
import { Button } from "@/components/ui/button"
import { socketAtom } from "@/lib/jotai/atoms"
import { useAtomValue } from "jotai"
import React, { useState } from "react"
import { toast } from "sonner"

export default function Broadcast() {
    const [message, setMessage] = useState<string>("")
    const socket = useAtomValue(socketAtom)

    const handleBroadcast = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message.length) return toast.warning("Message must contain atleast 1 letter", { position: "top-center" })

        try {
            console.log(message)
            socket?.emit("broadcastToChats", message)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="w-full h-full flex flex-col gap-y-4 pt-3">
            <h2 className="w-full text-center text-xl font-bold" >Broadcast</h2>

            <form
                onSubmit={handleBroadcast}
                className="w-full px-3 flex flex-col gap-y-3"
            >
                <textarea
                    className="w-full min-h-[250px] h-1/2 rounded-lg p-2"
                    name="message"
                    placeholder="Enter your broadcast message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <Button
                    type="submit"
                    className="w-full bg-amber-500 text-lg font-bold"
                >
                    Broadcast Message
                </Button>
            </form>

        </div>
    )
}
