'use client';

import React, { useState } from 'react';
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
  ChevronDown
} from 'lucide-react';

interface LandingPageProps {
  onGoToApp: () => void;
  onOpenComposer: () => void;
}

export function LandingPage({ onGoToApp, onOpenComposer }: LandingPageProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
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
      q: 'What happens if one account fails during multi-publishing?',
      a: 'We use failure isolation! If you publish to 5 accounts and 1 fails (e.g. invalid aspect ratio on Instagram), the remaining 4 Facebook Pages and Instagram accounts will still publish successfully. You can easily click "Retry" on the failed account anytime in your History tab.',
    },
    {
      q: 'Can I schedule Reels and feed videos in advance?',
      a: 'Yes! You can add your posts and Reels directly to your Queue, set your desired day and time slot, and our background Celery worker will dispatch them automatically.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#E7F3FF] selection:text-[#1877F2]">
      {/* Top Navbar */}
      <header className="h-20 border-b border-slate-100 sticky top-0 z-40 bg-white/90 backdrop-blur-md px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onGoToApp}>
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
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold text-slate-600">
          <a href="#features" className="hover:text-[#1877F2] transition-colors">Features</a>
          <a href="#reels" className="hover:text-[#1877F2] transition-colors">Reels & Video (9:16)</a>
          <a href="#how-it-works" className="hover:text-[#1877F2] transition-colors">How It Works</a>
          <a href="#pricing" className="hover:text-[#1877F2] transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-[#1877F2] transition-colors">FAQ</a>
        </nav>

        {/* Header CTAs */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onGoToApp}
            className="text-xs font-bold text-slate-700 hover:text-[#1877F2] px-3 py-2 cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={onGoToApp}
            className="bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center space-x-1.5"
          >
            <span>Launch App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 md:px-12 max-w-6xl mx-auto text-center">
        {/* Highlight Badge */}
        <div className="inline-flex items-center space-x-2 bg-[#E7F3FF] text-[#1877F2] px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-blue-100 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#1877F2]" />
          <span>New: Automatic 9:16 Reel Sizing & 1080p High Quality Preservation</span>
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
          <button
            onClick={onGoToApp}
            className="w-full sm:w-auto bg-[#1877F2] hover:bg-[#166FE5] text-white text-sm font-bold px-7 py-3.5 rounded-2xl shadow-md shadow-blue-200 transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Start Free Trial (No Credit Card)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenComposer}
            className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold px-6 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 fill-slate-800" />
            <span>Try Reel Composer Demo</span>
          </button>
        </div>

        {/* Social Proof Line */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-slate-400 font-semibold">
          <span>✓ Meta Graph API Certified</span>
          <span>✓ 100% Free Starter Tier</span>
          <span>✓ Zero Compression Artifacts</span>
        </div>

        {/* Hero Product Visual Mockup */}
        <div className="mt-14 rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden bg-slate-50 p-2 md:p-4 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden p-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-bold text-slate-500">
                  Social Publisher · Multi-Channel Dispatch Active
                </span>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                Live Server: 200 OK
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="w-8 h-8 rounded-lg bg-[#E7F3FF] text-[#1877F2] flex items-center justify-center font-bold text-sm mb-2">
                  🎬
                </div>
                <h4 className="text-xs font-bold text-slate-900">Reels 9:16 Auto-Detection</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Upload MP4/MOV and the app locks in the vertical 1080×1920 viewport automatically.
                </p>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm mb-2">
                  ⚡
                </div>
                <h4 className="text-xs font-bold text-slate-900">Multi-Channel Broadcast</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  Select 4 Facebook Pages + 3 Instagram Accounts; publish with one single button click.
                </p>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm mb-2">
                  🛡️
                </div>
                <h4 className="text-xs font-bold text-slate-900">Failure Isolation & Retry</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  If an API token expires on one page, the rest publish smoothly. 1-click retry on failed targets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reels & Video Feature Spotlight */}
      <section id="reels" className="py-20 bg-slate-50/70 border-y border-slate-100 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#1877F2] uppercase tracking-wider">
              Engineered For Video Growth
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">
              Stop re-exporting videos for each social network
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-2 font-medium">
              We handle the exact aspect ratio, bitrates, and video containers required by Meta Graph API.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#1877F2]" />
                  9:16 Vertical Reel Canvas (1080 × 1920)
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  Full screen vertical video favored by the Instagram and Facebook algorithm. We attach the FastStart `moov` atom so video starts immediately.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#1877F2]" />
                  4:5 & 1:1 Feed Portrait & Square
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  Automatically formats feed video posts with maximum screen real estate on mobile devices.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1877F2]" />
                  High Quality Mode (1080p Full HD)
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                  Prevents downscaling and compression artifacts; keeps text overlays, product demos, and graphics razor sharp.
                </p>
              </div>
            </div>

            {/* Reel Mockup preview */}
            <div className="flex items-center justify-center">
              <div className="w-72 bg-black rounded-3xl p-3 border-4 border-slate-800 shadow-2xl relative aspect-[9/16] flex flex-col justify-between text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 opacity-90" />
                <div className="relative z-10 flex items-center justify-between text-xs font-bold pt-2">
                  <span>Instagram Reel</span>
                  <span className="text-[9px] bg-[#1877F2] px-2 py-0.5 rounded-full">1080p HQ</span>
                </div>
                <div className="relative z-10 text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-2">
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </div>
                  <p className="text-xs font-bold">Auto-Detected: 9:16</p>
                  <p className="text-[10px] text-white/60">Ready to Broadcast</p>
                </div>
                <div className="relative z-10 space-y-1 pb-2">
                  <p className="text-xs font-bold">@growthhackers_studio</p>
                  <p className="text-[10px] text-white/80 line-clamp-1">
                    🚀 Summer SaaS Bootcamp announcement! #ReelsViral
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <span className="text-xs font-bold text-[#1877F2] uppercase tracking-wider">
          Simple 3-Step Process
        </span>
        <h2 className="text-3xl font-black text-slate-900 mt-1 mb-12">
          From creation to multi-channel broadcast in 30 seconds
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs text-left">
            <span className="w-8 h-8 rounded-full bg-[#E7F3FF] text-[#1877F2] font-black text-xs flex items-center justify-center mb-4">
              1
            </span>
            <h4 className="text-sm font-bold text-slate-900">Connect Your Channels</h4>
            <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
              Authenticate via Meta OAuth. Securely link multiple Facebook Pages and Instagram Professional accounts.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs text-left">
            <span className="w-8 h-8 rounded-full bg-[#E7F3FF] text-[#1877F2] font-black text-xs flex items-center justify-center mb-4">
              2
            </span>
            <h4 className="text-sm font-bold text-slate-900">Drop Video, Caption & Tags</h4>
            <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
              Our engine auto-detects 9:16 Reels vs feed video. Review live previews side-by-side with hashtag chips.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs text-left">
            <span className="w-8 h-8 rounded-full bg-[#E7F3FF] text-[#1877F2] font-black text-xs flex items-center justify-center mb-4">
              3
            </span>
            <h4 className="text-sm font-bold text-slate-900">Publish or Queue</h4>
            <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
              Hit "Publish Now" to dispatch across all channels simultaneously, or schedule into your automated queue.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50 border-t border-slate-100 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-bold text-[#1877F2] uppercase tracking-wider">
            SaaS Subscription Pricing
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-1">
            Predictable pricing for creators & agencies
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-2 font-medium mb-10">
            Start with our generous Free tier. Upgrade as your channels grow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Free */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Free Tier</h4>
                <div className="mt-3 flex items-baseline space-x-1">
                  <span className="text-3xl font-black text-slate-900">₹0</span>
                  <span className="text-xs text-slate-400">/forever</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">For solo creators getting started.</p>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>2 Social Channels</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>10 Posts / month</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Reel Auto-Detection</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onGoToApp}
                className="mt-8 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl cursor-pointer"
              >
                Get Started Free
              </button>
            </div>

            {/* Starter */}
            <div className="p-6 rounded-2xl border-2 border-[#1877F2] bg-white shadow-md relative flex flex-col justify-between">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1877F2] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                Most Popular
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Starter Plan</h4>
                <div className="mt-3 flex items-baseline space-x-1">
                  <span className="text-3xl font-black text-slate-900">₹199</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">For active creators & small businesses.</p>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>5 Social Channels</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited Posts & Reels</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Queue & Scheduling Feed</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>High Quality 1080p Mode</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onGoToApp}
                className="mt-8 w-full bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold py-2.5 rounded-xl shadow-xs cursor-pointer"
              >
                Start Starter Trial
              </button>
            </div>

            {/* Pro */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Pro Plan</h4>
                <div className="mt-3 flex items-baseline space-x-1">
                  <span className="text-3xl font-black text-slate-900">₹499</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">For marketing managers & agencies.</p>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>15 Social Channels</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited Posts & Reels</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Priority Queue Dispatch</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1-Click Retry Engine</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onGoToApp}
                className="mt-8 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl cursor-pointer"
              >
                Get Pro Plan
              </button>
            </div>

            {/* Agency */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Agency Plan</h4>
                <div className="mt-3 flex items-baseline space-x-1">
                  <span className="text-3xl font-black text-slate-900">₹999</span>
                  <span className="text-xs text-slate-400">/month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">For large agencies managing multiple brands.</p>

                <ul className="mt-6 space-y-2.5 text-xs text-slate-600 font-medium">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>30 Social Channels</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dedicated Celery Workers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Multi-User Admin Access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>VIP 24/7 Priority Support</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={onGoToApp}
                className="mt-8 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl cursor-pointer"
              >
                Contact for Agency
              </button>
            </div>
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
            <button onClick={onGoToApp} className="hover:text-[#1877F2] cursor-pointer">Dashboard</button>
            <button onClick={onOpenComposer} className="hover:text-[#1877F2] cursor-pointer">Reels Composer</button>
            <a href="#pricing" className="hover:text-[#1877F2]">Pricing</a>
            <a href="#faq" className="hover:text-[#1877F2]">Help & FAQ</a>
          </div>

          <p className="text-[11px]">© 2026 Social Publisher. Built for Facebook & Instagram.</p>
        </div>
      </footer>
    </div>
  );
}
