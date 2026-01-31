
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import Request from "@/models/Request";
import dbConnect from "@/lib/mongodb";

async function verifyRequests() {
    console.log("🔍 Starting Admin Requests Verification...");

    try {
        console.log("1. Connecting to MongoDB...");
        await dbConnect();
        console.log("✅ MongoDB Connected");

        // Step 2: Create a Test Request
        console.log("2. Creating Test Request...");
        const testData = {
            businessName: "VERIFICATION_TEST_" + Date.now(),
            serviceType: "Graphic Design",
            budget: "$1,000",
            message: "Automated verification test message",
            status: "New"
        };

        const newRequest = await Request.create(testData);
        console.log(`✅ Test Request Created: ${newRequest.businessName} (ID: ${newRequest._id})`);

        // Step 3: Fetch Requests (Simulating Admin View)
        console.log("3. Fetching All Requests...");
        const allRequests = await Request.find({}).sort({ createdAt: -1 });

        const found = allRequests.find(r => r._id.toString() === newRequest._id.toString());

        if (found) {
            console.log("✅ SUCCESS: Created request was found in the list.");
            console.log(`   Total Requests: ${allRequests.length}`);
            console.log(`   Latest Request: ${allRequests[0].businessName}`);
        } else {
            console.error("❌ FAILURE: Created request was NOT found in the list.");
        }

        // Cleanup
        console.log("4. Cleaning up Test Request...");
        await Request.findByIdAndDelete(newRequest._id);
        console.log("✅ Test Request Deleted");

        process.exit(0);

    } catch (error) {
        console.error("❌ Verification Failed:", error);
        process.exit(1);
    }
}

verifyRequests();
