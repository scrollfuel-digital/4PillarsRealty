import express from "express"
import dotenv from "dotenv"
import generalRouter from "./routes/general.router.js"
import adminRouter from "./routes/admin.router.js"
dotenv.config({path: "./config.env"})

let app = express();
let port = process.env.port || 3000;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", generalRouter);
app.use("/admin", adminRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port} || http://localhost:${port}`);
})