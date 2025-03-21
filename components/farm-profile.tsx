import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, MapPin } from "lucide-react"

export default function FarmProfile() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">Patel Organic Farm</h3>
          <div className="flex items-center text-gray-500 gap-1 mt-1">
            <MapPin className="h-4 w-4" />
            <span>Pune, Maharashtra, India</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Farm Size</p>
          <p className="font-medium">10 hectares</p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-1">Current Growing Season</p>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">Active</Badge>
          <span className="text-sm">June 2023 - March 2024</span>
        </div>
      </div>
    </div>
  )
}

