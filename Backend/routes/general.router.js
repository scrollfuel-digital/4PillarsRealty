import express from "express";
import { submitInquiry } from "../controllers/inquiryController.js";
import { getAllProjects, getProjectBySlug } from "../controllers/postControllers.js";

const router = express.Router();

// POST /api/inquiries
router.post("/inquiries", submitInquiry);

// GET /api/projects
router.get("/projects", getAllProjects);

// GET /api/projects/:slug
router.get("/projects/:slug", getProjectBySlug);

export default router;
