"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SoilHealthProps {
  soilData?: {
    overall: number
    factors: {
      nutrients: number
      structure: number
      biology: number
    }
    details?: {
      nitrogen?: number
      phosphorus?: number
      potassium?: number
      organicMatter?: number
      ph?: number
      moisture?: number
      microbialActivity?: number
    }
  }
}

export default function SoilHealthVisualization({ soilData }: SoilHealthProps) {
  const [mounted, setMounted] = useState(false)

  // Default data if none provided
  const defaultData = {
    overall: 55,
    factors: {
      nutrients: 60,
      structure: 55,
      biology: 50,
    },
    details: {
      nitrogen: 30,
      phosphorus: 60,
      potassium: 85,
      organicMatter: 55,
      ph: 6.5,
      moisture: 70,
      microbialActivity: 50,
    },
  }

  const data = soilData || defaultData

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Soil Health</CardTitle>
          <CardDescription>Loading soil health data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full bg-gray-100 rounded-lg animate-pulse"></div>
        </CardContent>
      </Card>
    )
  }

  // Helper function to get color based on value
  const getColorClass = (value: number) => {
    if (value >= 80) return "bg-green-500"
    if (value >= 60) return "bg-green-400"
    if (value >= 40) return "bg-yellow-400"
    if (value >= 20) return "bg-orange-400"
    return "bg-red-500"
  }

  // Helper function to get text color based on value
  const getTextColorClass = (value: number) => {
    if (value >= 80) return "text-green-700"
    if (value >= 60) return "text-green-600"
    if (value >= 40) return "text-yellow-600"
    if (value >= 20) return "text-orange-600"
    return "text-red-700"
  }

  // Helper function to get description based on value
  const getDescription = (value: number) => {
    if (value >= 80) return "Excellent"
    if (value >= 60) return "Good"
    if (value >= 40) return "Fair"
    if (value >= 20) return "Poor"
    return "Critical"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Soil Health</CardTitle>
        <CardDescription>Current soil conditions for your farm</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Overall Soil Health</h3>
            <span className={`font-medium ${getTextColorClass(data.overall)}`}>
              {getDescription(data.overall)} ({data.overall}%)
            </span>
          </div>
          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full ${getColorClass(data.overall)}`} style={{ width: `${data.overall}%` }}></div>
          </div>
        </div>

        <Tabs defaultValue="visual">
          <TabsList className="mb-4">
            <TabsTrigger value="visual">Visual Representation</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="visual">
            <div className="relative h-80 w-full bg-gray-100 rounded-lg overflow-hidden">
              {/* Soil Profile Visualization */}
              <div className="absolute inset-0 flex flex-col">
                {/* Sky/Air */}
                <div className="h-8 bg-blue-100"></div>

                {/* Topsoil */}
                <div className="relative h-24 bg-gradient-to-b from-brown-400 to-brown-500 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Topsoil</span>
                  </div>

                  {/* Nutrients Indicator */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`absolute top-2 left-1/4 h-4 w-4 rounded-full ${getColorClass(data.factors.nutrients)}`}
                        ></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Nutrients: {data.factors.nutrients}%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Subsoil */}
                <div className="relative h-32 bg-gradient-to-b from-brown-600 to-brown-700 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Subsoil</span>
                  </div>

                  {/* Structure Indicator */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`absolute top-1/3 right-1/4 h-4 w-4 rounded-full ${getColorClass(data.factors.structure)}`}
                        ></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Soil Structure: {data.factors.structure}%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Parent Material */}
                <div className="relative flex-grow bg-gradient-to-b from-brown-800 to-gray-800 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Parent Material</span>
                  </div>

                  {/* Biology Indicator */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`absolute top-1/3 left-1/3 h-4 w-4 rounded-full ${getColorClass(data.factors.biology)}`}
                        ></div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Biological Activity: {data.factors.biology}%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Legend */}
              <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 p-2 rounded-md text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span>Excellent</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <span>Fair</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span>Poor</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="text-sm font-medium mb-1">Nutrients</h4>
                <div className="inline-block h-16 w-16 rounded-full border-4 border-gray-200 flex items-center justify-center">
                  <div
                    className={`h-12 w-12 rounded-full ${getColorClass(data.factors.nutrients)} flex items-center justify-center`}
                  >
                    <span className="text-white font-bold">{data.factors.nutrients}%</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium mb-1">Structure</h4>
                <div className="inline-block h-16 w-16 rounded-full border-4 border-gray-200 flex items-center justify-center">
                  <div
                    className={`h-12 w-12 rounded-full ${getColorClass(data.factors.structure)} flex items-center justify-center`}
                  >
                    <span className="text-white font-bold">{data.factors.structure}%</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-sm font-medium mb-1">Biology</h4>
                <div className="inline-block h-16 w-16 rounded-full border-4 border-gray-200 flex items-center justify-center">
                  <div
                    className={`h-12 w-12 rounded-full ${getColorClass(data.factors.biology)} flex items-center justify-center`}
                  >
                    <span className="text-white font-bold">{data.factors.biology}%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="detailed">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Nutrient Levels</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Nitrogen (N)</span>
                      <span className="text-sm">{getDescription(data.details?.nitrogen || 0)}</span>
                    </div>
                    <Progress value={data.details?.nitrogen || 0} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Phosphorus (P)</span>
                      <span className="text-sm">{getDescription(data.details?.phosphorus || 0)}</span>
                    </div>
                    <Progress value={data.details?.phosphorus || 0} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Potassium (K)</span>
                      <span className="text-sm">{getDescription(data.details?.potassium || 0)}</span>
                    </div>
                    <Progress value={data.details?.potassium || 0} className="h-2 bg-gray-200" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Physical Properties</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Organic Matter</span>
                      <span className="text-sm">{getDescription(data.details?.organicMatter || 0)}</span>
                    </div>
                    <Progress value={data.details?.organicMatter || 0} className="h-2 bg-gray-200" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">pH Level</span>
                      <span className="text-sm">{data.details?.ph || 6.5}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden relative">
                      <div className="absolute inset-0 flex">
                        <div className="h-full bg-red-500 flex-grow"></div>
                        <div className="h-full bg-orange-400 flex-grow"></div>
                        <div className="h-full bg-green-500 flex-grow"></div>
                        <div className="h-full bg-blue-400 flex-grow"></div>
                        <div className="h-full bg-purple-500 flex-grow"></div>
                      </div>
                      <div
                        className="absolute h-4 w-2 bg-black top-1/2 transform -translate-y-1/2 rounded-full"
                        style={{ left: `${((data.details?.ph || 6.5) / 14) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Acidic (0)</span>
                      <span>Neutral (7)</span>
                      <span>Alkaline (14)</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Moisture</span>
                      <span className="text-sm">{getDescription(data.details?.moisture || 0)}</span>
                    </div>
                    <Progress value={data.details?.moisture || 0} className="h-2 bg-gray-200" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Biological Activity</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Microbial Activity</span>
                      <span className="text-sm">{getDescription(data.details?.microbialActivity || 0)}</span>
                    </div>
                    <Progress value={data.details?.microbialActivity || 0} className="h-2 bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full">
                Download Detailed Soil Report
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

