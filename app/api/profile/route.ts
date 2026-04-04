import { NextResponse } from "next/server";
import { authInstance } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/User";
import { headers } from "next/headers";

export async function GET() {
  try {
    // Get the session from better-auth
    const session = await authInstance.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Enrich with data from our database
    await connectDB();
    const dbUser = await UserModel.findOne({ email: session.user.email })
      .populate<{ companyId: { _id: unknown; name: string } }>("companyId")
      .lean();

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const companyId = dbUser.companyId as { _id: unknown; name: string } | null;
    const enrichedUser = {
      ...session.user,
      role: dbUser.role as string,
      companyId: companyId?._id?.toString() ?? "",
      companyName: companyId?.name ?? "",
    };

    return NextResponse.json({ user: enrichedUser });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}
