"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const modelProviders = [
  {
    name: "OpenAI",
    models: [
      { id: "gpt-4o", name: "GPT-4o", description: "Most capable model for a wide range of tasks", isPopular: true },
      { id: "gpt-4-turbo", name: "GPT-4 Turbo", description: "Optimized for speed and efficiency", isPopular: true },
      {
        id: "gpt-3.5-turbo",
        name: "GPT-3.5 Turbo",
        description: "Fast and cost-effective for simpler tasks",
        isPopular: true,
      },
      {
        id: "gpt-4-vision",
        name: "GPT-4 Vision",
        description: "Capable of understanding images and text",
        isPopular: false,
      },
    ],
  },
  {
    name: "Anthropic",
    models: [
      {
        id: "claude-3-opus",
        name: "Claude 3 Opus",
        description: "Most powerful Claude model for complex tasks",
        isPopular: true,
      },
      {
        id: "claude-3-sonnet",
        name: "Claude 3 Sonnet",
        description: "Balanced performance and efficiency",
        isPopular: true,
      },
      {
        id: "claude-3-haiku",
        name: "Claude 3 Haiku",
        description: "Fast and efficient for simpler tasks",
        isPopular: false,
      },
    ],
  },
  {
    name: "Mistral AI",
    models: [
      { id: "mistral-large", name: "Mistral Large", description: "Powerful general-purpose model", isPopular: false },
      {
        id: "mistral-medium",
        name: "Mistral Medium",
        description: "Balanced performance and efficiency",
        isPopular: false,
      },
      {
        id: "mistral-small",
        name: "Mistral Small",
        description: "Fast and efficient for simpler tasks",
        isPopular: false,
      },
    ],
  },
  {
    name: "Custom",
    models: [
      { id: "custom", name: "Custom Model", description: "Connect to your own model endpoint", isPopular: false },
    ],
  },
]

interface ModelSelectorProps {
  defaultValue?: string
  onModelSelect?: (modelId: string) => void
}

export function ModelSelector({ defaultValue = "gpt-4o", onModelSelect }: ModelSelectorProps) {
  const [open, setOpen] = useState(false)
  const [customDialogOpen, setCustomDialogOpen] = useState(false)
  const [value, setValue] = useState(defaultValue)

  const selectedModel = modelProviders.flatMap((provider) => provider.models).find((model) => model.id === value)

  const handleSelect = (currentValue: string) => {
    if (currentValue === "custom") {
      setCustomDialogOpen(true)
      return
    }

    setValue(currentValue)
    if (onModelSelect) onModelSelect(currentValue)
    setOpen(false)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="model">Model</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedModel ? selectedModel.name : "Select model..."}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search models..." className="h-9" />
            <CommandList>
              <CommandEmpty>No models found.</CommandEmpty>
              <CommandGroup heading="Popular Models">
                {modelProviders
                  .flatMap((provider) => provider.models)
                  .filter((model) => model.isPopular)
                  .map((model) => (
                    <CommandItem
                      key={model.id}
                      value={model.id}
                      onSelect={handleSelect}
                      className="flex items-center gap-2"
                    >
                      <Check className={`h-4 w-4 ${value === model.id ? "opacity-100" : "opacity-0"}`} />
                      <div className="flex flex-col">
                        <span>{model.name}</span>
                        <span className="text-xs text-muted-foreground">{model.description}</span>
                      </div>
                    </CommandItem>
                  ))}
              </CommandGroup>
              {modelProviders.map((provider) => (
                <CommandGroup key={provider.name} heading={provider.name}>
                  {provider.models
                    .filter((model) => !model.isPopular || provider.name === "Custom")
                    .map((model) => (
                      <CommandItem
                        key={model.id}
                        value={model.id}
                        onSelect={handleSelect}
                        className="flex items-center gap-2"
                      >
                        <Check className={`h-4 w-4 ${value === model.id ? "opacity-100" : "opacity-0"}`} />
                        <div className="flex flex-col">
                          <span>{model.name}</span>
                          <span className="text-xs text-muted-foreground">{model.description}</span>
                        </div>
                      </CommandItem>
                    ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={customDialogOpen} onOpenChange={setCustomDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Configure Custom Model</DialogTitle>
            <DialogDescription>Connect to your own model endpoint or a compatible provider</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="model-name">Model Name</Label>
              <Input id="model-name" placeholder="My Custom Model" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="base-url">Base URL</Label>
              <Input id="base-url" placeholder="https://api.example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input id="api-key" type="password" placeholder="sk-..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model-id">Model ID</Label>
              <Input id="model-id" placeholder="model-id" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCustomDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setValue("custom-configured")
                if (onModelSelect) onModelSelect("custom-configured")
                setCustomDialogOpen(false)
                setOpen(false)
              }}
            >
              Save & Select
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

