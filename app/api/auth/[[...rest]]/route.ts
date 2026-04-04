import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    console.log("Auth GET:", pathname);

    // Handle session endpoint - read from better-auth session cookie
    if (pathname.includes("/session")) {
      console.log("Getting session...");
      
      // Get the better-auth-session cookie
      const cookies = request.cookies;
      const sessionCookie = cookies.get("better-auth.session_token");
      
      if (!sessionCookie) {
        console.log("No session cookie found");
        return NextResponse.json(null);
      }

      try {
        await connectDB();
        
        // For now, return a simple response indicating session exists
        // In production, you'd validate the token against MongoDB
        return NextResponse.json({
          user: {
            id: "session-active",
            email: "user@example.com"
          },
          session: {
            token: sessionCookie.value
          }
        });
      } catch (dbError) {
        console.error("Database error:", dbError);
        return NextResponse.json(null);
      }
    }

    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  } catch (error) {
    console.error("Auth GET error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    console.log("Auth POST:", pathname);
    
    // For now, return 404 for POST requests
    // Better-auth handles sign-in/up via the client
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  } catch (error) {
    console.error("Auth POST error:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
