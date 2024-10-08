"use client"
import React, { ChangeEvent, useState } from "react"
import { Input } from "./ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function SearchInput() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState<string>("")

    const handleText = (e: ChangeEvent<HTMLInputElement> | undefined) => {
        setQuery(e?.target?.value as string)

    }

    React.useEffect(() => {
        if (!searchParams?.get("q") && !query.length) return
        const searchTimer = setTimeout(() => router.push(`/messenger?q=${query}`), 1000)
        return () => {
            clearTimeout(searchTimer)
        }
    }, [query])

    return (
        <>
            {
                pathname === "/messenger"
                && <Input placeholder="search" className="p-2 h-auto" value={query} onChange={handleText} />
            }
        </>
    )
}
