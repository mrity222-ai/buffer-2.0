'use client';

import React, { useRef, useEffect } from 'react';
import { 
  Settings, 
  Share2, 
  CreditCard, 
  HelpCircle, 
  Code, 
  Grid, 
  FlaskConical, 
  MessageCircle, 
  LogOut, 
  Zap, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface BufferUserPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSettings: (tab?: string) => void;
  onOpenUpgradeModal: () => void;
  onLogout: () => void;
  channelsCount?: number;
}

export function BufferUserPopover({
  isOpen,
  onClose,
  onNavigateSettings,
  onOpenUpgradeModal,
  onLogout,
  channelsCount = 0,
}: BufferUserPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={popoverRef}
      className="absolute bottom-16 left-3 w-72 bg-[#1e2025] border border-[#2a2d34] rounded-2xl shadow-2xl p-3 z-50 text-white font-sans animate-in fade-in slide-in-from-bottom-2 duration-150"
    >
      {/* User Info Header matching Image 11 */}
      <div className="px-2 pt-1 pb-2">
        <p className="text-xs text-slate-300 font-medium truncate">
          {user?.email || 'info.avedatechnologies@gmail.com'}
        </p>
        <p className="text-sm font-bold text-white mt-0.5">
          {user?.name ? `${user.name}'s Organization` : 'My organization'}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          {user?.plan || 'Free plan'} • {channelsCount} channels
        </p>

        {/* Upgrade Plan Pill Button */}
        <button
          onClick={() => {
            onClose();
            onOpenUpgradeModal();
          }}
          className="mt-2.5 w-full bg-[#26282f] hover:bg-[#2d3038] text-white text-xs font-bold py-2 px-3 rounded-xl border border-[#343842] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 text-[#8fd98b]" />
          <span>Upgrade Plan</span>
        </button>
      </div>

      <div className="border-t border-[#2a2d34] my-1.5" />

      {/* Main Settings Nav Group */}
      <div className="space-y-0.5">
        <button
          onClick={() => {
            onClose();
            onNavigateSettings('profile');
          }}
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-[#26282f] rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-amber-400" />
        </button>

        <button
          onClick={() => {
            onClose();
            onNavigateSettings('channels');
          }}
          className="w-full flex items-center px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-[#26282f] rounded-lg transition-colors cursor-pointer space-x-2.5"
        >
          <Share2 className="w-4 h-4 text-slate-400" />
          <span>Channels</span>
        </button>

        <button
          onClick={() => {
            onClose();
            onNavigateSettings('billing');
          }}
          className="w-full flex items-center px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-[#26282f] rounded-lg transition-colors cursor-pointer space-x-2.5"
        >
          <CreditCard className="w-4 h-4 text-slate-400" />
          <span>Plans and Billing</span>
        </button>

        <button
          onClick={() => {
            onClose();
            alert('Buffer Support: Visit help.buffer.com for guides and live chat support.');
          }}
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-[#26282f] rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Help & Support</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

      <div className="border-t border-[#2a2d34] my-1.5" />

      {/* Developer & Features Group matching Image 11 */}
      <div className="space-y-0.5">
        <button
          onClick={() => {
            onClose();
            onNavigateSettings('api');
          }}
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-[#26282f] rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <Code className="w-4 h-4 text-slate-400" />
            <span>API</span>
          </div>
          <span className="text-[10px] bg-purple-900/60 text-purple-300 font-bold px-1.5 py-0.2 rounded">
            New
          </span>
        </button>

        <button
          onClick={() => {
            onClose();
            onNavigateSettings('apps');
          }}
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-[#26282f] rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <Grid className="w-4 h-4 text-slate-400" />
            <span>Apps & Integrations</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
        </button>

        <div className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs text-slate-200">
          <div className="flex items-center space-x-2.5">
            <FlaskConical className="w-4 h-4 text-slate-400" />
            <span>Beta Features</span>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold px-1.5 py-0.2 rounded">
            Off
          </span>
        </div>

        <button
          onClick={() => {
            onClose();
            alert('Refer a Friend: Give $10, get $10 when a fellow creator signs up for Buffer!');
          }}
          className="w-full flex items-center px-2.5 py-1.5 text-xs text-slate-200 hover:text-white hover:bg-[#26282f] rounded-lg transition-colors cursor-pointer space-x-2.5"
        >
          <MessageCircle className="w-4 h-4 text-slate-400" />
          <span>Refer a Friend</span>
        </button>
      </div>

      <div className="border-t border-[#2a2d34] my-1.5" />

      {/* Logout Row */}
      <button
        onClick={() => {
          onClose();
          onLogout();
        }}
        className="w-full flex items-center px-2.5 py-1.5 text-xs text-slate-300 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer space-x-2.5"
      >
        <LogOut className="w-4 h-4 text-slate-400" />
        <span>Log out</span>
      </button>
    </div>
  );
}
