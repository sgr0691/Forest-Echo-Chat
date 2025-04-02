import { NextResponse } from "next/server"

export async function GET() {
  const webSearchApiKey = process.env.BROWSERBASE_API_KEY
  const isDevelopment = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview"

  return NextResponse.json({
    webSearchConfigured: !!webSearchApiKey,
    simulationMode: isDevelopment || !webSearchApiKey,
    demoMode: !process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === "",
    timestamp: new Date().toISOString(),
  })
}

