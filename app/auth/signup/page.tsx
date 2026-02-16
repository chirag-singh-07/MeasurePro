"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Ruler,
  User,
  Building2,
  Lock,
  Loader2,
} from "lucide-react";
import { useToast } from "@/components/ui/toast-context";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email)
        return "Name and Email are required";
      if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email format";
    }
    if (currentStep === 2) {
      if (!formData.companyName) return "Company Name is required";
    }
    if (currentStep === 3) {
      if (!formData.password || !formData.confirmPassword)
        return "Password fields are required";
      if (formData.password !== formData.confirmPassword)
        return "Passwords do not match";
      if (formData.password.length < 6)
        return "Password must be at least 6 characters";
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep(step);
    if (err) {
      toast({
        title: "Validation Error",
        description: err,
        type: "error",
      });
      return;
    }
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep(3);
    if (err) {
      toast({
        title: "Validation Error",
        description: err,
        type: "error",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: formData.companyName,
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Sign Up Failed",
          description: data.error || "An error occurred",
          type: "error",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Success! Welcome aboard.",
        description: "Your account has been created. Please sign in.",
        type: "success",
      });

      router.push("/auth/signin?registered=true");
    } catch (err) {
      toast({
        title: "Network Error",
        description: "An error occurred. Please try again.",
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FFDE59] font-sans text-black selection:bg-black selection:text-white">
      {/* Left Side - Visuals / Branding */}
      <div className="hidden md:flex w-1/2 flex-col justify-between p-12 border-r-4 border-black bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="bg-black text-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
              <Ruler className="h-8 w-8" />
            </div>
            <span className="text-3xl font-black uppercase tracking-tight">
              MeasurePro
            </span>
          </Link>

          <div className="mt-20 space-y-8">
            <h1 className="text-6xl font-black uppercase leading-[0.9]">
              Build
              <br />
              Faster.
              <br />
              Bill
              <br />
              Smarter.
            </h1>
            <p className="text-xl font-bold border-l-8 border-[#FFDE59] pl-6 max-w-md">
              Join 500+ construction companies streamlining their workflow
              today.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          {/* Testimonial Card */}
          <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg font-bold italic mb-4">
              "MeasurePro saved us 20 hours a week on billing alone. It's
              strictly business."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-black text-white flex items-center justify-center font-black border-2 border-black">
                RK
              </div>
              <div>
                <div className="font-black uppercase">Rajesh Kumar</div>
                <div className="text-sm font-bold text-gray-500">
                  Project Manager
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 py-12 bg-[#FFDE59] relative">
        <div className="w-full max-w-md mx-auto bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
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

          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <span className="text-sm font-black uppercase tracking-widest">
                Step {step}/{totalSteps}
              </span>
              <span className="text-xs font-bold uppercase bg-black text-white px-2 py-1">
                {step === 1 ? "Identity" : step === 2 ? "Company" : "Security"}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-4 border-2 border-black bg-white p-0.5 mb-6">
              <div
                className="h-full bg-[#FFDE59] border border-black transition-all duration-300 relative overflow-hidden"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)",
                    backgroundSize: "10px 10px",
                  }}
                ></div>
              </div>
            </div>

            <h2 className="text-3xl font-black uppercase mb-2">
              {step === 1 && "Who goes here?"}
              {step === 2 && "Company Details"}
              {step === 3 && "Secure Access"}
            </h2>
            <p className="font-bold text-gray-600">
              {step === 1 && "Start with your name and email."}
              {step === 2 && "Tell us who you're building with."}
              {step === 3 && "Create a password stronger than concrete."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="min-h-[220px]">
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                  <div className="space-y-2">
                    <label className="block text-sm font-black uppercase flex items-center gap-2">
                      <User className="h-4 w-4" /> Full Name
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border-2 border-black p-4 font-bold text-lg bg-[#f0f0f0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400"
                      placeholder="John Builder"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-black uppercase">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-2 border-black p-4 font-bold text-lg bg-[#f0f0f0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                  <div className="space-y-2">
                    <label className="block text-sm font-black uppercase flex items-center gap-2">
                      <Building2 className="h-4 w-4" /> Company Name
                    </label>
                    <input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full border-2 border-black p-4 font-bold text-lg bg-[#f0f0f0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400"
                      placeholder="Acme Constructions Ltd."
                      autoFocus
                    />
                    <p className="text-xs font-bold text-gray-500 uppercase mt-2">
                      * Displays on invoices
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
                  <div className="space-y-2">
                    <label className="block text-sm font-black uppercase flex items-center gap-2">
                      <Lock className="h-4 w-4" /> Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border-2 border-black p-4 font-bold text-lg bg-[#f0f0f0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400"
                      placeholder="••••••••"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-black uppercase flex items-center gap-2">
                      <Check className="h-4 w-4" /> Confirm Password
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full border-2 border-black p-4 font-bold text-lg bg-[#f0f0f0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:text-gray-400"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-4 border-t-2 border-black mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-4 font-black uppercase border-2 border-black hover:bg-black hover:text-white transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="h-5 w-5" /> Back
                </button>
              )}

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-black text-white px-6 py-4 font-black uppercase border-2 border-black hover:bg-white hover:text-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all flex items-center justify-center gap-2 text-lg"
                >
                  Next <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#FFDE59] text-black px-6 py-4 font-black uppercase border-2 border-black hover:brightness-110 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all flex items-center justify-center gap-2 text-lg disabled:opacity-50 disabled:grayscale"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </button>
              )}
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="font-bold text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="uppercase underline decoration-2 underline-offset-4 hover:bg-black hover:text-white transition-colors px-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
