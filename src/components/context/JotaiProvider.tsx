"use client"
import { roleAtom, socketAtom } from "@/lib/jotai/atoms"
import { GetRequest } from "@/lib/server-actions/request-helpers/GetRequest"
import { useAtom, useSetAtom } from "jotai"
import { io, Socket } from "socket.io-client"

import { ReactNode, useEffect, useState } from "react"

import { Spinner } from "../Spinner"
import { env } from "@/env"
import { ClientToServerEvents, ServerToclientEvents } from "@/lib/types/socket"
import revalPath from "@/lib/server-actions/revalPath"
import { toast } from "sonner"

export function JotaiProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)
    const setRole = useSetAtom(roleAtom)
    const [socket, setSocket] = useAtom(socketAtom)

    const fetchRole = async () => {
        try {
            const userData = await GetRequest("/user")
            setRole(() => userData?.user?.role)
            return userData?.accessToken
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }



    useEffect(() => {
        const initializeSocket = (accessToken: string) => {
            const socket: Socket<ServerToclientEvents, ClientToServerEvents> = io(env.NEXT_PUBLIC_API_URL, {
                auth: {
                    token: accessToken
                }
            })

            socket?.on("notification", ({ event, message }) => {
                //console.log(event)
                switch (event) {
                    case "newMessage":
                        toast.success("New message", { position: "top-center" })
                        revalPath("/messenger")
                        break;
                    case "newMessageSent":
                        revalPath("/messenger")
                        break;
                    case "leftChat":
                        revalPath("/messenger")
                        break
                    case "offline":
                        revalPath("/messenger")
                        break
                    case "online":
                        revalPath("/messenger")
                        break
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
        }

        (async () => {
            const accessToken = await fetchRole()
            initializeSocket(accessToken)
        })()

        return () => {
            socket?.close()
        }
    }, [])

    if (isLoading) return <Spinner className={""} />

    return children
}
