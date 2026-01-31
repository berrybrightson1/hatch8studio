export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Package from "@/models/Package";

export async function GET(): Promise<NextResponse> {
    try {
        await dbConnect();
        const packages = await Package.find({}).sort({ order: 1 });
        return NextResponse.json({ success: true, packages });
    } catch (error) {
        console.error("Failed to fetch packages:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch packages" }, { status: 500 });
    }
}

export async function POST(req: Request): Promise<NextResponse> {
    try {
        await dbConnect();
        const body = await req.json();

        // Remove _id if present in body to let Mongoose generate a new ObjectId
        delete body._id;

        const pkg = await Package.create(body);
        return NextResponse.json({ success: true, package: pkg });
    } catch (error) {
        console.error("Failed to create package:", error);
        return NextResponse.json({ success: false, error: "Failed to create package" }, { status: 500 });
    }
}

export async function PUT(req: Request): Promise<NextResponse> {
    try {
        await dbConnect();
        const { id, ...updateData } = await req.json();

        const pkg = await Package.findByIdAndUpdate(id, updateData, { new: true });

        if (!pkg) {
            return NextResponse.json({ success: false, error: "Package not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, package: pkg });
    } catch (error) {
        console.error("Failed to update package:", error);
        return NextResponse.json({ success: false, error: "Failed to update package" }, { status: 500 });
    }
}

export async function DELETE(req: Request): Promise<NextResponse> {
    try {
        await dbConnect();
        const { id } = await req.json();
        const deleted = await Package.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ success: false, error: "Package not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete package:", error);
        return NextResponse.json({ success: false, error: "Failed to delete package" }, { status: 500 });
    }
}
