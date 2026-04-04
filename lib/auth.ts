import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client } from "./mongodb";
import { headers } from "next/headers";
import connectDB from "./mongodb";
import UserModel from "@/models/User";
import CompanyModel from "@/models/Company";

export const authInstance = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "Worker",
      },
      companyId: {
        type: "string",
        required: false,
      },
    },
  },
});

/** Shape of the enriched user returned by auth() */
export interface EnrichedUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  companyId: string;
  companyName: string;
}

export interface EnrichedSession {
  user: EnrichedUser;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
}

/**
 * Server-side session helper.
 * Always returns an EnrichedSession (with companyId / role) or null.
 */
export async function auth(): Promise<EnrichedSession | null> {
  const session = await authInstance.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return null;

  // Enrich with companyId, companyName, role from our own User+Company models
  try {
    await connectDB();
    const dbUser = await UserModel.findOne({ email: session.user.email })
      .populate<{ companyId: { _id: unknown; name: string } }>("companyId")
      .lean();

    if (dbUser) {
      return {
        ...session,
        user: {
          ...(session.user as EnrichedUser),
          role: dbUser.role as string,
          companyId: (dbUser.companyId as any)?._id?.toString() ?? "",
          companyName: (dbUser.companyId as any)?.name ?? "",
        },
      } as EnrichedSession;
    }
  } catch {
    // If enrichment fails, return the plain session with safe defaults
  }

  // Fallback: return plain session cast to EnrichedSession with empty strings
  return {
    ...session,
    user: {
      ...(session.user as EnrichedUser),
      role: (session.user as any).role ?? "",
      companyId: (session.user as any).companyId ?? "",
      companyName: (session.user as any).companyName ?? "",
    },
  } as EnrichedSession;
}

// Re-export the type for use elsewhere
export type AuthSession = Awaited<ReturnType<typeof auth>>;

