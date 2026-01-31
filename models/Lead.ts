import mongoose, { Schema, model, models } from "mongoose";

const LeadSchema = new Schema({
    brandName: { type: String, required: true },
    contactName: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },

    // The specific service they want
    serviceInterest: {
        type: String,
        required: true,
        enum: ["Graphic Design", "Video Editing", "3D Modeling", "Full Package"]
    },

    // If they selected a monthly plan
    pricingTier: {
        type: String,
        enum: ["Starter", "Professional", "Agency", "Custom"],
        default: "Custom"
    },

    budgetRange: { type: String },
    projectDescription: { type: String },

    status: {
        type: String,
        default: "New",
        enum: ["New", "Contacted", "Proposal Sent", "Closed - Won", "Closed - Lost"]
    },

    createdAt: { type: Date, default: Date.now },
});

const Lead = models.Lead || model("Lead", LeadSchema);

export default Lead;
