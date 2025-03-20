// API services for fetching data from CE-Hub and other sources

// CE-Hub API endpoints
const CE_HUB_BASE_URL = "https://api.ce-hub.org"

// Function to fetch weather data from CE-Hub
export async function fetchWeatherData(latitude: number, longitude: number, startDate: string, endDate: string) {
  const url = `${CE_HUB_BASE_URL}/weather?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}

// Function to fetch soil data from CE-Hub
export async function fetchSoilData(latitude: number, longitude: number) {
  const url = `${CE_HUB_BASE_URL}/soil?latitude=${latitude}&longitude=${longitude}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch soil data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching soil data:", error)
    throw error
  }
}

// Function to fetch vegetation health data from CE-Hub
export async function fetchVegetationData(latitude: number, longitude: number, startDate: string, endDate: string) {
  const url = `${CE_HUB_BASE_URL}/vegetation?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch vegetation data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching vegetation data:", error)
    throw error
  }
}

// Function to fetch land use data from CE-Hub
export async function fetchLandUseData(latitude: number, longitude: number) {
  const url = `${CE_HUB_BASE_URL}/landuse?latitude=${latitude}&longitude=${longitude}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch land use data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching land use data:", error)
    throw error
  }
}

// Function to fetch topography data from CE-Hub
export async function fetchTopographyData(latitude: number, longitude: number) {
  const url = `${CE_HUB_BASE_URL}/topography?latitude=${latitude}&longitude=${longitude}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch topography data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching topography data:", error)
    throw error
  }
}

// Function to fetch product data cards
export async function fetchProductData() {
  const url = "/api/products" // This will be our internal API endpoint

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching product data:", error)
    throw error
  }
}

// Function to get risk assessment based on agronomy stress algorithms
export async function getRiskAssessment(farmData: any) {
  const url = "/api/risk-assessment" // This will be our internal API endpoint

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(farmData),
    })

    if (!response.ok) {
      throw new Error(`Failed to get risk assessment: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting risk assessment:", error)
    throw error
  }
}

// Function to get product recommendations based on farm data and risk assessment
export async function getProductRecommendations(farmData: any, riskAssessment: any) {
  const url = "/api/recommendations" // This will be our internal API endpoint

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ farmData, riskAssessment }),
    })

    if (!response.ok) {
      throw new Error(`Failed to get product recommendations: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error getting product recommendations:", error)
    throw error
  }
}

