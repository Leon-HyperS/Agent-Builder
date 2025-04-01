import { ModelSelector } from "@/components/model-selector"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function UnifiedConfigPanel() {
  return (
    <div className="space-y-4">
      <ModelSelector />

      <div className="space-y-2">
        <Label htmlFor="max-steps">Maximum Steps</Label>
        <Input id="max-steps" type="number" defaultValue="5" min="1" max="20" />
        <p className="text-xs text-muted-foreground">Maximum number of tool calls the agent can make</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="background">Agent Background</Label>
        <Textarea
          id="background"
          placeholder="Provide context and instructions for your agent"
          className="min-h-[120px]"
          defaultValue="You are a helpful assistant that uses tools to complete tasks. Be concise and accurate in your responses."
        />
        <p className="text-xs text-muted-foreground">This will be used as the system prompt for your agent</p>
      </div>
    </div>
  )
}

