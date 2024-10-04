"use client"
import React, { useRef } from "react"
import type { Message as MessageType } from "@/lib/types/dto"
import { Message } from "./Message";
import { useAtomValue } from "jotai";
import { socketAtom } from "@/lib/jotai/atoms";
import { useSearchParams } from "next/navigation";
import { DateLine } from "./DateLine"
import { NewMessageLine } from "./NewMessageLine"

export function MessageList({
    chatId,
    messages,
    userId
}: {
    chatId: string;
    messages: MessageType[] | undefined,
    userId: string | undefined;
}) {
    const socket = useAtomValue(socketAtom)
    const messageListRef = useRef<HTMLElement>(null)
    const lastSeen = useSearchParams().get("lastSeen")

    React.useEffect(() => {
        socket?.emit("joinChat", chatId)
        return () => {
            socket?.emit("leaveChat", chatId)
        }
    }, [socket])

    React.useLayoutEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight - messageListRef.current.getBoundingClientRect().height
        }
    }, [messageListRef.current])

    return (
        <section className="bg-muted max-h-full overflow-auto flex-1" ref={messageListRef}>
            <div className="w-[95%] mx-auto">
                {
                    messages?.map((message, index) => {
                        const date = new Date(message.date)
                        const currentDate = date.toLocaleDateString()
                        let nextDate: string = "";
                        if (index < messages.length - 1) {
                            nextDate = (new Date(messages[index + 1].date)).toLocaleDateString()
                        }
                        const newMessageCondition = (message.senderId !== userId
                            && date.toISOString() > (new Date(lastSeen as string)).toISOString())

                        return (
                            <>
                                {!nextDate.length && <DateLine date={currentDate} />}
                                {nextDate.length > 0 && currentDate > nextDate && <DateLine date={currentDate} />}
                                {newMessageCondition && <NewMessageLine />}

                                {
                                    message.senderId === userId ?
                                        <Message time={date.toLocaleTimeString()} self={true} key={message.id}>{message.content}</Message>
                                        : (
                                            <Message time={date.toLocaleTimeString()} key={message.id}>{message.content}</Message>
                                        )
                                }
                            </>
                        )
                    }).reverse()
                }
            </div>
        </section>
    )
}



