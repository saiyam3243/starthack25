"use client"

import { useEffect, useState } from "react"

export default function SeasonalChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-64 w-full bg-gray-100 rounded-lg animate-pulse"></div>
  }

  return (
    <div className="h-64 w-full relative">
      {/* This would be replaced with an actual chart library like Chart.js or Recharts */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">Seasonal Performance Chart</p>
      </div>
      <svg className="w-full h-full" viewBox="0 0 400 200">
        <path
          d="M0,150 C50,120 100,100 150,90 C200,80 250,70 300,60 C350,50 400,40 400,40"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
        />
        <path
          d="M0,180 C50,170 100,160 150,150 C200,140 250,130 300,120 C350,110 400,100 400,100"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        <path
          d="M0,190 C50,185 100,180 150,175 C200,170 250,165 300,160 C350,155 400,150 400,150"
          fill="none"
          stroke="#f97316"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

