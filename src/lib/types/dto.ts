
export type Chat = {
    id: string,
    memberOne: string,
    memberTwo: string,
    lastMessage: string,
    lastMessageDate: Date,
    lastSeen: Date
}

export type Message = {
    id: string,
    senderId: string,
    content: string,
    date: Date
}
