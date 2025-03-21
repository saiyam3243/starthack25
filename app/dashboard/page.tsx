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
import CropStatusVisualization from "@/components/crop-status-visualization"
import { useSearchParams } from "next/navigation"

export default function Dashboard() {
  const [farmData, setFarmData] = useState(null)
  const [riskAssessment, setRiskAssessment] = useState(null)
  const [recommendations, setRecommendations] = useState(null)

  const searchParams = useSearchParams();

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const farmSize = searchParams.get("farmSize");
  const crop = searchParams.get("crop");

  // Handle data fetched from CE-Hub
  const handleDataFetched = (data) => {
    setFarmData(data)
  }

  // Handle risk assessment completion
  const handleRiskAssessmentComplete = (assessment) => {
    setRiskAssessment(assessment)
  }

  // Handle recommendations completion
  const handleRecommendationsComplete = (recs) => {
    setRecommendations(recs)
  }

  // Helper function to get emoji based on status
  const getStatusEmoji = (status) => {
    switch (status) {
      case "good":
        return "😀"
      case "average":
        return "😐"
      case "poor":
        return "😟"
      default:
        return "😐"
    }
  }

  // Helper function to get color based on status
  const getStatusColor = (status) => {
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
  const getTextColor = (status) => {
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
  const getRiskDisplay = (level) => {
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

      {/* Crop Status Cards */}
      <h2 className="text-2xl font-bold mb-4">Your Crops</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Wheat Card */}
        <Card className={`border-2 ${getStatusColor(cropStatus.wheat.status)}`}>
          <div className="relative">

            <div className="absolute top-2 right-2 text-4xl" aria-label="Crop status emoji">
              {getStatusEmoji(cropStatus.wheat.status)}
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Wheat</CardTitle>
            </div>
            <CardDescription>Days to harvest: {cropStatus.wheat.daysToHarvest}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Crop Health:</span>
                <span className={`text-sm font-bold ${getTextColor(cropStatus.wheat.status)}`}>
                  {cropStatus.wheat.healthPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${cropStatus.wheat.status === "good"
                    ? "bg-green-500"
                    : cropStatus.wheat.status === "average"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                    }`}
                  style={{ width: `${cropStatus.wheat.healthPercentage}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Water Needs:</span>
                  <p className="font-medium">{cropStatus.wheat.waterNeeds}</p>
                </div>
                <div>
                  <span className="text-gray-500">Pest Risk:</span>
                  <p className={`font-medium ${getRiskDisplay(cropStatus.wheat.pestRisk).color}`}>
                    {getRiskDisplay(cropStatus.wheat.pestRisk).text}
                  </p>
                </div>
              </div>
              <Alert className="bg-green-50 border-green-200">
                <AlertTriangle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-600">Action Needed</AlertTitle>
                <AlertDescription className="text-green-700 text-sm">
                  Your wheat crop is in a good condition. Use our product to increase the yield.
                </AlertDescription>
              </Alert>
            </div>

          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Leaf className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </CardFooter>
        </Card>

        {/* Rice Card */}
        <Card className={`border-2 ${getStatusColor(cropStatus.rice.status)}`}>
          <div className="relative">
            <div className="absolute top-2 right-2 text-4xl" aria-label="Crop status emoji">
              {getStatusEmoji(cropStatus.rice.status)}
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Rice</CardTitle>
              {/* <span className={`font-bold ${getTextColor(cropStatus.rice.status)}`}>
                {cropStatus.rice.status.toUpperCase()}
              </span> */}
            </div>
            <CardDescription>Days to harvest: {cropStatus.rice.daysToHarvest}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Crop Health:</span>
                <span className={`text-sm font-bold ${getTextColor(cropStatus.rice.status)}`}>
                  {cropStatus.rice.healthPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${cropStatus.rice.status === "good"
                    ? "bg-green-500"
                    : cropStatus.rice.status === "average"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                    }`}
                  style={{ width: `${cropStatus.rice.healthPercentage}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Water Needs:</span>
                  <p className="font-medium">{cropStatus.rice.waterNeeds}</p>
                </div>
                <div>
                  <span className="text-gray-500">Pest Risk:</span>
                  <p className={`font-medium ${getRiskDisplay(cropStatus.rice.pestRisk).color}`}>
                    {getRiskDisplay(cropStatus.rice.pestRisk).text}
                  </p>
                </div>
              </div>

              {cropStatus.rice.actionNeeded && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertTitle className="text-yellow-600">Action Needed</AlertTitle>
                  <AlertDescription className="text-yellow-700 text-sm">
                    Your rice crop needs attention. Consider applying recommended treatments.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Leaf className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </CardFooter>
        </Card>

        {/* Cotton Card */}
        <Card className={`border-2 ${getStatusColor(cropStatus.cotton.status)}`}>
          <div className="relative">
            <div className="absolute top-2 right-2 text-4xl" aria-label="Crop status emoji">
              {getStatusEmoji(cropStatus.cotton.status)}
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Cotton</CardTitle>
              {/* <span className={`font-bold ${getTextColor(cropStatus.cotton.status)}`}>
                {cropStatus.cotton.status.toUpperCase()}
              </span> */}
            </div>
            <CardDescription>Days to harvest: {cropStatus.cotton.daysToHarvest}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Crop Health:</span>
                <span className={`text-sm font-bold ${getTextColor(cropStatus.cotton.status)}`}>
                  {cropStatus.cotton.healthPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${cropStatus.cotton.status === "good"
                    ? "bg-green-500"
                    : cropStatus.cotton.status === "average"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                    }`}
                  style={{ width: `${cropStatus.cotton.healthPercentage}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Water Needs:</span>
                  <p className="font-medium">{cropStatus.cotton.waterNeeds}</p>
                </div>
                <div>
                  <span className="text-gray-500">Pest Risk:</span>
                  <p className={`font-medium ${getRiskDisplay(cropStatus.cotton.pestRisk).color}`}>
                    {getRiskDisplay(cropStatus.cotton.pestRisk).text}
                  </p>
                </div>
              </div>

              {cropStatus.cotton.actionNeeded && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-600">Urgent Action Required</AlertTitle>
                  <AlertDescription className="text-red-700 text-sm">
                    Your cotton crop is at high risk. Apply recommended treatments immediately.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Leaf className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="risks" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
          <TabsTrigger value="soil">Soil Health</TabsTrigger>
          <TabsTrigger value="crops">Crop Status</TabsTrigger>
        </TabsList>

        <TabsContent value="risks">
          <RiskAssessmentVisualization riskData={riskAssessment} />
        </TabsContent>

        <TabsContent value="soil">
          <SoilHealthVisualization soilData={farmData?.soilData} />
        </TabsContent>

        <TabsContent value="crops">
          <CropStatusVisualization cropData={farmData?.crops} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

