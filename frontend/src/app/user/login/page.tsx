'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BufferLogo } from '@/components/buffer-logo';
import { Bookmark, ExternalLink } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function UserLoginPage() {
  const router = useRouter();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState('info.avedatechnologies@gmail.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginUser(email, password);
    router.push('/user/dashboard');
  };

  const handleQuickDemo = (demoEmail: string) => {
    loginUser(demoEmail, 'password123');
    router.push('/user/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#101114] text-white flex flex-col lg:flex-row font-sans selection:bg-[#8fd98b] selection:text-[#101114]">
      {/* Left Column: Buffer Dark Log In Form */}
      <div className="w-full lg:w-[48%] flex flex-col justify-between px-8 py-10 lg:px-16 lg:py-14">
        <div className="max-w-md w-full mx-auto my-auto">
          {/* Buffer Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 flex items-center justify-center mb-5">
              <BufferLogo className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-2xl lg:text-[28px] font-bold text-white tracking-tight">
              Log in to Maeaco ploit
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Don't have an account?{' '}
              <Link href="/user/register" className="text-[#8fd98b] hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#101114] text-sm px-4 py-3 rounded-lg border border-[#2a2d34] text-white placeholder-slate-500 focus:outline-none focus:border-[#8fd98b] focus:ring-1 focus:ring-[#8fd98b] transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <a href="#" className="text-xs text-slate-400 hover:text-[#8fd98b]">
                  Forgot your password?
                </a>
              </div>
              <input
                type="password"
                required
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#101114] text-sm px-4 py-3 rounded-lg border border-[#2a2d34] text-white placeholder-slate-500 focus:outline-none focus:border-[#8fd98b] focus:ring-1 focus:ring-[#8fd98b] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-sm font-bold py-3.5 rounded-xl transition-all active:scale-98 cursor-pointer mt-4"
            >
              Log In
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="mt-6 p-3 bg-[#1e2025] rounded-xl border border-[#2a2d34] text-center">
            <p className="text-[11px] text-slate-400 font-medium mb-2">Instant Demo Workspace Access</p>
            <div className="flex items-center justify-center space-x-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('info.avedatechnologies@gmail.com')}
                className="text-xs bg-[#2a2d34] hover:bg-[#343842] text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold"
              >
                Avedan Creator
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('studio@creator.io')}
                className="text-xs bg-[#2a2d34] hover:bg-[#343842] text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold"
              >
                Agency Demo
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="max-w-md w-full mx-auto pt-6 flex items-center justify-center space-x-4 text-xs text-slate-500">
          <a href="#" className="hover:text-slate-300 flex items-center gap-0.5">
            Terms of Service <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
          <span>·</span>
          <a href="#" className="hover:text-slate-300 flex items-center gap-0.5">
            Privacy Policy <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
          <span>·</span>
          <a href="#" className="hover:text-slate-300 flex items-center gap-0.5">
            Security <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Right Column: "Introducing Insights" */}
      <div className="hidden lg:flex lg:w-[52%] p-6 lg:p-8">
        <div className="w-full bg-[#f4f3ec] rounded-3xl p-8 lg:p-12 flex flex-col justify-between overflow-hidden shadow-2xl relative text-slate-900 border border-amber-100/50">
          <div>
            <span className="inline-block bg-[#8fd98b] text-[#101114] text-[11px] font-black uppercase px-2.5 py-1 rounded-md mb-4 tracking-wider">
              NEW
            </span>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Introducing Insights
            </h2>
            <p className="mt-2 text-base text-slate-600 font-medium">
              Analytics that show you your next move
            </p>
          </div>

          {/* Embedded Mockup UI Preview matching Image 1 */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform translate-y-3">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BufferLogo className="w-4 h-4 text-slate-800" />
                <span className="text-xs font-bold text-slate-800">All Channels</span>
                <Bookmark className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="flex items-center space-x-1 text-[11px] font-medium text-slate-600">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded">7 days</span>
                <span className="px-2 py-0.5 hover:bg-slate-50 rounded">30 days</span>
                <span className="px-2 py-0.5 hover:bg-slate-50 rounded">Month to date</span>
                <span className="px-2 py-0.5 hover:bg-slate-50 rounded">Last month</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50/60 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  WEEKLY TAKEAWAYS ^
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-xs font-bold text-slate-900">Publish Your Overdue Draft</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                    You have two drafts waiting. Share your thoughts to engage your audience.
                  </p>
                  <button type="button" className="text-[10px] font-bold text-emerald-600 mt-2 hover:underline">
                    Explore Templates
                  </button>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-xs font-bold text-slate-900">Repost Your Popular Post</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                    Repost your engaging post about your ambitious project. It resonated well with a reach of 1781.
                  </p>
                  <button type="button" className="text-[10px] font-bold text-emerald-600 mt-2 hover:underline">
                    Create Post
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                Summary (May 18 - Jun 16, 2026 vs last period)
              </p>
              <div className="grid grid-cols-3 gap-3 text-left">
                <div className="border-r border-slate-100 pr-2">
                  <span className="text-[10px] text-slate-400 font-medium">Posts</span>
                  <div className="flex items-baseline space-x-1.5 mt-0.5">
                    <span className="text-lg font-black text-slate-900">67</span>
                    <span className="text-[10px] text-emerald-600 font-bold">↗ 1.7%</span>
                  </div>
                </div>
                <div className="border-r border-slate-100 pr-2">
                  <span className="text-[10px] text-slate-400 font-medium">Followers</span>
                  <div className="flex items-baseline space-x-1.5 mt-0.5">
                    <span className="text-lg font-black text-slate-900">2.2k</span>
                    <span className="text-[10px] text-emerald-600 font-bold">↗ 2.8%</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">Likes</span>
                  <div className="flex items-baseline space-x-1.5 mt-0.5">
                    <span className="text-lg font-black text-slate-900">7,295</span>
                    <span className="text-[10px] text-emerald-600 font-bold">↗ 6.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
