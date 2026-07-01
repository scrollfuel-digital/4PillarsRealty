import Post from "../Models/PostSchema.js";

// GET /api/projects — fetch all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Post.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: projects });
    } catch (error) {
        console.error("getAllProjects error:", error);
        return res.status(500).json({ error: "Server error." });
    }
};

// GET /api/projects/:slug — fetch single project by slug
const getProjectBySlug = async (req, res) => {
    try {
        const project = await Post.findOne({ slug: req.params.slug });
        if (!project) return res.status(404).json({ error: "Project not found." });
        return res.status(200).json({ success: true, data: project });
    } catch (error) {
        console.error("getProjectBySlug error:", error);
        return res.status(500).json({ error: "Server error." });
    }
};

// POST /api/admin/projects — create a new project (admin)
const createProject = async (req, res) => {
    try {
        const project = await Post.create(req.body);
        return res.status(201).json({ success: true, data: project });
    } catch (error) {
        console.error("createProject error:", error);
        if (error.code === 11000) {
            return res.status(409).json({ error: "A project with this slug or id already exists." });
        }
        return res.status(500).json({ error: "Server error." });
    }
};

// PUT /api/admin/projects/:slug — update a project (admin)
const updateProject = async (req, res) => {
    try {
        const project = await Post.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true, runValidators: true }
        );
        if (!project) return res.status(404).json({ error: "Project not found." });
        return res.status(200).json({ success: true, data: project });
    } catch (error) {
        console.error("updateProject error:", error);
        return res.status(500).json({ error: "Server error." });
    }
};

// DELETE /api/admin/projects/:slug — delete a project (admin)
const deleteProject = async (req, res) => {
    try {
        const project = await Post.findOneAndDelete({ slug: req.params.slug });
        if (!project) return res.status(404).json({ error: "Project not found." });
        return res.status(200).json({ success: true, message: "Project deleted." });
    } catch (error) {
        console.error("deleteProject error:", error);
        return res.status(500).json({ error: "Server error." });
    }
};

export { getAllProjects, getProjectBySlug, createProject, updateProject, deleteProject };
