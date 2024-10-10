import React from "react"

export function getMonthInWords(monthInNumber: number) {
    const monthInWord = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    return monthInWord[monthInNumber]
}

export const DateLine = ({ date }: { date: Date; }) => {
    const dayOfMonth = date.getDate()
    const monthInWord = getMonthInWords(Number(date.getMonth()))
    const year = date.getFullYear()
    const showDate = `${dayOfMonth} ${monthInWord} ${year}`

    return <div className="text-lg text-zinc-400 w-full text-center">{showDate}</div>
}


