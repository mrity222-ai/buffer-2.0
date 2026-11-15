'use client';

import React, { useState } from 'react';
import { X, Check, Plus, AlertCircle, Sparkles, ExternalLink } from 'lucide-react';
import { SocialAccount } from '@/types';
import { useAuth } from '@/lib/auth-context';

interface ConnectChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAccount: (account: SocialAccount) => void;
  onOpenUpgradeModal: () => void;
  accountsCount: number;
  channelLimit?: number;
}

export function ConnectChannelModal({
  isOpen,
  onClose,
  onAddAccount,
  onOpenUpgradeModal,
  accountsCount,
  channelLimit = 3,
}: ConnectChannelModalProps) {
  const { user } = useAuth();
  const [selectedPlatform, setSelectedPlatform] = useState<SocialAccount['platform']>('instagram_business');
  const [accountName, setAccountName] = useState('');
  const [username, setUsername] = useState('');

  if (!isOpen) return null;

  const isLimitReached = accountsCount >= channelLimit;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLimitReached) {
      onClose();
      onOpenUpgradeModal();
      return;
    }
    if (!accountName.trim()) return;

    const newAcc: SocialAccount = {
      id: `${selectedPlatform}-${Date.now()}`,
      platform: selectedPlatform,
      name: accountName,
      username: username || accountName.toLowerCase().replace(/\s+/g, '_'),
      avatarUrl: selectedPlatform === 'facebook_page'
        ? 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150'
        : selectedPlatform === 'instagram_business'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      category: selectedPlatform === 'facebook_page' ? 'Facebook Business Page' : 'Instagram Creator',
      followersCount: 3800,
      isConnected: true,
      pageId: `page_${Date.now()}`,
    };

    onAddAccount(newAcc);
    setAccountName('');
    setUsername('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs font-sans text-white animate-in fade-in duration-150">
      <div className="bg-[#1e2025] rounded-3xl border border-[#2a2d34] max-w-lg w-full overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#2a2d34] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Connect a Social Channel</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Select your network to authenticate and publish directly from Buffer
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#26282f] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Limit Reached Notice */}
        {isLimitReached ? (
          <div className="p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-amber-950/60 border border-amber-800 text-amber-400 flex items-center justify-center mx-auto text-xl">
              ⚡
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Channel Limit Reached (3/3)</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                You are currently on the <strong className="text-white">Free Plan</strong> with 3 channels connected. Upgrade to Essentials or Team to connect unlimited channels.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenUpgradeModal();
              }}
              className="w-full py-3 bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
            >
              Upgrade Plan to Connect More Channels
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
            {/* Network Selector */}
            <div>
              <label className="block font-semibold text-slate-300 mb-2">Choose Network</label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedPlatform('instagram_business')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    selectedPlatform === 'instagram_business'
                      ? 'border-[#8fd98b] bg-[#26282f] text-white ring-1 ring-[#8fd98b]'
                      : 'border-[#2a2d34] bg-[#16171b] text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-xs text-white font-bold mb-1.5">
                    ig
                  </div>
                  <span className="font-bold">Instagram</span>
                  <span className="text-[10px] text-slate-500">Business/Creator</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlatform('facebook_page')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    selectedPlatform === 'facebook_page'
                      ? 'border-[#8fd98b] bg-[#26282f] text-white ring-1 ring-[#8fd98b]'
                      : 'border-[#2a2d34] bg-[#16171b] text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-xs text-white font-bold mb-1.5">
                    f
                  </div>
                  <span className="font-bold">Facebook</span>
                  <span className="text-[10px] text-slate-500">Business Page</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPlatform('instagram_business')}
                  className="p-3 rounded-xl border border-[#2a2d34] bg-[#16171b] text-slate-400 hover:text-white flex flex-col items-center justify-center text-center transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-xs text-white font-bold mb-1.5">
                    in
                  </div>
                  <span className="font-bold">LinkedIn</span>
                  <span className="text-[10px] text-slate-500">Company Page</span>
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Account / Page Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Avedan Creative Studio"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#8fd98b]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                Handle / Username
              </label>
              <input
                type="text"
                placeholder="e.g. avedan_creatives"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#8fd98b]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2 border-t border-[#2a2d34]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] font-bold rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                Connect Channel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
