"use server"
import { cookies } from "next/headers"

export async function Logout() {
    const cookieStore = cookies()
    cookieStore.delete("Authentication")
}
