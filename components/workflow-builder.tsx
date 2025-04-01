"use client"

import { useCallback } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  type Node,
  type Edge,
  type Connection,
  type NodeTypes,
} from "reactflow"
import "reactflow/dist/style.css"

import { AgentNode } from "@/components/nodes/agent-node"
import { ToolNode } from "@/components/nodes/tool-node"
import { OutputNode } from "@/components/nodes/output-node"

const nodeTypes: NodeTypes = {
  agent: AgentNode,
  tool: ToolNode,
  output: OutputNode,
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "agent",
    position: { x: 250, y: 100 },
    data: {
      label: "Agent",
      name: "Primary Agent",
      model: "gpt-4o",
      maxSteps: 5,
    },
  },
  {
    id: "2",
    type: "tool",
    position: { x: 100, y: 300 },
    data: {
      label: "Tool",
      name: "Wikipedia",
      description: "Search Wikipedia for information",
    },
  },
  {
    id: "3",
    type: "tool",
    position: { x: 400, y: 300 },
    data: {
      label: "Tool",
      name: "Calculator",
      description: "Perform mathematical calculations",
    },
  },
  {
    id: "4",
    type: "output",
    position: { x: 250, y: 500 },
    data: {
      label: "Output",
      name: "Final Response",
    },
  },
]

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e1-3", source: "1", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
  { id: "e3-4", source: "3", target: "4" },
]

export function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  )
}

