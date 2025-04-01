"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { WorkflowBuilder } from "@/components/workflow-builder"
import { UnifiedConfigPanel } from "@/components/agent-config-panel"
import { ToolLibrary } from "@/components/tool-library"
import { ServiceIntegrations } from "@/components/service-integrations"

export default function NewAgentPage() {
  const [activeTab, setActiveTab] = useState("config")

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Create New Agent</h1>
          <p className="text-muted-foreground">Configure your agent and design its workflow</p>
        </div>
        <Button className="ml-auto">
          <Save className="mr-2 h-4 w-4" />
          Save Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input id="name" placeholder="My Research Assistant" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what your agent does and how it should behave"
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <div className="bg-muted px-4 py-3 font-medium border-b">
                <h3>Agent Configuration</h3>
              </div>
              <Tabs defaultValue="basic" className="w-full">
                <div className="px-4 pt-3 border-b">
                  <TabsList className="grid grid-cols-3 h-8">
                    <TabsTrigger value="basic" className="text-xs">
                      Basic
                    </TabsTrigger>
                    <TabsTrigger value="tools" className="text-xs">
                      Tools
                    </TabsTrigger>
                    <TabsTrigger value="services" className="text-xs">
                      Services
                    </TabsTrigger>
                  </TabsList>
                </div>
                <div className="p-4">
                  <TabsContent value="basic" className="mt-0 space-y-4">
                    <UnifiedConfigPanel />
                  </TabsContent>
                  <TabsContent value="tools" className="mt-0">
                    <ToolLibrary />
                  </TabsContent>
                  <TabsContent value="services" className="mt-0">
                    <ServiceIntegrations />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-md border overflow-hidden">
            <div className="bg-muted p-3 border-b">
              <h3 className="font-medium">Workflow Designer</h3>
            </div>
            <div className="h-[600px] bg-background">
              <WorkflowBuilder />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

