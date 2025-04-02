"use client"
import { Button } from "@/components/ui/button"

export interface PromptSuggestionProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
  className?: string
}

export function PromptSuggestion({ suggestions, onSelect, className = "" }: PromptSuggestionProps) {
  if (!suggestions.length) return null

  return (
    <div className={`flex flex-wrap gap-2 my-3 ${className}`}>
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="text-xs bg-background hover:bg-muted"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  )
}

