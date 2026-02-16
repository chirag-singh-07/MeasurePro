import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Company from "@/models/Company";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, clientName, date, location, notes } = await request.json();

    if (!name || !clientName || !date || !location) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 },
      );
    }

    await connectDB();

    // Check project limit
    const company = await Company.findById(session.user.companyId);
    const projectCount = await Project.countDocuments({
      companyId: session.user.companyId,
    });

    if (projectCount >= company.projectLimit) {
      return NextResponse.json(
        {
          error: `Project limit reached. Upgrade your plan to create more projects.`,
        },
        { status: 403 },
      );
    }

    const project = await Project.create({
      name,
      clientName,
      date: new Date(date),
      location,
      notes,
      companyId: session.user.companyId,
      createdBy: session.user.id,
      status: "Active",
    });

    return NextResponse.json(
      {
        message: "Project created successfully",
        projectId: project._id.toString(),
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the project" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const projects = await Project.find({ companyId: session.user.companyId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: any) {
    console.error("Get projects error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching projects" },
      { status: 500 },
    );
  }
}
