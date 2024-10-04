"use server"
import { cookies } from "next/headers"
import { PostRequest } from "./request-helpers/PostRequest";
import { env } from "@/env";


export async function Login({ email, password }: { email: string; password: string; }) {
    try {
        const res = await PostRequest("/login", { email, password })
        console.log("login response: ", res)
        const { token, success, role, message } = res

        if (token) {
            const cookieStore = cookies()
            const expires = new Date(Date.now() + env.JWT_EXPIRE * 24 * 60 * 60 * 1000)
            cookieStore.set("Authentication", token, { httpOnly: true, sameSite: "lax", expires })
        }

        return { success, role, message }
    } catch (err) {
        console.log("Login response error: ", err)
        return {}
    }
}
