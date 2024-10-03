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

export function JotaiProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)
    const setRole = useSetAtom(roleAtom)
    const [socket, setSocket] = useAtom(socketAtom)

    const fetchRole = useCallback(async () => {
        try {
            const userRole = await GetRequest("/user")
            setRole(() => userRole?.user?.role)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const initializeSocket = useCallback(()=>{
        const socket:Socket<ServerToclientEvents, ClientToServerEvents> = io(env.NEXT_PUBLIC_API_URL, {
            withCredentials:true,
        })

        socket?.on("notification", ({ event, message }) => {
            switch (event) {
                case "newMessage":
                    if (message) console.log(message)
                    revalPath("/messenger")
            }
        })

        socket?.on("chatError", (e) => {
            console.log(e)
            console.log("error")
        })

        setSocket(socket)
    }, [])


    useEffect(() => {
        fetchRole()
        initializeSocket()
        return ()=>{
            socket?.close()
        }
    }, [initializeSocket])

    if (isLoading) return <Spinner />

    return children
}
