"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ruler, Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FFDE59] font-sans text-black selection:bg-black selection:text-white">
      {/* Left Side - Visuals */}
      <div className="hidden md:flex w-1/2 flex-col justify-between p-12 border-r-4 border-black bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="bg-black text-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
              <Ruler className="h-8 w-8" />
            </div>
            <span className="text-3xl font-black uppercase tracking-tight">
              MeasurePro
            </span>
          </Link>

          <div className="space-y-6">
            <h2 className="text-5xl font-black uppercase leading-[0.9]">
              Welcome
              <br />
              Back,
              <br />
              Builder.
            </h2>
            <div className="h-4 w-24 bg-black"></div>
            <p className="text-xl font-bold max-w-sm">
              Your projects are exactly where you left them. Safe, secure, and
              ready to bill.
            </p>
          </div>

          <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
            <span className="text-xl font-black uppercase border-b-4 border-black">
              500+ Active Sites
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 py-12 relative bg-[#FFDE59]">
        <div className="w-full max-w-md mx-auto bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative transition-transform hover:-translate-y-1 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] duration-300">
          {/* Corner decorations */}
          <div className="absolute -top-3 -left-3 h-6 w-6 bg-black"></div>
          <div className="absolute -bottom-3 -right-3 h-6 w-6 bg-black"></div>

          {/* Mobile Header */}
          <div className="md:hidden mb-8 flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-black text-white p-1 border-2 border-black">
                <Ruler className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black uppercase">MeasurePro</span>
            </Link>
          </div>

          <div className="mb-8 border-b-4 border-black pb-4">
            <h1 className="text-4xl font-black uppercase mb-1">Sign In</h1>
            <p className="font-bold text-gray-500">Access your dashboard</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-black text-red-600 font-black flex items-center gap-3 animate-pulse shadow-[4px_4px_0px_0px_#000]">
              <div className="h-3 w-3 bg-red-600 rotate-45"></div>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-black uppercase flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-black p-4 font-bold text-lg bg-[#f0f0f0] focus:bg-white focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400"
                placeholder="m@example.com"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-black uppercase flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Password
                </label>
                <Link
                  href="#"
                  className="text-xs font-black uppercase underline decoration-2 hover:bg-black hover:text-white px-1 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-black p-4 font-bold text-lg bg-[#f0f0f0] focus:bg-white focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 font-black uppercase border-2 border-black hover:bg-white hover:text-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all flex items-center justify-center gap-2 text-xl mt-4 disabled:opacity-50 disabled:grayscale"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t-2 border-black text-center">
            <p className="font-bold text-sm mb-4">Or sign in with</p>
            <button className="w-full py-3 border-2 border-black bg-white font-black uppercase hover:bg-[#f0f0f0] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] opacity-50 cursor-not-allowed">
              Google (Coming Soon)
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="font-bold text-sm">
              New here?{" "}
              <Link
                href="/auth/signup"
                className="uppercase underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-colors px-1"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
