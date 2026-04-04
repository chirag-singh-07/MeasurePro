'use client';

import { useState } from 'react';
import { Footer } from '@/components/footer';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <section className="border-2 border-black p-6">
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="text-gray-700 mb-6">
                Have questions about MeasurePro? Want to schedule a demo or discuss a partnership? Our team is here to help!
              </p>
            </section>

            <section className="border-2 border-black p-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-bold mb-1">Email</p>
                  <p><a href="mailto:support@measurepro.com" className="text-blue-600 hover:underline">support@measurepro.com</a></p>
                  <p className="text-sm text-gray-600 mt-1">Sales: sales@measurepro.com</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Phone</p>
                  <p>+91 (123) 456-7890</p>
                </div>
                <div>
                  <p className="font-bold mb-1">Address</p>
                  <p>
                    MeasurePro Headquarters<br />
                    Tech Park, Bangalore<br />
                    India 560001
                  </p>
                </div>
              </div>
            </section>

            <section className="border-2 border-black p-6">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-700">
                <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM IST</p>
                <p><strong>Saturday - Sunday:</strong> Closed</p>
                <p className="text-sm text-gray-600 mt-4">
                  We typically respond to emails within 24 business hours.
                </p>
              </div>
            </section>

            <section className="border-2 border-black p-6">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-black hover:text-gray-600 font-bold">Twitter</a>
                <a href="#" className="text-black hover:text-gray-600 font-bold">LinkedIn</a>
                <a href="#" className="text-black hover:text-gray-600 font-bold">GitHub</a>
              </div>
            </section>
          </div>

          {/* Contact Form */}
          <div className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-500 text-green-800">
                <p className="font-bold">✓ Message sent successfully!</p>
                <p className="text-sm">Thank you for contacting us. We'll be in touch soon.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 text-red-800">
                <p className="font-bold">✗ Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block font-bold mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:bg-gray-50"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-bold mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:bg-gray-50"
                  placeholder="your@email.com"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block font-bold mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:bg-gray-50"
                  placeholder="Your company"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block font-bold mb-2">Subject *</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:bg-gray-50"
                >
                  <option value="">Select a subject</option>
                  <option value="sales">Sales Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block font-bold mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:bg-gray-50 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 font-bold border-2 border-black hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-4">
              * Required fields
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
