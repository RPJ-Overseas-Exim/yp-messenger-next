import React from "react"
import { Navbar } from "@/components/Navbar"
import { SideBar } from "@/components/SideBar"

export default function MessengerLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <Navbar />
            {children}
            <SideBar />
        </>
    )

}
