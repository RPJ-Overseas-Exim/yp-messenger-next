"use server"
import { cookies } from "next/headers"
import { PostRequest } from "./request-helpers/PostRequest";


export async function Login({ email, password }: { email: string; password: string; }) {
    try {
        const res = await PostRequest("/login", { email, password })
        const { token, success, role } = res

        if (token) {
            const cookieStore = cookies()
            cookieStore.set("Authentication", token)
        }

        return { success, role }
    } catch (err) {
        console.log("Login response error: ", err)
        return false
    }
}
