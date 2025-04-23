import './globals.css'
import type React from "react"
import ClientLayout from "./ClientLayout"
import { ChatHistoryProvider } from "@/components/chat-context"


export const metadata = {
  generator: 'v0.dev'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChatHistoryProvider>
          <ClientLayout>{children}</ClientLayout>
        </ChatHistoryProvider>
      </body>
    </html>
  )
}
