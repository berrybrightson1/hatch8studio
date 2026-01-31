import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        required: true,
        enum: ["Graphic Design", "Video Editing", "3D Modeling"],
    },
    budget: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "New",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Request || mongoose.model("Request", RequestSchema);
