import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import SupportTicket from "@/models/SupportTicket";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get authenticated user
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, priority, category } = await request.json();

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    // Create new support ticket
    const ticket = new SupportTicket({
      title: title.trim(),
      description: description.trim(),
      priority: priority || "medium",
      category: category || "general-inquiry",
      createdBy: session.user.id,
      companyId: session.user.companyId,
      responses: [],
    });

    await ticket.save();

    return NextResponse.json(
      {
        message: "Support ticket created successfully",
        ticket: {
          id: ticket._id,
          title: ticket.title,
          status: ticket.status,
          priority: ticket.priority,
          category: ticket.category,
          createdAt: ticket.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating support ticket:", error);
    return NextResponse.json(
      { error: "Failed to create support ticket" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get authenticated user
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const category = searchParams.get("category");

    // Build filter
    const filter: any = {
      companyId: session.user.companyId,
    };

    if (status && status !== "all") {
      filter.status = status;
    }
    if (priority && priority !== "all") {
      filter.priority = priority;
    }
    if (category && category !== "all") {
      filter.category = category;
    }

    // Get tickets
    const tickets = await SupportTicket.find(filter)
      .populate("createdBy", "email name")
      .populate("assignedTo", "email name")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      tickets: tickets.map((ticket) => ({
        id: ticket._id,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority,
        category: ticket.category,
        createdBy: ticket.createdBy,
        assignedTo: ticket.assignedTo,
        responseCount: ticket.responses.length,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Error fetching support tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch support tickets" },
      { status: 500 }
    );
  }
}
