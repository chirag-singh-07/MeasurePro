"use client";

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
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
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-black text-white py-20 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl font-bold border-l-4 border-white pl-6">We'd love to hear from you. Get in touch with our team.</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-12">
              <section className="border-4 border-black p-8 bg-[#FFDE59] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-black uppercase mb-6 text-black">Get In Touch</h2>
                <p className="font-bold text-black text-lg">
                  Have questions about MeasurePro? Want to schedule a demo or discuss a partnership? Our team is here to help!
                </p>
              </section>

              <div className="grid grid-cols-1 gap-8">
                <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-black mb-4 uppercase">Contact Info</h3>
                  <div className="space-y-4 font-bold text-gray-800">
                    <p>Email: support@measurepro.com</p>
                    <p>Phone: +91 (123) 456-7890</p>
                    <p>Address: Tech Park, Bangalore, India</p>
                  </div>
                </div>

                <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-black mb-4 uppercase">Business Hours</h3>
                  <p className="font-bold text-gray-800">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-3xl font-black uppercase mb-8">Send us a Message</h2>
              
              {submitted && (
                <div className="mb-8 p-6 bg-green-50 border-4 border-black text-black font-black uppercase tracking-widest text-center">
                  ✓ Message sent successfully!
                </div>
              )}

              {error && (
                <div className="mb-8 p-6 bg-red-50 border-4 border-black text-black font-black uppercase tracking-widest text-center">
                  ✗ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase">Full Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-4 border-2 border-black font-bold focus:bg-gray-50 placeholder:text-gray-400" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase">Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-4 border-2 border-black font-bold focus:bg-gray-50 placeholder:text-gray-400" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black uppercase">Subject *</label>
                  <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-4 border-2 border-black font-bold focus:bg-gray-50 bg-white">
                    <option value="">Select a subject</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black uppercase">Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-4 border-2 border-black font-bold focus:bg-gray-50 resize-none" placeholder="How can we help?"></textarea>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-black text-white py-5 text-xl font-black uppercase border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,128,0,1)] hover:bg-white hover:text-black hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
