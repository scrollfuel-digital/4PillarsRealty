import express from "express";
import { getAllInquiries } from "../controllers/inquiryController.js";
import { getFormController } from "../controllers/FormControllers.js";
import { createProject, updateProject, deleteProject } from "../controllers/postControllers.js";

const router = express.Router();

// GET /api/admin/inquiries
router.get("/inquiries", getAllInquiries);

// GET /api/admin/form-submissions
router.get("/form-submissions", getFormController);

// POST /api/admin/projects
router.post("/projects", createProject);

// PUT /api/admin/projects/:slug
router.put("/projects/:slug", updateProject);

// DELETE /api/admin/projects/:slug
router.delete("/projects/:slug", deleteProject);

export default router;
