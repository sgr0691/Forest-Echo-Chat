"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import type { CodeBlockProps } from "@/lib/prompt-kit-types"

export function CodeBlock({
  language = "plaintext",
  code,
  showLineNumbers = true,
  showCopyButton = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-xl overflow-hidden border-2 border-ghibli-earth bg-white bg-opacity-80">
      {language && (
        <div className="flex items-center justify-between bg-ghibli-earth bg-opacity-20 px-4 py-2 text-xs text-ghibli-stone">
          <span className="font-medium">{language}</span>
          {showCopyButton && (
            <button
              type="button"
              className="flex items-center gap-1 text-ghibli-forest hover:text-ghibli-sunset transition-colors"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
      <div className="relative overflow-auto p-4 bg-white bg-opacity-60">
        {showLineNumbers ? (
          <table className="border-collapse">
            <tbody>
              {code.split("\n").map((line, i) => (
                <tr key={i}>
                  <td className="pr-4 text-right text-xs text-ghibli-stone select-none">{i + 1}</td>
                  <td>
                    <pre className="font-mono text-sm text-ghibli-stone">{line}</pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <pre className="font-mono text-sm whitespace-pre-wrap text-ghibli-stone">{code}</pre>
        )}
      </div>
    </div>
  )
}

