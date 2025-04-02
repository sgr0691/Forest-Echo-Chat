"use client"

import { useState, useEffect } from "react"
import { ChatContainer } from "@/components/prompt-kit/chat-container"
import { Message } from "@/components/prompt-kit/message"
import { PromptInput } from "@/components/prompt-kit/prompt-input"
import { SuggestedQuestions } from "@/components/prompt-kit/suggested-questions"
import { retrievalMiddleware } from "@/lib/retrieval-middleware"
import { SettingsPanel } from "@/components/settings-panel"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Wind, Trees } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  sources?: {
    title: string
    url: string
    verified?: boolean
  }[]
}

// Ghibli-themed responses for suggested questions
const ghibliResponses: Record<string, string> = {
  "Tell me about the spirits of the forest":
    "The spirits of the forest are ancient, gentle beings that dwell in the oldest trees and clearest streams. They are the guardians of nature's balance, visible only to those with pure hearts and open minds. Some appear as tiny luminescent creatures, while others take the form of majestic animals or ancient tree-like entities.\n\nThese spirits are deeply connected to the natural world - when the forest thrives, they are joyful and generous, blessing travelers with good fortune and guidance. But when nature suffers, they grow quiet and may even become mischievous or melancholic.\n\nMany believe that leaving small offerings - a shiny stone, a perfect leaf, or a moment of quiet appreciation - can earn their favor. Children can often sense their presence more easily than adults, feeling their gentle whispers in the rustling leaves or catching glimpses of their glow between ancient trees at twilight.",

  "What magic can I learn on my journey?":
    "The magic you can learn on your journey isn't about grand spells or dramatic transformations, but rather the subtle, profound magic that exists all around us.\n\nFirst, there is the magic of observation - learning to truly see the world around you. Notice how water flows around obstacles, how plants turn toward the sun, how animals move with purpose and grace. This awareness is the beginning of all magic.\n\nThen there is the magic of patience - understanding that the most meaningful changes happen slowly, like the growth of a mighty tree from a tiny seed. By cultivating patience, you align yourself with the rhythm of the natural world.\n\nThe magic of kindness is perhaps the most powerful of all. A sincere act of compassion can transform not only the recipient but the giver as well. This magic ripples outward in ways we cannot always see but are no less real.\n\nFinally, there is the magic of courage - the willingness to face the unknown, to stand firm in difficult moments, and to be vulnerable when necessary. True courage isn't the absence of fear, but moving forward despite it.\n\nThese magics cannot be forced or rushed. They must be discovered through experience, reflection, and an open heart. But once learned, they will serve you in all aspects of your journey.",

  "How do I find balance with nature?":
    "Finding balance with nature begins with recognition - understanding that you are not separate from the natural world, but an integral part of it. Just as a forest ecosystem thrives through diversity and interconnection, so too does your relationship with nature.\n\nStart by spending time in natural settings without distraction. Sit quietly beside a stream, beneath a tree, or on a hillside. Don't try to fill this time with activity or even meditation - simply be present and observe what unfolds around you.\n\nPractice taking only what you need and giving back when possible. This might mean consuming mindfully, reducing waste, planting native species, or supporting conservation efforts. Small, consistent actions create powerful ripples.\n\nListen to the wisdom of seasonal changes. Nature moves in cycles of growth, abundance, release, and rest. Honor these same cycles within yourself instead of pushing for constant productivity and expansion.\n\nCultivate gratitude for the gifts nature provides - from the air you breathe to the food you eat to the beauty that surrounds you. Expressing thankfulness, even silently, strengthens your connection to the natural world.\n\nRemember that balance isn't a destination but a continuous dance. There will be times when you feel deeply connected and times when you feel distant. The practice is returning to awareness again and again, with patience and without judgment.",

  "Tell me a story about the wind":
    'Long ago, when the world was young, the Wind had no voice. It moved silently through valleys and over mountains, invisible and unheard. Though it could touch everything - rustling leaves, moving clouds, carrying seeds across vast distances - it felt a deep loneliness, for no one acknowledged its presence or work.\n\nOne day, the Wind encountered a young girl sitting alone on a hillside. She was a quiet child from the village below, often overlooked and ignored by others. As the Wind passed by, it gently lifted her hair, and to its surprise, the girl smiled and whispered, "Hello, friend."\n\nAmazed that someone had noticed it, the Wind swirled excitedly around her. The girl laughed - a clear, bright sound that carried across the hillside. The Wind tried to respond but had no voice to share its joy.\n\nSeeing this, the girl began to sing a simple melody. "This can be your voice," she told the Wind. "Carry my song with you."\n\nThe Wind embraced the notes, weaving them into its being. It discovered that by moving through hollow reeds, rustling leaves, or flowing around rocks, it could create sounds - whispers, howls, harmonies, and melodies.\n\nFrom that day forward, the Wind was never silent again. It sang through bamboo forests, hummed across desert dunes, and whistled between city buildings. People began to listen for its voice, finding messages and music in its movements.\n\nAnd the girl? She grew up to become a renowned musician whose compositions were inspired by the Wind\'s ever-changing songs. On quiet evenings, she would still sit on her hillside, now with her own children, teaching them to hear the voice of her oldest friend.\n\nEven now, if you listen carefully when the Wind moves around you, you might catch echoes of that first song - a reminder that friendship can give voice to the voiceless and that the most powerful magic often begins with simply being noticed.',
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "system",
      content: "Welcome to the Ghibli-inspired AI assistant. How may I help you on your journey today?",
    },
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const [model, setModel] = useState("gpt-4o")
  const [showSettings, setShowSettings] = useState(false)
  const [webSearchEnabled, setWebSearchEnabled] = useState(true)
  const [inputText, setInputText] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSimulationMode, setIsSimulationMode] = useState(false)

  // Check if we're in simulation mode
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch("/api/status")
        const data = await response.json()
        setIsSimulationMode(data.simulationMode)
      } catch (error) {
        console.error("Error checking status:", error)
        setIsSimulationMode(true) // Assume simulation mode if check fails
      }
    }

    checkStatus()
  }, [])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    // Clear any previous errors
    setError(null)

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsProcessing(true)
    setInputText("")

    try {
      // Check if this is one of our special Ghibli questions
      if (message in ghibliResponses) {
        // Use our pre-defined Ghibli response
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: ghibliResponses[message],
        }

        // Add a slight delay to simulate thinking
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setMessages((prev) => [...prev, assistantMessage])
      } else {
        // Process through our enhanced RAG system for other questions
        const ragResponse = await retrievalMiddleware.processQuery(message, {
          model: model,
          useWebSearch: webSearchEnabled,
        })

        // Combine static and web results
        const combinedResults = [...ragResponse.results.staticResults, ...ragResponse.results.webResults]

        // Format sources for display
        const sources = ragResponse.results.webResults.map((result) => {
          const sourceUrl = result.answer.match(/Source: (https?:\/\/[^\s]+)/)?.[1] || ""
          return {
            title: result.question,
            url: sourceUrl,
            verified: ragResponse.results.verification?.verified,
          }
        })

        // Generate response content
        let responseContent = ""

        if (combinedResults.length > 0) {
          // Use the most relevant answer
          responseContent = combinedResults[0].answer

          // Add verification info if available
          if (ragResponse.results.verification) {
            const { verified, confidenceScore } = ragResponse.results.verification
            if (verified) {
              responseContent += `\n\nThis information has been verified across multiple sources with ${Math.round(confidenceScore * 100)}% confidence.`
            } else if (ragResponse.results.webResults.length > 0) {
              responseContent += `\n\nThis information is from a single source and couldn't be fully verified.`
            }
          }

          // Add simulation mode notice if applicable, but without mentioning Browserbase
          if (isSimulationMode && ragResponse.results.webResults.length > 0) {
            responseContent += `\n\n(Note: Web search results are simulated in preview mode)`
          }
        } else {
          responseContent =
            "I don't have specific information about that. Would you like me to search for more details on this topic?"
        }

        // Add assistant message
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: responseContent,
          sources: sources.length > 0 ? sources : undefined,
        }

        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error("Error processing message:", error)
      setError("Failed to process your request. Using fallback mode.")

      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm sorry, I encountered an error while processing your request. I'll use my built-in knowledge to try to answer.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSettingsChange = (newApiKey: string, newModel: string) => {
    setApiKey(newApiKey)
    setModel(newModel)
    setShowSettings(false)
  }

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  const toggleWebSearch = () => {
    setWebSearchEnabled(!webSearchEnabled)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="ghibli-leaf top-10 left-10 animate-sway" style={{ animationDelay: "0.2s" }}></div>
      <div className="ghibli-leaf top-20 right-20 animate-sway" style={{ animationDelay: "1.5s" }}></div>
      <div className="ghibli-cloud bottom-10 left-20 animate-float" style={{ animationDelay: "0.8s" }}></div>
      <div className="ghibli-cloud top-40 right-10 animate-float" style={{ animationDelay: "1.2s" }}></div>

      <h1 className="text-3xl font-bold mb-8 text-center text-ghibli-forest flex items-center gap-2">
        <Wind className="h-6 w-6" />
        <span>Forest Echo Chat</span>
        <Trees className="h-6 w-6" />
      </h1>

      <div className="z-10 w-full max-w-3xl mx-auto mb-6 items-center justify-between font-mono text-sm flex">
        <div className="flex items-center gap-4">
          {/* Model selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-ghibli-forest">Spirit:</span>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger className="w-[140px] h-8 text-xs border-ghibli-forest text-ghibli-forest bg-white bg-opacity-70">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-white bg-opacity-90 border-ghibli-forest">
                <SelectItem value="gpt-4o">Wise Owl</SelectItem>
                <SelectItem value="claude-3">Forest Spirit</SelectItem>
                <SelectItem value="gemini-pro">River Guardian</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Web search toggle */}
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-sm text-ghibli-forest">Ancient Scrolls</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={webSearchEnabled} onChange={toggleWebSearch} />
              <div
                className={`block w-10 h-6 rounded-full ${webSearchEnabled ? "bg-ghibli-forest" : "bg-ghibli-stone"}`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${webSearchEnabled ? "transform translate-x-4" : ""}`}
              ></div>
            </div>
          </label>

          {/* Settings button */}
          <button
            onClick={toggleSettings}
            className="flex items-center gap-1 px-3 py-1.5 bg-ghibli-cloud hover:bg-ghibli-sky rounded-full text-sm transition-colors text-ghibli-forest"
          >
            <Wind className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {showSettings && (
        <SettingsPanel
          apiKey={apiKey}
          model={model}
          onSave={handleSettingsChange}
          onCancel={() => setShowSettings(false)}
        />
      )}

      <div className="w-full max-w-3xl flex-1 flex flex-col">
        {error && (
          <Alert className="mb-4 bg-ghibli-sunset bg-opacity-10 border-ghibli-sunset rounded-xl">
            <AlertCircle className="h-4 w-4 text-ghibli-sunset" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <ChatContainer>
          {messages.map((message) => (
            <Message key={message.id} role={message.role} content={message.content} sources={message.sources} />
          ))}
        </ChatContainer>

        <div className="mt-4">
          <PromptInput
            value={inputText}
            onChange={setInputText}
            onSendMessage={handleSendMessage}
            disabled={isProcessing}
            placeholder={isProcessing ? "The spirits are thinking..." : "Ask the spirits anything..."}
            isLoading={isProcessing}
          />
        </div>

        <div className="mt-6">
          <SuggestedQuestions onSelectQuestion={handleSendMessage} />
        </div>
      </div>
    </main>
  )
}

