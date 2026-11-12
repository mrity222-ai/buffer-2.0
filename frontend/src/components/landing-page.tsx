'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Share2, 
  Film, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Maximize2, 
  Zap, 
  HelpCircle,
  Play,
  CheckCircle2,
  ChevronDown,
  User,
  Shield
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function LandingPage() {
  const { packages } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Does Social Publisher support personal Facebook and Instagram profiles?',
      a: 'Meta Graph API officially supports publishing to Facebook Pages and Instagram Professional (Business & Creator) accounts. Personal profiles do not support automated API publishing under Meta policies.',
    },
    {
      q: 'How does the automatic Reel (9:16) aspect ratio detection work?',
      a: 'When you upload an MP4 or MOV file, Social Publisher reads the video dimensions in real-time. If the video is vertical (~9:16), it automatically selects Reel mode with optimized encoding flags so Meta servers stream it in full 1080p HD without compression artifacts.',
    },
    {
      q: 'Can administrators create custom packages and pricing?',
      a: 'Yes! The dedicated Admin Panel allows administrators to create new subscription tiers with custom pricing, channel limits, and feature toggles, which instantly update for new and existing users.',
    },
    {
      q: 'What happens if one account fails during multi-publishing?',
      a: 'We use failure isolation! If you publish to 5 accounts and 1 fails (e.g. invalid aspect ratio on Instagram), the remaining 4 Facebook Pages and Instagram accounts will still publish successfully. You can easily click "Retry" on the failed account anytime in your History tab.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#E7F3FF] selection:text-[#1877F2]">
      {/* Top Navbar */}
      <header className="h-20 border-b border-slate-100 sticky top-0 z-40 bg-white/90 backdrop-blur-md px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-xs">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              Social Publisher
              <span className="text-[10px] font-bold bg-[#E7F3FF] text-[#1877F2] px-2 py-0.5 rounded-full">
                SaaS
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Create Once. Publish Everywhere.</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold text-slate-600">
          <a href="#features" className="hover:text-[#1877F2] transition-colors">Features</a>
          <a href="#reels" className="hover:text-[#1877F2] transition-colors">Reels & Video (9:16)</a>
          <a href="#pricing" className="hover:text-[#1877F2] transition-colors">Pricing Plans</a>
          <a href="#faq" className="hover:text-[#1877F2] transition-colors">FAQ</a>
        </nav>

        {/* Dual Portal Switchers */}
        <div className="flex items-center space-x-3">
          <Link
            href="/admin/login"
            className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-2 rounded-xl transition-colors flex items-center space-x-1"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Admin Portal</span>
          </Link>

          <Link
            href="/user/login"
            className="text-xs font-bold text-slate-700 hover:text-[#1877F2] px-3 py-2"
          >
            User Login
          </Link>

          <Link
            href="/user/register"
            className="bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-98 flex items-center space-x-1.5"
          >
            <span>Start Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 md:px-12 max-w-6xl mx-auto text-center">
        {/* Highlight Badge */}
        <div className="inline-flex items-center space-x-2 bg-[#E7F3FF] text-[#1877F2] px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-blue-100 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#1877F2]" />
          <span>New: Auto 9:16 Reel Sizing & Dedicated User vs Admin Authentication</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Create Once. <br className="hidden sm:block" />
          <span className="text-[#1877F2]">Publish Everywhere.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          The modern Buffer alternative for creators and marketing agencies. Upload high-res Reels, videos, and posts once, and broadcast simultaneously to multiple <strong>Facebook Pages</strong> and <strong>Instagram Business Accounts</strong>.
        </p>

        {/* Hero Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/user/register"
            className="w-full sm:w-auto bg-[#1877F2] hover:bg-[#166FE5] text-white text-sm font-bold px-7 py-3.5 rounded-2xl shadow-md shadow-blue-200 transition-all active:scale-98 flex items-center justify-center space-x-2"
          >
            <span>Create Free User Account</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/user/dashboard"
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold px-6 py-3.5 rounded-2xl transition-all flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 fill-slate-800" />
            <span>Interactive User App Demo</span>
          </Link>
        </div>

        {/* Social Proof Line */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-slate-400 font-semibold">
          <span>✓ Meta Graph API Certified</span>
          <span>✓ Separate User & Admin Access</span>
          <span>✓ Zero Compression Artifacts</span>
        </div>

        {/* Visual Mockup Card */}
        <div className="mt-14 rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden bg-slate-50 p-2 md:p-4 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden p-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-bold text-slate-500">
                  User Portal vs Admin Portal Architecture
                </span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                Live Server: 200 OK
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Portal Card */}
              <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold bg-[#E7F3FF] text-[#1877F2] px-2 py-0.5 rounded">
                    User Space: /user
                  </span>
                  <Link href="/user/login" className="text-xs font-bold text-[#1877F2] hover:underline">
                    Login →
                  </Link>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-2">Creator & Social Publisher Tool</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Connect Facebook Pages & Instagram, craft 9:16 Reels with auto-detection, view live preview phone mockups, schedule into your Queue, and view history.
                </p>
              </div>

              {/* Admin Portal Card */}
              <div className="p-5 rounded-2xl border border-purple-200 bg-purple-50/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                    Admin Space: /admin
                  </span>
                  <Link href="/admin/login" className="text-xs font-bold text-purple-700 hover:underline">
                    Login →
                  </Link>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-2">Platform Control & Package Creator</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Review all joined members, suspend/activate users, create custom subscription packages with custom pricing and channel limits, and monitor Celery queues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section dynamically powered by packages */}
      <section id="pricing" className="py-20 bg-slate-50 border-t border-slate-100 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-bold text-[#1877F2] uppercase tracking-wider">
            SaaS Subscription Pricing
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">
            Dynamic plans managed from Admin Panel
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-2 font-medium mb-10">
            Admins can create, edit, and publish new packages anytime.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`p-6 rounded-2xl border bg-white shadow-xs flex flex-col justify-between transition-all ${
                  pkg.isPopular ? 'border-2 border-[#1877F2] shadow-md relative' : 'border-slate-200'
                }`}
              >
                <div>
                  {pkg.isPopular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1877F2] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <h4 className="text-sm font-bold text-slate-900">{pkg.name}</h4>
                  <div className="mt-3 flex items-baseline space-x-1">
                    <span className="text-3xl font-black text-slate-900">{pkg.price}</span>
                    <span className="text-xs text-slate-400">{pkg.period}</span>
                  </div>

                  <ul className="mt-6 space-y-2.5 text-xs text-slate-600 font-medium">
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{pkg.accountLimit} Social Channels</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{pkg.monthlyPostLimit} Posts</span>
                    </li>
                    {pkg.features.slice(2, 4).map((f, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/user/register"
                  className={`mt-8 w-full text-center text-xs font-bold py-2.5 rounded-xl transition-all ${
                    pkg.isPopular
                      ? 'bg-[#1877F2] hover:bg-[#166FE5] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Select {pkg.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#1877F2] uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      isOpen ? 'rotate-180 text-[#1877F2]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10 px-6 md:px-12 bg-white text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-[#1877F2] flex items-center justify-center text-white font-bold text-xs">
              f
            </div>
            <span className="font-bold text-slate-700">Social Publisher SaaS</span>
            <span>·</span>
            <span>Create Once. Publish Everywhere.</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-500 font-semibold">
            <Link href="/user/login" className="hover:text-[#1877F2]">User Login</Link>
            <Link href="/user/register" className="hover:text-[#1877F2]">Sign Up</Link>
            <Link href="/admin/login" className="hover:text-purple-600 font-bold">Admin Portal</Link>
            <Link href="/user/dashboard" className="hover:text-[#1877F2]">User Dashboard</Link>
          </div>

          <p className="text-[11px]">© 2026 Social Publisher. Built for Facebook & Instagram.</p>
        </div>
      </footer>
    </div>
  );
}
