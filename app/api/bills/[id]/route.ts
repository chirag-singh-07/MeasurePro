import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Bill from "@/models/Bill";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const bill = await Bill.findOne({
      _id: id,
      companyId: (session.user as any).companyId,
    }).lean();

    if (!bill) {
      return NextResponse.json({ error: "Bill not found" }, { status: 404 });
    }

    return NextResponse.json({ bill });
  } catch (error: any) {
    console.error("Get bill error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the bill details" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const bill = await Bill.findOneAndDelete({
      _id: id,
      companyId: (session.user as any).companyId,
    });

    if (!bill) {
      return NextResponse.json({ error: "Bill not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Bill deleted successfully" });
  } catch (error: any) {
    console.error("Delete bill error:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting the bill" },
      { status: 500 },
    );
  }
}
