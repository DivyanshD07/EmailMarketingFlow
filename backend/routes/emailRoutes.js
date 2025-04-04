import express from "express";
import EmailFlow from "../models/EmailFlow.js";
import agenda from "../lib/agenda.js";
import sendEmail from "../lib/nodemailer.js"; // ✅ Fix: Import sendEmail

const router = express.Router();

// Save email flow
router.post("/save", async (req, res) => {
  try {
    const { nodes, edges } = req.body;

    // ✅ Validation check
    if (!nodes || !edges) {
      return res.status(400).json({ success: false, message: "Nodes and edges are required." });
    }

    // ✅ Optional: Check if flow already exists (update instead of always creating new)
    let emailFlow = await EmailFlow.findOne({ nodes, edges });
    if (emailFlow) {
      return res.json({ success: true, message: "Flow already saved!" });
    }

    emailFlow = new EmailFlow({ nodes, edges });
    await emailFlow.save();
    res.json({ success: true, message: "Flow saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving flow:", error);
    res.status(500).json({ success: false, message: "Error saving flow" });
  }
});

// Send email instantly
router.post("/send", async (req, res) => {
  try {
    const { email, subject, body } = req.body;

    // ✅ Validation check
    if (!email || !subject || !body) {
      return res.status(400).json({ success: false, message: "Email, subject, and body are required." });
    }

    const success = await sendEmail(email, subject, body);
    if (success) {
      res.json({ success: true, message: "Email sent successfully!" });
    } else {
      res.status(500).json({ success: false, message: "Failed to send email" });
    }
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

// Schedule an email
router.post("/schedule", async (req, res) => {
  try {
    const { email, subject, body, delay } = req.body;

    // ✅ Validation check
    if (!email || !subject || !body || !delay) {
      return res.status(400).json({ success: false, message: "Email, subject, body, and delay are required." });
    }

    await agenda.schedule(delay, "send email", { email, subject, body });
    res.json({ success: true, message: "Email scheduled!" });
  } catch (error) {
    console.error("❌ Error scheduling email:", error);
    res.status(500).json({ success: false, message: "Error scheduling email" });
  }
});

export default router;
