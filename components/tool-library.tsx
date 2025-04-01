"use client"

import { useState } from "react"
import { Check, Code, Database, Globe, Plus, Search, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Tool categories and preset tools
const toolCategories = [
  {
    id: "search",
    name: "Search & Research",
    icon: <Search className="h-4 w-4" />,
    tools: [
      {
        id: "wikipedia",
        name: "Wikipedia",
        description: "Search Wikipedia for information",
        schema: { query: "string" },
        popular: true,
      },
      {
        id: "web-search",
        name: "Web Search",
        description: "Search the web for information",
        schema: { query: "string" },
        popular: true,
      },
      {
        id: "document-search",
        name: "Document Search",
        description: "Search through documents in your knowledge base",
        schema: { query: "string", filters: "object?" },
        popular: false,
      },
    ],
  },
  {
    id: "data",
    name: "Data & Analysis",
    icon: <Database className="h-4 w-4" />,
    tools: [
      {
        id: "calculator",
        name: "Calculator",
        description: "Perform mathematical calculations",
        schema: { expression: "string" },
        popular: true,
      },
      {
        id: "data-analysis",
        name: "Data Analysis",
        description: "Analyze data and generate insights",
        schema: { data: "array", operation: "string" },
        popular: false,
      },
      {
        id: "chart-generator",
        name: "Chart Generator",
        description: "Generate charts from data",
        schema: { data: "array", chartType: "string" },
        popular: false,
      },
    ],
  },
  {
    id: "code",
    name: "Code & Development",
    icon: <Code className="h-4 w-4" />,
    tools: [
      {
        id: "code-interpreter",
        name: "Code Interpreter",
        description: "Execute code in various languages",
        schema: { code: "string", language: "string" },
        popular: true,
      },
      {
        id: "github",
        name: "GitHub",
        description: "Interact with GitHub repositories",
        schema: { repo: "string", operation: "string" },
        popular: false,
      },
    ],
  },
  {
    id: "web",
    name: "Web & APIs",
    icon: <Globe className="h-4 w-4" />,
    tools: [
      {
        id: "http-request",
        name: "HTTP Request",
        description: "Make HTTP requests to external APIs",
        schema: { url: "string", method: "string", headers: "object?", body: "any?" },
        popular: true,
      },
      {
        id: "weather",
        name: "Weather",
        description: "Get weather information for a location",
        schema: { location: "string" },
        popular: false,
      },
    ],
  },
]

interface ToolLibraryProps {
  onToolSelect?: (toolId: string) => void
  selectedTools?: string[]
}

export function ToolLibrary({ onToolSelect, selectedTools = [] }: ToolLibraryProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [customToolDialogOpen, setCustomToolDialogOpen] = useState(false)

  // Filter tools based on search query and active tab
  const filteredTools = toolCategories.flatMap((category) => {
    return category.tools
      .filter((tool) => {
        const matchesSearch =
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = activeTab === "all" || activeTab === category.id

        return matchesSearch && matchesCategory
      })
      .map((tool) => ({
        ...tool,
        category: category.name,
        categoryIcon: category.icon,
      }))
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 mr-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tools..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={customToolDialogOpen} onOpenChange={setCustomToolDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              <Plus className="h-4 w-4 mr-1" />
              Custom Tool
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Custom Tool</DialogTitle>
              <DialogDescription>Define a custom tool for your agent to use</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tool-name">Tool Name</Label>
                  <Input id="tool-name" placeholder="e.g., Custom API Tool" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool-description">Description</Label>
                  <Textarea
                    id="tool-description"
                    placeholder="Describe what this tool does and when to use it"
                    className="min-h-[80px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool-schema">Input Schema (JSON)</Label>
                  <Textarea
                    id="tool-schema"
                    placeholder='{ "param1": "string", "param2": "number" }'
                    className="min-h-[100px] font-mono text-sm"
                  />
                </div>
              </TabsContent>
              <TabsContent value="advanced" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tool-function">Function Implementation</Label>
                  <Textarea
                    id="tool-function"
                    placeholder="async function execute(params) {
  // Your code here
  return result;
}"
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool-test">Test Input</Label>
                  <Input id="tool-test" placeholder='{ "param1": "test", "param2": 123 }' />
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCustomToolDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle custom tool creation
                  setCustomToolDialogOpen(false)
                }}
              >
                Create Tool
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex w-full overflow-x-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          {toolCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
              {category.icon}
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredTools.length === 0 ? (
          <div className="col-span-full p-8 text-center">
            <p className="text-muted-foreground">No tools found matching your search.</p>
          </div>
        ) : (
          filteredTools.map((tool) => (
            <Card key={tool.id} className="overflow-hidden">
              <CardHeader className="p-3 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {tool.categoryIcon}
                    <CardTitle className="text-sm">{tool.name}</CardTitle>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={selectedTools.includes(tool.id) ? "default" : "outline"}
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => onToolSelect && onToolSelect(tool.id)}
                        >
                          {selectedTools.includes(tool.id) ? <Check className="h-4 w-4" /> : "Add"}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {selectedTools.includes(tool.id) ? "Tool added" : "Add this tool"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription className="text-xs mt-1">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="outline" className="text-xs font-normal">
                    {tool.category}
                  </Badge>
                  {tool.popular && (
                    <Badge variant="secondary" className="text-xs font-normal">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Popular
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

