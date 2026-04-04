import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    // Get the auth token from cookies
    const authToken = request.cookies.get("auth-token")?.value;

    if (!authToken) {
      return NextResponse.json(null, { status: 401 });
    }

    await connectDB();

    // Find user by ID
    const user = await UserModel.findById(authToken).populate("companyId");

    if (!user) {
      return NextResponse.json(null, { status: 401 });
    }

    // Return session in better-auth format
    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        companyId: user.companyId,
      },
      session: {
        token: authToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json(null, { status: 401 });
  }
}
