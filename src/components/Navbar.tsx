import React from "react"
import { Input } from "./ui/input"
import { ThemeSwitch } from "./context/ThemeSwitch"

export function Navbar() {
    return (
        <>
            <nav className="block py-4 mx-auto w-11/12">
                <ul className="flex justify-between items-center">
                    <li>
                        <h2 className="text-amber-500 text-2xl font-semibold">WWC</h2>
                    </li>
                    <div className="flex gap-2 items-center">
                        <li className="flex gap-2 items-center">
                            <Input placeholder="search" className="p-2 h-auto" />
                            <div className="rounded-full active:bg-secondary">
                            <ThemeSwitch/>
                            </div>
                        </li>
                    </div>
                </ul>
            </nav>
            <hr />
        </>
    )
}
