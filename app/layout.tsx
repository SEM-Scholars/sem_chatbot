import './globals.css'
import type React from "react"
import ClientLayout from "./ClientLayout"
import { ChatHistoryProvider } from "@/components/chat-context"

export const metadata = {
  title: "SEM Scholars",
  description: "Your personalized scholarship advisor",
  icons: [
    { rel: "icon", url: "/sem_logo.png", type: "image/png", sizes: "32x32" },
    { rel: "shortcut icon", url: "/sem_logo.ico" }
  ]
}

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

