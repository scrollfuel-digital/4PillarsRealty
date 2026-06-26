import mongoose from "mongoose";

const siteVisitSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        phoneNumber: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        interestedProject: {
            type: String,
            required: true,
        },

        visitPreference: {
            type: String,
            enum: ["Today", "Tomorrow", "This Week", "Next Week"],
            required: true,
        },

        preferredDate: {
            type: Date,
            required: true,
        },

        preferredTime: {
            type: String,
            required: true,
        },

        specialRequests: {
            type: String,
            trim: true,
            default: "",
        },

        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("SiteVisit", siteVisitSchema);