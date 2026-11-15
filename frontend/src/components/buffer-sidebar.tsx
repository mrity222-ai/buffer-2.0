'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Lightbulb, 
  Calendar, 
  MessageSquareText, 
  BarChart2, 
  Plus, 
  X, 
  SlidersHorizontal,
  User,
  PanelLeftClose,
  Sparkles
} from 'lucide-react';
import { BufferLogo, BufferPlantIcon } from '@/components/buffer-logo';
import { BufferUserPopover } from '@/components/buffer-user-popover';
import { SocialAccount } from '@/types';
import { useAuth } from '@/lib/auth-context';

interface BufferSidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  accounts: SocialAccount[];
  onOpenComposer: () => void;
  onOpenConnectModal: () => void;
  onOpenUpgradeModal: () => void;
  onNavigateSettings: (tab?: string) => void;
  onLogout: () => void;
}

export function BufferSidebar({
  currentTab,
  setCurrentTab,
  accounts,
  onOpenComposer,
  onOpenConnectModal,
  onOpenUpgradeModal,
  onNavigateSettings,
  onLogout,
}: BufferSidebarProps) {
  const { user } = useAuth();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showProgressCard, setShowProgressCard] = useState(true);

  const channelsLimit = 3; // Free tier connects up to 3 channels as shown in Image 2 & 9
  const connectedCount = accounts.length;

  return (
    <aside className="w-64 bg-[#16171b] border-r border-[#26282f] flex flex-col h-screen select-none shrink-0 font-sans relative z-30">
      {/* Top Header: Logo & Sprout */}
      <div className="p-4 flex items-center justify-between">
        <Link href="/user/dashboard" className="flex items-center space-x-2">
          <BufferLogo className="w-5 h-5 text-white" />
          <span className="text-base font-bold text-white tracking-tight">Maeaco ploit</span>
        </Link>
        <button 
          title="Maeaco ploit Sprout" 
          onClick={onOpenUpgradeModal}
          className="text-[#8fd98b] hover:opacity-80 transition-opacity cursor-pointer"
        >
          <BufferPlantIcon className="w-5 h-5 text-[#8fd98b]" />
        </button>
      </div>

      {/* Primary Action Button matching Image 2 */}
      <div className="px-3 pb-3">
        <button
          onClick={onOpenComposer}
          className="w-full bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold py-2.5 px-4 rounded-full transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#101114] stroke-[3]" />
          <span>New</span>
        </button>
      </div>

      {/* Main Navigation Menu matching Image 2 */}
      <nav className="px-2 space-y-0.5 flex-1 overflow-y-auto">
        <button
          onClick={() => setCurrentTab('home')}
          className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            currentTab === 'home'
              ? 'bg-[#1e2025] text-white font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/60'
          }`}
        >
          <Home className="w-4 h-4 mr-3 text-slate-400" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentTab('create')}
          className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            currentTab === 'create'
              ? 'bg-[#1e2025] text-white font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/60'
          }`}
        >
          <Lightbulb className="w-4 h-4 mr-3 text-slate-400" />
          <span>Create</span>
        </button>

        <button
          onClick={() => setCurrentTab('publish')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            currentTab === 'publish'
              ? 'bg-[#1e2025] text-white font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/60'
          }`}
        >
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-3 text-slate-400" />
            <span>Publish</span>
          </div>
          <span className="text-[11px] text-slate-500 font-semibold">0</span>
        </button>

        <button
          onClick={() => setCurrentTab('community')}
          className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            currentTab === 'community'
              ? 'bg-[#1e2025] text-white font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/60'
          }`}
        >
          <MessageSquareText className="w-4 h-4 mr-3 text-slate-400" />
          <span>Community</span>
        </button>

        <button
          onClick={() => setCurrentTab('insights')}
          className={`w-full flex items-center px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            currentTab === 'insights'
              ? 'bg-[#1e2025] text-white font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/60'
          }`}
        >
          <BarChart2 className="w-4 h-4 mr-3 text-slate-400" />
          <span>Insights</span>
        </button>

        {/* Connect Channels Section matching Image 2 */}
        <div className="pt-6 px-3">
          <p className="text-[11px] text-slate-400 font-medium mb-2.5">
            Connect channels
          </p>
          <div className="flex items-center space-x-2">
            {/* Instagram */}
            <button
              onClick={onOpenConnectModal}
              title="Connect Instagram"
              className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold hover:scale-105 transition-transform cursor-pointer"
            >
              ig
            </button>
            {/* Threads */}
            <button
              onClick={onOpenConnectModal}
              title="Connect Threads"
              className="w-6 h-6 rounded-full bg-black border border-[#2a2d34] flex items-center justify-center text-[11px] text-white font-bold hover:scale-105 transition-transform cursor-pointer"
            >
              @
            </button>
            {/* LinkedIn */}
            <button
              onClick={onOpenConnectModal}
              title="Connect LinkedIn"
              className="w-6 h-6 rounded-full bg-[#0077b5] flex items-center justify-center text-[9px] text-white font-bold hover:scale-105 transition-transform cursor-pointer"
            >
              in
            </button>
            {/* Facebook */}
            <button
              onClick={onOpenConnectModal}
              title="Connect Facebook Page"
              className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center text-[10px] text-white font-bold hover:scale-105 transition-transform cursor-pointer"
            >
              f
            </button>
            {/* Plus button */}
            <button
              onClick={onOpenConnectModal}
              title="Connect more channels"
              className="w-6 h-6 rounded-full bg-[#26282f] hover:bg-[#343842] flex items-center justify-center text-slate-300 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-3 space-y-2 border-t border-[#26282f]">
        {/* Channel Progress Card matching Image 2 (0/3 channels connected [x]) */}
        {showProgressCard && (
          <div className="bg-[#1e2025] rounded-xl p-3 border border-[#2a2d34] text-xs">
            <div className="flex items-center justify-between text-slate-300 font-medium">
              <span>{connectedCount}/{channelsLimit} channels connected</span>
              <button 
                onClick={() => setShowProgressCard(false)}
                className="text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Progress track */}
            <div className="mt-2 w-full bg-[#2a2d34] rounded-full h-1 overflow-hidden">
              <div 
                className="bg-[#8fd98b] h-1 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (connectedCount / channelsLimit) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Organization Profile Pill matching Image 2 & Image 11 */}
        <div className="relative">
          <button
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-[#1e2025] hover:bg-[#252830] border border-[#2a2d34] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center space-x-2.5 truncate">
              <div className="w-7 h-7 rounded-lg bg-[#2a2d34] text-white flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-300" />
              </div>
              <div className="truncate leading-tight">
                <p className="text-xs font-bold text-white truncate">
                  {user?.name ? `${user.name}'s org` : 'My organization'}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user?.plan || 'Free Plan'}
                </p>
              </div>
            </div>
            <PanelLeftClose className="w-4 h-4 text-slate-400 shrink-0" />
          </button>

          {/* Floating User Popover */}
          <BufferUserPopover
            isOpen={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
            onNavigateSettings={onNavigateSettings}
            onOpenUpgradeModal={onOpenUpgradeModal}
            onLogout={onLogout}
            channelsCount={connectedCount}
          />
        </div>
      </div>
    </aside>
  );
}
