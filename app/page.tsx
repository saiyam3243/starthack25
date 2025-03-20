import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Leaf, CloudRain, LineChart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            <h1 className="text-2xl font-bold">FarmSmart</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
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
              <li>
                <Link href="/profile" className="hover:underline">
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart Biological Solutions for Your Farm</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Get AI-powered recommendations for biological products based on your specific crop, soil, and climate
              conditions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-green-800 hover:bg-gray-100">
                <Link href="/dashboard" className="flex items-center gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-800">
                <Link href="#learn-more">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Farmer Signup Section */}
        <section className="py-16 bg-white" id="signup-section">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Create Your Farm Profile</h2>
                <p className="text-lg mb-6">
                  Tell us about your farm to get personalized recommendations for biological products that will help you
                  improve crop health and yield while reducing chemical inputs.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Personalized Recommendations</h3>
                      <p>
                        Get product recommendations tailored to your specific crops, soil type, and local climate
                        conditions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Risk Assessment</h3>
                      <p>Identify potential pest, disease, and climate risks before they affect your crops.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full text-green-600 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Track Your Results</h3>
                      <p>
                        Monitor the effectiveness of biological products and improve your farming practices over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Card className="border-2 border-green-100 shadow-lg">
                  <CardHeader>
                    <CardTitle>Create Your Farm Profile</CardTitle>
                    <CardDescription>Fill in the details below to get started</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="farmerName">Your Name</Label>
                          <Input id="farmerName" placeholder="Enter your full name" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="farmName">Farm Name</Label>
                          <Input id="farmName" placeholder="Enter your farm name" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input id="phoneNumber" placeholder="Enter your phone number" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor="farmSize">Farm Size</Label>
                          <Input id="farmSize" placeholder="Enter size" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="farmSizeUnit">Unit</Label>
                          <Select>
                            <SelectTrigger id="farmSizeUnit">
                              <SelectValue placeholder="Unit" defaultValue="hectares" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hectares">Hectares</SelectItem>
                              <SelectItem value="acres">Acres</SelectItem>
                              <SelectItem value="bigha">Bigha</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="soilType">Soil Type</Label>
                        <Select>
                          <SelectTrigger id="soilType">
                            <SelectValue placeholder="Select soil type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="black_cotton">Black Cotton Soil</SelectItem>
                            <SelectItem value="red_soil">Red Soil</SelectItem>
                            <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                            <SelectItem value="laterite">Laterite Soil</SelectItem>
                            <SelectItem value="sandy">Sandy Soil</SelectItem>
                            <SelectItem value="clay">Clay Soil</SelectItem>
                            <SelectItem value="loamy">Loamy Soil</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Primary Crops</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="cotton" />
                            <Label htmlFor="cotton" className="font-normal">
                              Cotton
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="chickpea" />
                            <Label htmlFor="chickpea" className="font-normal">
                              Chickpea
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="wheat" />
                            <Label htmlFor="wheat" className="font-normal">
                              Wheat
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="rice" />
                            <Label htmlFor="rice" className="font-normal">
                              Rice
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="maize" />
                            <Label htmlFor="maize" className="font-normal">
                              Maize
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="vegetables" />
                            <Label htmlFor="vegetables" className="font-normal">
                              Vegetables
                            </Label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="farmingMethod">Farming Method</Label>
                        <Select>
                          <SelectTrigger id="farmingMethod">
                            <SelectValue placeholder="Select farming method" defaultValue="conventional" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conventional">Conventional</SelectItem>
                            <SelectItem value="organic">Organic</SelectItem>
                            <SelectItem value="natural">Natural Farming</SelectItem>
                            <SelectItem value="integrated">Integrated Farming</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additionalInfo">Additional Information</Label>
                        <Textarea
                          id="additionalInfo"
                          placeholder="Any specific challenges or goals for your farm?"
                          className="resize-none"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="font-normal">
                          I agree to the terms of service and privacy policy
                        </Label>
                      </div>

                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                        Create Farm Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
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
                  <p>
                    Our AI analyzes historical and forecast data to identify potential risks to your crops, helping you
                    prepare and mitigate issues before they arise.
                  </p>
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
                  <p>
                    Based on your specific conditions, our system recommends the most effective biological products to
                    protect your crops and improve soil health.
                  </p>
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
                  <p>
                    Record and analyze the effectiveness of biological products over time, allowing our AI to provide
                    increasingly accurate recommendations each season.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Farm's Sustainability?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of farmers across India who are using biological products to protect their crops and
              improve soil health.
            </p>
            <Button size="lg" className="bg-green-800 hover:bg-green-900">
              <a href="#signup-section">Create Your Farm Profile</a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">FarmSmart</h3>
              <p>AI-powered biological product recommendations for sustainable farming.</p>
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
              <p>support@farmsmart.com</p>
              <p>+91 123 456 7890</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} FarmSmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

