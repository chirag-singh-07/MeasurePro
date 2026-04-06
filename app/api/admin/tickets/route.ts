import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import SupportTicket from "@/models/SupportTicket";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || (session.user.role !== "SuperAdmin" && session.user.role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized access to CORE Protocols" }, { status: 403 });
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");

    const filter: any = {};
    
    // Admin only sees their company, SuperAdmin sees all
    if (session.user.role === "Admin") {
      filter.companyId = (session.user as any).companyId;
    }

    if (status && status !== "all") {
      filter.status = status;
    }

    const tickets = await SupportTicket.find(filter)
      .populate("createdBy", "name email")
      .populate("companyId", "name")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ tickets }, { status: 200 });
  } catch (error: any) {
    console.error("Admin ticket fetch error:", error);
    return NextResponse.json(
      { error: "Protocol Failure: Unable to retrieve support stream" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || (session.user.role !== "SuperAdmin" && session.user.role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id, status, responseMessage } = await request.json();

    if (!id) {
       return NextResponse.json({ error: "Node identifier required" }, { status: 400 });
    }

    await connectDB();

    const ticket = await SupportTicket.findById(id);

    if (!ticket) {
       return NextResponse.json({ error: "Protocol not found" }, { status: 404 });
    }

    // Role-based access control
    if (session.user.role === "Admin" && ticket.companyId.toString() !== (session.user as any).companyId.toString()) {
       return NextResponse.json({ error: "Access Denied: Node mismatch" }, { status: 403 });
    }

    if (status) {
       ticket.status = status;
    }

    if (responseMessage) {
       ticket.responses.push({
          message: responseMessage,
          sentBy: session.user.id,
          senderName: session.user.name || "System Admin",
          createdAt: new Date()
       });
    }

    await ticket.save();

    return NextResponse.json({ message: "Protocol synchronized successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Admin ticket patch error:", error);
    return NextResponse.json(
      { error: "Internal protocol error" },
      { status: 500 },
    );
  }
}
