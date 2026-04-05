import Link from "next/link";
import {
  Ruler,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-white border-t-4 border-black pt-20 pb-10">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-3 font-black text-3xl uppercase tracking-tighter text-black">
              <div className="bg-black text-white p-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Ruler className="h-7 w-7" />
              </div>
              MeasurePro
            </div>
            <p className="font-bold text-lg text-black leading-snug max-w-md border-l-4 border-black pl-4">
              The industrial standard for construction measurement and
              billing. Built for precision, engineered for scale.
            </p>

            <div className="space-y-4 pt-4 text-black">
              <h4 className="font-black uppercase text-sm tracking-widest text-gray-500">
                Subscribe to our technical updates
              </h4>
              <div className="flex flex-col sm:flex-row gap-0 max-w-md">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-4 border-2 border-black font-bold focus:outline-none focus:bg-[#f0f0f0] placeholder:text-gray-400 text-black"
                />
                <button className="bg-black text-white px-8 py-4 font-black uppercase hover:bg-white hover:text-black border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,128,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
                  Join
                </button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Instagram, href: "#" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="p-3 border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="font-black mb-8 text-sm uppercase tracking-wider border-b-4 border-black inline-block pb-1 text-black">
                  Product
                </h4>
                <ul className="space-y-4 text-base font-bold text-gray-800">
                  {[
                    { name: "Features", href: "/features" },
                    { name: "Estimation AI", href: "/estimation-ai" },
                    { name: "PDF Engine", href: "/pdf-engine" },
                    { name: "API Access", href: "/api-access" },
                    { name: "Pricing", href: "/pricing" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="flex items-center group">
                        <span className="group-hover:underline decoration-2 underline-offset-4 text-gray-800 hover:text-black">
                          {item.name}
                        </span>
                        {(item.name === "API Access" || item.name === "Documentation") && (
                          <ExternalLink className="ml-1.5 h-3 w-3 opacity-50 group-hover:opacity-100" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-black mb-8 text-sm uppercase tracking-wider border-b-4 border-black inline-block pb-1 text-black">
                  Support
                </h4>
                <ul className="space-y-4 text-base font-bold text-gray-800">
                  {[
                    { name: "Documentation", href: "/docs" },
                    { name: "Help Center", href: "/help-center" },
                    { name: "Community", href: "/community" },
                    { name: "Status", href: "/status" },
                    { name: "Contact", href: "/contact-us" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="flex items-center group">
                        <span className="group-hover:underline decoration-2 underline-offset-4 text-gray-800 hover:text-black">
                          {item.name}
                        </span>
                        {item.name === "Documentation" && (
                          <ExternalLink className="ml-1.5 h-3 w-3 opacity-50 group-hover:opacity-100" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <h4 className="font-black mb-8 text-sm uppercase tracking-wider border-b-4 border-black inline-block pb-1 text-black">
                  Company
                </h4>
                <ul className="space-y-4 text-base font-bold text-gray-800">
                  {[
                    { name: "About Us", href: "/about-us" },
                    { name: "Our Story", href: "/about-us" },
                    { name: "Careers", href: "#" },
                    { name: "Legal", href: "/terms-of-service" },
                    { name: "Security", href: "#" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="flex items-center group">
                        <span className="group-hover:underline decoration-2 underline-offset-4 text-gray-800 hover:text-black">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-4 border-black pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="font-black text-sm uppercase text-black">
              © {new Date().getFullYear()} MeasurePro Inc.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="text-xs font-black uppercase hover:underline decoration-2 underline-offset-4 opacity-60 hover:opacity-100 text-black hover:text-black"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-xs font-black uppercase hover:underline decoration-2 underline-offset-4 opacity-60 hover:opacity-100 text-black hover:text-black"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy-policy"
                className="text-xs font-black uppercase hover:underline decoration-2 underline-offset-4 opacity-60 hover:opacity-100 text-black hover:text-black"
              >
                Cookies
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 border-2 border-black bg-[#f0f0f0] font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            System Operational: All nodes green
          </div>
        </div>
      </div>
    </footer>
  );
}
