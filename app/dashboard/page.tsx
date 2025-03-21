"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CloudRain, Thermometer, Droplets, Wind, AlertTriangle, Leaf } from "lucide-react"
import Link from "next/link"
import FarmProfile from "@/components/farm-profile"
import WeatherChart from "@/components/weather-chart"
import DataFetcher from "@/components/data-fetcher"
import SoilHealthVisualization from "@/components/soil-health-visualization"
import RiskAssessmentVisualization from "@/components/risk-assessment-visualization"

export default function Dashboard() {
  const [farmData, setFarmData] = useState(null)
  const [riskAssessment, setRiskAssessment] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [selectedCrop, setSelectedCrop] = useState<'wheat' | 'rice' | 'cotton' | null>(null)

  // Handle data fetched from CE-Hub
  const handleDataFetched = (data: any) => {
    setFarmData(data)
  }

  // Handle risk assessment completion
  const handleRiskAssessmentComplete = (assessment: any) => {
    setRiskAssessment(assessment)
  }

  // Handle recommendations completion
  const handleRecommendationsComplete = (recs: any) => {
    setRecommendations(recs)
  }

  // Helper function to get color based on status
  const getStatusColor = (status: any) => {
    switch (status) {
      case "good":
        return "bg-green-100 border-green-300"
      case "average":
        return "bg-yellow-100 border-yellow-300"
      case "poor":
        return "bg-red-100 border-red-300"
      default:
        return "bg-gray-100 border-gray-300"
    }
  }

  // Helper function to get text color based on status
  const getTextColor = (status: any) => {
    switch (status) {
      case "good":
        return "text-green-700"
      case "average":
        return "text-yellow-700"
      case "poor":
        return "text-red-700"
      default:
        return "text-gray-700"
    }
  }

  // Helper function to get risk level text and color
  const getRiskDisplay = (level: any) => {
    switch (level) {
      case "low":
        return { text: "Low", color: "text-green-600" }
      case "medium":
        return { text: "Medium", color: "text-yellow-600" }
      case "high":
        return { text: "High", color: "text-red-600" }
      default:
        return { text: "Unknown", color: "text-gray-600" }
    }
  }

  // Helper function to get stress level text
  const getStressLevelText = (status: string) => {
    switch (status) {
      case "good":
        return "No stressed detected for wheat."
      case "average":
        return "Daytime heat stress"
      case "poor":
        return "Frost stress"
      default:
        return "Unknown stress level."
    }
  }

  // Helper function to get yield boostability status
  const getYieldBoostability = (cropType: string) => {
    switch (cropType) {
      case "wheat":
        return { text: "Medium", color: "text-yellow-600", bgColor: "bg-yellow-100", borderColor: "border-yellow-300", description: "Moderate potential for yield improvement with targeted interventions." }
      case "rice":
        return { text: "Bad", color: "text-red-600", bgColor: "bg-red-100", borderColor: "border-red-300", description: "Limited potential for yield improvement. Requires significant intervention." }
      case "cotton":
        return { text: "Good", color: "text-green-600", bgColor: "bg-green-100", borderColor: "border-green-300", description: "High potential for yield improvement with minimal intervention." }
      default:
        return { text: "Unknown", color: "text-gray-600", bgColor: "bg-gray-100", borderColor: "border-gray-300", description: "Unable to determine yield boostability." }
    }
  }

  const [cropStatus] = useState({
    wheat: {
      status: "good", // good, average, poor
      healthPercentage: 85,
      waterNeeds: "adequate",
      pestRisk: "low",
      diseaseRisk: "low",
      actionNeeded: false,
      daysToHarvest: 45,
    },
    rice: {
      status: "average",
      healthPercentage: 60,
      waterNeeds: "high",
      pestRisk: "medium",
      diseaseRisk: "medium",
      actionNeeded: true,
      daysToHarvest: 30,
    },
    cotton: {
      status: "poor",
      healthPercentage: 40,
      waterNeeds: "low",
      pestRisk: "high",
      diseaseRisk: "high",
      actionNeeded: true,
      daysToHarvest: 60,
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Farm Dashboard</h1>
          <p className="text-gray-500">Monitor your farm's conditions and risks</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Link href="/recommendations" className="flex items-center gap-2">
              View Products <Leaf className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Crop Status Cards - Spostato in alto */}
      <h2 className="text-2xl font-bold mb-4">Your Crops</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Wheat Card */}
        <Button 
          variant="outline" 
          className={`p-0 h-auto ${selectedCrop === "wheat" ? "border-4 border-blue-500" : "border-0"}`}
          onClick={() => setSelectedCrop(selectedCrop === "wheat" ? null : "wheat")}
        >
          <Card className={`w-full ${getStatusColor(cropStatus.wheat.status)}`}>
            <div className="flex flex-col items-center justify-center p-6">
              <img src="/wheat.png" alt="Wheat" className="w-24 h-24 mb-4" />
              <CardTitle className="text-center">Wheat</CardTitle>
            </div>
          </Card>
        </Button>

        {/* Rice Card */}
        <Button 
          variant="outline" 
          className={`p-0 h-auto ${selectedCrop === "rice" ? "border-4 border-blue-500" : "border-0"}`}
          onClick={() => setSelectedCrop(selectedCrop === "rice" ? null : "rice")}
        >
          <Card className={`w-full ${getStatusColor(cropStatus.rice.status)}`}>
            <div className="flex flex-col items-center justify-center p-6">
              <img src="/rice.png" alt="Rice" className="w-24 h-24 mb-4" />
              <CardTitle className="text-center">Rice</CardTitle>
            </div>
          </Card>
        </Button>

        {/* Cotton Card */}
        <Button 
          variant="outline" 
          className={`p-0 h-auto ${selectedCrop === "cotton" ? "border-4 border-blue-500" : "border-0"}`}
          onClick={() => setSelectedCrop(selectedCrop === "cotton" ? null : "cotton")}
        >
          <Card className={`w-full ${getStatusColor(cropStatus.cotton.status)}`}>
            <div className="flex flex-col items-center justify-center p-6">
              <img src="/cotton.png" alt="Cotton" className="w-24 h-24 mb-4" />
              <CardTitle className="text-center">Cotton</CardTitle>
            </div>
          </Card>
        </Button>
      </div>

      {/* Stress Level Information */}
      {selectedCrop && (
        <>
          <Card className={`mb-8 border-2 ${getStatusColor(cropStatus[selectedCrop].status)}`}>
            <CardHeader>
              <CardTitle>
                <span>Stress Level for {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}</span>
                <span className={`ml-2 ${getTextColor(cropStatus[selectedCrop].status)}`}>
                  {cropStatus[selectedCrop].status === "good" && "Low"}
                  {cropStatus[selectedCrop].status === "average" && "Medium"}
                  {cropStatus[selectedCrop].status === "poor" && "High"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img 
                  src={
                    cropStatus[selectedCrop].status === "good" 
                      ? "/accept.png" 
                      : cropStatus[selectedCrop].status === "average" 
                        ? "/sun.png" 
                        : "/snowflake.png"
                  } 
                  alt="Status Icon" 
                  className="w-12 h-12" 
                />
                <div className="flex flex-col">
                  <p>{getStressLevelText(cropStatus[selectedCrop].status)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Yield Boostability Section */}
          <Card className={`mb-8 border-2 ${getYieldBoostability(selectedCrop).bgColor} ${getYieldBoostability(selectedCrop).borderColor}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>Yield Boostability for {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)}</span>
                <span className={getYieldBoostability(selectedCrop).color}>
                  {getYieldBoostability(selectedCrop).text}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{getYieldBoostability(selectedCrop).description}</p>
            </CardContent>
          </Card>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Farm Profile</CardTitle>
            <CardDescription>Your farm's basic information</CardDescription>
          </CardHeader>
          <CardContent>
            <FarmProfile />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Weather</CardTitle>
            <CardDescription>Weather conditions for Pune, Maharashtra</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-between">
              {[...Array(5)].map((_, i) => {
                // Generate simple forecast data
                const day = new Date()
                day.setDate(day.getDate() + i)
                const dayName = day.toLocaleDateString("en-US", { weekday: "short" })
                const date = day.toLocaleDateString("en-US", { day: "numeric", month: "short" })

                return (
                  <div key={i} className="flex flex-col items-center p-4">
                    <p className="font-bold">{dayName}</p>
                    <p className="text-sm text-gray-500">{date}</p>
                    {i === 0 && <CloudRain className="h-10 w-10 my-2 text-blue-500" />}
                    {i === 1 && <CloudRain className="h-10 w-10 my-2 text-blue-500" />}
                    {i === 2 && <Thermometer className="h-10 w-10 my-2 text-orange-500" />}
                    {i === 3 && <Thermometer className="h-10 w-10 my-2 text-orange-500" />}
                    {i === 4 && <CloudRain className="h-10 w-10 my-2 text-blue-500" />}
                    <p className="font-medium">
                      {i === 0 && "32°C / Rain"}
                      {i === 1 && "30°C / Rain"}
                      {i === 2 && "34°C / Sunny"}
                      {i === 3 && "35°C / Sunny"}
                      {i === 4 && "31°C / Rain"}
                    </p>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                <Thermometer className="h-8 w-8 text-red-500 mb-2" />
                <span className="text-sm text-gray-500">Temperature</span>
                <span className="text-xl font-semibold">32°C</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                <Droplets className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm text-gray-500">Humidity</span>
                <span className="text-xl font-semibold">65%</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                <CloudRain className="h-8 w-8 text-gray-500 mb-2" />
                <span className="text-sm text-gray-500">Rainfall</span>
                <span className="text-xl font-semibold">2.5 mm</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                <Wind className="h-8 w-8 text-teal-500 mb-2" />
                <span className="text-sm text-gray-500">Wind</span>
                <span className="text-xl font-semibold">12 km/h</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

