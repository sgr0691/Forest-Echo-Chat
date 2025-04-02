interface WebSearchConfig {
  apiKey: string
  baseUrl: string
  useSimulation?: boolean
}

interface WebSearchResponse {
  content: string
  metadata: {
    url: string
    title: string
    timestamp: string
    contentType: string
  }
  screenshots?: string[]
}

export class WebSearchService {
  private config: WebSearchConfig
  private useSimulation: boolean

  constructor(config: WebSearchConfig) {
    this.config = config
    // Enable simulation if explicitly set or if no API key is provided
    this.useSimulation = config.useSimulation || !config.apiKey

    if (this.useSimulation) {
      console.warn("Web search is running in simulation mode. Search results will be simulated.")
    }
  }

  /**
   * Initialize a headless browser session
   */
  async initSession() {
    if (this.useSimulation) {
      return "simulation-session-id"
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to initialize browser session: ${response.statusText}`)
      }

      const data = await response.json()
      return data.sessionId
    } catch (error) {
      console.error("Error initializing browser session:", error)
      // Fall back to simulation mode if real API fails
      this.useSimulation = true
      console.warn("Falling back to simulation mode due to API error")
      return "simulation-session-id-fallback"
    }
  }

  /**
   * Navigate to a URL and retrieve content
   */
  async navigateToUrl(sessionId: string, url: string, options = { captureScreenshot: false }) {
    if (this.useSimulation) {
      return this.getSimulatedResponse(url)
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/sessions/${sessionId}/navigate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          url,
          captureScreenshot: options.captureScreenshot,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to navigate to URL: ${response.statusText}`)
      }

      return (await response.json()) as WebSearchResponse
    } catch (error) {
      console.error(`Error navigating to ${url}:`, error)
      // Fall back to simulated data
      return this.getSimulatedResponse(url)
    }
  }

  /**
   * Extract text content from a webpage
   */
  async extractContent(sessionId: string, selector: string) {
    if (this.useSimulation) {
      return `Simulated content for selector ${selector}`
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/sessions/${sessionId}/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          script: `
            const elements = document.querySelectorAll('${selector}');
            return Array.from(elements).map(el => el.textContent).join('\\n');
          `,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to extract content: ${response.statusText}`)
      }

      const data = await response.json()
      return data.result
    } catch (error) {
      console.error("Error extracting content:", error)
      return `Simulated content for selector ${selector} (fallback)`
    }
  }

  /**
   * Search the web for a query
   */
  async searchWeb(query: string, options = { numResults: 3, captureScreenshots: false }) {
    if (this.useSimulation) {
      return this.getSimulatedSearchResults(query, options.numResults)
    }

    try {
      const sessionId = await this.initSession()
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`

      await this.navigateToUrl(sessionId, searchUrl)

      // Extract search result links
      const links = await this.extractContent(sessionId, 'a[href^="http"]:not([href^="https://www.google.com"])')
      const urls = links.split("\n").slice(0, options.numResults)

      const results: WebSearchResponse[] = []

      // Visit each result and extract content
      for (const url of urls) {
        if (url && url.startsWith("http")) {
          const pageContent = await this.navigateToUrl(sessionId, url, {
            captureScreenshot: options.captureScreenshots,
          })
          results.push(pageContent)
        }
      }

      // Close session
      await this.closeSession(sessionId)

      return results
    } catch (error) {
      console.error("Error searching web:", error)
      // Fall back to simulated data
      return this.getSimulatedSearchResults(query, options.numResults)
    }
  }

  /**
   * Close a browser session
   */
  async closeSession(sessionId: string) {
    if (this.useSimulation) {
      return true
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/sessions/${sessionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to close session: ${response.statusText}`)
      }

      return true
    } catch (error) {
      console.error("Error closing session:", error)
      return true // Return success anyway since it's just cleanup
    }
  }

  /**
   * Generate simulated response for a URL
   */
  private getSimulatedResponse(url: string): WebSearchResponse {
    const domain = new URL(url).hostname

    return {
      content: `<html><body><h1>Simulated content for ${domain}</h1><p>This is simulated content for ${url} because web search is in simulation mode.</p><p>In a real implementation, this would contain the actual HTML content of the page.</p></body></html>`,
      metadata: {
        url: url,
        title: `Simulated page for ${domain}`,
        timestamp: new Date().toISOString(),
        contentType: "text/html",
      },
    }
  }

  /**
   * Generate simulated search results
   */
  private getSimulatedSearchResults(query: string, numResults: number): WebSearchResponse[] {
    const results: WebSearchResponse[] = []

    // Generate simulated results based on the query
    for (let i = 1; i <= numResults; i++) {
      results.push({
        content: `<html><body>
          <h1>Search Result ${i} for "${query}"</h1>
          <div class="content">
            <p>This is simulated content for a search result about ${query}.</p>
            <p>In a real implementation, this would contain actual content from a web page.</p>
            <p>The content would be relevant to your query about ${query}.</p>
            <p>Here are some key points about ${query}:</p>
            <ul>
              <li>Important fact #1 about ${query}</li>
              <li>Important fact #2 about ${query}</li>
              <li>Important fact #3 about ${query}</li>
            </ul>
          </div>
        </body></html>`,
        metadata: {
          url: `https://example.com/result-${i}-${query.replace(/\s+/g, "-").toLowerCase()}`,
          title: `${query} - Search Result ${i}`,
          timestamp: new Date().toISOString(),
          contentType: "text/html",
        },
      })
    }

    return results
  }
}

// Check if we're in a development/preview environment
const isDevelopment = process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview"

// Create the service with the Browserbase API but with a generic name
export const webSearchService = new WebSearchService({
  apiKey: process.env.BROWSERBASE_API_KEY || "",
  baseUrl: "https://api.browserbase.com/v1",
  // Use simulation in development or if API key is missing
  useSimulation: isDevelopment || !process.env.BROWSERBASE_API_KEY,
})

// Export with the original name for backward compatibility
export const browserbaseService = webSearchService

