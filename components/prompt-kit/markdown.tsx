"use client"
import type { MarkdownProps } from "@/lib/prompt-kit-types"

export function Markdown({ content }: MarkdownProps) {
  // This is a simplified version - in a real implementation,
  // you would use a library like react-markdown

  // Basic markdown parsing for demonstration
  const formatMarkdown = (text: string) => {
    // Convert headers
    text = text.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
    text = text.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
    text = text.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')

    // Convert bold and italic
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>")

    // Convert lists
    text = text.replace(/^\* (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
    text = text.replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>')
    text = text.replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 list-decimal">$2</li>')

    // Convert paragraphs
    text = text.replace(/\n\n/g, '</p><p class="my-2">')

    // Wrap in paragraph
    text = '<p class="my-2">' + text + "</p>"

    return text
  }

  return <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }} />
}

