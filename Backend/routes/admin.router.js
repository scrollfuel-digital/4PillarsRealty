import express from "express";
import {getController} from "../controllers/getControllers.js";
const router = express.Router();    

router.get("/getPosts", getController);

export default router;