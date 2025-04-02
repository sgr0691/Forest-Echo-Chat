import { knowledgeBase, type QAPair } from "./knowledge-base"

export interface RetrievalResult {
  qaMatch: QAPair | null
  confidence: number
  relatedQuestions: string[]
}

export class RetrievalService {
  private knowledgeBase: QAPair[]

  constructor(customKnowledgeBase?: QAPair[]) {
    this.knowledgeBase = customKnowledgeBase || knowledgeBase
  }

  // Search for matching questions based on user input
  search(query: string): RetrievalResult {
    const normalizedQuery = query.toLowerCase().trim()

    // Calculate similarity scores for each QA pair
    const scoredResults = this.knowledgeBase.map((qa) => {
      const questionScore = this.calculateSimilarity(normalizedQuery, qa.question.toLowerCase())
      const keywordScore = this.calculateKeywordMatch(normalizedQuery, qa.keywords)

      // Combined score with higher weight on exact question matches
      const score = questionScore * 0.7 + keywordScore * 0.3

      return {
        qa,
        score,
      }
    })

    // Sort by score (highest first)
    scoredResults.sort((a, b) => b.score - a.score)

    // Get the best match and related questions
    const bestMatch = scoredResults[0]
    const relatedQuestions = scoredResults
      .slice(1, 4) // Get next 3 best matches
      .map((result) => result.qa.question)

    // Only return a match if the confidence is above threshold
    const confidenceThreshold = 0.5

    return {
      qaMatch: bestMatch.score >= confidenceThreshold ? bestMatch.qa : null,
      confidence: bestMatch.score,
      relatedQuestions,
    }
  }

  // Simple similarity calculation between two strings
  private calculateSimilarity(query: string, target: string): number {
    // Exact match
    if (query === target) return 1.0

    // Contains the entire query
    if (target.includes(query)) return 0.9

    // Query contains the target
    if (query.includes(target)) return 0.8

    // Check for word overlap
    const queryWords = query.split(/\s+/)
    const targetWords = target.split(/\s+/)

    let matchCount = 0
    for (const word of queryWords) {
      if (word.length < 3) continue // Skip short words
      if (targetWords.some((targetWord) => targetWord.includes(word))) {
        matchCount++
      }
    }

    return matchCount / queryWords.length
  }

  // Calculate keyword match score
  private calculateKeywordMatch(query: string, keywords: string[]): number {
    let matchCount = 0

    for (const keyword of keywords) {
      if (query.includes(keyword.toLowerCase())) {
        matchCount++
      }
    }

    return keywords.length > 0 ? matchCount / keywords.length : 0
  }
}

// Create a singleton instance
export const retrievalService = new RetrievalService()

