import { enhancedRetrievalService } from "./enhanced-retrieval-service"

interface QueryAnalysisResult {
  requiresCurrentData: boolean
  isFactualQuery: boolean
  isComplexQuery: boolean
  hasVisualElements: boolean
  confidence: number
}

interface ProcessQueryOptions {
  model?: string
  useWebSearch?: boolean
}

export class RetrievalMiddleware {
  /**
   * Analyze query to determine retrieval strategy
   */
  analyzeQuery(query: string): QueryAnalysisResult {
    // Check if query likely requires current data
    const currentDataPatterns = [
      /current|latest|recent|today|now|update/i,
      /news|event|happen/i,
      /price|stock|market|weather/i,
      /\b202[3-5]\b/, // Years 2023-2025
    ]

    const requiresCurrentData = currentDataPatterns.some((pattern) => pattern.test(query))

    // Check if query is factual
    const factualPatterns = [
      /what is|who is|when|where|why|how|explain/i,
      /define|meaning|definition/i,
      /fact|true|false/i,
    ]

    const isFactualQuery = factualPatterns.some((pattern) => pattern.test(query))

    // Check if query is complex
    const complexPatterns = [
      /compare|difference|versus|vs/i,
      /analyze|analysis|evaluate/i,
      /relationship|between|correlation/i,
      /impact|effect|affect|influence/i,
    ]

    const isComplexQuery = complexPatterns.some((pattern) => pattern.test(query)) || query.split(" ").length > 10

    // Check if query might require visual elements
    const visualPatterns = [
      /show|image|picture|photo|diagram|chart|graph/i,
      /visual|visually|look like/i,
      /screenshot|interface|design/i,
    ]

    const hasVisualElements = visualPatterns.some((pattern) => pattern.test(query))

    // Calculate confidence in this analysis
    let confidence = 0.5 // Base confidence

    if (requiresCurrentData) confidence += 0.2
    if (isFactualQuery) confidence += 0.1
    if (isComplexQuery) confidence += 0.1
    if (hasVisualElements) confidence += 0.1

    return {
      requiresCurrentData,
      isFactualQuery,
      isComplexQuery,
      hasVisualElements,
      confidence: Math.min(confidence, 1.0),
    }
  }

  /**
   * Determine retrieval options based on query analysis and user preferences
   */
  determineRetrievalOptions(analysis: QueryAnalysisResult, options?: ProcessQueryOptions) {
    return {
      useWebSearch: options?.useWebSearch !== false && (analysis.requiresCurrentData || analysis.confidence < 0.7),
      maxWebResults: analysis.isComplexQuery ? 5 : 3,
      verifyWithMultipleSources: analysis.isFactualQuery,
      includeScreenshots: analysis.hasVisualElements,
    }
  }

  /**
   * Process a query through the middleware
   */
  async processQuery(query: string, options?: ProcessQueryOptions) {
    try {
      // Analyze the query
      const analysis = this.analyzeQuery(query)

      // Determine retrieval options
      const retrievalOptions = this.determineRetrievalOptions(analysis, options)

      // Retrieve content using the enhanced service
      const results = await enhancedRetrievalService.retrieveEnhancedContent(query, retrievalOptions)

      return {
        query,
        analysis,
        retrievalOptions,
        results,
        model: options?.model || "gpt-4o",
      }
    } catch (error) {
      console.error(`Error processing query "${query}" through middleware:`, error)

      // Return minimal results on error
      return {
        query,
        analysis: this.analyzeQuery(query),
        retrievalOptions: {
          useWebSearch: false,
          maxWebResults: 0,
          verifyWithMultipleSources: false,
          includeScreenshots: false,
        },
        results: {
          staticResults: enhancedRetrievalService.findRelevantStaticContent(query),
          webResults: [],
        },
        model: options?.model || "gpt-4o",
      }
    }
  }
}

export const retrievalMiddleware = new RetrievalMiddleware()

