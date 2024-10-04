"use server"
import {GetRequest} from "./request-helpers/GetRequest"

export default async function getMessages(chatId:string, offset?:number){
    console.log(`/messages/${chatId}?offset=${offset || 0}`)
    return GetRequest(`/messages/${chatId}?offset=${offset || 0}`)
}
