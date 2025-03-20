import { NextResponse } from "next/server"

// This is a server-side route handler that will return product data
// In a real application, this would fetch from a database or external API
export async function GET() {
  try {
    // Mock product data based on product data cards
    // In a real application, this would come from an actual database or API
    const products = [
      {
        id: 1,
        name: "BioDefend Plus",
        type: "Pest Control",
        image: "/placeholder.svg?height=200&width=300",
        description:
          "A natural biological pesticide that targets aphids and other common cotton pests without harming beneficial insects.",
        efficacy: 95,
        compatibility: ["Cotton", "Chickpea"],
        applicationTiming: "Apply during early flowering stage",
        benefits: ["Targets aphids specifically", "Safe for pollinators", "Residual protection for up to 14 days"],
        price: "₹1,200 per liter",
        composition: "Bacillus thuringiensis strain HD-1 (10%), Natural plant extracts (5%), Inert ingredients (85%)",
        applicationRate: "1.5 L/ha",
        safetyPeriod: "3 days",
        storageConditions: "Store in a cool, dry place away from direct sunlight",
      },
      {
        id: 2,
        name: "MildewGuard Bio",
        type: "Disease Control",
        image: "/placeholder.svg?height=200&width=300",
        description: "A biological fungicide that prevents and treats powdery mildew in a variety of crops.",
        efficacy: 85,
        compatibility: ["Cotton", "Chickpea", "Wheat"],
        applicationTiming: "Apply at first signs of disease or as preventative",
        benefits: ["Prevents and treats powdery mildew", "Strengthens plant immune system", "Rainfast within 1 hour"],
        price: "₹950 per kg",
        composition: "Bacillus subtilis strain QST 713 (5%), Trichoderma harzianum (3%), Inert ingredients (92%)",
        applicationRate: "1 kg/ha",
        safetyPeriod: "1 day",
        storageConditions: "Store in a cool, dry place below 25°C",
      },
      {
        id: 3,
        name: "SoilVital Pro",
        type: "Soil Health",
        image: "/placeholder.svg?height=200&width=300",
        description:
          "A consortium of beneficial microorganisms that improve soil structure, nutrient availability, and plant root development.",
        efficacy: 80,
        compatibility: ["All crops"],
        applicationTiming: "Apply during field preparation or early growth stages",
        benefits: ["Increases nitrogen fixation", "Improves nutrient uptake", "Enhances soil structure"],
        price: "₹850 per kg",
        composition:
          "Azotobacter chroococcum (2%), Bacillus megaterium (2%), Pseudomonas fluorescens (1%), Organic carrier (95%)",
        applicationRate: "2 kg/ha",
        safetyPeriod: "None",
        storageConditions: "Store in a cool, dry place away from direct sunlight",
      },
      {
        id: 4,
        name: "BioRoot Stimulator",
        type: "Growth Promoter",
        image: "/placeholder.svg?height=200&width=300",
        description: "A biological root stimulator that enhances root development and nutrient uptake.",
        efficacy: 75,
        compatibility: ["All crops"],
        applicationTiming: "Apply during early vegetative growth",
        benefits: ["Promotes root development", "Increases drought tolerance", "Enhances nutrient uptake"],
        price: "₹1,100 per liter",
        composition: "Seaweed extract (10%), Humic acids (5%), Amino acids (3%), Inert ingredients (82%)",
        applicationRate: "1 L/ha",
        safetyPeriod: "None",
        storageConditions: "Store in a cool, dry place between 5-30°C",
      },
      {
        id: 5,
        name: "NemControl Bio",
        type: "Pest Control",
        image: "/placeholder.svg?height=200&width=300",
        description: "A biological nematicide that controls root-knot nematodes and other soil-borne pests.",
        efficacy: 80,
        compatibility: ["Cotton", "Vegetables"],
        applicationTiming: "Apply during field preparation or early growth stages",
        benefits: ["Controls nematodes naturally", "Improves root health", "Long-lasting protection"],
        price: "₹1,350 per kg",
        composition: "Paecilomyces lilacinus (2%), Pochonia chlamydosporia (1%), Organic carrier (97%)",
        applicationRate: "2.5 kg/ha",
        safetyPeriod: "None",
        storageConditions: "Store in a cool, dry place below 25°C",
      },
      {
        id: 6,
        name: "BlightShield Organic",
        type: "Disease Control",
        image: "/placeholder.svg?height=200&width=300",
        description: "A biological fungicide that protects against early and late blight in crops.",
        efficacy: 80,
        compatibility: ["Cotton", "Vegetables"],
        applicationTiming: "Apply preventatively or at first signs of disease",
        benefits: ["Controls multiple types of blight", "Improves plant vigor", "Eco-friendly formulation"],
        price: "₹1,050 per liter",
        composition: "Bacillus amyloliquefaciens strain D747 (5%), Plant extracts (3%), Inert ingredients (92%)",
        applicationRate: "1.5 L/ha",
        safetyPeriod: "1 day",
        storageConditions: "Store in a cool, dry place away from direct sunlight",
      },
    ]

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching product data:", error)
    return NextResponse.json({ error: "Failed to fetch product data" }, { status: 500 })
  }
}

