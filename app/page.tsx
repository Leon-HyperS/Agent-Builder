import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Agent Builder</h1>
          <p className="text-muted-foreground">Create and manage your AI agents and workflows</p>
        </div>
        <Link href="/agents/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Agent
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exampleAgents.map((agent) => (
          <Card key={agent.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>{agent.name}</CardTitle>
              <CardDescription>{agent.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Model:</span> {agent.model}
                </div>
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                <div className="flex items-center gap-1">
                  <span className="font-medium">Tools:</span> {agent.tools.length}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/agents/${agent.id}`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Link href={`/agents/${agent.id}/test`}>
                <Button>Test Agent</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

const exampleAgents = [
  {
    id: "researcher",
    name: "Research Assistant",
    description: "Helps with academic research and information gathering",
    model: "gpt-4o",
    tools: ["wikipedia", "web-search", "document-reader"],
  },
  {
    id: "customer-support",
    name: "Customer Support",
    description: "Handles customer inquiries and provides support",
    model: "gpt-3.5-turbo",
    tools: ["knowledge-base", "ticket-system"],
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    description: "Analyzes data and generates insights",
    model: "gpt-4o",
    tools: ["data-processor", "chart-generator", "calculator"],
  },
]

