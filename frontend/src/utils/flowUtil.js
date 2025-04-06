export const findStartNode = (nodes, edges) => {
    const targetIds = edges.map(edge => edge.target);
    const startingNodes = nodes.filter(node => !targetIds.includes(node.id));
  
    if (startingNodes.length > 1) {
      alert("Multiple starting nodes found. Using the first one.");
    } else if (startingNodes.length === 0) {
      alert("No starting node found.");
      return null;
    }
  
    return startingNodes[0];
  };
  