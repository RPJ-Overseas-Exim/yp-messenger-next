"use client"
import { roleAtom } from "@/lib/jotai/atoms"
import { GetRequest } from "@/lib/server-actions/request-helpers/GetRequest"
import { useAtom } from "jotai"
import { ReactNode, useEffect, useState } from "react"
import { Spinner } from "../Spinner"

export function JotaiProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)
    const [_, setRole] = useAtom(roleAtom)

    const fetchRole = async () => {
        try {
            const userRole = await GetRequest("/user")
            setRole(() => userRole?.user?.role)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchRole()
    }, [])

    if (isLoading) return <Spinner />

    return children
}
