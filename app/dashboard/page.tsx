"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function Dashboard() {
  const [farmData, setFarmData] = useState(null)
  const [riskAssessment, setRiskAssessment] = useState(null)
  const [recommendations, setRecommendations] = useState(null)

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
              View Recommendations <Leaf className="h-4 w-4" />
            </Link>
          </Button>
          <Button>Update Farm Data</Button>
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
            <WeatherChart />
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

      {!farmData && (
        <div className="mb-8">
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Fetch latest farm data</AlertTitle>
            <AlertDescription>
              Get the latest environmental data for your farm to see updated risk assessments and recommendations.
            </AlertDescription>
          </Alert>

          <DataFetcher
            latitude={18.5204} // Default coordinates for Pune, India
            longitude={73.8567}
            onDataFetched={handleDataFetched}
            onRiskAssessmentComplete={handleRiskAssessmentComplete}
            onRecommendationsComplete={handleRecommendationsComplete}
          />
        </div>
      )}

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

