'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Layers, 
  Calendar, 
  Share2, 
  Clock, 
  Settings, 
  PlusCircle, 
  Home,
  LogOut,
  Sparkles
} from 'lucide-react';
import { SocialAccount } from '@/types';
import { useAuth } from '@/lib/auth-context';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  accounts: SocialAccount[];
  selectedAccountId: string | null;
  setSelectedAccountId: (id: string | null) => void;
  onOpenConnectModal: () => void;
  onOpenUpgradeModal: () => void;
}

export function Sidebar({
  currentTab,
  setCurrentTab,
  accounts,
  selectedAccountId,
  setSelectedAccountId,
  onOpenConnectModal,
  onOpenUpgradeModal,
}: SidebarProps) {
  const router = useRouter();
  const { user, logoutUser, packages } = useAuth();

  const currentPlan = packages.find(
    (p) => p.name.toLowerCase() === (user?.plan || 'Free Tier').toLowerCase()
  ) || packages[0];
  const channelLimit = currentPlan?.accountLimit || 2;

  const facebookAccounts = accounts.filter(a => a.platform === 'facebook_page');
  const instagramAccounts = accounts.filter(a => a.platform === 'instagram_business');

  const handleLogout = () => {
    logoutUser();
    router.push('/user/login');
  };

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen select-none shrink-0 font-sans">
      {/* Brand & Workspace Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#1877F2] flex items-center justify-center text-white shadow-xs">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              Social Publisher
              <span className="text-[10px] font-bold bg-[#E7F3FF] text-[#1877F2] px-1.5 py-0.5 rounded-full">
                Creator
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">Create Once. Publish Everywhere.</p>
          </div>
        </Link>
      </div>

      {/* Main Navigation Tabs */}
      <div className="px-3 pt-3 pb-2">
        <p className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Publishing Workflows
        </p>
        <nav className="space-y-1">
          <button
            onClick={() => setCurrentTab('queue')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentTab === 'queue'
                ? 'bg-[#E7F3FF] text-[#1877F2]'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Clock className={`w-4 h-4 ${currentTab === 'queue' ? 'text-[#1877F2]' : 'text-slate-400'}`} />
              <span>Publishing Queue</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
              currentTab === 'queue' ? 'bg-[#1877F2] text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              3
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('history')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentTab === 'history'
                ? 'bg-[#E7F3FF] text-[#1877F2]'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Layers className={`w-4 h-4 ${currentTab === 'history' ? 'text-[#1877F2]' : 'text-slate-400'}`} />
              <span>Publishing History</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('accounts')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentTab === 'accounts'
                ? 'bg-[#E7F3FF] text-[#1877F2]'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Share2 className={`w-4 h-4 ${currentTab === 'accounts' ? 'text-[#1877F2]' : 'text-slate-400'}`} />
              <span>Facebook & Instagram</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 font-bold rounded">
              {accounts.length}
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              currentTab === 'settings'
                ? 'bg-[#E7F3FF] text-[#1877F2]'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Settings className={`w-4 h-4 ${currentTab === 'settings' ? 'text-[#1877F2]' : 'text-slate-400'}`} />
              <span>Settings & Plan</span>
            </div>
          </button>

          <Link
            href="/"
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-slate-600 hover:bg-slate-50 hover:text-[#1877F2]"
          >
            <div className="flex items-center space-x-2.5">
              <Home className="w-4 h-4 text-slate-400" />
              <span>View Landing Page</span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Home</span>
          </Link>
        </nav>
      </div>

      {/* Connected Channels List */}
      <div className="px-3 py-2 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-2 pt-2 pb-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Connected Channels
          </p>
          <button
            onClick={onOpenConnectModal}
            className="text-[11px] text-[#1877F2] hover:text-[#166FE5] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Connect
          </button>
        </div>

        {/* All Channels Filter */}
        <button
          onClick={() => setSelectedAccountId(null)}
          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-semibold mb-1 transition-colors cursor-pointer ${
            selectedAccountId === null
              ? 'bg-slate-100 text-slate-900'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-md bg-[#E7F3FF] text-[#1877F2] flex items-center justify-center text-[10px] font-bold">
              ★
            </div>
            <span>All Channels Overview</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold">{accounts.length}</span>
        </button>

        {/* Facebook Pages */}
        <div className="mt-3">
          <span className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Facebook Pages</span>
          <div className="mt-1 space-y-1">
            {facebookAccounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => setSelectedAccountId(acc.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer group ${
                  selectedAccountId === acc.id
                    ? 'bg-[#E7F3FF] text-[#1877F2] font-bold border-l-3 border-[#1877F2]'
                    : 'text-slate-700 hover:bg-slate-50 font-medium'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <div className="relative shrink-0">
                    <img
                      src={acc.avatarUrl}
                      alt={acc.name}
                      className="w-6 h-6 rounded-full object-cover border border-slate-200"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#1877F2] rounded-full flex items-center justify-center text-[7px] text-white font-bold">
                      f
                    </div>
                  </div>
                  <span className="truncate text-left text-xs">{acc.name}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Connected" />
              </button>
            ))}
          </div>
        </div>

        {/* Instagram Accounts */}
        <div className="mt-3">
          <span className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Instagram Business</span>
          <div className="mt-1 space-y-1">
            {instagramAccounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => setSelectedAccountId(acc.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer group ${
                  selectedAccountId === acc.id
                    ? 'bg-rose-50 text-rose-700 font-bold border-l-3 border-rose-600'
                    : 'text-slate-700 hover:bg-slate-50 font-medium'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <div className="relative shrink-0">
                    <img
                      src={acc.avatarUrl}
                      alt={acc.name}
                      className="w-6 h-6 rounded-full object-cover border border-slate-200"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 rounded-full flex items-center justify-center text-[7px] text-white font-bold">
                      ig
                    </div>
                  </div>
                  <span className="truncate text-left text-xs">@{acc.username}</span>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Connected" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plan Limits Card */}
      <div className="p-3.5 m-3 bg-slate-50 rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span className="truncate">{user?.plan || 'Free Tier'}</span>
          <span className="text-[10px] font-bold bg-[#E7F3FF] text-[#1877F2] px-2 py-0.5 rounded-full shrink-0">
            Active
          </span>
        </div>
        <div className="mt-2.5 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-[#1877F2] h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (accounts.length / channelLimit) * 100)}%` }}
          />
        </div>
        <div className="mt-2 text-[11px] text-slate-500 flex justify-between font-medium">
          <span>Channels: {accounts.length}/{channelLimit}</span>
          <span className="text-[10px] font-bold text-slate-400">
            {accounts.length >= channelLimit ? 'Limit reached' : `${channelLimit - accounts.length} left`}
          </span>
        </div>

        <button
          onClick={onOpenUpgradeModal}
          className="mt-3 w-full py-2 bg-[#1877F2] hover:bg-[#166FE5] text-white text-[11px] font-bold rounded-xl shadow-xs transition-all active:scale-98 flex items-center justify-center space-x-1 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>⚡ Upgrade Plan</span>
        </button>
      </div>

      {/* User Footer Profile with Logout Button */}
      <div className="p-3.5 border-t border-slate-200 flex items-center justify-between bg-white">
        <div className="flex items-center space-x-2.5 truncate">
          <div className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs font-bold shrink-0">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : 'CR'}
          </div>
          <div className="leading-tight truncate">
            <p className="text-xs font-bold text-slate-800 truncate">{user?.name || 'Social Creator'}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.email || 'creator@studio.com'}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
          title="Logout from User Account"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
