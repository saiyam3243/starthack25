"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"
import {
  fetchWeatherData1,
  fetchSoilData,
  fetchVegetationData,
  getRiskAssessment,
  getProductRecommendations,
} from "@/lib/api-services"

interface DataFetcherProps {
  latitude: number
  longitude: number
  onDataFetched: (data: any) => void
  onRiskAssessmentComplete: (assessment: any) => void
  onRecommendationsComplete: (recommendations: any) => void
}

export default function DataFetcher({
  latitude,
  longitude,
  onDataFetched,
  onRiskAssessmentComplete,
  onRecommendationsComplete,
}: DataFetcherProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<string>("")

  const fetchAllData = async () => {
    setLoading(true)
    setError(null)
    setProgress("Fetching weather data...")

    try {
      // Calculate date range (last 30 days)
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - 30)

      const startDateStr = startDate.toISOString().split("T")[0]
      const endDateStr = endDate.toISOString().split("T")[0]

      // Fetch weather data
      const weatherData = await fetchWeatherData1(latitude, longitude, startDateStr, endDateStr)

      setProgress("Fetching soil data...")
      console.log("dew", weatherData);

      // Fetch soil data
      const soilData = await fetchSoilData(latitude, longitude)

      setProgress("Fetching vegetation data...")

      // Fetch vegetation data
      const vegetationData = await fetchVegetationData(latitude, longitude, startDateStr, endDateStr)

      // Combine all data
      const combinedData = {
        weatherData,
        soilData,
        vegetationData,
        location: {
          latitude,
          longitude,
        },
        timestamp: new Date().toISOString(),
        crops: [
          { type: "Cotton", stage: "Flowering" },
          { type: "Chickpea", stage: "Vegetative" },
        ],
      }

      // Notify parent component
      onDataFetched(combinedData)

      setProgress("Analyzing risks...")

      // Get risk assessment
      const riskAssessment = await getRiskAssessment(combinedData)

      // Notify parent component
      onRiskAssessmentComplete(riskAssessment)

      setProgress("Generating recommendations...")

      // Get product recommendations
      const recommendations = await getProductRecommendations(combinedData, riskAssessment)

      // Notify parent component
      onRecommendationsComplete(recommendations)

      setProgress("Complete!")
      setLoading(false)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Failed to fetch data. Please try again.")
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-green-600 mb-2" />
            <p className="text-sm text-gray-500">{progress}</p>
          </div>
        ) : (
          <Button onClick={fetchAllData} className="w-full bg-green-600 hover:bg-green-700">
            Fetch Farm Data
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

