import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        await dbConnect();

        // Create Lead in MongoDB
        const lead = await Lead.create(data);

        // Telegram Notification Logic
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (token && chatId) {
            const message = `
🚀 *New Lead: Hatch8 Studios*
-------------------------
👤 *Name:* ${data.contactName}
🏢 *Brand:* ${data.brandName}
📧 *Email:* ${data.email}
📱 *WhatsApp:* ${data.whatsapp}
🛠️ *Service:* ${data.serviceInterest}
💰 *Tier:* ${data.pricingTier}
📝 *Details:* ${data.projectDescription || "No details provided"}
      `;

            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: "Markdown",
                }),
            });
        }

        return NextResponse.json({ success: true, lead }, { status: 201 });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
