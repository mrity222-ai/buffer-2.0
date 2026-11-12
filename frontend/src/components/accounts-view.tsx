'use client';

import React, { useState } from 'react';
import { 
  Share2, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  Info
} from 'lucide-react';
import { SocialAccount } from '@/types';

interface AccountsViewProps {
  accounts: SocialAccount[];
  onAddAccount: (account: SocialAccount) => void;
  onRemoveAccount: (id: string) => void;
}

export function AccountsView({
  accounts,
  onAddAccount,
  onRemoveAccount,
}: AccountsViewProps) {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'facebook_page' | 'instagram_business'>('facebook_page');
  const [accountName, setAccountName] = useState('');
  const [accountUsername, setAccountUsername] = useState('');

  const facebookAccounts = accounts.filter((a) => a.platform === 'facebook_page');
  const instagramAccounts = accounts.filter((a) => a.platform === 'instagram_business');

  const handleConnectNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName.trim()) return;

    const newAcc: SocialAccount = {
      id: `${selectedPlatform}-${Date.now()}`,
      platform: selectedPlatform,
      name: accountName,
      username: accountUsername || accountName.toLowerCase().replace(/\s+/g, '_'),
      avatarUrl:
        selectedPlatform === 'facebook_page'
          ? 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      category: selectedPlatform === 'facebook_page' ? 'Business Page' : 'Creator Account',
      followersCount: 5400,
      isConnected: true,
      pageId: `page_${Date.now()}`,
    };

    onAddAccount(newAcc);
    setAccountName('');
    setAccountUsername('');
    setIsConnectModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner with Meta Graph API explanation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#E7F3FF] text-[#1877F2] flex items-center justify-center font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Meta Graph API & Social Channels
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed font-medium">
            Connect your <strong>Facebook Pages</strong> and <strong>Instagram Professional Accounts</strong>.
            Meta allows programmatic publishing strictly to business pages and professional creator accounts (personal profiles are not supported).
          </p>
        </div>

        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="bg-[#1877F2] hover:bg-[#166FE5] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Channel</span>
        </button>
      </div>

      {/* Facebook Pages Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1877F2] text-white flex items-center justify-center text-sm font-bold shadow-xs">
              f
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Connected Facebook Pages</h3>
              <p className="text-xs text-slate-400 font-medium">Pages with `pages_manage_posts` publishing access</p>
            </div>
          </div>
          <span className="text-xs bg-[#E7F3FF] text-[#1877F2] font-bold px-2.5 py-1 rounded-full">
            {facebookAccounts.length} Connected
          </span>
        </div>

        {facebookAccounts.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
            No Facebook Pages connected yet. Click "Connect New Channel" above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {facebookAccounts.map((account) => (
              <div
                key={account.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between hover:bg-white hover:border-slate-300 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={account.avatarUrl}
                      alt={account.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#1877F2] rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                      f
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{account.name}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      @{account.username} · {account.category}
                    </p>
                    <div className="flex items-center space-x-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-emerald-700 font-bold">Active & Valid Token</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onRemoveAccount(account.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Disconnect Page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instagram Professional Accounts Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-xs">
              ig
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Connected Instagram Accounts</h3>
              <p className="text-xs text-slate-400 font-medium">
                Business & Creator accounts with `instagram_content_publish`
              </p>
            </div>
          </div>
          <span className="text-xs bg-rose-50 text-rose-700 font-bold px-2.5 py-1 rounded-full">
            {instagramAccounts.length} Connected
          </span>
        </div>

        {instagramAccounts.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
            No Instagram accounts connected yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {instagramAccounts.map((account) => (
              <div
                key={account.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between hover:bg-white hover:border-slate-300 transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={account.avatarUrl}
                      alt={account.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 rounded-full flex items-center justify-center text-[8px] text-white font-bold">
                      ig
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{account.name}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      @{account.username} · {account.category}
                    </p>
                    <div className="flex items-center space-x-1.5 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] text-emerald-700 font-bold">Active & Valid Token</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => onRemoveAccount(account.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Disconnect Account"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Connect Account Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Connect Social Media Channel
            </h3>
            <p className="text-xs text-slate-500 mb-4 font-medium">
              Select platform and enter details to simulate Meta OAuth authorization.
            </p>

            <form onSubmit={handleConnectNew} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Social Platform
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('facebook_page')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer ${
                      selectedPlatform === 'facebook_page'
                        ? 'border-[#1877F2] bg-[#E7F3FF] text-[#1877F2]'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>📘 Facebook Page</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('instagram_business')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer ${
                      selectedPlatform === 'instagram_business'
                        ? 'border-rose-600 bg-rose-50 text-rose-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>📸 Instagram Biz</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {selectedPlatform === 'facebook_page' ? 'Page Name' : 'Account Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    selectedPlatform === 'facebook_page' ? 'e.g. My Brand Page' : 'e.g. My Brand Official'
                  }
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Username / Handle
                </label>
                <input
                  type="text"
                  placeholder="e.g. mybrand"
                  value={accountUsername}
                  onChange={(e) => setAccountUsername(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsConnectModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#1877F2] hover:bg-[#166FE5] rounded-xl shadow-xs cursor-pointer"
                >
                  Authorize & Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
