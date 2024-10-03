"use client"
import { Button } from "@/components/ui/button"
import React from "react"

export default function Broadcast() {
    const handleBroadcast = () => {

    }

    return (
        <div className="w-full h-full flex flex-col gap-y-4 pt-3">
            <h2 className="w-full text-center text-xl font-bold" >Broadcast</h2>

            <form
                onSubmit={handleBroadcast}
                className="w-full px-3 flex flex-col gap-y-3"
            >
                <textarea
                    className="w-full min-h-[250px] h-1/2 rounded-lg p-2"
                    name="message"
                    placeholder="Enter your broadcast message"
                />

                <Button
                    type="submit"
                    className="w-full bg-amber-500 text-lg font-bold"
                >
                    Broadcast Message
                </Button>
            </form>

        </div>
    )
}
