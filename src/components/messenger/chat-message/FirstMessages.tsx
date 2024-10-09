"use client"
import React, { useState } from "react"
import { AutoGeneratedMessage } from "./Message"
import { Button } from "@/components/ui/button";
import { OrderForm, PaymentForm, PillsForm } from "@/lib/types/formSchema";
import { PlaceOrderMessage } from "./PlaceOrderMessage";
import { ChoosePaymentMessage } from "./ChoosePaymentMessage";
import { PillsAmountMessage } from "./PillsAmountMessage";
import { useAtomValue } from "jotai";
import { socketAtom } from "@/lib/jotai/atoms";
import { useParams, useSearchParams } from "next/navigation";

type OrderOptions = {
    placeOrder: boolean | undefined;
    order: boolean | undefined;
    pills: boolean | undefined;
    payment: boolean | undefined;
}

export function FirstMessages() {
    const socket = useAtomValue(socketAtom)
    const params = useParams()
    const searchParams = useSearchParams()
    const [messages, setMessages] = useState<{ message: string; for: "admin" | "customer"; date: string; }[]>([])
    const [options, setOptions] = useState<OrderOptions>({
        placeOrder: undefined,
        order: undefined,
        pills: undefined,
        payment: undefined,
    })

    const handleFirstAction = async (value: boolean) => {
        setOptions({ ...options, placeOrder: value })
        let updatedMessages: typeof messages = [...messages, {
            message: "What do you want to do?",
            for: "admin",
            date: (new Date()).toISOString()
        }]

        if (value) {
            updatedMessages.push({
                message: "Place order",
                for: "customer",
                date: (new Date(Date.now() + 500)).toISOString()
            })
        } else {
            updatedMessages.push({
                message: "Chat",
                for: "customer",
                date: (new Date(Date.now() + 500)).toISOString()
            }, {
                message: `hi, my name is ${searchParams.get("name")}.\nHope you are well.\nHow may I help you today?`,
                for: "admin",
                date: (new Date(Date.now() + 1000)).toISOString()
            })
        }

        setMessages(updatedMessages)
        if (value === false) {
            socket?.emit("sendInitialMessages", { messages: updatedMessages, chatId: String(params.chatId) })
        }

    }

    const handleProduct = async (data: OrderForm) => {
        setOptions({ ...options, order: true })
        setMessages((messages) => [...messages, {
            message: `Select products to place order`,
            for: "admin",
            date: (new Date()).toISOString()
        }, {
            message: `${data.products.join(", ")}`,
            for: "customer",
            date: (new Date(Date.now() + 500)).toISOString()
        }])
    }

    const handlePills = async (data: PillsForm) => {
        setOptions({ ...options, pills: true })
        setMessages((messages) => [...messages, {
            message: `Pills amount`,
            for: "admin",
            date: (new Date()).toISOString()
        }, {
            message: `${data.pills}`,
            for: "customer",
            date: (new Date(Date.now() + 500)).toISOString()
        }])

    }

    const handlePayment = async (data: PaymentForm) => {
        setOptions({ ...options, payment: true })
        const updatedMessages: typeof messages = [...messages, {
            message: `Payment mode`,
            for: "admin",
            date: (new Date()).toISOString()
        }, {
            message: `${data.payment}`,
            for: "customer",
            date: (new Date(Date.now() + 500)).toISOString()
        }, {
            message: `Your order of ${messages[3].message}\nPills: ${messages[5].message}\nPayment mode: ${data.payment}\nis confirmed, we will reach out with the payment link in a few minutes.`,
            for: "admin",
            date: (new Date(Date.now() + 1000)).toISOString()
        }]
        setMessages(updatedMessages)
        socket?.emit("sendInitialMessages", { messages: updatedMessages, chatId: String(params.chatId) })

    }

    const handleCancel = () => {
        setOptions({ ...options, placeOrder: false, order: false, pills: false, payment: false })
        setMessages([])
    }

    return (
        <>
            <AutoGeneratedMessage >
                <FirstMessage handleAction={handleFirstAction} disabled={options.placeOrder || false} />
            </AutoGeneratedMessage>

            {messages !== undefined && messages?.length > 1 && (
                <AutoGeneratedMessage self={true}>
                    {messages?.[1].message}
                </AutoGeneratedMessage>
            )}

            {messages !== undefined && messages.length > 2 && options.placeOrder === false && (
                <AutoGeneratedMessage self={false}>
                    {messages?.[2].message}
                </AutoGeneratedMessage>
            )}

            {options?.placeOrder !== undefined && options?.placeOrder !== false && (
                <AutoGeneratedMessage >
                    <PlaceOrderMessage
                        handleSubmit={handleProduct}
                        handleCancel={handleCancel}
                        formLabel={"Select products to place order"}
                        formDescription={"90 pills for 285$ and 180 pills for 420$"}
                        disabled={options.order || false}
                    />
                </AutoGeneratedMessage>
            )}

            {messages !== undefined && messages?.length > 3 && (
                <AutoGeneratedMessage self={true}>
                    {messages?.[3].message}
                </AutoGeneratedMessage>
            )}

            {
                options?.order !== undefined && options?.order !== false &&
                <AutoGeneratedMessage >
                    <PillsAmountMessage
                        handleSubmit={handlePills}
                        handleCancel={handleCancel}
                        formLabel={"Choose pills amount"}
                        disabled={options.pills || false}
                    />
                </AutoGeneratedMessage>
            }

            {messages !== undefined && messages?.length > 5 && (
                <AutoGeneratedMessage self={true}>
                    {messages?.[5].message}
                </AutoGeneratedMessage>
            )}

            {
                options?.pills !== undefined && options?.pills !== false &&
                <AutoGeneratedMessage >
                    <ChoosePaymentMessage
                        handleSubmit={handlePayment}
                        handleCancel={handleCancel}
                        disabled={options.payment || false}
                        formLabel={"Payment mode"}
                        formDescription={"Choose a payment mode"}
                    />
                </AutoGeneratedMessage>
            }

            {messages !== undefined && messages?.length > 7 && (
                <AutoGeneratedMessage self={true}>
                    {messages?.[7].message}
                </AutoGeneratedMessage>
            )}

            {messages !== undefined && messages?.length > 8 && (
                <AutoGeneratedMessage self={false}>
                    {messages?.[8].message}
                </AutoGeneratedMessage>
            )}
        </>
    )
}


function FirstMessage({ handleAction, disabled }: { handleAction: (value: boolean) => void; disabled: boolean; }) {
    return (
        <div className="flex flex-col gap-y-3 mb-2">
            <div>What you want to do?</div>
            <div className="flex flex-row gap-x-2">
                <Button
                    disabled={disabled}
                    className="text-sm font-semibold h-auto py-1"
                    onClick={() => handleAction(false)}>
                    Chat</Button>
                <Button
                    disabled={disabled}
                    className="text-sm font-semibold h-auto py-1"
                    onClick={() => handleAction(true)}
                >Place order</Button>
            </div>
        </div>
    )
}
