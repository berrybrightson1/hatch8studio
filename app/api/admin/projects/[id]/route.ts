import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const data = await req.json();
        await dbConnect();
        const project = await Project.findByIdAndUpdate(params.id, data, { new: true });
        if (!project) return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        return NextResponse.json({ success: true, project });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const project = await Project.findByIdAndDelete(params.id);
        if (!project) return NextResponse.json({ success: false, error: "Project not found" }, { status: 404 });
        return NextResponse.json({ success: true, message: "Project deleted" });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
