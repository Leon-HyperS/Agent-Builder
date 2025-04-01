import { Check, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Textarea } from "@/components/ui/textarea"

export function ToolsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Available Tools</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Tool
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tool</DialogTitle>
              <DialogDescription>Configure a new tool for your agent to use</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tool-name">Tool Name</Label>
                <Input id="tool-name" placeholder="e.g., Wikipedia Search" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tool-description">Description</Label>
                <Textarea
                  id="tool-description"
                  placeholder="Describe what this tool does and when to use it"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tool-schema">Input Schema (JSON)</Label>
                <Textarea
                  id="tool-schema"
                  placeholder='{ "query": "string" }'
                  className="min-h-[100px] font-mono text-sm"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                <Check className="h-4 w-4 mr-2" />
                Add Tool
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        <Card>
          <CardHeader className="p-3 pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-sm">Wikipedia Search</CardTitle>
                <CardDescription className="text-xs">Search Wikipedia for information</CardDescription>
              </div>
              <Checkbox id="wikipedia" defaultChecked />
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-xs text-muted-foreground">Input: query (string)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-sm">Web Search</CardTitle>
                <CardDescription className="text-xs">Search the web for information</CardDescription>
              </div>
              <Checkbox id="web-search" />
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-xs text-muted-foreground">Input: query (string)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-sm">Calculator</CardTitle>
                <CardDescription className="text-xs">Perform mathematical calculations</CardDescription>
              </div>
              <Checkbox id="calculator" defaultChecked />
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-xs text-muted-foreground">Input: expression (string)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

