import siteVisitSchema from "../Models/FormSchema.js";
import "../database/conn.js"
let postControllers = (req, res) => {
    const { fullName, phoneNumber, email, interestedProject, visitPreference, preferredDate, preferredTime, specialRequests } = req.body;
    const newVisit = new siteVisitSchema({
        fullName,
        phoneNumber,
        email,
        interestedProject,
        visitPreference,
        preferredDate,
        preferredTime,
        specialRequests,
    });
    newVisit.save().then(() => {
        res.json({
            success: true,
            message: "Form submitted successfully",
            data: newVisit
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    });
};

export { postControllers };