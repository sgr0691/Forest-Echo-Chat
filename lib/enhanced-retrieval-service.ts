import { knowledgeBase, type QAPair } from "./knowledge-base"
import { webSearchService } from "./browserbase-service"
import { contentProcessor, type ProcessedContent } from "./content-processor"

interface RetrievalOptions {
  useWebSearch: boolean
  maxWebResults: number
  verifyWithMultipleSources: boolean
  includeScreenshots: boolean
}

export class EnhancedRetrievalService {
  private knowledgeBase: QAPair[]
  private webContentCache: Map<string, ProcessedContent[]>
  private cacheExpiryTime = 3600000 // 1 hour in milliseconds

  constructor(knowledgeBase: QAPair[]) {
    this.knowledgeBase = knowledgeBase
    this.webContentCache = new Map()
  }

  /**
   * Find relevant QA pairs from static knowledge base
   */
  findRelevantStaticContent(query: string, limit = 3): QAPair[] {
    const queryWords = query.toLowerCase().split(" ")

    // Score each QA pair based on keyword matches
    const scoredPairs = this.knowledgeBase.map((pair) => {
      let score = 0

      // Check for keyword matches
      queryWords.forEach((word) => {
        if (word.length <= 3) return // Skip short words

        // Check keywords
        if (pair.keywords.some((keyword) => keyword.includes(word))) {
          score += 3
        }

        // Check question
        if (pair.question.toLowerCase().includes(word)) {
          score += 2
        }

        // Check answer
        if (pair.answer.toLowerCase().includes(word)) {
          score += 1
        }
      })

      return { pair, score }
    })

    // Sort by score and return top results
    return scoredPairs
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.pair)
  }

  /**
   * Retrieve web content for a query
   */
  async retrieveWebContent(query: string, options: RetrievalOptions): Promise<ProcessedContent[]> {
    try {
      // Check cache first
      const cacheKey = query.toLowerCase()
      const cachedContent = this.webContentCache.get(cacheKey)

      if (cachedContent && Date.now() - new Date(cachedContent[0].timestamp).getTime() < this.cacheExpiryTime) {
        return cachedContent
      }

      // Perform web search
      const searchResults = await webSearchService.searchWeb(query, {
        numResults: options.maxWebResults,
        captureScreenshots: options.includeScreenshots,
      })

      // Process each result
      const processedResults: ProcessedContent[] = []
      for (const result of searchResults) {
        try {
          const processed = await contentProcessor.processWebContent(result.metadata.url, query)
          processedResults.push(processed)
        } catch (error) {
          console.error(`Error processing content from ${result.metadata.url}:`, error)
        }
      }

      // Sort by relevance
      const sortedResults = processedResults.sort((a, b) => b.relevanceScore - a.relevanceScore)

      // Cache results
      this.webContentCache.set(cacheKey, sortedResults)

      return sortedResults
    } catch (error) {
      console.error(`Error retrieving web content for query "${query}":`, error)

      // Return empty array on error
      return []
    }
  }

  /**
   * Verify information across multiple sources
   */
  verifyInformation(webResults: ProcessedContent[]): { verified: boolean; confidenceScore: number } {
    if (webResults.length < 2) {
      return { verified: false, confidenceScore: 0 }
    }

    try {
      // Simple verification - check if key information appears in multiple sources
      // In production, use more sophisticated NLP techniques
      const mainResult = webResults[0]
      const otherResults = webResults.slice(1)

      // Extract key sentences from main result (simplified)
      const mainSentences = mainResult.text.split(".").filter((s) => s.trim().length > 20)

      let matchCount = 0
      let totalChecks = 0

      for (const sentence of mainSentences) {
        if (totalChecks >= 5) break // Limit checks to avoid excessive processing

        const keyPhrases = sentence
          .split(" ")
          .filter((word) => word.length > 5)
          .slice(0, 3)

        if (keyPhrases.length < 2) continue

        totalChecks++

        // Check if key phrases appear in other results
        const phrasePattern = keyPhrases.join(".*")
        const regex = new RegExp(phrasePattern, "i")

        if (otherResults.some((result) => regex.test(result.text))) {
          matchCount++
        }
      }

      const confidenceScore = totalChecks > 0 ? matchCount / totalChecks : 0
      return {
        verified: confidenceScore > 0.5,
        confidenceScore,
      }
    } catch (error) {
      console.error("Error verifying information:", error)
      return { verified: false, confidenceScore: 0 }
    }
  }

  /**
   * Combine static and web-based knowledge
   */
  async retrieveEnhancedContent(
    query: string,
    options: RetrievalOptions = {
      useWebSearch: true,
      maxWebResults: 3,
      verifyWithMultipleSources: true,
      includeScreenshots: false,
    },
  ): Promise<{
    staticResults: QAPair[]
    webResults: QAPair[]
    verification?: { verified: boolean; confidenceScore: number }
  }> {
    try {
      // Get static content
      const staticResults = this.findRelevantStaticContent(query)

      // If web search is disabled or we have good static results, return early
      if (
        !options.useWebSearch ||
        (staticResults.length >= 2 && staticResults[0].keywords.some((k) => query.toLowerCase().includes(k)))
      ) {
        return { staticResults, webResults: [] }
      }

      // Get web content
      const webContent = await this.retrieveWebContent(query, options)

      // Convert to QA pairs
      const webResults = webContent.map((content) => contentProcessor.convertToQAPair(content, query))

      // Verify information if requested
      let verification
      if (options.verifyWithMultipleSources && webContent.length >= 2) {
        verification = this.verifyInformation(webContent)
      }

      return {
        staticResults,
        webResults,
        verification,
      }
    } catch (error) {
      console.error(`Error retrieving enhanced content for query "${query}":`, error)

      // Return just static results on error
      const staticResults = this.findRelevantStaticContent(query)
      return { staticResults, webResults: [] }
    }
  }

  /**
   * Schedule regular content collection for specific topics
   */
  async scheduleContentCollection(topics: string[], intervalHours = 24) {
    // This would typically be set up with a cron job or similar
    // For demonstration, we'll just show the function

    const collectContent = async () => {
      console.log(`Scheduled content collection running for ${topics.length} topics`)

      for (const topic of topics) {
        try {
          const webContent = await this.retrieveWebContent(topic, {
            useWebSearch: true,
            maxWebResults: 5,
            verifyWithMultipleSources: true,
            includeScreenshots: false,
          })

          console.log(`Collected ${webContent.length} new items for topic: ${topic}`)

          // In a real implementation, you would:
          // 1. Process this content
          // 2. Store it in your database
          // 3. Update your knowledge base
        } catch (error) {
          console.error(`Error collecting content for topic ${topic}:`, error)
        }
      }
    }

    // Initial collection
    await collectContent()

    // Schedule regular collection
    // In a real implementation, use a proper scheduler
    console.log(`Content collection scheduled to run every ${intervalHours} hours`)

    return {
      message: `Content collection scheduled for ${topics.length} topics every ${intervalHours} hours`,
      topics,
    }
  }
}

export const enhancedRetrievalService = new EnhancedRetrievalService(knowledgeBase)

