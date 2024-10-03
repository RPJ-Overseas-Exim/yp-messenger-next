import { Message } from "./dto";

export interface ClientToServerEvents {
    hello: () => void;
    joinChat: (chatId: string) => void;
    leaveChat: (chatId: string) => void;
    sendMessage: (envelope: { chatId: string, message: string }) => void;
    broadcastToChats: (message:string)=>void;
}

export interface ServerToclientEvents{
    noArg: () => void;
    sendMessageToChat: (message:{content: Message, id:string}) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    chatError:(error:string)=>void;
    notification: (data:{event:string, message?:string})=>void;
    newChatBroadcast: ()=>void
}
