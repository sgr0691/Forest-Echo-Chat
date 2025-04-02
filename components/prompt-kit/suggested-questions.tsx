"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void
}

export function SuggestedQuestions({ onSelectQuestion }: SuggestedQuestionsProps) {
  // Ghibli-themed questions that will get special handling
  const suggestions = [
    "Tell me about the spirits of the forest",
    "What magic can I learn on my journey?",
    "How do I find balance with nature?",
    "Tell me a story about the wind",
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-ghibli-forest">
        <Sparkles className="h-4 w-4" />
        <span>Ask the spirits about...</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="bg-white bg-opacity-60 border-ghibli-meadow text-ghibli-forest hover:bg-ghibli-cloud hover:text-ghibli-forest"
            onClick={() => onSelectQuestion(suggestion)}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  )
}

