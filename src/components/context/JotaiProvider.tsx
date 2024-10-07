"use client"
import { roleAtom, socketAtom } from "@/lib/jotai/atoms"
import { GetRequest } from "@/lib/server-actions/request-helpers/GetRequest"
import { useAtom, useSetAtom } from "jotai"
import { io, Socket } from "socket.io-client"

import { ReactNode, useCallback, useEffect, useState } from "react"

import { Spinner } from "../Spinner"
import { env } from "@/env"
import { ClientToServerEvents, ServerToclientEvents } from "@/lib/types/socket"
import revalPath from "@/lib/server-actions/revalPath"
import { toast } from "sonner"

export function JotaiProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)
    const setRole = useSetAtom(roleAtom)
    const [socket, setSocket] = useAtom(socketAtom)

    const fetchRole = useCallback(async () => {
        try {
            const userData = await GetRequest("/user")
            setRole(() => userData?.user?.role)
            return userData?.accessToken
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }, [setRole])

    const initializeSocket = useCallback((accessToken: string) => {
        const socket: Socket<ServerToclientEvents, ClientToServerEvents> = io(env.NEXT_PUBLIC_API_URL, {
            auth: {
                token: accessToken
            }
        })

        socket?.on("notification", ({ event, message }) => {
            switch (event) {
                case "newMessage":
                    revalPath("/messenger")
                    toast.success("New message", { position: "top-center" })
                    break;
                case "newMessageSent":
                    console.log("revalled")
                    revalPath("/messenger")
                    break;
                case "error":
                    console.log(message)
                    break;
            }
        })

        socket?.on("chatError", (e) => {
            console.log(e)
            console.log("error")
        })

        socket?.on("connect_error", (err) => console.log("connection error: ", err))

        socket?.on("newChatBroadcast", () => {
            revalPath("/messenger")
            toast.success("Broadcast done", { position: "top-center" })
        })

        setSocket(socket)
    }, [setSocket])


    useEffect(() => {
        (async () => {
            const accessToken = await fetchRole()
            initializeSocket(accessToken)
        })()

        return () => {
            socket?.close()
        }
    }, [initializeSocket, fetchRole, socket])

    if (isLoading) return <Spinner className={""} />

    return children
}
