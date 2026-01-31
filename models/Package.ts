import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    features: [{ type: String }],
    tag: { type: String },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Package || mongoose.model("Package", PackageSchema);
