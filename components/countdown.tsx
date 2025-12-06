"use client"

import { useState, useEffect } from "react"

interface CountdownProps {
  targetDate: string
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const difference = targetTime - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 rounded-lg p-3 shadow-lg border-2 border-yellow-500">
      <p className="text-center text-amber-900 font-semibold text-xs mb-2">⏳ Faltam apenas:</p>
      <div className="grid grid-cols-4 gap-1">
        {[
          { value: timeLeft.days, label: "Dias" },
          { value: timeLeft.hours, label: "Horas" },
          { value: timeLeft.minutes, label: "Min" },
          { value: timeLeft.seconds, label: "Seg" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="bg-white bg-opacity-90 rounded-lg p-1 mb-0.5">
              <p className="text-lg font-bold text-amber-900">{String(item.value).padStart(2, "0")}</p>
            </div>
            <p className="text-xs font-semibold text-amber-900">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
