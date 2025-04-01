"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Play, StopCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WorkflowTestCanvas } from "@/components/workflow-test-canvas"
import { AgentChat } from "@/components/agent-chat"
import { ExecutionLog } from "@/components/execution-log"

export default function TestAgentPage({ params }: { params: { id: string } }) {
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const [messages, setMessages] = useState<any[]>([])
  const [executionSteps, setExecutionSteps] = useState<any[]>([])
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)
  const [userInput, setUserInput] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Simulate agent execution
  const runAgent = async () => {
    if (isRunning) return

    setIsRunning(true)
    setMessages((prev) => [...prev, { role: "user", content: userInput }])
    setUserInput("")

    // Simulate agent thinking and tool usage
    await simulateAgentExecution(userInput)

    setIsRunning(false)
  }

  // Simulate the agent execution process with tool calls
  const simulateAgentExecution = async (input: string) => {
    // Step 1: Agent starts processing
    setActiveNodeId("1") // Agent node
    await delay(1000)

    addExecutionStep({
      type: "agent",
      nodeId: "1",
      content: `Processing query: "${input}"`,
      timestamp: new Date().toISOString(),
    })

    // Step 2: Agent decides to use Wikipedia tool
    await delay(1500)
    setActiveNodeId("2") // Wikipedia tool

    addExecutionStep({
      type: "tool_call",
      nodeId: "2",
      tool: "Wikipedia",
      input: { query: input },
      timestamp: new Date().toISOString(),
    })

    // Step 3: Tool response
    await delay(2000)

    addExecutionStep({
      type: "tool_response",
      nodeId: "2",
      tool: "Wikipedia",
      output: `Here is some information about "${input}" from Wikipedia...`,
      timestamp: new Date().toISOString(),
    })

    // Step 4: Agent decides to use Calculator tool
    await delay(1500)
    setActiveNodeId("3") // Calculator tool

    addExecutionStep({
      type: "tool_call",
      nodeId: "3",
      tool: "Calculator",
      input: { expression: "2 + 2" },
      timestamp: new Date().toISOString(),
    })

    // Step 5: Tool response
    await delay(1000)

    addExecutionStep({
      type: "tool_response",
      nodeId: "3",
      tool: "Calculator",
      output: "4",
      timestamp: new Date().toISOString(),
    })

    // Step 6: Final response
    await delay(1500)
    setActiveNodeId("4") // Output node

    addExecutionStep({
      type: "output",
      nodeId: "4",
      content: "Final response",
      timestamp: new Date().toISOString(),
    })

    // Add agent response to chat
    await delay(1000)
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: `Based on my research about "${input}", I found relevant information from Wikipedia. I also calculated that 2 + 2 = 4, which might be relevant to your query.`,
      },
    ])

    // Reset active node
    await delay(500)
    setActiveNodeId(null)
  }

  const addExecutionStep = (step: any) => {
    setExecutionSteps((prev) => [...prev, step])
  }

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-6">
        <Link href={`/agents/${params.id}`}>
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Test Agent</h1>
          <p className="text-muted-foreground">Try out your agent and see how it works</p>
        </div>
        <Button
          variant={isRunning ? "destructive" : "outline"}
          size="sm"
          className="ml-auto"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? (
            <>
              <StopCircle className="mr-2 h-4 w-4" />
              Stop Execution
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Run Agent
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="logs">Execution Logs</TabsTrigger>
            </TabsList>
            <div className="flex-1 flex flex-col">
              <TabsContent value="chat" className="flex-1 flex flex-col mt-0 h-[600px]">
                <AgentChat messages={messages} isRunning={isRunning} chatContainerRef={chatContainerRef} />
              </TabsContent>
              <TabsContent value="logs" className="flex-1 mt-0 h-[600px]">
                <ExecutionLog steps={executionSteps} />
              </TabsContent>
            </div>
          </Tabs>

          <div className="mt-4 flex items-center gap-2">
            <Input
              placeholder="Ask your agent something..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !isRunning) {
                  e.preventDefault()
                  runAgent()
                }
              }}
              disabled={isRunning}
            />
            <Button onClick={runAgent} disabled={isRunning || !userInput.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>

        <div className="h-[650px] rounded-md border overflow-hidden">
          <div className="bg-muted p-3 border-b">
            <h3 className="font-medium">Workflow Execution</h3>
            <p className="text-xs text-muted-foreground">Watch your agent execute the workflow in real-time</p>
          </div>
          <div className="h-[600px] bg-background">
            <WorkflowTestCanvas activeNodeId={activeNodeId} />
          </div>
        </div>
      </div>
    </div>
  )
}

