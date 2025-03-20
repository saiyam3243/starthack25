import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Calendar, FileText, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface ProductDetailProps {
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
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Info className="h-4 w-4" />
          Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>Biological product details</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="relative h-48 w-full mb-4 rounded-md overflow-hidden">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill style={{ objectFit: "cover" }} />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Badge>{product.type}</Badge>
              <span className="text-sm text-gray-500">{product.price}</span>
            </div>

            <p className="text-sm mb-4">{product.description}</p>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Key Benefits</h4>
              <ul className="space-y-1">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <Tabs defaultValue="usage">
              <TabsList className="mb-4">
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="composition">Composition</TabsTrigger>
                <TabsTrigger value="safety">Safety</TabsTrigger>
              </TabsList>

              <TabsContent value="usage">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Compatible Crops</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.compatibility.map((crop, index) => (
                        <Badge key={index} variant="outline">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Application Timing</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-green-600" />
                      <span>{product.applicationTiming}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Application Rate</h4>
                    <p className="text-sm">{product.applicationRate || "Refer to product label"}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Efficacy Rating</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600 rounded-full"
                          style={{ width: `${product.efficacy}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{product.efficacy}%</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="composition">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Active Ingredients</h4>
                    <p className="text-sm">{product.composition || "Detailed composition information not available"}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Storage Conditions</h4>
                    <p className="text-sm">
                      {product.storageConditions || "Store in a cool, dry place away from direct sunlight"}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="safety">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Safety Period</h4>
                    <p className="text-sm">
                      {product.safetyPeriod || "Refer to product label for pre-harvest interval"}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Environmental Impact</h4>
                    <p className="text-sm">
                      This biological product has minimal environmental impact and is safe for beneficial insects when
                      used as directed.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-1">Handling Precautions</h4>
                    <p className="text-sm">
                      Wear appropriate protective equipment when handling. Wash hands after use. Keep out of reach of
                      children.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-between items-center">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Download Datasheet
              </Button>

              <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

