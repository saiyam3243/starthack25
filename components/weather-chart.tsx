"use client"

import { useEffect, useState } from "react"

export default function WeatherChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-40 w-full bg-gray-100 rounded-lg animate-pulse"></div>
  }

  return (
    <div className="h-40 w-full relative">
      {/* This would be replaced with an actual chart library like Chart.js or Recharts */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">7-Day Weather Forecast Chart</p>
      </div>
      <svg className="w-full h-full" viewBox="0 0 400 150">
        <path
          d="M0,75 C50,30 100,60 150,50 C200,40 250,90 300,70 C350,50 400,60 400,75"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <path
          d="M0,100 C50,85 100,95 150,90 C200,85 250,110 300,95 C350,80 400,90 400,100"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

