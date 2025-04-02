// Check if Browserbase API key is set
export function checkBrowserbaseConfig() {
  const apiKey = process.env.BROWSERBASE_API_KEY

  if (!apiKey) {
    console.warn("BROWSERBASE_API_KEY environment variable is not set. Web browsing features will not work.")
    return false
  }

  return true
}

// Get Browserbase configuration
export function getBrowserbaseConfig() {
  return {
    apiKey: process.env.BROWSERBASE_API_KEY || "",
    isConfigured: checkBrowserbaseConfig(),
  }
}

