import { Footer } from '@/components/footer';

export default function TermsOfServicePage() {
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl">Last updated: April 5, 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Introduction */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") constitute a legal agreement between you and MeasurePro ("Company", "we", "us", "our", or "Service Provider") and govern your use of and access to our website, applications, and services (collectively, the "Service"). By accessing and using MeasurePro, you acknowledge that you have read, understood, and agree to be bound by all the terms and conditions herein.
            </p>
          </section>

          {/* 1. Use License */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">1. Use License</h2>
            <p className="text-gray-700 mb-4">
              Unless otherwise stated, MeasurePro and/or its licensors own the intellectual property rights for all material on the Service. All intellectual property rights are reserved. You may view and print pages from the Service for personal use, subject to restrictions set in these Terms and Conditions.
            </p>
            <p className="text-gray-700">
              You must not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4 mt-2">
              <li>Republish material from MeasurePro</li>
              <li>Sell, rent, or sub-license material from MeasurePro</li>
              <li>Reproduce, duplicate, or copy material from MeasurePro for commercial purposes</li>
              <li>Redistribute content unless content is specifically made for redistribution</li>
            </ul>
          </section>

          {/* 2. Disclaimer of Warranties */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">2. Disclaimer of Warranties</h2>
            <p className="text-gray-700 mb-4">
              The material on MeasurePro's Service is provided "as is." MeasurePro makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-gray-700">
              We do not warrant that the Service will be uninterrupted or error-free, or that defects will be corrected, or that the Service will be free of viruses or other harmful components.
            </p>
          </section>

          {/* 3. Limitations of Liability */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">3. Limitations of Liability</h2>
            <p className="text-gray-700">
              In no event shall MeasurePro or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MeasurePro's Service, even if MeasurePro or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          {/* 4. Accuracy of Materials */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">4. Accuracy of Materials</h2>
            <p className="text-gray-700">
              The materials appearing on MeasurePro's Service could include technical, typographical, or photographic errors. MeasurePro does not warrant that any of the materials on the Service are accurate, complete, or current. MeasurePro may make changes to the materials contained on the Service at any time without notice.
            </p>
          </section>

          {/* 5. Materials and Links */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">5. Links</h2>
            <p className="text-gray-700">
              MeasurePro has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MeasurePro of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          {/* 6. Modifications */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">6. Modifications</h2>
            <p className="text-gray-700">
              MeasurePro may revise these Terms for its Service at any time without notice. By using this Service, you are agreeing to be bound by the then-current version of these Terms.
            </p>
          </section>

          {/* 7. Governing Law */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">7. Governing Law</h2>
            <p className="text-gray-700">
              These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Bangalore, India.
            </p>
          </section>

          {/* 8. User Accounts */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">8. User Accounts and Responsibilities</h2>
            <p className="text-gray-700 mb-4">
              You are responsible for maintaining the confidentiality of your account login information and password. You are responsible for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account.
            </p>
            <p className="text-gray-700">
              You represent and warrant that you are at least 18 years old and have the legal authority to enter into this agreement.
            </p>
          </section>

          {/* 9. Prohibited Conduct */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">9. Prohibited Conduct</h2>
            <p className="text-gray-700 mb-4">
              You agree that you will not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 pl-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon or violate our intellectual property rights or the rights of others</li>
              <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>Attempt to access our systems without authorization</li>
              <li>Transmit or upload viruses or malicious code</li>
              <li>Collect or track personal information of others without consent</li>
              <li>Impersonate or misrepresent your identity or affiliation</li>
            </ul>
          </section>

          {/* 10. Termination */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">10. Termination of Service</h2>
            <p className="text-gray-700">
              We may terminate or suspend your account and access to the Service at any time, in our sole discretion, for any reason, including if you violate these Terms. Upon termination, your right to use the Service will cease immediately.
            </p>
          </section>

          {/* 11. Limitation of Liability */}
          <section className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-4">11. Data Backup Responsibility</h2>
            <p className="text-gray-700">
              While we maintain backup systems, you agree that you are responsible for maintaining backups of all your data. MeasurePro shall not be liable for any loss of data resulting from system failures, errors, or deletions.
            </p>
          </section>

          {/* Contact */}
          <section className="border-2 border-black p-6 bg-gray-50">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Email:</strong> support@measurepro.com</li>
              <li><strong>Website:</strong> www.measurepro.com</li>
              <li><strong>Address:</strong> MeasurePro Headquarters, India</li>
            </ul>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
