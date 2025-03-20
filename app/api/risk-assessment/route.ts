import { type NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs"
import path from "path"

// Convert exec to Promise-based
const execPromise = promisify(exec)

// This is a server-side route handler that will process farm data using Python
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const farmData = await request.json()

    // Create a temporary JSON file to pass data to Python
    const tempFilePath = path.join("/tmp", "farm_data.json")
    fs.writeFileSync(tempFilePath, JSON.stringify(farmData))

    // Execute the Python script for risk assessment
    // Note: In a real production environment, you would need to ensure Python is available
    // and the script is properly deployed. This is a simplified example.
    const { stdout, stderr } = await execPromise(
      `python3 ${path.join(process.cwd(), "scripts/risk_assessment.py")} ${tempFilePath}`,
    )

    if (stderr) {
      console.error("Python script error:", stderr)
      return NextResponse.json({ error: "Error processing risk assessment" }, { status: 500 })
    }

    // Parse the Python script output
    const riskAssessment = JSON.parse(stdout)

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath)

    // Return the risk assessment
    return NextResponse.json(riskAssessment)
  } catch (error) {
    console.error("Error in risk assessment:", error)
    return NextResponse.json({ error: "Failed to process risk assessment" }, { status: 500 })
  }
}

