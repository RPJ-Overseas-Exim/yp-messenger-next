import React from "react"
import { Navbar } from "@/components/Navbar"
import { SideBar } from "@/components/SideBar"
import { JotaiProvider } from "@/components/context/JotaiProvider"

export default function MessengerLayout({ children }: { children: React.ReactNode }) {
    return (
        <JotaiProvider>
            <div className="h-full max-h-full grid grid-rows-mainLayout">
                <Navbar />
                {children}
                <SideBar />
            </div>
        </JotaiProvider>
    )

}
