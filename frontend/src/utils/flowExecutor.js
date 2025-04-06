import { sendEmail, scheduleEmail } from "../services/api.js";

export const executeFlow = async (startNode, nodes, edges) => {
  const getNextNode = (currentId) => {
    const edge = edges.find(e => e.source === currentId);
    return nodes.find(n => n.id === edge?.target);
  };

  const runNode = async (node) => {
    if (!node) return;

    const label = node.data.label.toLowerCase();
    const nextNode = getNextNode(node.id);

    try {
      if (label.includes("cold email")) {
        const email = prompt("Enter recipient email:");
        const subject = prompt("Email Subject:");
        const body = prompt("Email Body:");
        if (!email || !subject || !body) {
          alert("Email details are required.");
          return;
        }
        await sendEmail(email, subject, body);
      } else if (label.includes("wait") || label.includes("delay")) {
        const delay = prompt("Enter delay (e.g. 'in 5 minutes'):");
        const email = prompt("Recipient Email for next Cold Email:");
        const subject = prompt("Subject:");
        const body = prompt("Body:");
        if (!delay || !email || !subject || !body) {
          alert("All delay and email fields are required.");
          return;
        }
        await scheduleEmail(email, subject, body, delay);
      } else if (label.includes("lead source")) {
        alert("Lead Source node reached. (Assume it's a lead entry point)");
      } else {
        console.log("Unknown node type:", label);
        alert("Unknown node type encountered.");
      }
    } catch (error) {
      console.error("Error executing node:", error);
      alert("Failed to execute this node.");
      return;
    }

    if (!nextNode) {
      alert("Flow completed! No more nodes connected.");
      return;
    }

    await runNode(nextNode);
  };

  await runNode(startNode);
};
