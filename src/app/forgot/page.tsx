"use client"
import { Button } from "@/components/ui/button"
import { PostRequest } from "@/lib/server-actions/request-helpers/PostRequest"
import Link from "next/link"
import React, { useState } from "react"
import { toast } from "sonner"

export default function ForgotPassword() {
    const [email, setEmail] = useState<string>("")

    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email) return toast.warning("Email is not provided")
        try {
            const resp = await PostRequest("/forgot", { email })
            return toast.success(resp?.message, { position: "top-center" })
        } catch (err) {
            console.log(err)
            if (err instanceof Error) {
                toast.error(err.message)
            }
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-b from-blue-600 to-black text-white">
            <div className="flex flex-col items-center justify-center gap-y-4">
                <h2 className="text-xl text-zinc-300 font-bold">Forgot Password</h2>

                <form
                    onSubmit={handleForgotPassword}
                    className="flex flex-col gap-y-3 w-full max-w-[400px] w-11/12">
                    <div className="flex flex-col gap-y-1 w-full">
                        <label htmlFor="email" >
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="Enter the email"
                            className="p-2 rounded-lg bg-background"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="py-1 text-lg font-bold">Send</Button>
                </form>

                <p className="text-muted-foreground">Password reset link will be send to the provided email</p>
                <p className="text-muted-foreground">Go back to
                    <Link href="/" className="text-amber-500"> Login</Link>
                </p>
            </div>

        </div>
    )
}
