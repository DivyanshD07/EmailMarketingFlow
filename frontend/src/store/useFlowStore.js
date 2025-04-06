import { create } from 'zustand';
import { addEdge, applyNodeChanges } from '@xyflow/react';

const useFlowStore = create((set, get) => ({
  nodes: [],
  edges: [],

  addNode: (type) => {
    const id = `${get().nodes.length + 1}`;
    const newNode = {
      id,
      type: 'custom',
      data: { label: `${type} ${id}`, nodeType: type },
      position: { x: 100, y: 100 },
    };
    set((state) => ({ nodes: [...state.nodes, newNode] }));
  },

  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  onConnect: (connection) => {
    set((state) => ({
      edges: addEdge({ ...connection, animated: true, style: { stroke: '#555' } }, state.edges),
    }));
  },

  setFlow: ({ nodes, edges }) => set({ nodes, edges }),
}));

export default useFlowStore;
