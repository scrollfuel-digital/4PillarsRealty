import express from "express";
import {postControllers} from "../controllers/postControllers.js";

const router = express.Router();

router.post("/postControllers", postControllers);

export default router;