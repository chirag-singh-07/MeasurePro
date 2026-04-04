"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Ruler, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/toast-context";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams?.get("registered") === "true") {
      // Defer toast to ensure provider is ready
      setTimeout(() => {
        toast({
          title: "Account Created!",
          description: "Please sign in with your new credentials.",
          type: "success",
          duration: 5000,
        });
      }, 500);
    }
  }, [searchParams, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Access Denied",
          description: data.error || "Invalid email or password. Please try again.",
          type: "error",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Welcome Back",
        description: "Redirecting to your dashboard...",
        type: "success",
      });
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast({
        title: "Network Error",
        description: "An unexpected error occurred. Please try again later.",
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-black uppercase flex items-center gap-2">
            <Mail className="h-4 w-4" /> Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 border-black p-4 font-bold text-lg bg-[#f0f0f0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400"
            placeholder="m@example.com"
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-black uppercase flex items-center gap-2">
            <Lock className="h-4 w-4" /> Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-2 border-black p-4 font-bold text-lg bg-[#f0f0f0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white font-black uppercase py-4 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t-2 border-gray-200">
        <p className="font-bold text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-black underline hover:bg-black hover:text-white px-1 transition-all"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
