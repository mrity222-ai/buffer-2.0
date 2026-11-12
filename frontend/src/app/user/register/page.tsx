'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Share2, Lock, Mail, User, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function UserRegisterPage() {
  const router = useRouter();
  const { registerUser, packages } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string>(packages[1]?.name || 'Starter Plan');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    registerUser(name, email, selectedPlan);
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
          Create your Creator Account
        </h2>
        <p className="mt-1.5 text-xs text-slate-500 font-medium">
          Start broadcasting 9:16 Reels and posts to Facebook & Instagram
        </p>
      </div>

      {/* Main Register Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 sm:rounded-2xl border border-slate-200 sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name / Brand Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="rahul@creatorstudio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2]"
                />
              </div>
            </div>

            {/* Plan Selector dynamically populated from packages */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                <span>Select Subscription Plan</span>
                <span className="text-[10px] font-semibold text-slate-400">Can change anytime</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPlan(pkg.name)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedPlan === pkg.name
                        ? 'border-[#1877F2] bg-[#E7F3FF] text-[#1877F2] ring-1 ring-[#1877F2] shadow-xs'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold truncate">{pkg.name}</p>
                      {pkg.isPopular && (
                        <span className="text-[8px] bg-[#1877F2] text-white px-1.5 py-0.2 rounded font-bold">
                          HOT
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-black mt-1">{pkg.price}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{pkg.accountLimit} Channels</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold py-3 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-1.5"
              >
                <span>Create Account & Start Publishing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500 font-medium">
            Already have an account?{' '}
            <Link href="/user/login" className="font-bold text-[#1877F2] hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
