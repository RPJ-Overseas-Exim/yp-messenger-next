import { atom } from "jotai"
import { Socket } from "socket.io-client"
import { ClientToServerEvents, ServerToclientEvents } from "../types/socket"

export const roleAtom = atom<string>("")
export const tokenAtom = atom<string>("")
export const socketAtom = atom<Socket<ServerToclientEvents, ClientToServerEvents>>()
