import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { auth } from "@/lib/auth";
import SupportTicket from "@/models/SupportTicket";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // Get authenticated user
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get ticket and verify it belongs to user's company
    const ticket = await SupportTicket.findOne({
      _id: id,
      companyId: session.user.companyId,
    })
      .populate("createdBy", "email name")
      .populate("assignedTo", "email name")
      .populate("responses.sentBy", "email name");

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: ticket._id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      category: ticket.category,
      createdBy: ticket.createdBy,
      assignedTo: ticket.assignedTo,
      responses: ticket.responses,
      attachments: ticket.attachments,
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching support ticket:", error);
    return NextResponse.json(
      { error: "Failed to fetch support ticket" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // Get authenticated user
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status, priority, response } = await request.json();

    // Get ticket and verify it belongs to user's company
    const ticket = await SupportTicket.findOne({
      _id: id,
      companyId: session.user.companyId,
    });

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    // Update status or priority if provided
    if (status && ["open", "in-progress", "resolved", "closed"].includes(status)) {
      ticket.status = status;
    }
    if (priority && ["low", "medium", "high"].includes(priority)) {
      ticket.priority = priority;
    }

    // Add response if provided
    if (response && response.trim()) {
      ticket.responses.push({
        message: response.trim(),
        sentBy: session.user.id,
        senderName: session.user.name,
        createdAt: new Date(),
      });
    }

    await ticket.save();

    return NextResponse.json({
      message: "Support ticket updated successfully",
      id: ticket._id,
      status: ticket.status,
      priority: ticket.priority,
      responseCount: ticket.responses.length,
    });
  } catch (error) {
    console.error("Error updating support ticket:", error);
    return NextResponse.json(
      { error: "Failed to update support ticket" },
      { status: 500 }
    );
  }
}
