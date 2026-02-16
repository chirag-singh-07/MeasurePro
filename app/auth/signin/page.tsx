"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Ruler, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
    <div className="min-h-screen grid lg:grid-cols-2 bg-background font-sans">
      {/* Left Side - Visuals (Consistent with Signup) */}
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden bg-primary/5 border-r border-border/50">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:20px_20px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

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

          <div className="max-w-md">
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-4">
              Welcome back.
            </h2>
            <p className="text-muted-foreground text-lg">
              Log in to access your projects, generate invoices, and track your
              measurements.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="p-6 rounded-2xl bg-background/60 backdrop-blur-md border border-white/20 shadow-lg max-w-sm">
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                RK
              </div>
              <div>
                <p className="text-sm italic text-muted-foreground mb-2">
                  "MeasurePro has completely transformed how we handle billing.
                  It's indispensable."
                </p>
                <p className="font-semibold text-sm">Rajesh Kumar</p>
                <p className="text-xs text-muted-foreground">
                  Project Manager, RK Constructions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 lg:p-12 relative bg-background">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="lg:hidden flex items-center justify-center gap-2 font-bold text-xl mb-8">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Ruler className="h-6 w-6 text-primary" />
            </div>
            MeasurePro
          </div>

          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Sign in to your account
            </h1>
            <p className="text-muted-foreground">
              Enter your email below to login
            </p>
          </div>

          <Card className="border-none shadow-none bg-transparent pt-6">
            <CardContent className="p-0 space-y-6">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                  <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 h-11 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-lg shadow-md hover:shadow-lg transition-all text-base font-semibold"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Sign In <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted-foreground/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                type="button"
                disabled
                className="w-full h-11 rounded-lg"
              >
                Google (Coming Soon)
              </Button>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-semibold text-primary hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
