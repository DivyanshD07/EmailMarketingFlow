import API from "../api/axios.js";

export const saveFlow = async (nodes, edges) => {
  const res = await API.post("/save", { nodes, edges });
  return res.data;
};

export const sendEmail = async (email, subject, body) => {
  const res = await API.post("/send", { email, subject, body });
  return res.data;
};

export const scheduleEmail = async (email, subject, body, delay) => {
  const res = await API.post("/schedule", { email, subject, body, delay });
  return res.data;
};
