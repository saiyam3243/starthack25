// API services for fetching data from CE-Hub and other sources

// CE-Hub API endpoints
const CE_HUB_BASE_URL =
  "https://services.cehub.syngenta-ais.com/api/Forecast/ShortRangeForecastHourly?wkt=point%287%2042%29&startDate=2025-03-01&endDate=2025-03-20&supplier=Meteoblue&top=20&format=json&ApiKey=d4f087c7-7efc-41b4-9292-0f22b6199215";

const forecast_hourly =
  "https://services.cehub.syngenta-ais.com/api/Forecast/ShortRangeForecastHourly?wkt=point%287%2042%29&startDate=2025-03-01&endDate=2025-03-20&supplier=Meteoblue&top=20&format=json&ApiKey=d4f087c7-7efc-41b4-9292-0f22b6199215";
const forecast_daily =
  "https://services.cehub.syngenta-ais.com/api/Forecast/ShortRangeForecastDaily?wkt=point%287%2042%29&startDate=2025-03-01&endDate=2025-03-20&supplier=Meteoblue&top=20&format=json&ApiKey=d4f087c7-7efc-41b4-9292-0f22b6199215";
const nowcast =
  "https://services.cehub.syngenta-ais.com/api/Forecast/Nowcast?wkt=point%287%2042%29&startDate=2025-03-01&endDate=2025-03-20&supplier=Meteoblue&top=20&format=json&ApiKey=d4f087c7-7efc-41b4-9292-0f22b6199215";

export async function fetchWeatherData1(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
) {
  const url = CE_HUB_BASE_URL;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

// Function to fetch weather data from CE-Hub
export async function fetchWeatherData(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
) {
  const url = `${CE_HUB_BASE_URL}/weather?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

// Function to fetch soil data from CE-Hub
export async function fetchSoilData(latitude: number, longitude: number) {
  const url = `${CE_HUB_BASE_URL}/soil?latitude=${latitude}&longitude=${longitude}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch soil data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching soil data:", error);
    throw error;
  }
}

// Function to fetch vegetation health data from CE-Hub
export async function fetchVegetationData(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
) {
  const url = `${CE_HUB_BASE_URL}/vegetation?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch vegetation data: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching vegetation data:", error);
    throw error;
  }
}

// Function to fetch land use data from CE-Hub
export async function fetchLandUseData(latitude: number, longitude: number) {
  const url = `${CE_HUB_BASE_URL}/landuse?latitude=${latitude}&longitude=${longitude}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch land use data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching land use data:", error);
    throw error;
  }
}

// Function to fetch topography data from CE-Hub
export async function fetchTopographyData(latitude: number, longitude: number) {
  const url = `${CE_HUB_BASE_URL}/topography?latitude=${latitude}&longitude=${longitude}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch topography data: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching topography data:", error);
    throw error;
  }
}

// Function to fetch product data cards
export async function fetchProductData() {
  const url = "/api/products"; // This will be our internal API endpoint

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
}

// Function to get risk assessment based on agronomy stress algorithms
export async function getRiskAssessment(farmData: any) {
  const url = "/api/risk-assessment"; // This will be our internal API endpoint

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(farmData),
    });

    if (!response.ok) {
      throw new Error(`Failed to get risk assessment: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting risk assessment:", error);
    throw error;
  }
}

const fetch_location_api =
  "https://api.positionstack.com/v1/forward?access_key=5729e40e63059907a9158a57800aca3c&query=";
// https://api.positionstack.com/v1/forward?access_key=5729e40e63059907a9158a57800aca3c&query=Main%20road%20Kareli%20MP,%20India

// Function to get product recommendations based on farm data and risk assessment
export async function getCoordinates(name: any, state: any) {
  const url =
    fetch_location_api + name + "%20" + state + ",%20India" + "&output=json"; // This will be our internal API endpoint

  console.log("url", url);

  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${response.statusText}`);
    }

    const data = await response.json(); // Parse response as JSON

    if (data.data && data.data.length > 0) {
      const { latitude, longitude } = data.data[0]; // Extract first object's coordinates
      return {
        lat: Math.floor(latitude), // Get integer part
        lon: Math.floor(longitude), // Get integer part
      };
    } else {
      throw new Error("No location data found");
    }
  } catch (error) {
    console.error("Error getting coordinates:", error);
    throw error;
  }
}

export async function fetchForecastDaily(latitude: number, longitude: number, measurementLabel?: string) {
  const baseUrl =
    "https://services.cehub.syngenta-ais.com/api/Forecast/ShortRangeForecastDaily";
  const wkt = `point(${longitude} ${latitude})`; // WKT format: point(longitude latitude)
  console.log("wkt", wkt);
  const apiKey = "d4f087c7-7efc-41b4-9292-0f22b6199215"; // API Key

  // Get today's date and the date 10 days from now in YYYY-MM-DD format
  const today = new Date();
  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 10);

  const startDate = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const endDate = tenDaysLater.toISOString().split("T")[0]; // YYYY-MM-DD

  // Construct the base URL with required parameters
  let url = `${baseUrl}?wkt=${encodeURIComponent(wkt)}&startDate=${startDate}&endDate=${endDate}&supplier=Meteoblue&top=20&format=json&ApiKey=${apiKey}`;

  // Append measurementLabel if provided
  if (measurementLabel) {
    measurementLabel = measurementLabel.replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29');
    url = url + `&measureLabel=${measurementLabel}`;
    console.log("newurl", url);
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}
