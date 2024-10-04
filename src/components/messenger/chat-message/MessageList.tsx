"use client"
import React, { useRef } from "react"
import { Message as MessageType } from "@/lib/types/dto"
import { Message } from "./Message";
import { useAtomValue } from "jotai";
import { socketAtom } from "@/lib/jotai/atoms";

export function MessageList({ chatId, messages, userId }: { chatId: string, messages: MessageType[] | undefined, userId: string | undefined }) {
    const socket = useAtomValue(socketAtom)
    const messageListRef = useRef<HTMLElement>(null)

    React.useEffect(() => {
        socket?.emit("joinChat", chatId)
        return () => {
            socket?.emit("leaveChat", chatId)
        }
    }, [socket])

    React.useLayoutEffect(()=>{
        if(messageListRef.current){
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight - messageListRef.current.getBoundingClientRect().height 
        }
    }, [messageListRef.current])

    return (
        <section className="bg-muted max-h-full overflow-auto flex-1" ref={messageListRef}>
            <div className="w-[95%] mx-auto">
                {
                    messages?.map(message => {
                        const time = String(new Date(message.date).toLocaleTimeString())
                        if (message.senderId === userId)
                            return <Message time={time} self={true} key={message.id}>{message.content}</Message>
                        return <Message time={time} key={message.id}>{message.content}</Message>
                    }).reverse()
                }
            </div>
        </section>
    )
}
