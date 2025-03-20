import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, ShoppingCart, ThumbsUp, Clock } from "lucide-react"
import Image from "next/image"
import ProductDetail from "@/components/product-detail"

interface EnhancedProductCardProps {
  product: {
    id: number
    name: string
    type: string
    image: string
    description: string
    efficacy: number
    compatibility: string[]
    applicationTiming: string
    benefits: string[]
    price: string
    composition?: string
    applicationRate?: string
    safetyPeriod?: string
    storageConditions?: string
  }
  applicationTiming?: {
    window: string
    urgency: string
    date: string
  }
  score?: number
  cropType?: string
}

export default function EnhancedProductCard({ product, applicationTiming, score, cropType }: EnhancedProductCardProps) {
  // Format compatibility array to string
  const compatibilityString = Array.isArray(product.compatibility)
    ? product.compatibility.join(", ")
    : product.compatibility

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill style={{ objectFit: "cover" }} />
        {score && score > 80 && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            Top Recommendation
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="mb-2">{product.type}</Badge>
            <CardTitle>{product.name}</CardTitle>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 fill-current ${i < Math.round(product.efficacy / 20) ? "text-amber-500" : "text-gray-300"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Efficacy Rating</span>
              <span className="text-sm font-medium">{product.efficacy}%</span>
            </div>
            <Progress value={product.efficacy} className="h-2 bg-gray-200" />
          </div>

          {applicationTiming && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-amber-600" />
                <h4 className="font-medium text-amber-800">Recommended Application</h4>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Badge
                  variant="outline"
                  className={`
                  ${
                    applicationTiming.urgency === "High"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : applicationTiming.urgency === "Medium-High"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : applicationTiming.urgency === "Medium"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-green-50 text-green-700 border-green-200"
                  }
                `}
                >
                  {applicationTiming.window}
                </Badge>
                {cropType && <Badge variant="outline">{cropType}</Badge>}
              </div>
              <p className="text-xs text-gray-600">Apply by: {applicationTiming.date}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Compatible With</p>
              <p className="font-medium">{compatibilityString}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Application Timing</p>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-green-600" />
                <p className="text-sm">{product.applicationTiming}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Key Benefits</p>
            <ul className="space-y-1">
              {product.benefits.slice(0, 2).map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <ThumbsUp className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
              {product.benefits.length > 2 && (
                <li className="text-sm text-gray-500">+ {product.benefits.length - 2} more benefits</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{product.price}</p>
          <ProductDetail product={product} />
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

