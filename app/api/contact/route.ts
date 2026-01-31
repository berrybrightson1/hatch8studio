export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Lead from "@/models/Lead";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const data = await req.json();
        console.log("CONTACT_FORM_SUBMISSION:", data);

        const db = await dbConnect();
        let lead = data;

        if (db) {
            try {
                lead = await Lead.create(data);
            } catch (e) {
                console.error("Failed to save lead to DB:", e);
            }
        }

        // Telegram Notification Logic
        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (token && chatId) {
            try {
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
            } catch (e) {
                console.error("Failed to send Telegram notification:", e);
            }
        }

        return NextResponse.json({ success: true, lead }, { status: 201 });
    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: true, message: "Submission received (Bypass)" },
            { status: 201 }
        );
    }
}
