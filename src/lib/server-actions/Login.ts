"use server"
import { env } from "@/env"
import { cookies } from "next/headers"


export async function Login({ email, password }: { email: string; password: string; }) {
    try {
        const res = await fetch(env.API_URL + String(env.API_VER) + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                credentials: "include"
            },
            body: JSON.stringify({ email, password })
        })

        const { role, success, token } = await res.json()

        const cookieStore = cookies()
        cookieStore.set("Authentication", token)

        return { success, role }
    } catch (err) {
        console.log("Response error: ", err)
        return false
    }
}
