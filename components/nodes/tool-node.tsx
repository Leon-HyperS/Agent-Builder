import { Handle, Position } from "reactflow"
import { Wrench } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ToolNode({ data }: { data: any }) {
  return (
    <Card className="w-[220px] shadow-md">
      <CardHeader className="p-3 pb-2 flex flex-row items-center space-y-0 gap-2">
        <Wrench className="h-4 w-4 text-primary" />
        <CardTitle className="text-sm font-medium">{data.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 text-xs">
        <p className="text-muted-foreground">{data.description}</p>
      </CardContent>
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </Card>
  )
}

