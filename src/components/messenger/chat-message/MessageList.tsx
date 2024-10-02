import React from "react"
import { Message } from "./Message"

export function MessageList() {
    return (
        <section className="bg-muted max-h-full overflow-auto flex-1">
        <div className="w-[95%] mx-auto">
            <Message time={"10:20"}>Hello</Message>
        </div>
        </section>
    )
}
