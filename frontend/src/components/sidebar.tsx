'use client';

import React from 'react';
import { 
  Layers, 
  Calendar, 
  Share2, 
  Clock, 
  Settings, 
  PlusCircle, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { SocialAccount } from '@/types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  accounts: SocialAccount[];
  selectedAccountId: string | null;
  setSelectedAccountId: (id: string | null) => void;
  onOpenConnectModal: () => void;
}

export function Sidebar({
  currentTab,
  setCurrentTab,
  accounts,
  selectedAccountId,
  setSelectedAccountId,
  onOpenConnectModal,
}: SidebarProps) {
  const facebookAccounts = accounts.filter(a => a.platform === 'facebook_page');
  const instagramAccounts = accounts.filter(a => a.platform === 'instagram_business');

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen select-none shrink-0">
      {/* Brand & Workspace Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-200">
            <Share2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              Social Publisher
              <span className="text-[10px] font-semibold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">
                MVP
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">Create Once. Publish Everywhere.</p>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="px-3 pt-4 pb-2">
        <p className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Core Workflows
        </p>
        <nav className="space-y-1">
          <button
            onClick={() => setCurrentTab('queue')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              currentTab === 'queue'
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Clock className={`w-4 h-4 ${currentTab === 'queue' ? 'text-purple-600' : 'text-slate-400'}`} />
              <span>Publishing Queue</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 font-semibold">
              3
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('history')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              currentTab === 'history'
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Layers className={`w-4 h-4 ${currentTab === 'history' ? 'text-purple-600' : 'text-slate-400'}`} />
              <span>Publishing History</span>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('accounts')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              currentTab === 'accounts'
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Share2 className={`w-4 h-4 ${currentTab === 'accounts' ? 'text-purple-600' : 'text-slate-400'}`} />
              <span>Channels & Meta API</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 font-semibold rounded">
              {accounts.length}
            </span>
          </button>

          <button
            onClick={() => setCurrentTab('settings')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              currentTab === 'settings'
                ? 'bg-purple-50 text-purple-700 font-semibold'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <Settings className={`w-4 h-4 ${currentTab === 'settings' ? 'text-purple-600' : 'text-slate-400'}`} />
              <span>Settings & Keys</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Connected Channels List (The Signature Buffer Concept) */}
      <div className="px-3 py-2 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-2 pt-2 pb-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Connected Channels
          </p>
          <button
            onClick={onOpenConnectModal}
            className="text-[11px] text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 hover:underline"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Connect
          </button>
        </div>

        {/* All Channels Filter */}
        <button
          onClick={() => setSelectedAccountId(null)}
          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium mb-1 transition-colors ${
            selectedAccountId === null
              ? 'bg-slate-100 text-slate-900 font-semibold'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">
              ★
            </div>
            <span>All Channels Overview</span>
          </div>
          <span className="text-[10px] text-slate-400">{accounts.length}</span>
        </button>

        {/* Facebook Pages */}
        <div className="mt-3">
          <span className="px-2 text-[10px] font-semibold text-slate-400">Facebook Pages</span>
          <div className="mt-1 space-y-1">
            {facebookAccounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => setSelectedAccountId(acc.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors group ${
                  selectedAccountId === acc.id
                    ? 'bg-purple-50 text-purple-800 font-semibold border-l-2 border-purple-600'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <div className="relative shrink-0">
                    <img
                      src={acc.avatarUrl}
                      alt={acc.name}
                      className="w-6 h-6 rounded-full object-cover border border-slate-200"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center text-[7px] text-white font-bold">
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
          <span className="px-2 text-[10px] font-semibold text-slate-400">Instagram Professional</span>
          <div className="mt-1 space-y-1">
            {instagramAccounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => setSelectedAccountId(acc.id)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors group ${
                  selectedAccountId === acc.id
                    ? 'bg-purple-50 text-purple-800 font-semibold border-l-2 border-purple-600'
                    : 'text-slate-700 hover:bg-slate-50'
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

      {/* Plan Limits Card (Buffer-style subtle upgrade banner) */}
      <div className="p-3 m-3 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
          <span>Starter Plan</span>
          <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
            ₹199/mo
          </span>
        </div>
        <div className="mt-2 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
          <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${(accounts.length / 5) * 100}%` }} />
        </div>
        <p className="mt-1.5 text-[11px] text-slate-500 flex justify-between">
          <span>Channels: {accounts.length}/5</span>
          <span className="text-purple-600 hover:underline cursor-pointer font-medium">Upgrade</span>
        </p>
      </div>

      {/* User Footer Profile */}
      <div className="p-3 border-t border-slate-200 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center text-xs font-bold">
            AD
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-slate-800">Avedan Agency</p>
            <p className="text-[10px] text-slate-400">admin@publisher.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
