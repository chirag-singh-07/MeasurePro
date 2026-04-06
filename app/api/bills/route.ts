import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Bill from "@/models/Bill";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { 
      projectId, 
      projectName, 
      clientName, 
      billDate, 
      sections, 
      subtotal, 
      gstAmount, 
      totalAmount, 
      itemsCount 
    } = await request.json();

    if (!projectId || !projectName || !clientName || !billDate || !sections) {
      return NextResponse.json(
        { error: "Missing required billing data" },
        { status: 400 },
      );
    }

    await connectDB();

    // Generate a unique bill number
    const count = await Bill.countDocuments({ companyId: (session.user as any).companyId });
    const billNumber = `BILL-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;

    const bill = await Bill.create({
      billNumber,
      projectId,
      companyId: (session.user as any).companyId,
      projectName,
      clientName,
      billDate: new Date(billDate),
      sections,
      subtotal,
      gstAmount,
      totalAmount,
      itemsCount,
      status: "Sent"
    });

    return NextResponse.json(
      {
        message: "Bill saved successfully",
        billId: bill._id.toString(),
        billNumber: bill.billNumber
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create bill error:", error);
    return NextResponse.json(
      { error: "An error occurred while saving the bill" },
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

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "8", 10);
    const skip = (page - 1) * limit;

    const filter: any = { companyId: (session.user as any).companyId };

    if (query) {
      filter.$or = [
        { billNumber: { $regex: query, $options: "i" } },
        { projectName: { $regex: query, $options: "i" } },
        { clientName: { $regex: query, $options: "i" } }
      ];
    }

    const totalCount = await Bill.countDocuments(filter);
    const bills = await Bill.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({ 
      bills,
      pagination: {
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    }, { status: 200 });
  } catch (error: any) {
    console.error("Get bills error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching bills history" },
      { status: 500 },
    );
  }
}

