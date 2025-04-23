"use client"

import { createContext, useContext, useState } from "react"

type ChatHistoryContextType = {
  historyCollapsed: boolean
  setHistoryCollapsed: (val: boolean) => void
}

const ChatHistoryContext = createContext<ChatHistoryContextType | null>(null)

export function ChatHistoryProvider({ children }: { children: React.ReactNode }) {
  const [historyCollapsed, setHistoryCollapsed] = useState(true)

  return (
    <ChatHistoryContext.Provider value={{ historyCollapsed, setHistoryCollapsed }}>
      {children}
    </ChatHistoryContext.Provider>
  )
}

export function useChatHistory() {
  const context = useContext(ChatHistoryContext)
  if (!context) {
    throw new Error("useChatHistory must be used within a ChatHistoryProvider")
  }
  return context
}
