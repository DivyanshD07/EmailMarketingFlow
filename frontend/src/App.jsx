import React, { useCallback, useState } from 'react'
import { addEdge, applyNodeChanges, Background, Controls, Handle, Position, ReactFlow } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { ColdEmailNode, LeadSourceNode, WaitDelayNode } from './CustomNodes';

const CustomNode = ({ data }) => {
  const [label, setLabel] = useState(data.label);

  return (
    <div
      onDoubleClick={() => {
        const newLabel = prompt("Edit Node Label:", label);
        if (newLabel !== null) setLabel(newLabel);
      }}
      className='p-3 bg-blue-200 border border-gray-500 rounded-md text-center cursor-pointer'
    >
      {label}
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  )
}


const nodeTypes = {
  custom: CustomNode,
};

const App = () => {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "custom",
      data: { label: "Initial Node" },
      position: { x: 200, y: 200 }, // Ensure position exists
    }
  ]);
  const [edges, setEdges] = useState([]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#555" } }, eds)),
    [setEdges]
  );

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  const addNode = (type) => {
    const id = `${nodes.length + 1}`;
    const newNode = {
      id,
      type: "custom",
      data: { label: `${type} ${id}` },
      position: { x: 100, y: 100 },
    };
    setNodes((nds) => [...nds, newNode]);
  }
  return (
    <div className='w-screen h-screen flex'>

      {/* Sidebar */}
      <div className='w-1/8 p-10 bg-gray-500'>
        <button onClick={() => addNode("coldEmail")}>Add Cold Email</button>
        <button onClick={() => addNode("waitDelay")}>Add Wait/Delay</button>
        <button onClick={() => addNode("leadSource")}>Add Lead Source</button>
      </div>

      {/* Canvas */}
      <div className='w-7/8'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  )
}

export default App