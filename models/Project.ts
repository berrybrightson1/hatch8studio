import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    videoPreview: { type: String },
    description: { type: String, required: true },
    services: [{ type: String }],
    year: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
