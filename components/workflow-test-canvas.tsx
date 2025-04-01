"use client"

import { useEffect } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  type Node,
  type Edge,
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

interface WorkflowTestCanvasProps {
  activeNodeId: string | null
}

export function WorkflowTestCanvas({ activeNodeId }: WorkflowTestCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  // Update node styles based on active node
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === activeNodeId) {
          // Active node
          return {
            ...node,
            style: {
              ...node.style,
              boxShadow: "0 0 10px 5px rgba(59, 130, 246, 0.5)",
              borderColor: "#3b82f6",
              borderWidth: "2px",
              transition: "all 0.3s ease",
            },
          }
        } else {
          // Inactive node
          return {
            ...node,
            style: {
              ...node.style,
              boxShadow: "none",
              borderColor: undefined,
              borderWidth: undefined,
              transition: "all 0.3s ease",
            },
          }
        }
      }),
    )
  }, [activeNodeId, setNodes])

  // Update edge styles based on active node
  useEffect(() => {
    if (!activeNodeId) {
      // Reset all edges
      setEdges((eds) =>
        eds.map((edge) => ({
          ...edge,
          animated: false,
          style: { stroke: "#e2e8f0", strokeWidth: 1 },
        })),
      )
      return
    }

    setEdges((eds) =>
      eds.map((edge) => {
        const isSourceActive = edge.source === activeNodeId
        const isTargetActive = edge.target === activeNodeId

        if (isSourceActive || isTargetActive) {
          return {
            ...edge,
            animated: true,
            style: { stroke: "#3b82f6", strokeWidth: 2 },
          }
        }

        return {
          ...edge,
          animated: false,
          style: { stroke: "#e2e8f0", strokeWidth: 1 },
        }
      }),
    )
  }, [activeNodeId, setEdges])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      attributionPosition="bottom-right"
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  )
}

