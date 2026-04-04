"use client";

import { useState } from "react";
import { Edit2, Save, X, CheckCircle } from "lucide-react";

interface SettingsContentProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    companyId: string;
    companyName: string;
    subscriptionPlan: string;
  };
}

export default function SettingsContent({ user }: SettingsContentProps) {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "Name cannot be empty" });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: formData.name }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setEditMode(false);
        // Optionally reload page or update state
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error updating profile" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your account and company settings
        </p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`p-4 border-2 ${
            message.type === "success"
              ? "border-green-500 bg-green-50 text-green-900"
              : "border-red-500 bg-red-50 text-red-900"
          } font-semibold flex items-center gap-2`}
        >
          {message.type === "success" && <CheckCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {/* Company Info */}
      <div className="bg-white border-2 border-black">
        <div className="p-6 border-b-2 border-black">
          <h2 className="text-2xl font-bold">Company Information</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={user.companyName}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50 font-semibold"
              />
              <p className="text-xs text-gray-500 mt-1">Read-only</p>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                Subscription Plan
              </label>
              <div className="px-4 py-3 border-2 border-black font-bold text-lg">
                {user.subscriptionPlan}
              </div>
              <p className="text-xs text-gray-500 mt-1">Read-only</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Info - Editable */}
      <div className="bg-white border-2 border-black">
        <div className="p-6 border-b-2 border-black flex items-center justify-between">
          <h2 className="text-2xl font-bold">User Information</h2>
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 font-semibold border-2 border-black hover:bg-white hover:text-black transition-all"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2">Name</label>
              {editMode ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter your name"
                  disabled={loading}
                />
              ) : (
                <input
                  type="text"
                  value={user.name}
                  disabled
                  className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50 font-semibold"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 border-2 border-gray-300 bg-gray-50 font-semibold"
              />
              <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Role</label>
              <div className="px-4 py-3 border-2 border-gray-300 bg-gray-50 font-bold text-lg">
                {user.role}
              </div>
              <p className="text-xs text-gray-500 mt-1">Cannot be changed</p>
            </div>
          </div>

          {/* Edit Mode Actions */}
          {editMode && (
            <div className="flex gap-3 pt-4 border-t-2 border-gray-200">
              <button
                onClick={handleSave}
                disabled={loading}
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 font-semibold border-2 border-green-600 hover:bg-white hover:text-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setEditMode(false);
                  setFormData({ name: user.name });
                  setMessage(null);
                }}
                disabled={loading}
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold border-2 border-black hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="bg-white border-2 border-black">
        <div className="p-6 border-b-2 border-black">
          <h2 className="text-2xl font-bold">Subscription & Billing</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Basic Plan */}
            <div
              className={`border-2 p-6 transition-all ${
                user.subscriptionPlan === "Basic Plan"
                  ? "border-black bg-black text-white"
                  : "border-black"
              }`}
            >
              <h3 className="text-lg font-bold mb-2">Basic</h3>
              <p className="text-3xl font-bold mb-4">
                {user.subscriptionPlan === "Basic Plan" ? "Your Plan" : "Free"}
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>✓ 5 Projects</li>
                <li>✓ Basic Features</li>
                <li>✓ Email Support</li>
              </ul>
              <button
                disabled={user.subscriptionPlan === "Basic Plan"}
                className={`w-full py-3 px-4 border-2 font-semibold transition-all ${
                  user.subscriptionPlan === "Basic Plan"
                    ? "border-white text-white cursor-default"
                    : "border-black bg-gray-100 hover:bg-black hover:text-white"
                }`}
              >
                {user.subscriptionPlan === "Basic Plan"
                  ? "Current Plan"
                  : "Downgrade"}
              </button>
            </div>

            {/* Pro Plan */}
            <div
              className={`border-2 p-6 transition-all ${
                user.subscriptionPlan === "Pro Plan"
                  ? "border-black bg-black text-white"
                  : "border-black"
              }`}
            >
              <h3 className="text-lg font-bold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">
                {user.subscriptionPlan === "Pro Plan" ? (
                  "Your Plan"
                ) : (
                  <>
                    ₹999<span className="text-sm">/mo</span>
                  </>
                )}
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>✓ 50 Projects</li>
                <li>✓ Advanced Features</li>
                <li>✓ Priority Support</li>
                <li>✓ PDF Export</li>
              </ul>
              <button
                disabled={user.subscriptionPlan === "Pro Plan"}
                className={`w-full py-3 px-4 border-2 font-semibold transition-all ${
                  user.subscriptionPlan === "Pro Plan"
                    ? "border-white text-white cursor-default"
                    : "border-black bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                {user.subscriptionPlan === "Pro Plan" ? "Current Plan" : "Upgrade"}
              </button>
            </div>

            {/* Enterprise Plan */}
            <div
              className={`border-2 p-6 transition-all ${
                user.subscriptionPlan === "Enterprise Plan"
                  ? "border-black bg-black text-white"
                  : "border-black"
              }`}
            >
              <h3 className="text-lg font-bold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold mb-4">
                {user.subscriptionPlan === "Enterprise Plan" ? (
                  "Your Plan"
                ) : (
                  <>
                    ₹2999<span className="text-sm">/mo</span>
                  </>
                )}
              </p>
              <ul className="space-y-2 text-sm mb-6">
                <li>✓ Unlimited Projects</li>
                <li>✓ All Features</li>
                <li>✓ 24/7 Support</li>
                <li>✓ Custom Branding</li>
              </ul>
              <button
                disabled={user.subscriptionPlan === "Enterprise Plan"}
                className={`w-full py-3 px-4 border-2 font-semibold transition-all ${
                  user.subscriptionPlan === "Enterprise Plan"
                    ? "border-white text-white cursor-default"
                    : "border-black bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                {user.subscriptionPlan === "Enterprise Plan"
                  ? "Current Plan"
                  : "Upgrade"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white border-2 border-red-500">
        <div className="p-6 border-b-2 border-red-500 bg-red-50">
          <h2 className="text-2xl font-bold text-red-700">Danger Zone</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
          <button className="px-6 py-3 border-2 border-red-500 text-red-600 font-semibold hover:bg-red-50 transition-all">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
