'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, Key, ArrowRight, Sparkles } from 'lucide-react';
import { BufferLogo } from '@/components/buffer-logo';
import { useAuth } from '@/lib/auth-context';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin } = useAuth();

  const [email, setEmail] = useState('superadmin@maeacoploit.internal');
  const [password, setPassword] = useState('••••••••••••');
  const [secretKey, setSecretKey] = useState('KEY-ROOT-2026');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(email || 'superadmin@maeacoploit.internal', secretKey);
    router.push('/admin/dashboard');
  };

  const handleQuickAdminDemo = () => {
    loginAdmin('superadmin@maeacoploit.internal', 'MASTER_KEY_DEV');
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#101114] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-[#8fd98b] selection:text-[#101114]">
      {/* Admin Header matching Buffer brand */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1e2025] border border-[#2a2d34] text-white mb-4 shadow-xl">
          <BufferLogo className="w-8 h-8 text-white" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-1">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Maeaco ploit Admin Center
          </h2>
          <span className="text-[10px] font-black bg-purple-900/60 text-purple-300 border border-purple-700/50 px-2 py-0.5 rounded">
            ROOT
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-400 font-medium">
          Authorized personnel only • Dynamic Packages & Member Oversight
        </p>
      </div>

      {/* Main Admin Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#1e2025] py-8 px-6 shadow-2xl rounded-3xl border border-[#2a2d34] sm:px-10">
          <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="admin@maeacoploit.internal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#16171b] border border-[#2a2d34] text-white pl-9 pr-3 py-2.5 rounded-xl placeholder-slate-500 focus:outline-none focus:border-[#8fd98b]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#16171b] border border-[#2a2d34] text-white pl-9 pr-3 py-2.5 rounded-xl placeholder-slate-500 focus:outline-none focus:border-[#8fd98b]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Security Token Key</span>
                <span className="text-[10px] text-[#8fd98b] font-mono">2FA / Root</span>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="KEY-ADMIN-XXXX"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full bg-[#16171b] border border-[#2a2d34] text-white pl-9 pr-3 py-2.5 rounded-xl font-mono placeholder-slate-500 focus:outline-none focus:border-[#8fd98b]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold py-3 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-1.5 mt-2"
            >
              <span>Authenticate & Enter Admin Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Demo */}
          <div className="mt-6 pt-5 border-t border-[#2a2d34] text-center">
            <button
              type="button"
              onClick={handleQuickAdminDemo}
              className="w-full bg-[#16171b] hover:bg-[#26282f] text-slate-200 hover:text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer border border-[#2a2d34]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8fd98b]" />
              <span>1-Click Admin Demo Login</span>
            </button>
          </div>
        </div>

        {/* User Portal Link */}
        <div className="mt-6 text-center text-xs text-slate-500">
          Not an administrator?{' '}
          <Link href="/user/login" className="font-bold text-[#8fd98b] hover:underline">
            Go to Creator Login →
          </Link>
        </div>
      </div>
    </div>
  );
}
