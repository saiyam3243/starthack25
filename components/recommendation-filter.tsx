"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Filter, X } from "lucide-react"

export default function RecommendationFilter() {
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [efficacyRange, setEfficacyRange] = useState([50])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Product Type</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="pest" />
                <Label htmlFor="pest">Pest Control</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="disease" />
                <Label htmlFor="disease">Disease Control</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="soil" />
                <Label htmlFor="soil">Soil Health</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="growth" />
                <Label htmlFor="growth">Growth Promoters</Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Crop Compatibility</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="cotton" />
                <Label htmlFor="cotton">Cotton</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="chickpea" />
                <Label htmlFor="chickpea">Chickpea</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="wheat" />
                <Label htmlFor="wheat">Wheat</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="all" />
                <Label htmlFor="all">All Crops</Label>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-3">
              <h3 className="font-medium">Price Range (₹)</h3>
              <span className="text-sm">
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </span>
            </div>
            <Slider defaultValue={priceRange} max={2000} step={100} onValueChange={setPriceRange} className="mb-2" />
          </div>

          <div>
            <div className="flex justify-between mb-3">
              <h3 className="font-medium">Minimum Efficacy</h3>
              <span className="text-sm">{efficacyRange[0]}%</span>
            </div>
            <Slider defaultValue={efficacyRange} max={100} step={5} onValueChange={setEfficacyRange} className="mb-2" />
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">Apply Filters</Button>
            <Button variant="outline" className="flex items-center gap-1">
              <X className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

