import { Footer } from '@/components/footer';

export default function AboutUsPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">About MeasurePro</h1>
          <p className="text-xl">Simplifying Project Measurement and Management</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Mission */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              At MeasurePro, we empower teams to manage construction, engineering, and design projects with precision and ease. Our mission is to transform how professionals measure, track, and optimize their projects through intelligent software solutions that save time and reduce errors.
            </p>
          </section>

          {/* Story */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              MeasurePro was founded with a simple vision: to eliminate the inefficiencies and inaccuracies that plague traditional project management. Having worked with dozens of construction and engineering firms, our founders realized that professionals were spending countless hours on manual measurements, spreadsheet management, and coordination.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, MeasurePro serves teams across multiple industries, helping them streamline workflows, improve accuracy, and focus on what matters most: delivering excellent results for their clients.
            </p>
          </section>

          {/* Values */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-black p-4">
                <h3 className="text-xl font-bold mb-3">Precision</h3>
                <p className="text-gray-700">We believe accuracy matters. Our tools are designed to minimize errors and ensure your measurements are always reliable.</p>
              </div>
              <div className="border-2 border-black p-4">
                <h3 className="text-xl font-bold mb-3">Simplicity</h3>
                <p className="text-gray-700">Complex problems deserve simple solutions. We design intuitive interfaces that anyone can use without extensive training.</p>
              </div>
              <div className="border-2 border-black p-4">
                <h3 className="text-xl font-bold mb-3">Collaboration</h3>
                <p className="text-gray-700">Great projects are built by great teams. Our platform facilitates seamless communication and cooperation across your organization.</p>
              </div>
              <div className="border-2 border-black p-4">
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-gray-700">We continuously improve and evolve based on your feedback. Technology should serve your needs, not the other way around.</p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="font-bold mr-4">✓</span>
                <span><strong>Smart Measurement Tools:</strong> Automated calculations and real-time updates keep your data current</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-4">✓</span>
                <span><strong>Comprehensive Reporting:</strong> Generate professional reports quickly for stakeholders and clients</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-4">✓</span>
                <span><strong>Team Collaboration:</strong> Multiple users can work together on projects in real-time</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-4">✓</span>
                <span><strong>Secure & Reliable:</strong> Enterprise-grade security keeps your valuable project data safe</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-4">✓</span>
                <span><strong>Easy Integration:</strong> Works seamlessly with your existing tools and workflows</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold mr-4">✓</span>
                <span><strong>Expert Support:</strong> Our dedicated team is always ready to help you succeed</span>
              </li>
            </ul>
          </section>

          {/* Team */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Behind MeasurePro is a passionate team of engineers, designers, and industry experts dedicated to solving real problems for real professionals. Our diverse backgrounds—from construction to software engineering to project management—enable us to understand your challenges and deliver solutions that actually work.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-2 border-black p-4 text-center">
                <h3 className="text-lg font-bold mb-2">Engineering</h3>
                <p className="text-gray-600">Building robust, scalable infrastructure</p>
              </div>
              <div className="border-2 border-black p-4 text-center">
                <h3 className="text-lg font-bold mb-2">Design</h3>
                <p className="text-gray-600">Creating beautiful, intuitive experiences</p>
              </div>
              <div className="border-2 border-black p-4 text-center">
                <h3 className="text-lg font-bold mb-2">Industry Experts</h3>
                <p className="text-gray-600">Bringing domain knowledge and insights</p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="border-2 border-black p-6 bg-black text-white">
            <h2 className="text-2xl font-bold mb-6">By The Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">500+</p>
                <p className="text-lg">Active Teams</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">50K+</p>
                <p className="text-lg">Projects Managed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold mb-2">99.9%</p>
                <p className="text-lg">Uptime SLA</p>
              </div>
            </div>
          </section>

          {/* Vision */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Our Vision for the Future</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We're not just building tools for today—we're shaping the future of project management. Over the next few years, we plan to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
              <li>Expand our AI-powered insights to predict project challenges before they occur</li>
              <li>Develop mobile-first solutions for on-site field teams</li>
              <li>Create deeper integrations with industry-standard tools</li>
              <li>Build global support and localization for teams worldwide</li>
              <li>Invest in sustainability by helping projects reduce waste and environmental impact</li>
            </ul>
          </section>

          {/* Contact CTA */}
          <section className="border-2 border-black p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-gray-700 mb-6">
              Have a question or want to learn more about MeasurePro? We'd love to hear from you!
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li><strong>Email:</strong> hello@measurepro.com</li>
              <li><strong>Website:</strong> www.measurepro.com</li>
              <li><strong>Address:</strong> MeasurePro Headquarters, India</li>
            </ul>
            <a href="/contact-us" className="inline-block bg-black text-white px-8 py-3 font-bold border-2 border-black hover:bg-white hover:text-black transition-colors">
              Get In Touch
            </a>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
