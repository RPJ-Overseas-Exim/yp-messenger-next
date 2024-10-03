import { LogoutButton } from "@/components/LogoutButton"
import { UserIcon } from "@/components/messenger/UserIcon"
import { GetRequest } from "@/lib/server-actions/request-helpers/GetRequest"
import React from "react"

export default async function ProfilePage() {

    let userData;
    try {
        const resp = await GetRequest("/user")
        if (resp?.success) {
            userData = resp?.user
        }
    } catch (err) {
        console.log("Profile fetching err: ", err)
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-y-5">

                <div className="">
                    <UserIcon size={64} />
                </div>

                <div className="flex flex-col items-center gap-y-1">
                    <div className="text-xl text-muted-foreground">
                        {userData?.username}
                    </div>
                    <div className="text-xl text-muted-foreground">
                        {userData?.email}
                    </div>
                </div>

                <LogoutButton />

            </div>
        </div>
    )
}
