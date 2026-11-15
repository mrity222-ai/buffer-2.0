'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Settings, 
  Key, 
  Server, 
  LogOut, 
  ExternalLink, 
  UserCheck, 
  HelpCircle 
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface AdminUserPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
  onLogout: () => void;
}

export function AdminUserPopover({
  isOpen,
  onClose,
  onNavigateTab,
  onLogout,
}: AdminUserPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { admin } = useAuth();

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
      {/* Admin Info Header */}
      <div className="px-2 pt-1 pb-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#8fd98b] animate-pulse" />
          <p className="text-xs text-[#8fd98b] font-bold uppercase tracking-wider">
            Root Administrator
          </p>
        </div>
        <p className="text-sm font-bold text-white mt-1">
          {admin?.name || 'Superadmin'}
        </p>
        <p className="text-xs text-slate-400 mt-0.5 truncate">
          {admin?.email || 'admin@socialpublisher.io'}
        </p>
      </div>

      <div className="border-t border-[#2a2d34] my-1.5" />

      {/* Admin Actions Group */}
      <div className="space-y-0.5 text-xs">
        <button
          onClick={() => {
            onClose();
            onNavigateTab('settings');
          }}
          className="w-full flex items-center px-2.5 py-1.5 text-slate-200 hover:text-white hover:bg-[#26282f] rounded-lg transition-colors cursor-pointer space-x-2.5"
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Platform Settings</span>
        </button>

        <button
          onClick={() => {
            onClose();
            onNavigateTab('engine');
          }}
          className="w-full flex items-center px-2.5 py-1.5 text-slate-200 hover:text-white hover:bg-[#26282f] rounded-lg transition-colors cursor-pointer space-x-2.5"
        >
          <Server className="w-4 h-4 text-slate-400" />
          <span>Celery & Redis Health</span>
        </button>

        <Link
          href="/user/dashboard"
          className="w-full flex items-center justify-between px-2.5 py-1.5 text-slate-200 hover:text-white hover:bg-[#26282f] rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center space-x-2.5">
            <UserCheck className="w-4 h-4 text-slate-400" />
            <span>Switch to Creator View</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </Link>
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
        <span>Log out from Admin</span>
      </button>
    </div>
  );
}
