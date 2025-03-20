"use client"

import { useEffect, useState } from "react"

export default function RiskMap() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-48 w-full bg-gray-100 rounded-lg animate-pulse"></div>
  }

  return (
    <div className="h-48 w-full relative bg-gray-100 rounded-lg overflow-hidden">
      {/* This would be replaced with an actual map component like Leaflet or Google Maps */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">Farm Risk Map</p>
      </div>
      <svg className="w-full h-full" viewBox="0 0 400 200">
        <path d="M50,50 L150,50 L150,150 L50,150 Z" fill="#fecaca" stroke="#ef4444" strokeWidth="2" opacity="0.7" />
        <path d="M170,70 L270,70 L270,170 L170,170 Z" fill="#fed7aa" stroke="#f97316" strokeWidth="2" opacity="0.7" />
        <path d="M100,20 L200,20 L200,120 L100,120 Z" fill="#fef08a" stroke="#eab308" strokeWidth="2" opacity="0.7" />
      </svg>
    </div>
  )
}

