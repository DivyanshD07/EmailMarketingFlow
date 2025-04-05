import Agenda from "agenda";
import sendEmail from "./nodemailer.js";

const agenda = new Agenda({ db: { address: process.env.MONGODB_URI } });

agenda.define("send email", async (job) => {
  const { email, subject, body } = job.attrs.data;
  console.log("📅 Sending scheduled email to:", email);
  await sendEmail(email, subject, body);
});

await agenda.start(); // Don't forget to start agenda

export default agenda;
