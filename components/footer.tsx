import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black text-white border-t-2 border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">MeasurePro</h3>
            <p className="text-gray-400 leading-relaxed">
              Professional project measurement and management software for teams who care about precision.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-lg mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="https://blog.measurepro.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="#cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#accessibility" className="text-gray-400 hover:text-white transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-gray-800 py-8">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="text-gray-400 text-sm">SUPPORT</p>
              <p className="text-white font-bold">
                <a href="mailto:support@measurepro.com" className="hover:text-gray-300 transition-colors">
                  support@measurepro.com
                </a>
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">SALES</p>
              <p className="text-white font-bold">
                <a href="mailto:sales@measurepro.com" className="hover:text-gray-300 transition-colors">
                  sales@measurepro.com
                </a>
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">PHONE</p>
              <p className="text-white font-bold">+91 (123) 456-7890</p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} MeasurePro. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#twitter" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.55 3.5H19.5v4l-4.3 1.6V16.5H11V10l-4.3-1.6V3.5h3V2.5h-4v1h1v11h4V9.5l4.3 1.6v5.9h3V7.1l-4.3-1.6v-2z" />
                </svg>
              </a>
              <a href="#linkedin" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 2a2 2 0 011.5.7L16.3 16.5A2 2 0 0118 17h.5a1.5 1.5 0 001.5-1.5v-13A1.5 1.5 0 0018.5 2h-13A2 2 0 002 2z" />
                </svg>
              </a>
              <a href="#github" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10a10 10 0 0010 10c5.523 0 10-4.477 10-10A10 10 0 0010 0zm-5 10.5H3v-1h2v1zm2 5H3v4h4v-4h2v4h4v-4h-2v-1h2v-1H7v1zm6-5h2v1h-2v-1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
