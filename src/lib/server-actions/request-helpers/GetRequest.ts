"use server"

import headers from "./headers"
import { GetBaseURL } from "./utils"


export async function GetRequest(url: string) {
    return await (
        await fetch(GetBaseURL() + url, {
            method: "GET",
            ...headers(),
        })
    ).json()
}
