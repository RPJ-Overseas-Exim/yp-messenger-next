"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Logout } from "@/lib/server-actions/Logout"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        await Logout()
        toast.success("Logout successfully!", { position: "top-center" })
        return router.push("/")
    }

    return <Button onClick={handleLogout} className="text-lg font-bold" >Logout</Button>

}
