import { type NextRequest, NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs"
import path from "path"

// Convert exec to Promise-based
const execPromise = promisify(exec)

// This is a server-side route handler that will process recommendations using Python
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const { farmData, riskAssessment } = await request.json()

    // Create a temporary JSON file to pass data to Python
    const tempFilePath = path.join("/tmp", "recommendation_data.json")
    fs.writeFileSync(tempFilePath, JSON.stringify({ farmData, riskAssessment }))

    // Execute the Python script for recommendations
    const { stdout, stderr } = await execPromise(
      `python3 ${path.join(process.cwd(), "scripts/recommendations.py")} ${tempFilePath}`,
    )

    if (stderr) {
      console.error("Python script error:", stderr)
      return NextResponse.json({ error: "Error processing recommendations" }, { status: 500 })
    }

    // Parse the Python script output
    const recommendations = JSON.parse(stdout)

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath)

    // Return the recommendations
    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error in recommendations:", error)
    return NextResponse.json({ error: "Failed to process recommendations" }, { status: 500 })
  }
}

