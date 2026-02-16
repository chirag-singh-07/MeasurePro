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
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
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
      setError(err);
      return;
    }
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep(3);
    if (err) {
      setError(err);
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
        setError(data.error || "An error occurred");
        setLoading(false);
        return;
      }

      router.push("/auth/signin?registered=true");
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background font-sans">
      {/* Left Side - Visuals */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

        <div className="relative z-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold tracking-tight mb-8"
          >
            <div className="bg-primary/10 p-2 rounded-lg">
              <Ruler className="h-6 w-6 text-primary" />
            </div>
            MeasurePro
          </Link>

          <div className="space-y-6 max-w-lg">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
              Join thousands of builders.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Create professional estimates, manage projects, and get paid
              faster with the industry's most intuitive platform.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid gap-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 backdrop-blur border shadow-sm">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Free 14-day Pro Trial</p>
              <p className="text-sm text-muted-foreground">
                No credit card required
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-background/50 backdrop-blur border shadow-sm">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">AI Auto-Estimation</p>
              <p className="text-sm text-muted-foreground">
                Save 10+ hours per week
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-12 relative">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2 font-bold text-xl mb-8">
            <Ruler className="h-6 w-6 text-primary" /> MeasurePro
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">
              Create an account
            </h2>
            <p className="text-muted-foreground">
              {step === 1 && "Start with your basic details."}
              {step === 2 && "Tell us about your company."}
              {step === 3 && "Secure your account."}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  i <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="border-none shadow-none bg-transparent">
              <CardContent className="p-0 space-y-6">
                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                    {error}
                  </div>
                )}

                <div className="min-h-[200px]">
                  {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/20"
                            value={formData.name}
                            onChange={handleChange}
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="bg-muted/30 h-11 border-muted-foreground/20 focus-visible:ring-primary/20"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="companyName"
                            name="companyName"
                            placeholder="Acme Inc."
                            className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/20"
                            value={formData.companyName}
                            onChange={handleChange}
                            autoFocus
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          This will be displayed on your invoices.
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/20"
                            value={formData.password}
                            onChange={handleChange}
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          className="h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/20"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="h-11 px-6 rounded-lg"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" /> Back
                    </Button>
                  )}

                  {step < totalSteps ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 h-11 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Continue <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 h-11 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-semibold text-primary hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
