import { webSearchService } from "./browserbase-service"
import type { QAPair } from "./knowledge-base"

export interface ProcessedContent {
  text: string
  title: string
  url: string
  timestamp: string
  relevanceScore: number
}

export class ContentProcessor {
  private webSearchService: typeof webSearchService

  constructor(webSearchService: typeof webSearchService) {
    this.webSearchService = webSearchService
  }

  /**
   * Extract main content from HTML
   */
  extractMainContent(html: string): string {
    // Simple content extraction - in production, use a more robust solution
    // Remove scripts, styles, and navigation elements
    const cleanHtml = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, "")
      .replace(/<header\b[^<]*(?:(?!<\/header>)<[^<]*)*<\/header>/gi, "")
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, "")

    // Extract text content
    const textContent = cleanHtml
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()

    return textContent
  }

  /**
   * Calculate relevance score based on keyword matching
   */
  calculateRelevanceScore(content: string, query: string): number {
    const keywords = query
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 3)
    let score = 0

    keywords.forEach((keyword) => {
      const regex = new RegExp(keyword, "gi")
      const matches = content.match(regex)
      if (matches) {
        score += matches.length
      }
    })

    // Normalize score based on content length
    return score / (content.length / 1000) || 0.5 // Provide default if content is empty
  }

  /**
   * Process web content into structured format
   */
  async processWebContent(url: string, query: string): Promise<ProcessedContent> {
    try {
      const sessionId = await this.webSearchService.initSession()
      const response = await this.webSearchService.navigateToUrl(sessionId, url)

      const mainContent = this.extractMainContent(response.content)
      const relevanceScore = this.calculateRelevanceScore(mainContent, query)

      await this.webSearchService.closeSession(sessionId)

      return {
        text: mainContent,
        title: response.metadata.title,
        url: response.metadata.url,
        timestamp: response.metadata.timestamp,
        relevanceScore,
      }
    } catch (error) {
      console.error(`Error processing web content for ${url}:`, error)

      // Return fallback content
      return {
        text: `This is simulated content for ${url} related to "${query}". The actual content could not be retrieved.`,
        title: `Page about ${query}`,
        url: url,
        timestamp: new Date().toISOString(),
        relevanceScore: 0.5,
      }
    }
  }

  /**
   * Convert web content to QAPair format for RAG
   */
  convertToQAPair(content: ProcessedContent, query: string): QAPair {
    return {
      id: `web-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      question: query,
      answer: `${content.text}\n\nSource: ${content.url} (Retrieved on ${new Date().toISOString().split("T")[0]})`,
      keywords: query
        .toLowerCase()
        .split(" ")
        .filter((word) => word.length > 3),
      category: "web-content",
    }
  }
}

export const contentProcessor = new ContentProcessor(webSearchService)

