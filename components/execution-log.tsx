import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Calculator, MessageSquare, Search } from "lucide-react"

interface ExecutionStep {
  type: string
  nodeId: string
  content?: string
  tool?: string
  input?: any
  output?: string
  timestamp: string
}

interface ExecutionLogProps {
  steps: ExecutionStep[]
}

export function ExecutionLog({ steps }: ExecutionLogProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  }

  const getStepIcon = (step: ExecutionStep) => {
    switch (step.type) {
      case "agent":
        return <Bot className="h-4 w-4" />
      case "tool_call":
      case "tool_response":
        if (step.tool === "Wikipedia") return <Search className="h-4 w-4" />
        if (step.tool === "Calculator") return <Calculator className="h-4 w-4" />
        return <Bot className="h-4 w-4" />
      case "output":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Bot className="h-4 w-4" />
    }
  }

  const getStepTitle = (step: ExecutionStep) => {
    switch (step.type) {
      case "agent":
        return "Agent Processing"
      case "tool_call":
        return `Tool Call: ${step.tool}`
      case "tool_response":
        return `Tool Response: ${step.tool}`
      case "output":
        return "Final Response"
      default:
        return "Step"
    }
  }

  const getStepContent = (step: ExecutionStep) => {
    switch (step.type) {
      case "agent":
        return step.content
      case "tool_call":
        return JSON.stringify(step.input, null, 2)
      case "tool_response":
        return step.output
      case "output":
        return "Agent has completed processing and generated a final response."
      default:
        return ""
    }
  }

  return (
    <ScrollArea className="h-full rounded-md border">
      <div className="p-4 space-y-4">
        {steps.length === 0 ? (
          <div className="h-[500px] flex flex-col items-center justify-center text-center p-8">
            <Bot className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No Execution Logs Yet</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              Ask your agent a question to see the execution logs here.
            </p>
          </div>
        ) : (
          steps.map((step, index) => (
            <div key={index} className="rounded-lg border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                    {getStepIcon(step)}
                  </div>
                  <span className="font-medium text-sm">{getStepTitle(step)}</span>
                </div>
                <span className="text-xs text-muted-foreground">{formatTime(step.timestamp)}</span>
              </div>
              <div className="text-sm pl-8">
                {step.type === "tool_call" ? (
                  <pre className="bg-muted p-2 rounded text-xs overflow-x-auto">{getStepContent(step)}</pre>
                ) : (
                  <p className="whitespace-pre-wrap">{getStepContent(step)}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  )
}

