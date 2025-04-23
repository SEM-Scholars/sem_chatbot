"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2 } from "lucide-react"
import { useChatHistory } from "@/components/chat-context"

export default function ConversationHistory() {
  const { historyCollapsed } = useChatHistory()

  if (historyCollapsed) return null

  return (
    <div className="border-l w-80 shrink-0 flex flex-col overflow-hidden">
      <div className="h-16 border-b px-4 flex items-center justify-between shrink-0">
        <h2 className="font-medium">Conversation History</h2>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          {["Essay Review Request", "Scholarship Guidance", "Application Status Help"].map((title, i) => (
            <div key={i} className="p-3 bg-muted/50 rounded-lg flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium">{title}</h3>
                <p className="text-xs text-muted-foreground">Today, {i + 1}:30 PM</p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
