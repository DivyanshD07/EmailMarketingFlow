import Agenda from "agenda";
import sendEmail from "./nodemailer.js";


const agenda = new Agenda({
    db: { address: process.env.MONGO_URI, collection: "scheduleJobs" },
});

agenda.define("send email", async (job) => {
    const { email, subject, body } = job.attrs.data;

    console.log(`Sending Email to ${email}...`);

    const success = await sendEmail(email, subject, body);

    if(success) {
        console.log("Email send successfully!");
    } else {
        console.log("Failed to send email.")
    }
});

export default agenda;