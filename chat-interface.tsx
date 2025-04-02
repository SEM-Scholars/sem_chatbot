"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowUp, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "assistant" | "user"
  content: string
  timestamp: string
}

export default function ChatInterface() {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Check if screen is mobile size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  // Simple hardcoded responses for testing
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! How can I assist you today?"
    }

    if (input.includes("help")) {
      return "I'm here to help! What do you need assistance with?"
    }

    if (input.includes("weather")) {
      return "I don't have access to real-time weather data, but I can help you find weather information if you tell me your location."
    }

    if (input.includes("name")) {
      return "I'm GenerativeAgent, an AI assistant designed to help with your questions and tasks."
    }

    return "Thank you for your message. Is there anything specific you'd like to know or discuss?"
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ScrollArea className="flex-1 p-2 sm:p-4" ref={scrollAreaRef}>
        <div className="space-y-4 w-full max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full max-w-full mx-auto text-center p-2 sm:p-8">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-black rounded-full flex items-center justify-center">
                  <div className="border-4 border-white h-0 w-0 border-t-transparent border-l-transparent border-r-transparent transform rotate-180"></div>
                </div>
                <span className="text-xl sm:text-2xl mx-2">+</span>
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-black rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-white rounded-full"></div>
                </div>
              </div>
              <p className="text-base sm:text-lg mb-4">
                This is an <span className="font-medium">open source</span> chatbot template built with Next.js and the
                AI SDK by Vercel. It uses the <code className="bg-muted px-1 py-0.5 rounded">streamText</code> function
                in the server and the <code className="bg-muted px-1 py-0.5 rounded">useChat</code> hook on the client
                to create a seamless chat experience.
              </p>
              <p className="text-base sm:text-lg mb-4 sm:mb-8">
                You can learn more about the AI SDK by visiting the{" "}
                <a href="https://sdk.vercel.ai/docs" className="underline">
                  docs
                </a>
                .
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full max-w-2xl">
                <div
                  className="border rounded-lg p-3 sm:p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setInput("What are the advantages of using Next.js?")
                  }}
                >
                  <p className="font-medium text-sm sm:text-base">What are the advantages</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">of using Next.js?</p>
                </div>
                <div
                  className="border rounded-lg p-3 sm:p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setInput("Write code to demonstrate dijkstra's algorithm")
                  }}
                >
                  <p className="font-medium text-sm sm:text-base">Write code to</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">demonstrate dijkstra's algorithm</p>
                </div>
                <div
                  className="border rounded-lg p-3 sm:p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setInput("Help me write an essay about silicon valley")
                  }}
                >
                  <p className="font-medium text-sm sm:text-base">Help me write an essay</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">about silicon valley</p>
                </div>
                <div
                  className="border rounded-lg p-3 sm:p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setInput("What is the weather in San Francisco?")
                  }}
                >
                  <p className="font-medium text-sm sm:text-base">What is the weather</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">in San Francisco?</p>
                </div>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={cn("flex gap-2", message.role === "user" ? "justify-end" : "")}>
                {message.role === "assistant" && <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />}
                <div className={cn("space-y-2", message.role === "user" ? "items-end" : "")}>
                  <div className={cn("flex items-center gap-2", message.role === "user" ? "justify-end" : "")}>
                    <span className="text-xs sm:text-sm font-medium">
                      {message.role === "assistant" ? "GenerativeAgent" : "User"}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <div
                    className={cn(
                      "p-2 sm:p-3 bg-muted/50 rounded-md max-w-[calc(100vw-5rem)] sm:max-w-md",
                      message.role === "user" ? "bg-primary/10" : "",
                    )}
                  >
                    <p className="text-xs sm:text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-medium">GenerativeAgent</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">{new Date().toLocaleTimeString()}</span>
                </div>
                <div className="p-2 sm:p-3 bg-muted/50 rounded-md max-w-[calc(100vw-5rem)] sm:max-w-md">
                  <p className="text-xs sm:text-sm">Thinking...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-2 sm:p-4 w-full shrink-0">
        <div className="max-w-3xl mx-auto w-full">
          <form onSubmit={handleSubmit} className="relative">
            <Textarea
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[44px] max-h-32 rounded-md px-12 py-3 resize-none bg-muted/50 pr-12 text-sm"
            />
            <div className="absolute right-12 top-1/2 -translate-y-1/2">
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 bg-black"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

