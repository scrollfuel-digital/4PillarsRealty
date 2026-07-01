import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import "./database/conn.js"
import generalRouter from "./routes/general.router.js"
import adminRouter from "./routes/admin.router.js"

dotenv.config({ path: "./config.env" })

const app = express();
const port = process.env.port || 8000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", generalRouter);
app.use("/api/admin", adminRouter);

app.listen(port, () => {
    console.log(`Server running → http://localhost:${port}`);
});