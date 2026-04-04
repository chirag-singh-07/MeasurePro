import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MeasurePro - Construction Measurement & Billing",
    template: "%s | MeasurePro",
  },
  description:
    "Precision measurement and billing platform for construction professionals. Streamline your projects, track measurements, and manage billing with ease.",
  keywords: [
    "construction",
    "measurement",
    "billing",
    "project management",
    "contractors",
  ],
  authors: [{ name: "MeasurePro Team" }],
  creator: "MeasurePro",
  publisher: "MeasurePro",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000",
    siteName: "MeasurePro",
    title: "MeasurePro - Construction Measurement & Billing",
    description:
      "Precision measurement and billing platform for construction professionals.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeasurePro - Construction Measurement & Billing",
    description: "Precision measurement and billing platform for construction professionals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}
      >
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
