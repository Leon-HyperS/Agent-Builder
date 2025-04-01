import type { RefObject } from "react"
import { Bot, User } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AgentChatProps {
  messages: Message[]
  isRunning: boolean
  chatContainerRef: RefObject<HTMLDivElement>
}

export function AgentChat({ messages, isRunning, chatContainerRef }: AgentChatProps) {
  return (
    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
          <Bot className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Test Your Agent</h3>
          <p className="text-muted-foreground max-w-md mt-2">
            Ask your agent a question to see how it responds. You'll see the execution flow in the workflow canvas.
          </p>
        </div>
      ) : (
        messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <Avatar className={`h-8 w-8 ${message.role === "assistant" ? "bg-primary/10" : "bg-secondary"}`}>
                <AvatarFallback>
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <Card className={`p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </Card>
            </div>
          </div>
        ))
      )}

      {isRunning && (
        <div className="flex justify-start">
          <div className="flex gap-3 max-w-[80%]">
            <Avatar className="h-8 w-8 bg-primary/10">
              <AvatarFallback>
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <Card className="p-3 bg-muted">
              <div className="flex space-x-2">
                <div
                  className="h-2 w-2 bg-muted-foreground/30 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-muted-foreground/30 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-2 w-2 bg-muted-foreground/30 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

