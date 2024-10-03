"use client"
import { ProfileSkeleton } from "@/components/messenger/profile/Skeleton"
import { UserIcon } from "@/components/messenger/UserIcon"
import { Button } from "@/components/ui/button"
import { Logout } from "@/lib/server-actions/Logout"
import { GetRequest } from "@/lib/server-actions/request-helpers/GetRequest"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function ProfilePage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState({ email: "", username: "" })

    const GetUserData = async () => {
        try {
            const resp = await GetRequest("/user")
            if (resp.success) {
                setUserData({ email: resp.user.email, username: resp.user.username })
            }
        } catch (err) {
            console.log("Profile fetching err: ", err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = async () => {
        await Logout()
        router.push("/")
    }

    useEffect(() => {
        GetUserData()
    }, [])

    if (isLoading) return <ProfileSkeleton />

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-y-5">

                <div className="">
                    <UserIcon size={64} />
                </div>

                <div className="flex flex-col items-center gap-y-1">
                    <div className="text-xl text-muted-foreground">
                        {userData.username}
                    </div>
                    <div className="text-xl text-muted-foreground">
                        {userData.email}
                    </div>
                </div>

                <Button onClick={handleLogout} className="text-xl font-bold" >
                    Logout
                </Button>

            </div>
        </div>
    )
}
