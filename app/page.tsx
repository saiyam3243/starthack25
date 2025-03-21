'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Leaf, CloudRain, LineChart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { fetchForecastDaily, getCoordinates } from '@/lib/api-services'
import { useRouter } from "next/navigation"
import { Suspense, useState } from "react"

export default function Home() {

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [crop, setCrop] = useState("");
  const [farmSize, setFarmSize] = useState("");

  const router = useRouter();

  const handleGetStarted = async () => {

    setCoordinates(await getCoordinates(name, state));

    // Redirect to dashboard with query parameters
    router.push(
      `/dashboard?lat=${encodeURIComponent(coordinates.lat)}&lon=${encodeURIComponent(coordinates.lon)}&farmSize=${encodeURIComponent(farmSize)}`
    );

  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log("state:", state);
    console.log("city:", name);

    const coords = await getCoordinates(name, state);
    // const forecast = await fetchForecastDaily(coords.lat, coords.lon, "TempAir_DailyMin (C)");
    // console.log("forec:", forecast);

    setCoordinates(coords);

    router.push(
      `/dashboard?lat=${encodeURIComponent(coords.lat)}&lon=${encodeURIComponent(coords.lon)}&farmSize=${encodeURIComponent(farmSize)}&crop=${encodeURIComponent(crop)}`
    );
  };

  return (
    <Suspense className="flex flex-col min-h-screen">
      <header className="bg-green-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <h1 className="text-2xl font-bold">FarmSmart</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart Biological Solutions for Your Farm</h1>
            <div className="text-xl mb-8 max-w-3xl mx-auto">
              Get AI-powered recommendations for biological products based on your specific crop, soil, and climate
              conditions.
            </div>

            {/* <Card className="flex w-1/4 flex-col justify-center p-4 items-center">
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input id="district" placeholder="Enter your district" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="gujarat">Gujarat</SelectItem>
                      <SelectItem value="punjab">Punjab</SelectItem>
                      <SelectItem value="haryana">Haryana</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="telangana">Telangana</SelectItem>
                      <SelectItem value="andhra_pradesh">Andhra Pradesh</SelectItem>
                      <SelectItem value="tamil_nadu">Tamil Nadu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="farmSize">Farm Size</Label>
                  <Input id="farmSize" placeholder="Enter size" />
                </div>
            </Card> */}

            <Card className="border-2 border-green-100 shadow-lg w-1/2 mx-auto text-left">
              <CardHeader>
                <CardTitle>Create Your Farm Profile</CardTitle>
                <CardDescription>Fill in the details below to get started</CardDescription>
              </CardHeader>

              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="district">City/Village Name</Label>
                      <Input
                        id="district"
                        placeholder="Enter your city/village name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select value={state} onValueChange={(value) => setState(value)}>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="maharashtra">Maharashtra</SelectItem>
                          <SelectItem value="gujarat">Gujarat</SelectItem>
                          <SelectItem value="punjab">Punjab</SelectItem>
                          <SelectItem value="haryana">Haryana</SelectItem>
                          <SelectItem value="karnataka">Karnataka</SelectItem>
                          <SelectItem value="telangana">Telangana</SelectItem>
                          <SelectItem value="andhra_pradesh">Andhra Pradesh</SelectItem>
                          <SelectItem value="tamil_nadu">Tamil Nadu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="farmSize">Farm Size (Hectares)</Label>
                      <Input
                        id="farmSize"
                        placeholder="Enter size"
                        value={farmSize}
                        onChange={(e) => setFarmSize(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    Create Farm Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50" id="learn-more">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How FarmSmart Helps You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CloudRain className="h-12 w-12 text-green-600 mb-2" />
                  <CardTitle>Climate & Soil Risk Analysis</CardTitle>
                  <CardDescription>
                    Visualize climate and soil risks specific to your location and crop type.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    Our AI analyzes historical and forecast data to identify potential risks to your crops, helping you
                    prepare and mitigate issues before they arise.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Leaf className="h-12 w-12 text-green-600 mb-2" />
                  <CardTitle>Biological Product Recommendations</CardTitle>
                  <CardDescription>
                    Get personalized recommendations for biological products that best suit your needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    Based on your specific conditions, our system recommends the most effective biological products to
                    protect your crops and improve soil health.
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <LineChart className="h-12 w-12 text-green-600 mb-2" />
                  <CardTitle>Outcome Tracking & Insights</CardTitle>
                  <CardDescription>
                    Track results throughout the season and improve future recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    Record and analyze the effectiveness of biological products over time, allowing our AI to provide
                    increasingly accurate recommendations each season.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Farm's Sustainability?</h2>
            <div className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of farmers across India who are using biological products to protect their crops and
              improve soil health.
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">FarmSmart</h3>
              <div>AI-powered biological product recommendations for sustainable farming.</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/recommendations" className="hover:underline">
                    Recommendations
                  </Link>
                </li>
                <li>
                  <Link href="/tracking" className="hover:underline">
                    Tracking
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:underline">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div>support@farmsmart.com</div>
              <div>+91 123 456 7890</div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <div>&copy; {new Date().getFullYear()} FarmSmart. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </Suspense>
  )
}

