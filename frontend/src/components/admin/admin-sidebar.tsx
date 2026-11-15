'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Cpu, 
  TrendingUp, 
  Settings, 
  Plus, 
  ShieldCheck, 
  PanelLeftClose, 
  Activity,
  User
} from 'lucide-react';
import { BufferLogo, BufferPlantIcon } from '@/components/buffer-logo';
import { AdminUserPopover } from '@/components/admin/admin-user-popover';
import { useAuth } from '@/lib/auth-context';

interface AdminSidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenCreatePackage: () => void;
  onLogout: () => void;
}

export function AdminSidebar({
  currentTab,
  setCurrentTab,
  onOpenCreatePackage,
  onLogout,
}: AdminSidebarProps) {
  const { admin, members, packages } = useAuth();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <aside className="w-64 bg-[#16171b] border-r border-[#26282f] flex flex-col h-screen select-none shrink-0 font-sans relative z-30">
      {/* Top Header: Buffer Logo & Admin Badge matching User Panel */}
      <div className="p-4 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <BufferLogo className="w-5 h-5 text-white" />
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-white tracking-tight">Buffer</span>
            <span className="text-[10px] font-black bg-purple-900/60 text-purple-300 border border-purple-700/50 px-1.5 py-0.2 rounded">
              ADMIN
            </span>
          </div>
        </Link>
        <div title="Buffer Admin Sprout" className="text-[#8fd98b]">
          <BufferPlantIcon className="w-5 h-5 text-[#8fd98b]" />
        </div>
      </div>

      {/* Primary Action Button: + New Package matching User Panel's + New button */}
      <div className="px-3 pb-3">
        <button
          onClick={onOpenCreatePackage}
          className="w-full bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold py-2.5 px-4 rounded-full transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#101114] stroke-[3]" />
          <span>New Package</span>
        </button>
      </div>

      {/* Navigation Menu matching User Panel layout */}
      <nav className="px-2 space-y-0.5 flex-1 overflow-y-auto text-xs">
        <button
          onClick={() => setCurrentTab('overview')}
          className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'overview'
              ? 'bg-[#1e2025] text-white font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/60'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mr-3 text-slate-400" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setCurrentTab('members')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'members'
              ? 'bg-[#1e2025] text-white font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/60'
          }`}
        >
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-3 text-slate-400" />
            <span>Members</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 bg-[#26282f] px-1.5 py-0.2 rounded">
            {members.length}
          </span>
        </button>

        <button
          onClick={() => setCurrentTab('packages')}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'packages'
              ? 'bg-[#1e2025] text-white font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/60'
          }`}
        >
          <div className="flex items-center">
            <CreditCard className="w-4 h-4 mr-3 text-slate-400" />
            <span>Packages & Pricing</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 bg-[#26282f] px-1.5 py-0.2 rounded">
            {packages.length}
          </span>
        </button>

        <button
          onClick={() => setCurrentTab('engine')}
          className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'engine'
              ? 'bg-[#1e2025] text-white font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/60'
          }`}
        >
          <Cpu className="w-4 h-4 mr-3 text-slate-400" />
          <span>Publishing Engine</span>
        </button>

        <button
          onClick={() => setCurrentTab('analytics')}
          className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'analytics'
              ? 'bg-[#1e2025] text-white font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/60'
          }`}
        >
          <TrendingUp className="w-4 h-4 mr-3 text-slate-400" />
          <span>SaaS Analytics</span>
        </button>

        <button
          onClick={() => setCurrentTab('settings')}
          className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
            currentTab === 'settings'
              ? 'bg-[#1e2025] text-white font-bold'
              : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/60'
          }`}
        >
          <Settings className="w-4 h-4 mr-3 text-slate-400" />
          <span>Platform Settings</span>
        </button>
      </nav>

      {/* Bottom Section: Health & Admin Profile Pill matching User Panel */}
      <div className="p-3 space-y-2 border-t border-[#26282f]">
        {/* Worker Status Card */}
        <div className="bg-[#1e2025] rounded-xl p-3 border border-[#2a2d34] text-xs">
          <div className="flex items-center justify-between text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8fd98b] animate-pulse" />
              <span>Celery 4/4 Online</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-bold">Healthy</span>
          </div>
          <div className="mt-2 w-full bg-[#2a2d34] rounded-full h-1 overflow-hidden">
            <div className="bg-[#8fd98b] h-1 rounded-full w-full" />
          </div>
        </div>

        {/* Admin Profile Pill */}
        <div className="relative">
          <button
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-[#1e2025] hover:bg-[#252830] border border-[#2a2d34] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center space-x-2.5 truncate">
              <div className="w-7 h-7 rounded-lg bg-purple-900/60 text-purple-300 border border-purple-700/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="truncate leading-tight">
                <p className="text-xs font-bold text-white truncate">
                  {admin?.name || 'Superadmin'}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  Root Access
                </p>
              </div>
            </div>
            <PanelLeftClose className="w-4 h-4 text-slate-400 shrink-0" />
          </button>

          {/* Floating Admin Popover */}
          <AdminUserPopover
            isOpen={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
            onNavigateTab={setCurrentTab}
            onLogout={onLogout}
          />
        </div>
      </div>
    </aside>
  );
}
