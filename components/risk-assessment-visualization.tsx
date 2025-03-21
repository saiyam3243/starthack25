"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Bug, Sun, Droplets, Thermometer } from "lucide-react"

interface RiskAssessmentProps {
  riskData?: {
    cropRisks: {
      [key: string]: {
        disease: {
          overall: number
          factors: {
            humidity: number
            temperature: number
            rainfall: number
          }
        }
        pest: {
          overall: number
          factors: {
            temperature: number
            humidity: number
          }
        }
        climate: {
          overall: number
          factors: {
            heat: number
            drought: number
            flood: number
          }
        }
      }
    }
    overallRisk: {
      disease: number
      pest: number
      climate: number
    }
  }
}

export default function RiskAssessmentVisualization({ riskData }: RiskAssessmentProps) {
  const [mounted, setMounted] = useState(false)

  // Default data if none provided
  const defaultData = {
    cropRisks: {
      Cotton: {
        disease: {
          overall: 75,
          factors: {
            humidity: 80,
            temperature: 70,
            rainfall: 60,
          },
        },
        pest: {
          overall: 90,
          factors: {
            temperature: 85,
            humidity: 95,
          },
        },
        climate: {
          overall: 45,
          factors: {
            heat: 60,
            drought: 40,
            flood: 20,
          },
        },
      },
      Chickpea: {
        disease: {
          overall: 65,
          factors: {
            humidity: 60,
            temperature: 50,
            rainfall: 80,
          },
        },
        pest: {
          overall: 40,
          factors: {
            temperature: 35,
            humidity: 45,
          },
        },
        climate: {
          overall: 55,
          factors: {
            heat: 70,
            drought: 50,
            flood: 30,
          },
        },
      },
    },
    overallRisk: {
      disease: 75,
      pest: 90,
      climate: 55,
    },
  }

  const data = riskData || defaultData

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
          <CardDescription>Loading risk assessment data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full bg-gray-100 rounded-lg animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  // Helper function to get risk level
  const getRiskLevel = (value: number) => {
    if (value >= 80) return "Critical"
    if (value >= 60) return "High"
    if (value >= 40) return "Moderate"
    if (value >= 20) return "Low"
    return "Minimal"
  }

  // Helper function to get risk color
  const getRiskColor = (value: number) => {
    if (value >= 80) return "text-red-600"
    if (value >= 60) return "text-orange-500"
    if (value >= 40) return "text-amber-500"
    if (value >= 20) return "text-yellow-500"
    return "text-green-500"
  }

  // Helper function to get risk badge color
  const getRiskBadgeColor = (value: number) => {
    if (value >= 80) return "bg-red-100 text-red-800 border-red-200"
    if (value >= 60) return "bg-orange-100 text-orange-800 border-orange-200"
    if (value >= 40) return "bg-amber-100 text-amber-800 border-amber-200"
    if (value >= 20) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-green-100 text-green-800 border-green-200"
  }

  // Helper function to get risk icon
  const getRiskIcon = (type: string, value: number) => {
    if (type === "disease") {
      return <Droplets className={`h-5 w-5 ${getRiskColor(value)}`} />
    } else if (type === "pest") {
      return <Bug className={`h-5 w-5 ${getRiskColor(value)}`} />
    } else if (type === "climate") {
      return <Sun className={`h-5 w-5 ${getRiskColor(value)}`} />
    }
    return <AlertTriangle className={`h-5 w-5 ${getRiskColor(value)}`} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Risk Assessment
        </CardTitle>
        <CardDescription>Current risk factors for your crops</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Overall Risk Levels</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-24 h-24" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={
                      data.overallRisk.disease >= 80
                        ? "#ef4444"
                        : data.overallRisk.disease >= 60
                          ? "#f97316"
                          : data.overallRisk.disease >= 40
                            ? "#f59e0b"
                            : data.overallRisk.disease >= 20
                              ? "#eab308"
                              : "#22c55e"
                    }
                    strokeWidth="3"
                    strokeDasharray={`${data.overallRisk.disease}, 100`}
                  />
                  <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="currentColor">
                    {data.overallRisk.disease}%
                  </text>
                </svg>
                <Droplets className="absolute bottom-0 right-0 h-6 w-6 text-blue-500" />
              </div>
              <h4 className="font-medium mt-2">Disease Risk</h4>
              <Badge variant="outline" className={getRiskBadgeColor(data.overallRisk.disease)}>
                {getRiskLevel(data.overallRisk.disease)}
              </Badge>
            </div>

            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-24 h-24" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={
                      data.overallRisk.pest >= 80
                        ? "#ef4444"
                        : data.overallRisk.pest >= 60
                          ? "#f97316"
                          : data.overallRisk.pest >= 40
                            ? "#f59e0b"
                            : data.overallRisk.pest >= 20
                              ? "#eab308"
                              : "#22c55e"
                    }
                    strokeWidth="3"
                    strokeDasharray={`${data.overallRisk.pest}, 100`}
                  />
                  <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="currentColor">
                    {data.overallRisk.pest}%
                  </text>
                </svg>
                <Bug className="absolute bottom-0 right-0 h-6 w-6 text-red-500" />
              </div>
              <h4 className="font-medium mt-2">Pest Risk</h4>
              <Badge variant="outline" className={getRiskBadgeColor(data.overallRisk.pest)}>
                {getRiskLevel(data.overallRisk.pest)}
              </Badge>
            </div>

            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-24 h-24" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={
                      data.overallRisk.climate >= 80
                        ? "#ef4444"
                        : data.overallRisk.climate >= 60
                          ? "#f97316"
                          : data.overallRisk.climate >= 40
                            ? "#f59e0b"
                            : data.overallRisk.climate >= 20
                              ? "#eab308"
                              : "#22c55e"
                    }
                    strokeWidth="3"
                    strokeDasharray={`${data.overallRisk.climate}, 100`}
                  />
                  <text x="18" y="20.5" textAnchor="middle" fontSize="8" fill="currentColor">
                    {data.overallRisk.climate}%
                  </text>
                </svg>
                <Sun className="absolute bottom-0 right-0 h-6 w-6 text-amber-500" />
              </div>
              <h4 className="font-medium mt-2">Climate Risk</h4>
              <Badge variant="outline" className={getRiskBadgeColor(data.overallRisk.climate)}>
                {getRiskLevel(data.overallRisk.climate)}
              </Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="cotton">
          {/* <TabsList className="mb-4">
            {Object.keys(data.cropRisks).map((crop) => (
              <TabsTrigger key={crop} value={crop.toLowerCase()}>
                {crop}
              </TabsTrigger>
            ))}
          </TabsList> */}

          {Object.entries(data.cropRisks).map(([crop, risks]) => (
            <TabsContent key={crop} value={crop.toLowerCase()}>
              <div className="space-y-6">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Current Risk Factors</h3>

                    {risks.disease.overall >= 60 && (
                      <Alert className="mb-4 border-amber-500 bg-amber-50">
                        <Droplets className="h-4 w-4 text-amber-500" />
                        <AlertTitle>{getRiskLevel(risks.disease.overall)} Risk: Powdery Mildew</AlertTitle>
                        <AlertDescription>
                          Current humidity and temperature conditions are favorable for powdery mildew development.
                        </AlertDescription>
                      </Alert>
                    )}

                    {risks.pest.overall >= 60 && (
                      <Alert className="mb-4 border-red-500 bg-red-50">
                        <Bug className="h-4 w-4 text-red-500" />
                        <AlertTitle>{getRiskLevel(risks.pest.overall)} Risk: Aphid Infestation</AlertTitle>
                        <AlertDescription>
                          Aphid populations are expected to increase rapidly in the next 7 days.
                        </AlertDescription>
                      </Alert>
                    )}

                    {risks.climate.overall >= 40 && (
                      <Alert className="border-yellow-500 bg-yellow-50">
                        <Sun className="h-4 w-4 text-yellow-500" />
                        <AlertTitle>{getRiskLevel(risks.climate.overall)} Risk: Heat Stress</AlertTitle>
                        <AlertDescription>
                          Temperatures are expected to rise above optimal levels for your crops next week.
                        </AlertDescription>
                      </Alert>
                    )}

                    {risks.disease.overall < 60 && risks.pest.overall < 60 && risks.climate.overall < 40 && (
                      <Alert className="border-green-500 bg-green-50">
                        <AlertTriangle className="h-4 w-4 text-green-500" />
                        <AlertTitle>Low Risk Levels</AlertTitle>
                        <AlertDescription>
                          Current conditions show low risk for major pest, disease, and climate issues.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Risk Breakdown</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Droplets className="h-4 w-4" /> Disease Pressure
                          </span>
                          <span className="text-sm font-medium">
                            {getRiskLevel(risks.disease.overall)} ({risks.disease.overall}%)
                          </span>
                        </div>
                        <Progress
                          value={risks.disease.overall}
                          className="h-2 bg-gray-200"
                          // indicatorClassName={
                          //   risks.disease.overall >= 80
                          //     ? "bg-red-500"
                          //     : risks.disease.overall >= 60
                          //       ? "bg-orange-500"
                          //       : risks.disease.overall >= 40
                          //         ? "bg-amber-500"
                          //         : risks.disease.overall >= 20
                          //           ? "bg-yellow-500"
                          //           : "bg-green-500"
                          // }
                        />

                        <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                          <div className="flex flex-col items-center">
                            <Droplets className="h-3 w-3 mb-1" />
                            <span>Humidity</span>
                            <span className={getRiskColor(risks.disease.factors.humidity)}>
                              {risks.disease.factors.humidity}%
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <Thermometer className="h-3 w-3 mb-1" />
                            <span>Temperature</span>
                            <span className={getRiskColor(risks.disease.factors.temperature)}>
                              {risks.disease.factors.temperature}%
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <Droplets className="h-3 w-3 mb-1" />
                            <span>Rainfall</span>
                            <span className={getRiskColor(risks.disease.factors.rainfall)}>
                              {risks.disease.factors.rainfall}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Bug className="h-4 w-4" /> Pest Pressure
                          </span>
                          <span className="text-sm font-medium">
                            {getRiskLevel(risks.pest.overall)} ({risks.pest.overall}%)
                          </span>
                        </div>
                        <Progress
                          value={risks.pest.overall}
                          className="h-2 bg-gray-200"
                      
                        />

                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                          <div className="flex flex-col items-center">
                            <Thermometer className="h-3 w-3 mb-1" />
                            <span>Temperature</span>
                            <span className={getRiskColor(risks.pest.factors.temperature)}>
                              {risks.pest.factors.temperature}%
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <Droplets className="h-3 w-3 mb-1" />
                            <span>Humidity</span>
                            <span className={getRiskColor(risks.pest.factors.humidity)}>
                              {risks.pest.factors.humidity}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Sun className="h-4 w-4" /> Climate Stress
                          </span>
                          <span className="text-sm font-medium">
                            {getRiskLevel(risks.climate.overall)} ({risks.climate.overall}%)
                          </span>
                        </div>
                        <Progress
                          value={risks.climate.overall}
                          className="h-2 bg-gray-200"
                          // indicatorClassName={
                          //   risks.climate.overall >= 80
                          //     ? "bg-red-500"
                          //     : risks.climate.overall >= 60
                          //       ? "bg-orange-500"
                          //       : risks.climate.overall >= 40
                          //         ? "bg-amber-500"
                          //         : risks.climate.overall >= 20
                          //           ? "bg-yellow-500"
                          //           : "bg-green-500"
                          // }
                        />

                        <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                          <div className="flex flex-col items-center">
                            <Sun className="h-3 w-3 mb-1" />
                            <span>Heat</span>
                            <span className={getRiskColor(risks.climate.factors.heat)}>
                              {risks.climate.factors.heat}%
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <Sun className="h-3 w-3 mb-1" />
                            <span>Drought</span>
                            <span className={getRiskColor(risks.climate.factors.drought)}>
                              {risks.climate.factors.drought}%
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <Droplets className="h-3 w-3 mb-1" />
                            <span>Flood</span>
                            <span className={getRiskColor(risks.climate.factors.flood)}>
                              {risks.climate.factors.flood}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

                <div>
                  <h3 className="font-semibold mb-4">Recommended Actions</h3>
                  <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                    <h4 className="font-medium mb-2">Based on current risk assessment:</h4>
                    <ul className="space-y-2 text-sm">
                      {risks.disease.overall >= 60 && (
                        <li className="flex items-start gap-2">
                          <Droplets className="h-4 w-4 text-blue-500 mt-0.5" />
                          <span>
                            Apply a preventative biological fungicide within the next 3-5 days to control powdery mildew
                            development.
                          </span>
                        </li>
                      )}
                      {risks.pest.overall >= 60 && (
                        <li className="flex items-start gap-2">
                          <Bug className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>
                            Apply biological pest control for aphids immediately. Monitor field edges where infestations
                            typically begin.
                          </span>
                        </li>
                      )}
                      {risks.climate.overall >= 40 && (
                        <li className="flex items-start gap-2">
                          <Sun className="h-4 w-4 text-amber-500 mt-0.5" />
                          <span>
                            Ensure adequate irrigation to mitigate heat stress. Consider applying biostimulants to
                            improve crop resilience.
                          </span>
                        </li>
                      )}
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Continue regular monitoring of field conditions and pest populations.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

