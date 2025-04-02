"use client"

import { useRef, useEffect } from "react"
import type { ChatContainerProps } from "@/lib/prompt-kit-types"
import { Message } from "./message"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function ChatContainer({ messages = [], children, className }: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className={cn("flex h-full flex-col bg-white", className)}>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {messages && messages.map((message, index) => <Message key={index} {...message} />)}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>
      {children}
    </div>
  )
}

