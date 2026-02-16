import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account and company settings
        </p>
      </div>

      {/* Company Info */}
      <div className="bg-white border-2 border-black">
        <div className="p-6 border-b-2 border-black">
          <h2 className="text-xl font-bold">Company Information</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={session.user.companyName}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                Subscription Plan
              </label>
              <div className="px-4 py-3 border-2 border-gray-300 bg-gray-50 font-semibold">
                Basic Plan
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white border-2 border-black">
        <div className="p-6 border-b-2 border-black">
          <h2 className="text-xl font-bold">User Information</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                value={session.user.name || ""}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={session.user.email || ""}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Role</label>
              <div className="px-4 py-3 border-2 border-gray-300 bg-gray-50 font-semibold">
                {session.user.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-white border-2 border-black">
        <div className="p-6 border-b-2 border-black">
          <h2 className="text-xl font-bold">Subscription & Billing</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Plan */}
            <div className="border-2 border-black p-6">
              <h3 className="text-lg font-bold mb-2">Basic</h3>
              <p className="text-3xl font-bold mb-4">Free</p>
              <ul className="space-y-2 text-sm mb-6">
                <li>✓ 5 Projects</li>
                <li>✓ Basic Features</li>
                <li>✓ Email Support</li>
              </ul>
              <button className="w-full py-2 px-4 border-2 border-black bg-gray-100 font-semibold">
                Current Plan
              </button>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-black p-6 bg-gray-50">
              <h3 className="text-lg font-bold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">
                ₹999<span className="text-sm">/mo</span>
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>✓ 50 Projects</li>
                <li>✓ Advanced Features</li>
                <li>✓ Priority Support</li>
                <li>✓ PDF Export</li>
              </ul>
              <button className="w-full py-2 px-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all font-semibold">
                Upgrade
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="border-2 border-black p-6">
              <h3 className="text-lg font-bold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">
                ₹2999<span className="text-sm">/mo</span>
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>✓ Unlimited Projects</li>
                <li>✓ All Features</li>
                <li>✓ 24/7 Support</li>
                <li>✓ Custom Branding</li>
              </ul>
              <button className="w-full py-2 px-4 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all font-semibold">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white border-2 border-red-500">
        <div className="p-6 border-b-2 border-red-500 bg-red-50">
          <h2 className="text-xl font-bold text-red-700">Danger Zone</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button className="px-6 py-3 bg-red-600 text-white font-semibold border-2 border-red-600 hover:bg-white hover:text-red-600 transition-all">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
