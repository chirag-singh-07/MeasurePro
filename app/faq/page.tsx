'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Footer } from '@/components/footer';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
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
      <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl">Find answers to common questions about MeasurePro</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <p className="font-bold mb-4">Filter by Category:</p>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-bold border-2 border-black transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.map(faq => (
            <div key={faq.id} className="border-2 border-black">
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="text-left">
                  <p className="text-sm text-gray-600 font-bold uppercase">{faq.category}</p>
                  <h3 className="text-lg font-bold text-black">{faq.question}</h3>
                </div>
                <ChevronDown
                  size={24}
                  className={`flex-shrink-0 ml-4 transition-transform ${
                    expandedId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedId === faq.id && (
                <div className="px-6 py-4 bg-gray-50 border-t-2 border-black">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Need Help */}
        <div className="mt-12 border-2 border-black p-8 bg-gray-50 text-center">
          <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
          <p className="text-gray-700 mb-6">
            Can't find the answer you're looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-us"
              className="px-8 py-3 bg-black text-white font-bold border-2 border-black hover:bg-white hover:text-black transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@measurepro.com"
              className="px-8 py-3 bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
