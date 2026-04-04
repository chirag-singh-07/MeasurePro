import { Footer } from '@/components/footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl">Last updated: April 5, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Introduction */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              MeasurePro ("Company", "we", "us", or "our") operates the MeasurePro website and application (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </section>

          {/* Information Collection */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Information Collection and Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2">Types of Data Collected:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>Personal Data:</strong> Email address, name, phone number, company information</li>
                  <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, time and date of visits</li>
                  <li><strong>Project Data:</strong> Project details, client information, measurements, calculations</li>
                  <li><strong>Cookies:</strong> Session management and user preferences</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Use of Data */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Use of Data</h2>
            <p className="text-gray-700 mb-4">MeasurePro uses the collected data for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical and security issues</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Security of Data</h2>
            <p className="text-gray-700 leading-relaxed">
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </section>

          {/* Cookie Policy */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            <p className="text-gray-700">
              Types of cookies we use:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4 mt-2">
              <li><strong>Functional Cookies:</strong> Help us remember your preferences</li>
              <li><strong>Session Cookies:</strong> Keep you logged in to your account</li>
              <li><strong>Analytics Cookies:</strong> Track how you use our Service</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Retention of Data</h2>
            <p className="text-gray-700 leading-relaxed">
              MeasurePro will retain your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations.
            </p>
          </section>

          {/* Third Party Services */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Third-Party Service Providers</h2>
            <p className="text-gray-700 mb-4">
              We may employ third-party companies and individuals to facilitate our Service, to perform Service-related services or to assist us in analyzing how our Service is used.
            </p>
            <p className="text-gray-700">
              These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </section>

          {/* Contact */}
          <section className="border-2 border-black p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Email:</strong> privacy@measurepro.com</li>
              <li><strong>Website:</strong> www.measurepro.com</li>
              <li><strong>Address:</strong> MeasurePro Headquarters, India</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
}
