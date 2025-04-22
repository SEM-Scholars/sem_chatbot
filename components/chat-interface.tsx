"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { ArrowUp, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"
import { useGeminiChat } from "@/hooks/use-gemini"
import { useMentorText } from "@/hooks/promt-choice"
import ReactMarkdown from "react-markdown";

interface Message {
  role: "assistant" | "user"
  content: string
  timestamp: string
}

export default function ChatInterface() {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const mentorText = useMentorText()
  const { sendMessage } = useGeminiChat(mentorText);

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      const assistantReply = await sendMessage(input); // This comes from useGeminiChat()
    
      const aiMessage: Message = {
        role: "assistant",
        content: assistantReply,
        timestamp: new Date().toLocaleTimeString(),
      };
  
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("Gemini error:", err);
      const errorMessage: Message = {
        role: "assistant",
        content: "❌ Failed to get response from Gemini.",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }

    // // Simulate AI response after a delay
    // setTimeout(() => {
    //   const aiMessage: Message = {
    //     role: "assistant",
    //     content: sendMessage(input),
    //     timestamp: new Date().toLocaleTimeString(),
    //   }
    //   setMessages((prev) => [...prev, aiMessage])
    //   setIsLoading(false)
    // }, 1000)
  }

  const SuggestedCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
      <Card onClick={() => setInput("What is SEM Scholars and how does it help students?")} className="hover:bg-[#f7e7e9] p-6 text-center transition-colors cursor-pointer">
        <p className="text-lg font-medium">🎓 What is SEM Scholars and how does it help students?</p>
      </Card>
      <Card onClick={() => setInput("How do I find and apply for scholarships?")} className="hover:bg-[#f7e7e9] p-6 text-center transition-colors cursor-pointer">
        <p className="text-lg font-medium">📚 How do I find and apply for scholarships?</p>
      </Card>
      <Card onClick={() => setInput("What services does SEM Scholars offer?")} className="hover:bg-[#f7e7e9] p-6 text-center transition-colors cursor-pointer">
        <p className="text-lg font-medium">💡 What mentoring services does SEM Scholars offer?</p>
      </Card>
      <Card onClick={() => setInput("What scholarships am I qualified for?")} className="hover:bg-[#f7e7e9] p-6 text-center transition-colors cursor-pointer">
        <p className="text-lg font-medium">🔎 What scholarships am I qualified for?</p>
      </Card>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <ScrollArea className="flex-1 p-2 sm:p-4" ref={scrollAreaRef}>
        <div className="space-y-4 w-full max-w-3xl mx-auto">
          
          {messages.length === 0 ? (
            <div className="flex flex-1 items-center justify-center h-[80vh]">
              <SuggestedCards />
            </div>
          ) : (
            <div className="mt-4 flex justify-center">
              <SuggestedCards />
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={cn("flex gap-2", message.role === "user" ? "justify-end" : "")}>
            {message.role === "assistant" && (
              <img
                src="sem_logo.png"
                alt="SEM Scholars Logo"
                className="h-14 w-14 rounded-full object-cover flex-shrink-0"
              />
            )}  
            <div className={cn("space-y-2", message.role === "user" ? "items-end" : "")}>
                <div className={cn("flex items-center gap-2", message.role === "user" ? "justify-end" : "")}>
                  <span className="text-xs sm:text-sm font-medium">
                    {/* {message.role === "assistant" ? "SEM Scholars" : "User"} */}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">{message.timestamp}</span>
                </div>
                <div
                  className={cn(
                    "p-2 sm:p-3 bg-muted/50 rounded-md max-w-[calc(100vw-5rem)] sm:max-w-md",
                    message.role === "user" ? "bg-primary/10" : "",
                  )}
                >

                <div className="text-xs sm:text-sm whitespace-pre-wrap">
                  <ReactMarkdown
                    components={{
                      strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                      em: ({ node, ...props }) => <em className="italic text-muted-foreground" {...props} />,
                      code: ({ node, ...props }) => (
                        <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono" {...props} />
                      ),
                      p: ({ node, ...props }) => <p className="mb-2" {...props} />, 
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
                
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-medium">SEM Scholars</span>
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); 
                  const form = e.currentTarget.form;
                  if (form) form.requestSubmit();                 }
              }}
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
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 
              bg-gradient-to-r from-[#d40504] to-[#a90260] text-white shadow-md"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

