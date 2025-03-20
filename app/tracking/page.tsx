import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LineChart, BarChart, Calendar, FileText, Plus, Download, ArrowUpDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import SeasonalChart from "@/components/seasonal-chart"
import ApplicationTracker from "@/components/application-tracker"

export default function Tracking() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Outcome Tracking</h1>
          <p className="text-gray-500">Monitor the effectiveness of biological products</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Record
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="current" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current Season</TabsTrigger>
          <TabsTrigger value="historical">Historical Data</TabsTrigger>
          <TabsTrigger value="comparison">Year-over-Year</TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-green-600" />
                  Seasonal Performance
                </CardTitle>
                <CardDescription>Track the effectiveness of biological products over time</CardDescription>
              </CardHeader>
              <CardContent>
                <SeasonalChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Season Summary</CardTitle>
                <CardDescription>Current season statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Pest Control Effectiveness</h3>
                    <div className="flex items-center gap-4">
                      <Progress value={75} className="h-2 flex-grow bg-gray-200" />
                      <span className="text-sm font-medium">75%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">25% improvement from last season</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Disease Control Effectiveness</h3>
                    <div className="flex items-center gap-4">
                      <Progress value={85} className="h-2 flex-grow bg-gray-200" />
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">15% improvement from last season</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Soil Health Improvement</h3>
                    <div className="flex items-center gap-4">
                      <Progress value={60} className="h-2 flex-grow bg-gray-200" />
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">20% improvement from last season</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Yield Projection</h3>
                    <div className="flex items-center gap-4">
                      <Progress value={80} className="h-2 flex-grow bg-gray-200" />
                      <span className="text-sm font-medium">80%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Expected 15% increase in yield</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Application Tracker
              </CardTitle>
              <CardDescription>Record and monitor product applications</CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicationTracker />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-green-600" />
                  Product Performance
                </CardTitle>
                <CardDescription>Effectiveness of applied biological products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">BioDefend Plus</h3>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Excellent</Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <Progress value={95} className="h-2 flex-grow bg-gray-200" />
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <p className="text-sm text-gray-600">Applied on: June 15, 2023</p>
                    <p className="text-sm text-gray-600">
                      Aphid population reduced by 95% within 7 days of application.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">MildewGuard Bio</h3>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Good</Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <Progress value={80} className="h-2 flex-grow bg-gray-200" />
                      <span className="text-sm font-medium">80%</span>
                    </div>
                    <p className="text-sm text-gray-600">Applied on: July 2, 2023</p>
                    <p className="text-sm text-gray-600">
                      Powdery mildew incidence reduced by 80% compared to untreated areas.
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">SoilVital Pro</h3>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Moderate</Badge>
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <Progress value={60} className="h-2 flex-grow bg-gray-200" />
                      <span className="text-sm font-medium">60%</span>
                    </div>
                    <p className="text-sm text-gray-600">Applied on: May 10, 2023</p>
                    <p className="text-sm text-gray-600">
                      Soil microbial activity increased by 60%. Results still developing.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Field Observations
                </CardTitle>
                <CardDescription>Recent observations and notes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Cotton Field - North Block</h3>
                      <p className="text-sm text-gray-500">August 5, 2023</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Plants showing excellent vigor after BioDefend Plus application. Aphid population remains low.
                      Some signs of heat stress on outer edges of field.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Cotton</Badge>
                      <Badge variant="outline">Pest Control</Badge>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Chickpea Field - East Block</h3>
                      <p className="text-sm text-gray-500">July 28, 2023</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      MildewGuard Bio application has prevented powdery mildew spread despite favorable conditions.
                      Plants showing good nodulation after SoilVital Pro application.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Chickpea</Badge>
                      <Badge variant="outline">Disease Control</Badge>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">All Fields - Soil Sampling</h3>
                      <p className="text-sm text-gray-500">July 15, 2023</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Soil samples show increased microbial activity in areas treated with SoilVital Pro. Organic matter
                      content has increased by 0.5% compared to pre-season levels.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Soil Health</Badge>
                      <Badge variant="outline">Analysis</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="historical">
          <Card>
            <CardHeader>
              <CardTitle>Historical Data</CardTitle>
              <CardDescription>View and analyze past seasons' data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Previous Seasons</h3>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4" />
                    Sort
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">2022-2023 Season</h3>
                      <Badge>Complete</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Crops</p>
                        <p className="font-medium">Cotton, Chickpea</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Products Used</p>
                        <p className="font-medium">4 Biological Products</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Yield</p>
                        <p className="font-medium">15% above regional average</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Detailed Report
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">2021-2022 Season</h3>
                      <Badge>Complete</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Crops</p>
                        <p className="font-medium">Cotton, Wheat</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Products Used</p>
                        <p className="font-medium">2 Biological Products</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Yield</p>
                        <p className="font-medium">5% above regional average</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Detailed Report
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">2020-2021 Season</h3>
                      <Badge>Complete</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Crops</p>
                        <p className="font-medium">Cotton, Sorghum</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Products Used</p>
                        <p className="font-medium">1 Biological Product</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Yield</p>
                        <p className="font-medium">Regional average</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Detailed Report
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Year-over-Year Comparison</CardTitle>
              <CardDescription>Compare performance across multiple seasons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                {/* This would be a chart component showing year-over-year comparison */}
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Year-over-Year Comparison Chart</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Pest Control Effectiveness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">2023</span>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                        <Progress value={75} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">2022</span>
                          <span className="text-sm font-medium">60%</span>
                        </div>
                        <Progress value={60} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">2021</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <Progress value={45} className="h-2 bg-gray-200" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Disease Control Effectiveness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">2023</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">2022</span>
                          <span className="text-sm font-medium">70%</span>
                        </div>
                        <Progress value={70} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">2021</span>
                          <span className="text-sm font-medium">50%</span>
                        </div>
                        <Progress value={50} className="h-2 bg-gray-200" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Yield Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">2023</span>
                          <span className="text-sm font-medium">15%</span>
                        </div>
                        <Progress value={75} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">2022</span>
                          <span className="text-sm font-medium">10%</span>
                        </div>
                        <Progress value={50} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">2021</span>
                          <span className="text-sm font-medium">5%</span>
                        </div>
                        <Progress value={25} className="h-2 bg-gray-200" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

