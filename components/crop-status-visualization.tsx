"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Leaf, AlertTriangle, Bug, Droplets } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface CropStatusProps {
  cropData?: {
    [key: string]: {
      growthStage: {
        name: string
        daysInStage: number
        totalDays: number
      }
      health: number
      pestPressure: number
      diseasePressure: number
      expectedYield: number
      issues?: {
        type: string
        severity: string
        description: string
      }[]
    }
  }
}

export default function CropStatusVisualization({ cropData }: CropStatusProps) {
  const [mounted, setMounted] = useState(false)

  // Default data if none provided
  const defaultData = {
    Cotton: {
      growthStage: {
        name: "Flowering",
        daysInStage: 65,
        totalDays: 100,
      },
      health: 75,
      pestPressure: 80,
      diseasePressure: 50,
      expectedYield: 85,
      issues: [
        {
          type: "pest",
          severity: "high",
          description: "Aphid infestation detected in northern section of field",
        },
      ],
    },
    Chickpea: {
      growthStage: {
        name: "Vegetative",
        daysInStage: 30,
        totalDays: 90,
      },
      health: 60,
      pestPressure: 25,
      diseasePressure: 75,
      expectedYield: 70,
      issues: [
        {
          type: "disease",
          severity: "high",
          description: "Early signs of powdery mildew detected",
        },
      ],
    },
  }

  const data = cropData || defaultData

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Crop Status</CardTitle>
          <CardDescription>Loading crop status data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full bg-gray-100 rounded-lg animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  // Helper function to get status color
  const getStatusColor = (value: number, isInverted = false) => {
    if (isInverted) {
      // For metrics where lower is better (pest/disease pressure)
      if (value >= 80) return "bg-red-500"
      if (value >= 60) return "bg-orange-500"
      if (value >= 40) return "bg-yellow-500"
      if (value >= 20) return "bg-green-400"
      return "bg-green-500"
    } else {
      // For metrics where higher is better (health, yield)
      if (value >= 80) return "bg-green-500"
      if (value >= 60) return "bg-green-400"
      if (value >= 40) return "bg-yellow-500"
      if (value >= 20) return "bg-orange-500"
      return "bg-red-500"
    }
  }

  // Helper function to get status text
  const getStatusText = (value: number, isInverted = false) => {
    if (isInverted) {
      // For metrics where lower is better (pest/disease pressure)
      if (value >= 80) return "Critical"
      if (value >= 60) return "High"
      if (value >= 40) return "Moderate"
      if (value >= 20) return "Low"
      return "Minimal"
    } else {
      // For metrics where higher is better (health, yield)
      if (value >= 80) return "Excellent"
      if (value >= 60) return "Good"
      if (value >= 40) return "Fair"
      if (value >= 20) return "Poor"
      return "Critical"
    }
  }

  // Helper function to get growth stage visualization
  const getGrowthStageVisualization = (
    crop: string,
    stage: { name: string; daysInStage: number; totalDays: number },
  ) => {
    const percentComplete = (stage.daysInStage / stage.totalDays) * 100

    // Define growth stages based on crop
    const stages =
      crop === "Cotton"
        ? ["Emergence", "Vegetative", "Flowering", "Boll Development", "Maturity"]
        : ["Emergence", "Vegetative", "Flowering", "Pod Development", "Maturity"]

    // Determine current stage index
    let currentStageIndex = 0
    if (stage.name === "Emergence") currentStageIndex = 0
    else if (stage.name === "Vegetative") currentStageIndex = 1
    else if (stage.name === "Flowering") currentStageIndex = 2
    else if (stage.name === "Boll Development" || stage.name === "Pod Development") currentStageIndex = 3
    else if (stage.name === "Maturity") currentStageIndex = 4

    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold">Growth Stage: {stage.name}</h3>
          <span className="text-sm">
            {stage.daysInStage} days ({Math.round(percentComplete)}% complete)
          </span>
        </div>

        <div className="relative">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${percentComplete}%` }}></div>
          </div>

          <div className="flex justify-between mt-2">
            {stages.map((stageName, index) => (
              <div
                key={index}
                className={`flex flex-col items-center ${index === currentStageIndex ? "text-green-600 font-medium" : "text-gray-500"}`}
                style={{ width: `${100 / stages.length}%` }}
              >
                <div
                  className={`h-3 w-3 rounded-full mb-1 ${
                    index === currentStageIndex
                      ? "bg-green-600"
                      : index < currentStageIndex
                        ? "bg-green-300"
                        : "bg-gray-300"
                  }`}
                ></div>
                <span className="text-xs text-center">{stageName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Status</CardTitle>
        <CardDescription>Current status of your crops</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={Object.keys(data)[0].toLowerCase()}>
          <TabsList className="mb-4">
            {Object.keys(data).map((crop) => (
              <TabsTrigger key={crop} value={crop.toLowerCase()}>
                {crop}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(data).map(([crop, status]) => (
            <TabsContent key={crop} value={crop.toLowerCase()}>
              {getGrowthStageVisualization(crop, status.growthStage)}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <div className="relative mb-2">
                    <svg className="w-16 h-16" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={getStatusColor(status.health)}
                        strokeWidth="3"
                        strokeDasharray={`${status.health}, 100`}
                      />
                    </svg>
                    <Leaf className="absolute bottom-0 right-0 h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-500">Plant Health</span>
                  <span className="font-semibold">{getStatusText(status.health)}</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <div className="relative mb-2">
                    <svg className="w-16 h-16" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={getStatusColor(status.pestPressure, true)}
                        strokeWidth="3"
                        strokeDasharray={`${status.pestPressure}, 100`}
                      />
                    </svg>
                    <Bug className="absolute bottom-0 right-0 h-5 w-5 text-red-500" />
                  </div>
                  <span className="text-sm text-gray-500">Pest Pressure</span>
                  <span className="font-semibold">{getStatusText(status.pestPressure, true)}</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <div className="relative mb-2">
                    <svg className="w-16 h-16" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={getStatusColor(status.diseasePressure, true)}
                        strokeWidth="3"
                        strokeDasharray={`${status.diseasePressure}, 100`}
                      />
                    </svg>
                    <Droplets className="absolute bottom-0 right-0 h-5 w-5 text-blue-500" />
                  </div>
                  <span className="text-sm text-gray-500">Disease Pressure</span>
                  <span className="font-semibold">{getStatusText(status.diseasePressure, true)}</span>
                </div>

                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <div className="relative mb-2">
                    <svg className="w-16 h-16" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={getStatusColor(status.expectedYield)}
                        strokeWidth="3"
                        strokeDasharray={`${status.expectedYield}, 100`}
                      />
                    </svg>
                    <Leaf className="absolute bottom-0 right-0 h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-500">Expected Yield</span>
                  <span className="font-semibold">{status.expectedYield}%</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-4">Crop Visualization</h3>
                <div className="relative h-64 w-full bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden">
                  {/* Plant visualization based on growth stage */}
                  <div className="absolute inset-0 flex items-end justify-center">
                    {status.growthStage.name === "Emergence" && (
                      <div className="mb-4 flex items-end">
                        <div className="h-16 w-1 bg-green-600 rounded-t-full"></div>
                        <div className="h-20 w-1 bg-green-600 rounded-t-full mx-4"></div>
                        <div className="h-12 w-1 bg-green-600 rounded-t-full"></div>
                      </div>
                    )}

                    {status.growthStage.name === "Vegetative" && (
                      <div className="mb-4 flex items-end">
                        <div className="flex flex-col items-center">
                          <div className="h-6 w-12 bg-green-500 rounded-full mb-1"></div>
                          <div className="h-24 w-1 bg-green-600"></div>
                        </div>
                        <div className="flex flex-col items-center mx-6">
                          <div className="h-8 w-16 bg-green-500 rounded-full mb-1"></div>
                          <div className="h-32 w-1 bg-green-600"></div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-6 w-12 bg-green-500 rounded-full mb-1"></div>
                          <div className="h-20 w-1 bg-green-600"></div>
                        </div>
                      </div>
                    )}

                    {status.growthStage.name === "Flowering" && (
                      <div className="mb-4 flex items-end">
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-16 bg-green-500 rounded-full mb-1 relative">
                            <div className="absolute -top-2 -right-1 h-3 w-3 bg-yellow-300 rounded-full"></div>
                          </div>
                          <div className="h-28 w-1 bg-green-600"></div>
                        </div>
                        <div className="flex flex-col items-center mx-6">
                          <div className="h-10 w-20 bg-green-500 rounded-full mb-1 relative">
                            <div className="absolute -top-2 left-2 h-3 w-3 bg-yellow-300 rounded-full"></div>
                            <div className="absolute -top-3 right-2 h-4 w-4 bg-yellow-300 rounded-full"></div>
                          </div>
                          <div className="h-40 w-1 bg-green-600"></div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-8 w-16 bg-green-500 rounded-full mb-1 relative">
                            <div className="absolute -top-2 -left-1 h-3 w-3 bg-yellow-300 rounded-full"></div>
                          </div>
                          <div className="h-32 w-1 bg-green-600"></div>
                        </div>
                      </div>
                    )}

                    {(status.growthStage.name === "Boll Development" ||
                      status.growthStage.name === "Pod Development") && (
                      <div className="mb-4 flex items-end">
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-16 bg-green-500 rounded-full mb-1 relative">
                            <div className="absolute -top-3 -right-1 h-4 w-4 bg-white rounded-full border-2 border-green-600"></div>
                          </div>
                          <div className="h-32 w-1 bg-green-600"></div>
                        </div>
                        <div className="flex flex-col items-center mx-6">
                          <div className="h-12 w-20 bg-green-500 rounded-full mb-1 relative">
                            <div className="absolute -top-4 left-2 h-5 w-5 bg-white rounded-full border-2 border-green-600"></div>
                            <div className="absolute -top-3 right-4 h-4 w-4 bg-white rounded-full border-2 border-green-600"></div>
                          </div>
                          <div className="h-44 w-1 bg-green-600"></div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-16 bg-green-500 rounded-full mb-1 relative">
                            <div className="absolute -top-3 -left-1 h-4 w-4 bg-white rounded-full border-2 border-green-600"></div>
                          </div>
                          <div className="h-36 w-1 bg-green-600"></div>
                        </div>
                      </div>
                    )}

                    {status.growthStage.name === "Maturity" && (
                      <div className="mb-4 flex items-end">
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-16 bg-green-400 rounded-full mb-1 relative">
                            <div className="absolute -top-3 -right-1 h-4 w-4 bg-gray-100 rounded-full border-2 border-green-600"></div>
                          </div>
                          <div className="h-32 w-1 bg-green-600"></div>
                        </div>
                        <div className="flex flex-col items-center mx-6">
                          <div className="h-12 w-20 bg-green-400 rounded-full mb-1 relative">
                            <div className="absolute -top-4 left-2 h-5 w-5 bg-gray-100 rounded-full border-2 border-green-600"></div>
                            <div className="absolute -top-3 right-4 h-4 w-4 bg-gray-100 rounded-full border-2 border-green-600"></div>
                          </div>
                          <div className="h-44 w-1 bg-green-600"></div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-10 w-16 bg-green-400 rounded-full mb-1 relative">
                            <div className="absolute -top-3 -left-1 h-4 w-4 bg-gray-100 rounded-full border-2 border-green-600"></div>
                          </div>
                          <div className="h-36 w-1 bg-green-600"></div>
                        </div>
                      </div>
                    )}

                    {/* Ground */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800"></div>
                  </div>

                  {/* Pest/Disease indicators */}
                  {status.pestPressure >= 60 && (
                    <div className="absolute top-1/3 right-1/4">
                      <Bug className="h-5 w-5 text-red-500 animate-pulse" />
                    </div>
                  )}

                  {status.diseasePressure >= 60 && (
                    <div className="absolute top-1/2 left-1/4">
                      <Droplets className="h-5 w-5 text-blue-500 animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              {status.issues && status.issues.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Issues Requiring Attention</h3>
                  {status.issues.map((issue, index) => (
                    <Alert
                      key={index}
                      className={`mb-4 ${
                        issue.type === "pest" && issue.severity === "high"
                          ? "border-red-500 bg-red-50"
                          : issue.type === "disease" && issue.severity === "high"
                            ? "border-blue-500 bg-blue-50"
                            : issue.severity === "medium"
                              ? "border-amber-500 bg-amber-50"
                              : "border-yellow-500 bg-yellow-50"
                      }`}
                    >
                      {issue.type === "pest" ? (
                        <Bug className={`h-4 w-4 ${issue.severity === "high" ? "text-red-500" : "text-amber-500"}`} />
                      ) : issue.type === "disease" ? (
                        <Droplets
                          className={`h-4 w-4 ${issue.severity === "high" ? "text-blue-500" : "text-amber-500"}`}
                        />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                      <AlertTitle>
                        {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}{" "}
                        {issue.type.charAt(0).toUpperCase() + issue.type.slice(1)} Issue
                      </AlertTitle>
                      <AlertDescription>{issue.description}</AlertDescription>
                    </Alert>
                  ))}
                </div>
              )}

              <div>
                <Button variant="outline" className="w-full">
                  <Link href="/recommendations" className="flex items-center gap-2">
                    <Leaf className="h-4 w-4" />
                    View Recommended Products for {crop}
                  </Link>
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

