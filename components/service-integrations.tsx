"use client"

import { useState } from "react"
import { Check, Database, FileText, Globe, Lock, Plus } from "lucide-react"

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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

// Service categories and preset services
const serviceCategories = [
  {
    id: "database",
    name: "Databases",
    icon: <Database className="h-4 w-4" />,
    services: [
      {
        id: "postgres",
        name: "PostgreSQL",
        description: "Connect to a PostgreSQL database",
        configFields: ["host", "port", "username", "password", "database"],
      },
      {
        id: "mongodb",
        name: "MongoDB",
        description: "Connect to a MongoDB database",
        configFields: ["connection_string", "database"],
      },
      {
        id: "supabase",
        name: "Supabase",
        description: "Connect to Supabase for database and auth",
        configFields: ["url", "api_key"],
      },
    ],
  },
  {
    id: "storage",
    name: "Storage",
    icon: <FileText className="h-4 w-4" />,
    services: [
      {
        id: "s3",
        name: "AWS S3",
        description: "Connect to Amazon S3 for file storage",
        configFields: ["access_key", "secret_key", "region", "bucket"],
      },
      {
        id: "vercel-blob",
        name: "Vercel Blob",
        description: "Use Vercel Blob for file storage",
        configFields: ["blob_read_write_token"],
      },
    ],
  },
  {
    id: "api",
    name: "APIs & Services",
    icon: <Globe className="h-4 w-4" />,
    services: [
      {
        id: "openai",
        name: "OpenAI API",
        description: "Connect to OpenAI API for additional models",
        configFields: ["api_key"],
      },
      {
        id: "stripe",
        name: "Stripe",
        description: "Connect to Stripe for payments",
        configFields: ["api_key", "webhook_secret"],
      },
      {
        id: "sendgrid",
        name: "SendGrid",
        description: "Connect to SendGrid for email",
        configFields: ["api_key", "from_email"],
      },
    ],
  },
  {
    id: "auth",
    name: "Authentication",
    icon: <Lock className="h-4 w-4" />,
    services: [
      {
        id: "auth0",
        name: "Auth0",
        description: "Connect to Auth0 for authentication",
        configFields: ["domain", "client_id", "client_secret"],
      },
      {
        id: "clerk",
        name: "Clerk",
        description: "Connect to Clerk for authentication",
        configFields: ["api_key", "frontend_api"],
      },
    ],
  },
]

interface ServiceIntegrationsProps {
  onServiceSelect?: (serviceId: string, config: Record<string, string>) => void
  selectedServices?: string[]
}

export function ServiceIntegrations({ onServiceSelect, selectedServices = [] }: ServiceIntegrationsProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [customServiceDialogOpen, setCustomServiceDialogOpen] = useState(false)
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [serviceConfig, setServiceConfig] = useState<Record<string, string>>({})

  // Filter services based on active tab
  const filteredServices = serviceCategories.flatMap((category) => {
    return category.services
      .filter((service) => {
        const matchesCategory = activeTab === "all" || activeTab === category.id
        return matchesCategory
      })
      .map((service) => ({
        ...service,
        category: category.name,
        categoryIcon: category.icon,
      }))
  })

  const handleServiceClick = (service: any) => {
    setSelectedService(service)
    setServiceConfig({})
    setConfigDialogOpen(true)
  }

  const handleConfigSave = () => {
    if (selectedService && onServiceSelect) {
      onServiceSelect(selectedService.id, serviceConfig)
    }
    setConfigDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="text-xs">
              All
            </TabsTrigger>
            {serviceCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs flex items-center gap-1">
                {category.icon}
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Dialog open={customServiceDialogOpen} onOpenChange={setCustomServiceDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="ml-2 whitespace-nowrap">
              <Plus className="h-4 w-4 mr-1" />
              Custom
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Custom Service</DialogTitle>
              <DialogDescription>Configure a custom service integration</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="service-name">Service Name</Label>
                <Input id="service-name" placeholder="e.g., My API Service" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service-description">Description</Label>
                <Textarea
                  id="service-description"
                  placeholder="Describe what this service does"
                  className="min-h-[80px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Configuration Fields</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="Field name (e.g., api_key)" />
                    <Button variant="outline" size="sm" className="shrink-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="rounded-md border p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>api_key</span>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCustomServiceDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle custom service creation
                  setCustomServiceDialogOpen(false)
                }}
              >
                Add Service
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredServices.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <CardHeader className="p-3 pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {service.categoryIcon}
                  <CardTitle className="text-sm">{service.name}</CardTitle>
                </div>
                <Button
                  variant={selectedServices.includes(service.id) ? "default" : "outline"}
                  size="sm"
                  className="h-7 px-2"
                  onClick={() => handleServiceClick(service)}
                >
                  {selectedServices.includes(service.id) ? <Check className="h-4 w-4" /> : "Configure"}
                </Button>
              </div>
              <CardDescription className="text-xs mt-1">{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <Badge variant="outline" className="text-xs font-normal">
                {service.category}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Configuration Dialog */}
      <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Configure {selectedService?.name}</DialogTitle>
            <DialogDescription>Enter the required configuration details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedService?.configFields.map((field: string) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>{field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</Label>
                <Input
                  id={field}
                  type={
                    field.includes("password") || field.includes("secret") || field.includes("key")
                      ? "password"
                      : "text"
                  }
                  placeholder={`Enter ${field.replace(/_/g, " ")}`}
                  value={serviceConfig[field] || ""}
                  onChange={(e) => setServiceConfig({ ...serviceConfig, [field]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfigDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfigSave}>Save Configuration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

