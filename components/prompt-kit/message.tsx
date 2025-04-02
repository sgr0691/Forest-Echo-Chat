"use client"

import type React from "react"

import { useState } from "react"
import { Markdown } from "./markdown"
import { ExternalLink, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CodeBlock } from "./code-block"

interface Source {
  title: string
  url: string
  verified?: boolean
}

interface MessageProps {
  role: "user" | "assistant" | "system"
  content: string
  sources?: Source[]
  avatar?: React.ReactNode
  isLoading?: boolean
  markdown?: boolean
  codeBlocks?: {
    language?: string
    code: string
  }[]
  toolOutput?: {
    name: string
    output: string
  }
  className?: string
}

export function Message({
  role,
  content,
  sources,
  avatar,
  isLoading = false,
  markdown = true,
  codeBlocks = [],
  toolOutput,
  className,
}: MessageProps) {
  const [expanded, setExpanded] = useState(true)

  // Hide system messages that are just the default greeting
  if (role === "system" && content.includes("I'm your AI assistant")) {
    return null
  }

  const isUser = role === "user"
  const isAssistant = role === "assistant"
  const isSystem = role === "system"

  // Extract code blocks from content if not provided explicitly
  if (codeBlocks.length === 0 && content.includes("```")) {
    const extractedBlocks: Array<{ language?: string; code: string }> = []

    // Safer regex approach
    const codeBlockRegex = /```([\w-]*)\n([\s\S]*?)```/g
    let match

    const tempContent = content
    while ((match = codeBlockRegex.exec(tempContent)) !== null) {
      extractedBlocks.push({
        language: match[1] || "plaintext",
        code: match[2].trim(),
      })
    }

    if (extractedBlocks.length > 0) {
      codeBlocks = extractedBlocks

      // Remove code blocks from content to avoid duplication
      content = content.replace(/```([\w-]*)\n([\s\S]*?)```/g, "")
    }
  }

  // Ghibli-inspired avatars based on role
  const ghibliAvatar = (
    <div
      className={cn(
        "relative h-10 w-10 rounded-full flex items-center justify-center overflow-hidden",
        isUser ? "bg-ghibli-sunset" : isAssistant ? "bg-ghibli-forest" : "bg-ghibli-stone",
        isUser ? "animate-sway" : isAssistant ? "animate-float" : "",
      )}
    >
      {isUser ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
            clipRule="evenodd"
          />
        </svg>
      ) : isAssistant ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  )

  return (
    <div
      className={cn(
        "py-6 transition-all relative",
        isUser ? "bg-ghibli-cloud bg-opacity-20" : "",
        !expanded && "py-3",
        className,
      )}
    >
      {/* Decorative elements */}
      {isAssistant && (
        <>
          <div className="ghibli-leaf top-2 right-4 animate-sway" style={{ animationDelay: "0.5s" }}></div>
          <div className="ghibli-leaf bottom-2 left-8 animate-sway" style={{ animationDelay: "1.2s" }}></div>
        </>
      )}
      {isUser && <div className="ghibli-cloud top-2 left-4 animate-float" style={{ animationDelay: "0.8s" }}></div>}

      <div className="max-w-3xl mx-auto px-4">
        <div className="ghibli-paper p-5 flex items-start gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0 mt-1">{avatar || ghibliAvatar}</div>

          <div className="flex-1 min-w-0">
            {/* Message header with role and expand/collapse button */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-ghibli-forest">
                {isUser ? "You" : isAssistant ? "Spirit Guide" : "Whisper"}
                {isLoading && (
                  <span className="ml-2 text-ghibli-stone inline-flex items-center">
                    <span className="animate-pulse">typing</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-ghibli-stone hover:text-ghibli-forest hover:bg-transparent"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </Button>
            </div>

            {/* Message content */}
            {expanded && (
              <div className="space-y-4">
                {/* Main content */}
                <div className="prose max-w-none text-ghibli-stone">
                  {markdown ? <Markdown content={content} /> : <p>{content}</p>}
                </div>

                {/* Code blocks */}
                {codeBlocks.length > 0 && (
                  <div className="space-y-4 mt-4">
                    {codeBlocks.map((block, index) => (
                      <CodeBlock key={index} language={block.language} code={block.code} />
                    ))}
                  </div>
                )}

                {/* Tool output */}
                {toolOutput && (
                  <div className="mt-4 border-2 border-ghibli-meadow rounded-xl overflow-hidden">
                    <div className="bg-ghibli-meadow bg-opacity-20 px-4 py-2 text-sm font-medium text-ghibli-forest">
                      Magic Tool: {toolOutput.name}
                    </div>
                    <div className="p-4 text-sm font-mono whitespace-pre-wrap text-ghibli-stone">
                      {toolOutput.output}
                    </div>
                  </div>
                )}

                {/* Sources */}
                {sources && sources.length > 0 && (
                  <div className="mt-4 border-t-2 border-ghibli-cloud pt-3">
                    <p className="text-sm font-medium text-ghibli-forest">Ancient Scrolls:</p>
                    <ul className="mt-2 space-y-2">
                      {sources.map((source, index) => (
                        <li key={index} className="flex items-start">
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-ghibli-forest hover:text-ghibli-sunset hover:underline flex items-center transition-colors"
                          >
                            <ExternalLink size={14} className="mr-1 flex-shrink-0" />
                            <span className="truncate">{source.title || source.url}</span>
                            {source.verified !== undefined && (
                              <span className="ml-2 flex-shrink-0">
                                {source.verified ? (
                                  <CheckCircle size={14} className="text-ghibli-forest" />
                                ) : (
                                  <AlertTriangle size={14} className="text-ghibli-sunset" />
                                )}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

