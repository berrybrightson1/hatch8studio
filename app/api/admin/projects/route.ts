export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(): Promise<NextResponse> {
    try {
        await dbConnect();
        const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
        return NextResponse.json({ success: true, projects });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const data = await req.json();
        await dbConnect();
        const project = await Project.create(data);
        return NextResponse.json({ success: true, project }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
