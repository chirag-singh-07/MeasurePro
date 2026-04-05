"use client";

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // ... (keep existing faqs data)
  {
    id: '1',
    category: 'General',
    question: 'What is MeasurePro?',
    answer: 'MeasurePro is a comprehensive project management and measurement software designed for construction, engineering, and design teams. It helps you track measurements, manage projects, collaborate with team members, and generate professional reports efficiently.'
  },
  {
    id: '2',
    category: 'General',
    question: 'Who can use MeasurePro?',
    answer: 'MeasurePro is ideal for construction companies, engineering firms, design studios, contractors, project managers, and any team that needs to measure, track, and manage projects. Whether you\'re a small firm or a large enterprise, MeasurePro scales to your needs.'
  },
  {
    id: '3',
    category: 'General',
    question: 'Is MeasurePro cloud-based?',
    answer: 'Yes, MeasurePro is a cloud-based SaaS application. Your projects and data are securely stored in the cloud, accessible from anywhere with an internet connection. This means no software installation needed and automatic updates.'
  },
  {
    id: '4',
    category: 'Pricing',
    question: 'What are the pricing plans?',
    answer: 'We offer flexible pricing plans for different team sizes. Our plans include Starter (for small teams), Professional (for growing teams), and Enterprise (for large organizations). Contact our sales team for detailed pricing and custom quotes.'
  },
  {
    id: '5',
    category: 'Pricing',
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can explore MeasurePro risk-free and see if it\'s the right fit for your team.'
  },
  {
    id: '6',
    category: 'Pricing',
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. You can cancel your subscription at any time with no penalties or long-term contracts. Your data will remain accessible for 30 days after cancellation.'
  },
  {
    id: '7',
    category: 'Getting Started',
    question: 'How do I get started with MeasurePro?',
    answer: 'Getting started is easy! Sign up for an account, create your first project, add team members, and start tracking measurements. We provide comprehensive onboarding tutorials and support documentation to help you get up to speed quickly.'
  },
  {
    id: '8',
    category: 'Getting Started',
    question: 'Can I import existing projects?',
    answer: 'Yes, we support importing from spreadsheets, CSV files, and other project management tools. Our support team can assist with data migration to ensure a smooth transition to MeasurePro.'
  },
  {
    id: '9',
    category: 'Getting Started',
    question: 'How many team members can I add?',
    answer: 'The number of team members you can add depends on your plan. Basic plans include multiple users, and Enterprise plans offer unlimited team members. Each user gets their own secure account and login.'
  },
  {
    id: '10',
    category: 'Features',
    question: 'What measurement tools does MeasurePro offer?',
    answer: 'MeasurePro includes automated calculations, real-time measurement tracking, unit conversions, measurement history, and validation tools. You can measure dimensions, areas, volumes, and custom calculations based on your project needs.'
  },
  {
    id: '11',
    category: 'Features',
    question: 'Can I generate reports?',
    answer: 'Yes, MeasurePro has a powerful reporting engine. Generate professional PDF reports with customizable templates, include measurements, charts, client information, and more. Reports can be generated in seconds and shared with stakeholders.'
  },
  {
    id: '12',
    category: 'Features',
    question: 'Is there a mobile app?',
    answer: 'We currently offer a responsive web application that works on all devices. A native mobile app for iOS and Android is on our roadmap. Subscribe to our newsletter to get updates on new features.'
  },
  {
    id: '13',
    category: 'Security',
    question: 'How secure is my data?',
    answer: 'Your data is protected with enterprise-grade encryption (SSL/TLS), secure servers, and regular security audits. We comply with GDPR, HIPAA, and SOC 2 standards. All data is backed up daily and encrypted at rest.'
  },
  {
    id: '14',
    category: 'Security',
    question: 'Can I control who accesses my projects?',
    answer: 'Yes, you have full control over project access. Assign different permission levels to team members (view-only, edit, admin), create project teams, and manage access at a granular level.'
  },
  {
    id: '15',
    category: 'Support',
    question: 'What support options are available?',
    answer: 'We offer email support, live chat, detailed knowledge base articles, video tutorials, and webinars. Premium plans include priority support and dedicated account managers. Our support team is available Monday-Friday.'
  },
  {
    id: '16',
    category: 'Support',
    question: 'How can I provide feedback or request features?',
    answer: 'We love hearing from our users! You can submit feature requests directly in your dashboard, email our product team, or join our community forum where users and our team discuss ideas and best practices.'
  }
];

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(faqs.map(faq => faq.category))];
  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-black text-white py-20 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">FAQ</h1>
            <p className="text-xl md:text-2xl font-bold border-l-4 border-white pl-6">Find answers to common questions about MeasurePro</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Category Filter */}
            <div className="lg:col-span-1 border-4 border-black p-8 bg-[#FFDE59] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-fit">
              <p className="font-black uppercase text-sm mb-6 pb-2 border-b-2 border-black">Categories</p>
              <div className="flex flex-col gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-3 text-left font-black uppercase text-xs border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] ${
                      selectedCategory === category
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ Items */}
            <div className="lg:col-span-3 space-y-6">
              {filteredFaqs.map(faq => (
                <div key={faq.id} className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <button
                    onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="text-left">
                      <p className="text-xs text-gray-500 font-black uppercase mb-1">{faq.category}</p>
                      <h3 className="text-xl font-black text-black uppercase">{faq.question}</h3>
                    </div>
                    <ChevronDown
                      size={28}
                      className={`shrink-0 ml-4 transition-transform border-2 border-black p-1 bg-[#f0f0f0] ${
                        expandedId === faq.id ? 'rotate-180 bg-[#FFDE59]' : ''
                      }`}
                    />
                  </button>

                  {expandedId === faq.id && (
                    <div className="px-8 py-8 bg-[#f0f0f0] border-t-4 border-black">
                      <p className="text-black font-bold leading-relaxed text-lg border-l-4 border-black pl-6">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
