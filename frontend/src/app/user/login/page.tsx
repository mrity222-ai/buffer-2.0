'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Share2, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function UserLoginPage() {
  const router = useRouter();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    loginUser(email, password);
    router.push('/user/dashboard');
  };

  const handleQuickDemoLogin = () => {
    loginUser('creator@socialpublisher.io', 'demo123');
    router.push('/user/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-[#E7F3FF] selection:text-[#1877F2]">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2.5 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-xs">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tight">Social Publisher</span>
        </Link>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          Sign in to your Creator Portal
        </h2>
        <p className="mt-1.5 text-xs text-slate-500 font-medium">
          Create Once. Broadcast to Facebook Pages & Instagram Accounts.
        </p>
      </div>

      {/* Main Login Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 sm:rounded-2xl border border-slate-200 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <a href="#" className="text-[11px] font-bold text-[#1877F2] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#1877F2] rounded border-slate-300 focus:ring-[#1877F2]"
                />
                <span className="text-xs text-slate-600 font-medium">Remember my session</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold py-3 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>Sign In to Social Publisher</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Or Instant Demo Access
            </span>
          </div>

          {/* Quick Demo Button */}
          <div className="mt-4">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full bg-[#E7F3FF] hover:bg-blue-100 text-[#1877F2] text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer border border-blue-200/60"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Creator Demo Login</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-xs text-slate-500 font-medium">
            Don't have an account yet?{' '}
            <Link href="/user/register" className="font-bold text-[#1877F2] hover:underline">
              Create account free
            </Link>
          </div>
        </div>

        {/* Admin Portal Switcher Link */}
        <div className="mt-6 text-center">
          <Link
            href="/admin/login"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>Platform Admin? Sign in to Admin Portal →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
