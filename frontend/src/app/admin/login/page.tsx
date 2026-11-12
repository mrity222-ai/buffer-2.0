'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, Key, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAdmin } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(email || 'admin@socialpublisher.io', secretKey);
    router.push('/admin/dashboard');
  };

  const handleQuickAdminDemo = () => {
    loginAdmin('superadmin@socialpublisher.io', 'MASTER_KEY_DEV');
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-purple-900 selection:text-white">
      {/* Admin Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-400 mb-4 shadow-lg shadow-purple-900/40">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white">
          SaaS Admin Control Center
        </h2>
        <p className="mt-1.5 text-xs text-slate-400 font-medium">
          Authorized platform personnel only · Package creation & member oversight
        </p>
      </div>

      {/* Main Admin Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900/90 py-8 px-6 shadow-2xl rounded-2xl border border-slate-800 sm:px-10 backdrop-blur-md">
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="admin@socialpublisher.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center justify-between">
                <span>Master Security Key</span>
                <span className="text-[10px] text-purple-400 font-mono">2FA / Key</span>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="KEY-ADMIN-XXXX"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 font-mono focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-3 rounded-xl shadow-lg shadow-purple-900/30 transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>Authenticate & Enter Admin Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Demo */}
          <div className="mt-6 pt-5 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={handleQuickAdminDemo}
              className="w-full bg-slate-800/80 hover:bg-slate-800 text-purple-300 hover:text-purple-200 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer border border-purple-500/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>1-Click Admin Demo Login</span>
            </button>
          </div>
        </div>

        {/* User Portal Link */}
        <div className="mt-6 text-center text-xs text-slate-500">
          Not an administrator?{' '}
          <Link href="/user/login" className="font-bold text-[#1877F2] hover:underline">
            Go to User Creator Login →
          </Link>
        </div>
      </div>
    </div>
  );
}
