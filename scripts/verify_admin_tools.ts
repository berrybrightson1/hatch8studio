
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";

async function verifyAllAdminTools() {
    console.log("🔍 Starting Full Admin Tools Verification...");

    try {
        // Dynamic imports to ensure env vars are loaded first
        const { default: dbConnect } = await import("@/lib/mongodb");
        const { default: Request } = await import("@/models/Request");
        const { default: Lead } = await import("@/models/Lead");
        const { default: Project } = await import("@/models/Project");
        const { default: Package } = await import("@/models/Package");

        console.log("1. Connecting to MongoDB...");
        // Log the masked URI to confirm it's loaded
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error("MONGODB_URI is undefined in process.env");
        console.log(`   URI Loaded: ${uri.substring(0, 15)}...`);

        await dbConnect();
        console.log("✅ MongoDB Connected");

        // Check Requests
        console.log("\n2. Checking REQUESTS...");
        const requestCount = await Request.countDocuments();
        console.log(`   ✅ Requests Collection Accessible. Count: ${requestCount}`);
        const newRequest = await Request.create({
            businessName: "ADMIN_TOOL_TEST",
            serviceType: "Graphic Design",
            budget: "Test",
            message: "Sanity check",
            status: "New"
        });
        console.log(`   ✅ Created Test Request (ID: ${newRequest._id})`);
        await Request.findByIdAndDelete(newRequest._id);
        console.log("   ✅ Deleted Test Request");

        // Check Leads
        console.log("\n3. Checking LEADS...");
        const leadCount = await Lead.countDocuments();
        console.log(`   ✅ Leads Collection Accessible. Count: ${leadCount}`);

        // Check Projects
        console.log("\n4. Checking PROJECTS...");
        const projectCount = await Project.countDocuments();
        console.log(`   ✅ Projects Collection Accessible. Count: ${projectCount}`);

        // Check Packages
        console.log("\n5. Checking PACKAGES...");
        const packageCount = await Package.countDocuments();
        console.log(`   ✅ Packages Collection Accessible. Count: ${packageCount}`);

        console.log("\n🎉 ALL SYSTEMS OPERATIONAL");
        process.exit(0);

    } catch (error) {
        console.error("❌ Verification Failed:", error);
        process.exit(1);
    }
}

verifyAllAdminTools();
