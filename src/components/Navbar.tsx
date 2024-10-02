import React from "react"
import { Input } from "./ui/input"
import { ThemeSwitch } from "./context/ThemeSwitch"
import Link from "next/link"

export function Navbar() {
    return (
        <div className="sticky backdrop-blur-sm">
            <nav className="py-4 mx-auto w-11/12">
                <ul className="flex justify-between items-center">
                    <li>
                        <Link href="/messenger">
                            <h2 className="text-amber-500 text-2xl font-semibold">WWC</h2>
                        </Link>
                    </li>

                    <div className="flex gap-2 items-center">
                        <li className="flex gap-2 items-center">
                            <Input placeholder="search" className="p-2 h-auto" />
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
