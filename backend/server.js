import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDb } from "./lib/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Api is running...");
});

const PORT = process.env.PORT || 5003;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb();
});