import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user by email
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      console.error(`User not found for email: ${email}`);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      console.error(
        `Password mismatch for user: ${email}. Provided password hash mismatch.`
      );
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Successfully authenticated
    console.log(`User signed in successfully: ${email}`);

    // Return user data and success
    const response = NextResponse.json({
      success: true,
      message: "Signed in successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        companyId: user.companyId,
      },
    });

    // Set auth cookie to establish session
    response.cookies.set("auth-token", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { error: "An error occurred during sign in" },
      { status: 500 }
    );
  }
}
