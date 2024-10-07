"use client"

import React, { useRef, useState } from "react"
import { Message as MessageType } from "@/lib/types/dto"
import { Message } from "./Message";
import { useAtomValue } from "jotai";
import { socketAtom } from "@/lib/jotai/atoms";
import { Spinner } from "@/components/Spinner";
import getMessages from "@/lib/server-actions/getMessages";
import { useSearchParams } from "next/navigation";
import { DateLine } from "./DateLine"
import { NewMessageLine } from "./NewMessageLine"

export function MessageList({
    chatId,
    initialMessages,
    count,
    userId,
}: {
    chatId: string,
    initialMessages: MessageType[],
    userId: string | undefined,
    count: number
}) {
    const socket = useAtomValue(socketAtom)
    const messageListRef = useRef<HTMLElement>(null)
    const topRef = useRef<HTMLElement>(null)
    const [messages, setMessages] = useState(initialMessages)
    const lastSeen = useSearchParams().get("lastseen")
    const [page, setPage] = useState(0)

    const observeSpinner = () => {
        let locked: boolean = false;

        return (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries

            if (!locked && entry?.isIntersecting && messages.length < count) {
                locked = true
                getMessages(chatId, (page + 1) * 20)
                    .then(response => {
                        const newMessages = response?.data?.messages
                        if (newMessages?.length > 0) {
                            if (messageListRef?.current)
                                messageListRef.current.scrollTop = newMessages.length * 42
                            setMessages((prevMessages) => {
                                return [
                                    ...(prevMessages || []),
                                    ...(newMessages || [])
                                ]
                            })
                            setPage((page) => page + 1)
                            console.log("new messages")
                        }
                    })
                    .catch(e => console.log(e))
            }
        }
    }

    React.useEffect(() => {
        socket?.emit("joinChat", chatId)

        return () => {
            socket?.emit("leaveChat", chatId)
        }
    }, [socket])

    React.useLayoutEffect(() => {
        if (messageListRef?.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight
        }
    }, [])

    React.useEffect(() => {
        const observer = new IntersectionObserver(observeSpinner(), {
            rootMargin: "0px",
            threshold: 0
        })
        if (topRef?.current) {
            observer.observe(topRef.current)
        }
        return () => {
            if (topRef?.current)
                observer.unobserve(topRef.current)
        }
    }, [observeSpinner, topRef?.current])

    React.useEffect(() => {
        if (initialMessages?.[0].content !== messages?.[0].content) {
            setMessages(initialMessages)
            setPage(0)
        }
    }, [initialMessages])

    return (
        <section className="bg-muted max-h-full overflow-auto flex-1" ref={messageListRef}>
            <div className="w-[95%] mx-auto">
                {
                    messages?.length === 0 ? (
                        <p className="flex justify-center my-4 text-amber-500">No messages, Say Hi!</p>
                    ) : (
                        <>
                            <span ref={topRef} className="block">
                                {
                                    count === messages?.length
                                        ? <span className="flex my-2 justify-center text-xs text-muted-foreground">No more messages</span>
                                        : <Spinner className="w-8 h-8 my-4" />
                                }

                            </span>
                            {
                                messages?.map((message, index) => generateMessage(messages, message, index, userId, lastSeen)).reverse()
                            }
                        </>
                    )
                }
            </div >
        </section >
    )
}

const generateMessage = (messages: MessageType[], message: MessageType, index: number, userId: string | undefined, lastSeen: string | null) => {
    const date = new Date(message.date)
    let nDate = new Date(0, 0, 0)
    const lastSeenDate = (new Date(lastSeen as string)).toISOString()

    const currentDate = date.toLocaleDateString()
    let nextDate: string = "";
    if (index < messages.length - 1) {
        nDate = new Date(messages[index + 1].date)
        nextDate = nDate.toLocaleDateString()
    }

    const newMessageCondition = (message.senderId !== userId
        && date.toISOString() > lastSeenDate
        && nDate.toISOString() < lastSeenDate)

    return (
        <div key={message.id}>
            {!nextDate.length && <DateLine date={currentDate} />}
            {nextDate.length > 0 && currentDate > nextDate && <DateLine date={currentDate} />}
            {newMessageCondition && <NewMessageLine />}
            {
                message.senderId === userId
                    ? <Message time={date.toLocaleTimeString()} self={true} >{message.content}</Message>
                    : <Message time={date.toLocaleTimeString()}>{message.content}</Message>
            }
        </div >
    )
}
