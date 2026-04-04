import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsContent from "./settings-content";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/User";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  // Fetch latest user data
  await connectDB();
  const user = await UserModel.findById(session.user.id).lean();

  if (!user) {
    redirect("/auth/signin");
  }

  const userData = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    companyId: session.user.companyId || "",
    companyName: session.user.companyName || "",
    subscriptionPlan: session.user.subscriptionPlan || "Basic Plan",
  };

  return <SettingsContent user={userData} />;
}
