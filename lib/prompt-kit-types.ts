import type React from "react"
// Type definitions for Prompt-Kit components
export interface PromptInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  placeholder?: string
  disabled?: boolean
  attachments?: Attachment[]
  onAttachmentChange?: (attachments: Attachment[]) => void
  actions?: React.ReactNode
  isLoading?: boolean
  className?: string
}

export interface MessageProps {
  content: string
  role: "user" | "assistant" | "system" | "tool"
  timestamp?: Date
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

export interface ChatContainerProps {
  messages: MessageProps[]
  children?: React.ReactNode
  className?: string
}

export interface MarkdownProps {
  content: string
  className?: string
}

export interface CodeBlockProps {
  language?: string
  code: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  className?: string
}

export interface PromptSuggestionProps {
  suggestions: string[]
  onSelect: (suggestion: string) => void
  className?: string
}

export interface Attachment {
  id: string
  name: string
  type: string
  url?: string
  file?: File
  previewUrl?: string
}

export interface ProviderOption {
  id: string
  name: string
  icon: React.ReactNode
}

