import { Handle, Position } from "reactflow"
import { Bot } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function AgentNode({ data }: { data: any }) {
  return (
    <Card className="w-[220px] shadow-md">
      <CardHeader className="p-3 pb-2 flex flex-row items-center space-y-0 gap-2">
        <Bot className="h-4 w-4 text-primary" />
        <CardTitle className="text-sm font-medium">{data.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 text-xs">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Model:</span>
            <Badge variant="outline" className="text-xs font-normal">
              {data.model}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Max Steps:</span>
            <span>{data.maxSteps}</span>
          </div>
        </div>
      </CardContent>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </Card>
  )
}

