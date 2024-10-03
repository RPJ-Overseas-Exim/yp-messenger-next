"use server"

import headers from "./headers"
import { GetBaseURL } from "./utils"


export async function PostRequest(url: string, data: any) {
    return await (
        await fetch(GetBaseURL() + url, {
            method: "POST",
            ...headers(),
            body: JSON.stringify(data)
        })
    ).json()
}
