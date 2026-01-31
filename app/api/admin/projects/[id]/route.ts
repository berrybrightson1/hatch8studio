export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const { id } = await params;
        const data = await req.json();
        await dbConnect();
        const project = await Project.findByIdAndUpdate(id, data, { new: true });
        if (!project) return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        return NextResponse.json({ success: true, project });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const { id } = await params;
        await dbConnect();
        const project = await Project.findByIdAndDelete(id);
        if (!project) return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        return NextResponse.json({ success: true, message: "Project deleted" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
