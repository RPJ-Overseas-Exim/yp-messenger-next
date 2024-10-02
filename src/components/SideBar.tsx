"use client"
import { SideBarButton } from "./SideBarButton";
import { House, Megaphone, MessageSquareMore } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { roleAtom } from "@/lib/jotai/atoms";
import { useAtom } from "jotai";

export function SideBar() {
    const path = usePathname()
    const [condition, setCondition] = useState<boolean>(false)
    const [role, setRole] = useAtom(roleAtom)

    useEffect(() => {
        console.log("from sidebar: ", role)
        setCondition(path === "/messenger/broadcast" || path === "/messenger/profile" || path === "/messenger")
    }, [path])

    return (
        <aside className="w-full border-t-2 border-border py-2">
            {condition && (
                <div className="flex items-center justify-between">
                    <SideBarButton name="Chats" link="/messenger">
                        <MessageSquareMore size={24} />
                    </SideBarButton>

                    <SideBarButton name="Profile" link="/messenger/profile">
                        <House size={24} />
                    </SideBarButton>

                    {role === "admin" && (
                        <SideBarButton name="Broadcast" link="/messenger/broadcast">
                            <Megaphone size={24} />
                        </SideBarButton>
                    )}
                </div>
            )}
        </aside>
    )
}

