import React, { useCallback, useState } from 'react'
import { addEdge, applyNodeChanges, Background, Controls, Handle, Position, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ColdEmailNode, WaitDelayNode, LeadSourceNode } from "./CustomNodes"
import { saveFlow, sendEmail, scheduleEmail } from './services/api.js';
import useFlowStore from './store/useFlowStore.js';
import { findStartNode } from './utils/flowUtil.js';
import { executeFlow } from './utils/flowExecutor.js';

const handleSave = async () => {
  const nodes = useFlowStore.getState().nodes;
  const edges = useFlowStore.getState().edges;
  try {
    const res = await saveFlow(nodes, edges);
    alert(res.message);
  } catch (err) {
    alert("Error saving flow");
  }
};

const handleSend = async () => {
  const email = prompt("Recipient Email:");
  const subject = prompt("Email Subject:");
  const body = prompt("Email Body:");
  if (email && subject && body) {
    const res = await sendEmail(email, subject, body);
    alert(res.message);
  }
};

const handleSchedule = async () => {
  const email = prompt("Recipient Email:");
  const subject = prompt("Email Subject:");
  const body = prompt("Email Body:");
  const delay = prompt("Delay (e.g. 'in 5 minutes', 'in 1 hour'):");
  if (email && subject && body && delay) {
    const res = await scheduleEmail(email, subject, body, delay);
    alert(res.message);
  }
};


const handleRunFlow = async () => {
  const { nodes, edges } = useFlowStore.getState();
  const start = findStartNode(nodes, edges);
  if (!start) return alert("❌ No starting node found!");

  await executeFlow(start, nodes, edges);
};


const nodeTypes = {
  coldEmail: ColdEmailNode,
  waitDelay: WaitDelayNode,
  leadSource: LeadSourceNode,
};


const App = () => {
  const {
    nodes,
    edges,
    addNode,
    onNodesChange,
    onConnect,
  } = useFlowStore();

  return (
    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <div data-testid="sidebar" className="w-1/8 p-10 bg-gray-500 space-y-4">
        <button onClick={() => addNode("Cold Email")}>Add Cold Email</button>
        <button onClick={() => addNode("Wait/Delay")}>Add Wait/Delay</button>
        <button onClick={() => addNode("Lead Source")}>Add Lead Source</button>
        <hr />
        <button onClick={handleSave}>💾 Save Flow</button>
        <button onClick={handleSend}>📤 Send Email</button>
        <button onClick={handleSchedule}>🕒 Schedule Email</button>
        <button onClick={handleRunFlow}>⚙️ Run Flow</button>
      </div>

      {/* Canvas */}
      <div data-testid="flow-canvas" className="w-7/8">
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
  );
};

export default App;