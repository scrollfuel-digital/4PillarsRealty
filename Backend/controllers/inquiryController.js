import Inquiry from "../Models/FormSchema.js";

// POST /api/inquiries — submit a new inquiry
const submitInquiry = async (req, res) => {
    try {
        const { name, email, phone, projectSlug, message } = req.body;

        if (!name || !email || !phone || !projectSlug || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const inquiry = await Inquiry.create({
            fullName: name,
            email,
            phone,
            project: projectSlug,
            message,
        });

        return res.status(201).json({
            success: true,
            message: "Inquiry submitted successfully.",
            data: inquiry,
        });
    } catch (error) {
        console.error("submitInquiry error:", error);
        return res.status(500).json({ error: "Server error. Please try again." });
    }
};

// GET /api/admin/inquiries — fetch all inquiries (admin)
const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: inquiries });
    } catch (error) {
        console.error("getAllInquiries error:", error);
        return res.status(500).json({ error: "Server error." });
    }
};

export { submitInquiry, getAllInquiries };
