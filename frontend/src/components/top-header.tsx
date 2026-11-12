'use client';

import React from 'react';
import { Plus, RefreshCw, Bell, Search, Globe, Check } from 'lucide-react';
import { SocialAccount } from '@/types';

interface TopHeaderProps {
  accounts: SocialAccount[];
  selectedAccountId: string | null;
  onOpenComposer: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function TopHeader({
  accounts,
  selectedAccountId,
  onOpenComposer,
  activeTab,
  setActiveTab,
  onRefresh,
  isRefreshing = false,
}: TopHeaderProps) {
  const selectedAccount = accounts.find((a) => a.id === selectedAccountId);

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Active Channel Info or Breadcrumb */}
      <div className="flex items-center space-x-4">
        {selectedAccount ? (
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={selectedAccount.avatarUrl}
                alt={selectedAccount.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div
                className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] text-white font-bold ${
                  selectedAccount.platform === 'facebook_page'
                    ? 'bg-blue-600'
                    : 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600'
                }`}
              >
                {selectedAccount.platform === 'facebook_page' ? 'f' : 'ig'}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-bold text-slate-900">{selectedAccount.name}</h2>
                <span className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                  {selectedAccount.platform === 'facebook_page' ? 'Facebook Page' : 'Instagram Business'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                @{selectedAccount.username} · {selectedAccount.followersCount?.toLocaleString()} followers
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm">
              🌐
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">All Channels Multi-Publishing</h2>
              <p className="text-[11px] text-slate-400">
                Broadcasting to {accounts.length} connected destinations
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Center / Navigation Subtabs (Buffer style) */}
      <div className="hidden md:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('queue')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'queue'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Queue
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'history'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Sent & History
        </button>
        <button
          onClick={() => setActiveTab('accounts')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            activeTab === 'accounts'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Manage Accounts
        </button>
      </div>

      {/* Right Action Bar */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          title="Refresh Publishing Queue"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-purple-600' : ''}`} />
        </button>

        {/* The Famous Buffer "Create Post" Primary Action */}
        <button
          onClick={onOpenComposer}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm shadow-purple-200 transition-all hover:shadow-md hover:shadow-purple-300 active:scale-98 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Post</span>
        </button>
      </div>
    </header>
  );
}
