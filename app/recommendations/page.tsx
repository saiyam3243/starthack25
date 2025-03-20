"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ThumbsUp, Filter, ArrowUpDown, ShoppingCart, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import RecommendationFilter from "@/components/recommendation-filter"
import EnhancedProductCard from "@/components/enhanced-product-card"
import DataFetcher from "@/components/data-fetcher"
import { fetchProductData } from "@/lib/api-services"

export default function Recommendations() {
  const [farmData, setFarmData] = useState(null)
  const [riskAssessment, setRiskAssessment] = useState(null)
  const [recommendations, setRecommendations] = useState(null)
  const [products, setProducts] = useState([])
  const [activeTab, setActiveTab] = useState("all")
  const [loading, setLoading] = useState(true)

  // Fetch product data on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchProductData()
        setProducts(productData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product data:", error)
        setLoading(false)
      }
    }

    getProducts()
  }, [])

  // Filter products based on active tab
  const filteredProducts = () => {
    if (!recommendations) {
      return products
    }

    const recommendedProducts = recommendations.recommendations || []

    if (activeTab === "all") {
      return recommendedProducts
    }

    return recommendedProducts.filter((rec) => {
      if (activeTab === "pest") {
        return rec.product.type === "Pest Control"
      } else if (activeTab === "disease") {
        return rec.product.type === "Disease Control"
      } else if (activeTab === "soil") {
        return rec.product.type === "Soil Health" || rec.product.type === "Growth Promoter"
      }
      return true
    })
  }

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
          <h1 className="text-3xl font-bold">Biological Product Recommendations</h1>
          <p className="text-gray-500">Personalized recommendations for your farm</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {!recommendations && (
        <div className="mb-8">
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>No personalized recommendations yet</AlertTitle>
            <AlertDescription>
              Fetch your farm data to get personalized recommendations based on your specific conditions.
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <RecommendationFilter />
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Recommendations</TabsTrigger>
              <TabsTrigger value="pest">Pest Control</TabsTrigger>
              <TabsTrigger value="disease">Disease Control</TabsTrigger>
              <TabsTrigger value="soil">Soil Health</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts().map((rec, index) => (
                  <EnhancedProductCard
                    key={rec.product ? rec.product.id : index}
                    product={rec.product || rec}
                    applicationTiming={rec.applicationTiming}
                    score={rec.score}
                    cropType={rec.cropType}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pest">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts().map((rec, index) => (
                  <EnhancedProductCard
                    key={rec.product ? rec.product.id : index}
                    product={rec.product || rec}
                    applicationTiming={rec.applicationTiming}
                    score={rec.score}
                    cropType={rec.cropType}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="disease">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts().map((rec, index) => (
                  <EnhancedProductCard
                    key={rec.product ? rec.product.id : index}
                    product={rec.product || rec}
                    applicationTiming={rec.applicationTiming}
                    score={rec.score}
                    cropType={rec.cropType}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="soil">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts().map((rec, index) => (
                  <EnhancedProductCard
                    key={rec.product ? rec.product.id : index}
                    product={rec.product || rec}
                    applicationTiming={rec.applicationTiming}
                    score={rec.score}
                    cropType={rec.cropType}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {recommendations && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Application Calendar
                </CardTitle>
                <CardDescription>Recommended application schedule for your crops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.recommendations &&
                    recommendations.recommendations.slice(0, 3).map((rec, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`
                            ${
                              rec.applicationTiming.urgency === "High"
                                ? "bg-red-50 text-red-700 border-red-200"
                                : rec.applicationTiming.urgency === "Medium-High"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : rec.applicationTiming.urgency === "Medium"
                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                    : "bg-green-50 text-green-700 border-green-200"
                            }
                          `}
                            >
                              {rec.applicationTiming.window}
                            </Badge>
                            <h3 className="font-semibold">{rec.product.name}</h3>
                          </div>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Order Now
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">
                          Apply to {rec.cropType} crop{" "}
                          {rec.product.type === "Pest Control"
                            ? "to control pest infestation"
                            : rec.product.type === "Disease Control"
                              ? "to prevent disease development"
                              : "to improve soil health and plant vigor"}
                          . Best applied in the early morning.
                        </p>
                      </div>
                    ))}

                  {!recommendations.recommendations && (
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-gray-600">
                        No application schedule available yet. Fetch your farm data to get personalized recommendations.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-green-600" />
                Farmer Success Stories
              </CardTitle>
              <CardDescription>See how other farmers in your region have benefited from these products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Rajesh Patel, Pune</h3>
                    <Badge>Cotton Farmer</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    "Using BioDefend Plus reduced aphid damage by 85% compared to last season. My yield increased by 20%
                    and I didn't have to use any chemical pesticides."
                  </p>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">Anita Sharma, Nagpur</h3>
                    <Badge>Mixed Crop Farmer</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    "SoilVital Pro has transformed my farm's soil health. After just one season, I noticed improved
                    water retention and healthier plants. My input costs have decreased while yields have increased."
                  </p>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View More Success Stories
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

