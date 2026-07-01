import Inquiry from "../Models/FormSchema.js";

const getFormController = async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: inquiries });
    } catch (error) {
        console.error("getFormController error:", error);
        return res.status(500).json({ error: "Server error." });
    }
};

export { getFormController };
