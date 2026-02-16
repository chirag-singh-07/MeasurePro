import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowRight,
  Check,
  Hammer,
  Ruler,
  FileText,
  ChartBar,
  ShieldCheck,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tighter">
              MeasurePro
            </span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
            <Link
              href="#features"
              className="hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 border-b bg-background">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                New: PDF Export & Advanced Analytics
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl/none max-w-4xl text-pretty">
                Precision Measurement for Modern Construction
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl leading-relaxed">
                Streamline your billing, measurement sheets, and project
                management with a platform built for industrial precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base w-full sm:w-auto"
                  asChild
                >
                  <Link href="/auth/signup">
                    <span>Start Free Trial</span>{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base w-full sm:w-auto"
                  asChild
                >
                  <Link href="#demo">View Demo</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-16 w-full">
                <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mb-6">
                  Trusted by industry leaders
                </p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
                  <span className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <Hammer className="h-5 w-5" /> ACME Corp
                  </span>
                  <span className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <Ruler className="h-5 w-5" /> BuildTech
                  </span>
                  <span className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" /> Structura
                  </span>
                  <span className="text-xl md:text-2xl font-bold flex items-center gap-2">
                    <ChartBar className="h-5 w-5" /> MegaWorks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/30"
        >
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-block rounded-lg bg-background border px-3 py-1 text-sm font-medium text-primary">
                Key Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything you need to master your measurements
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From site measurements to final billing, we've got you covered
                with tools designed for speed and accuracy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-background border shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                    <Ruler className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Dynamic Measurements</CardTitle>
                  <CardDescription>
                    Inline editable tables that feel like Excel but work like a
                    database. Auto-calculations for size, quantity, and rates.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background border shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Professional Invoicing</CardTitle>
                  <CardDescription>
                    Generate beautiful PDF invoices and measurement sheets
                    instantly. Customizable with your logo and branding.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background border shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                    <ChartBar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Project Analytics</CardTitle>
                  <CardDescription>
                    Real-time dashboard to track project status, revenue, and
                    completion rates across all your sites.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background border shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Role-Based Access</CardTitle>
                  <CardDescription>
                    Granular permissions for Admins, Managers, and Workers.
                    Control who sees and edits sensitive data.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background border shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                    <Hammer className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Multi-Tenant</CardTitle>
                  <CardDescription>
                    Built for scalability. Whether you handle 5 projects or 500,
                    your data is isolated and secure.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background border shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Compliance Ready</CardTitle>
                  <CardDescription>
                    GST calculations built-in. Export data easily for accounting
                    and audits.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 border-t bg-background"
        >
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Simple, transparent pricing
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Choose the plan that fits your business size. No hidden fees.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Basic Plan */}
              <Card className="flex flex-col border shadow-none hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Basic</CardTitle>
                  <CardDescription>For freelancers</CardDescription>
                  <div className="mt-4 text-4xl font-bold tracking-tight">
                    Free
                  </div>
                  <p className="text-sm text-muted-foreground">Forever free</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" /> 5 Active
                      Projects
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" /> Basic Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" /> PDF Export
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4" /> Priority Support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="flex flex-col border-2 border-primary shadow-xl relative scale-105 z-10 bg-background">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">Pro</CardTitle>
                  <CardDescription>For growing teams</CardDescription>
                  <div className="mt-4 text-4xl font-bold tracking-tight">
                    ₹999
                  </div>
                  <p className="text-sm text-muted-foreground">per month</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary w-fit" /> 50 Active
                      Projects
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary w-fit" /> Advanced
                      Analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary w-fit" /> Custom
                      Branding
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary w-fit" /> Priority
                      Email Support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/auth/signup">Upgrade to Pro</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="flex flex-col border shadow-none hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">Enterprise</CardTitle>
                  <CardDescription>For large organizations</CardDescription>
                  <div className="mt-4 text-4xl font-bold tracking-tight">
                    ₹2999
                  </div>
                  <p className="text-sm text-muted-foreground">per month</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary w-fit" /> Unlimited
                      Projects
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary w-fit" /> dedicated
                      Support
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary w-fit" /> Custom
                      Integration
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary w-fit" /> SLA
                      Agreement
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Ready to transform your workflow?
            </h2>
            <p className="max-w-[600px] mx-auto text-primary-foreground/80 md:text-xl mb-8">
              Join thousands of construction professionals who trust MeasurePro
              for their daily operations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="h-12 px-8 w-full sm:w-auto font-semibold"
                asChild
              >
                <Link href="/auth/signup">Start Your Free Trial</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 w-full sm:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-background border-t">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-semibold">
            <Ruler className="h-5 w-5" /> MeasurePro
          </div>
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © 2024 MeasurePro Inc. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 text-xs text-muted-foreground">
            <Link href="#" className="hover:underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
