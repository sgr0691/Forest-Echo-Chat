"use client"

import React, { useRef, useState } from "react"
import { SendHorizontal, PaperclipIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PromptInputProps {
  value?: string
  onChange?: (value: string) => void
  onSubmit: () => void
  onSendMessage?: (message: string) => void
  placeholder?: string
  disabled?: boolean
  attachments?: any[]
  onAttachmentChange?: (attachments: any[]) => void
  actions?: React.ReactNode
  isLoading?: boolean
  className?: string
}

export function PromptInput({
  value = "",
  onChange,
  onSubmit,
  onSendMessage,
  placeholder = "Type a message...",
  disabled = false,
  attachments = [],
  onAttachmentChange,
  actions,
  isLoading = false,
  className,
}: PromptInputProps) {
  const [inputValue, setInputValue] = useState(value)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleSubmit = () => {
    if (onSendMessage && inputValue.trim()) {
      onSendMessage(inputValue)
      setInputValue("")
    } else {
      onSubmit()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onAttachmentChange || !e.target.files?.length) return

    const newAttachments = Array.from(e.target.files).map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      type: file.type,
      file,
      previewUrl: URL.createObjectURL(file),
    }))

    onAttachmentChange([...attachments, ...newAttachments])

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveAttachment = (id: string) => {
    if (!onAttachmentChange) return
    onAttachmentChange(attachments.filter((a) => a.id !== id))
  }

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [inputValue])

  return (
    <div className={cn("relative ghibli-paper p-3", className)}>
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2 p-2">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="relative rounded-full bg-ghibli-cloud p-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-ghibli-forest">{attachment.name}</span>
                <button
                  type="button"
                  className="text-ghibli-stone hover:text-ghibli-sunset transition-colors"
                  onClick={() => handleRemoveAttachment(attachment.id)}
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={onChange ? value : inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className="min-h-[60px] max-h-[200px] w-full resize-none rounded-xl border-2 border-ghibli-earth bg-white bg-opacity-80 p-3 focus:outline-none focus:ring-0 focus:border-ghibli-forest transition-colors"
            rows={1}
          />
        </div>

        <div className="flex items-center gap-2">
          {onAttachmentChange && (
            <>
              <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled || isLoading}
                className="h-10 w-10 rounded-full text-ghibli-forest hover:text-ghibli-sunset hover:bg-white hover:bg-opacity-50"
              >
                <PaperclipIcon className="h-5 w-5" />
              </Button>
            </>
          )}

          {actions}

          <Button
            type="button"
            size="icon"
            className={cn(
              "h-10 w-10 rounded-full transition-all duration-300",
              disabled || isLoading || (!onChange && !inputValue.trim())
                ? "bg-ghibli-stone text-white"
                : "bg-ghibli-forest text-white hover:bg-ghibli-meadow hover:scale-110",
            )}
            onClick={handleSubmit}
            disabled={disabled || isLoading || (!onChange && !inputValue.trim())}
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizontal className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  )
}

