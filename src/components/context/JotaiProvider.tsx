"use client"
import { roleAtom } from "@/lib/jotai/atoms"
import { GetRequest } from "@/lib/server-actions/request-helpers/GetRequest"
import { useAtom } from "jotai"
import { ReactNode, useEffect, useState } from "react"

export function JotaiProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true)
    const [role, setRole] = useAtom(roleAtom)

    const fetchRole = async () => {
        try {
            const userRole = await GetRequest("/user")
            console.log("role: ", userRole.user.role)
            setRole(() => userRole.user.role)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchRole()
    }, [])

    if (isLoading) return <div>Loading...</div>

    return children
}
