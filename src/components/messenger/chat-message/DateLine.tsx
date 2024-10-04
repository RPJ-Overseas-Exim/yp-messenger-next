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

export const DateLine = ({ date }: { date: string; }) => {
    const d = date.split("/")
    const dayOfMonth = d[0]
    const monthInWord = getMonthInWords(Number(d[1]) - 1)
    const year = d[2]
    const showDate = `${dayOfMonth} ${monthInWord} ${year}`

    return <div className="text-lg text-zinc-400 w-full text-center">{showDate}</div>
}


