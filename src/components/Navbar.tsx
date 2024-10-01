import React from "react"
import { EllipsisVertical } from "lucide-react"

export const Navbar = () => {
    return (
        <>
            <nav className="block py-4 mx-auto w-11/12">
                <ul className="flex justify-between">
                    <li>
                        <h2 className="text-amber-500 text-xl font-semibold">WCC</h2>
                    </li>
                    <li>
                        <EllipsisVertical />
                    </li>
                </ul>
            </nav>
            <hr />
        </>
    )
}
