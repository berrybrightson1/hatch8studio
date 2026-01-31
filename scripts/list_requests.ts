
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";

async function listRecentRequests() {
    console.log("🔍 Connecting to MongoDB to fetch recent requests...");

    try {
        // Dynamic imports
        const { default: dbConnect } = await import("@/lib/mongodb");
        const { default: Request } = await import("@/models/Request");

        await dbConnect();
        console.log("✅ Connected.");

        const requests = await Request.find({}).sort({ createdAt: -1 }).limit(5);

        console.log(`\n📋 Found ${requests.length} Recent Requests:`);
        requests.forEach(r => {
            console.log(`- [${r.createdAt.toISOString().split('T')[0]}] ${r.businessName} (${r.serviceType})`);
            console.log(`  Budget: ${r.budget}`);
            console.log(`  Message preview: ${r.message.substring(0, 50)}...`);
            console.log("---------------------------------------------------");
        });

        if (requests.length === 0) {
            console.log("⚠️ No requests found in the database.");
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Failed to fetch requests:", error);
        process.exit(1);
    }
}

listRecentRequests();
