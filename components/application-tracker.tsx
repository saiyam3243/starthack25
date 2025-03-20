"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2 } from "lucide-react"

export default function ApplicationTracker() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      product: "BioDefend Plus",
      date: "June 15, 2023",
      crop: "Cotton",
      rate: "1.5 L/ha",
      notes: "Applied in the morning, good weather conditions",
      status: "Completed",
    },
    {
      id: 2,
      product: "MildewGuard Bio",
      date: "July 2, 2023",
      crop: "Chickpea",
      rate: "1 kg/ha",
      notes: "Applied as preventative measure",
      status: "Completed",
    },
    {
      id: 3,
      product: "SoilVital Pro",
      date: "May 10, 2023",
      crop: "All Fields",
      rate: "2 kg/ha",
      notes: "Applied during field preparation",
      status: "Completed",
    },
    {
      id: 4,
      product: "BioDefend Plus",
      date: "August 20, 2023",
      crop: "Cotton",
      rate: "1.5 L/ha",
      notes: "Follow-up application",
      status: "Scheduled",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Application Records</h3>
        <Button size="sm" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Add Application
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-medium">Product</th>
              <th className="text-left py-2 px-4 font-medium">Date</th>
              <th className="text-left py-2 px-4 font-medium">Crop</th>
              <th className="text-left py-2 px-4 font-medium">Rate</th>
              <th className="text-left py-2 px-4 font-medium">Notes</th>
              <th className="text-left py-2 px-4 font-medium">Status</th>
              <th className="text-left py-2 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{app.product}</td>
                <td className="py-2 px-4">{app.date}</td>
                <td className="py-2 px-4">{app.crop}</td>
                <td className="py-2 px-4">{app.rate}</td>
                <td className="py-2 px-4">{app.notes}</td>
                <td className="py-2 px-4">
                  <Badge
                    className={
                      app.status === "Completed"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    }
                  >
                    {app.status}
                  </Badge>
                </td>
                <td className="py-2 px-4">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

