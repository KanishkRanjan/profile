"use client"

import { useEffect, useState } from "react"

export function Clock() {
    const [time, setTime] = useState<string>("")

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            // Display time in IST (Indian Standard Time) as per user context
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            }
            setTime(now.toLocaleTimeString("en-US", options))
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    if (!time) return <div className="w-20" /> // Avoid hydration mismatch

    return (
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-mono">
            <span>{time}</span>
            <span className="text-xs font-bold">IST</span>
        </div>
    )
}
