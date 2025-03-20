import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, ShoppingCart, ThumbsUp } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  name: string
  type: string
  image: string
  description: string
  efficacy: number
  compatibility: string
  applicationTiming: string
  benefits: string[]
  price: string
}

export default function ProductCard({
  name,
  type,
  image,
  description,
  efficacy,
  compatibility,
  applicationTiming,
  benefits,
  price,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={image || "/placeholder.svg"} alt={name} fill style={{ objectFit: "cover" }} />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge className="mb-2">{type}</Badge>
            <CardTitle>{name}</CardTitle>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 fill-current ${i < Math.round(efficacy / 20) ? "text-amber-500" : "text-gray-300"}`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Efficacy Rating</span>
              <span className="text-sm font-medium">{efficacy}%</span>
            </div>
            <Progress value={efficacy} className="h-2 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Compatible With</p>
              <p className="font-medium">{compatibility}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Application Timing</p>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-green-600" />
                <p className="text-sm">{applicationTiming}</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Key Benefits</p>
            <ul className="space-y-1">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <ThumbsUp className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="font-semibold">{price}</p>
        <Button className="bg-green-600 hover:bg-green-700">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

