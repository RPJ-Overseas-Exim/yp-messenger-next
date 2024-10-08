"use client"
import React, { useEffect } from "react"
import { Input } from "./ui/input"
import { ThemeSwitch } from "./context/ThemeSwitch"
import Link from "next/link"
import { useSearchParams, usePathname, useParams } from "next/navigation"
import { useAtomValue } from "jotai"
import { socketAtom } from "@/lib/jotai/atoms"

export function Navbar() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = useParams()
    const socket = useAtomValue(socketAtom)
    const chatCondition = (pathname !== "/messenger"
        && pathname !== "/messenger/profile"
        && pathname !== "/messenger/broadcast")

    useEffect(() => {
        if (!params?.chatId) {
            socket?.emit("leaveChat", params?.chatId as string || "")
        }
    }, [params?.chatId])

    return (
        <div className="sticky backdrop-blur-sm">
            <nav className="py-4 mx-auto w-11/12">
                <ul className="flex justify-between items-center">
                    <li>
                        <Link href="/messenger">
                            <h2 className="text-amber-500 text-2xl font-semibold">
                                {chatCondition ? (
                                    searchParams?.get("name")
                                ) : (
                                    "WWC"
                                )}
                            </h2>
                        </Link>
                    </li>

                    <div className="flex gap-2 items-center">
                        <li className="flex gap-2 items-center">
                            {pathname === "/messenger" &&
                                <Input placeholder="search" className="p-2 h-auto" />
                            }
                            <div className="rounded-full active:bg-secondary">
                                <ThemeSwitch />
                            </div>
                        </li>

                    </div>
                </ul>
            </nav>
            <hr />
        </div>
    )
}
