'use client';

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Share2, 
  Send, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight, 
  Plus, 
  ExternalLink,
  ShieldCheck,
  Activity,
  Layers,
  ChevronRight
} from 'lucide-react';
import { BufferPlantIcon } from '@/components/buffer-logo';
import { useAuth } from '@/lib/auth-context';

interface AdminOverviewViewProps {
  onNavigateTab: (tab: string) => void;
  onOpenCreatePackage: () => void;
}

export function AdminOverviewView({
  onNavigateTab,
  onOpenCreatePackage,
}: AdminOverviewViewProps) {
  const { admin, members, packages } = useAuth();

  const totalMRR = packages.reduce((acc, p) => acc + p.priceNumber * p.subscribersCount, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans text-white">
      {/* Greeting & Live Server Health Banner matching User Panel Home */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#1e2025] border border-[#2a2d34] flex items-center justify-center text-xl shadow-xs">
            👋
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Good Afternoon, {admin?.name || 'Superadmin'}!
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Social Publisher Platform Command Center • Sun, Nov 15 2026
            </p>
          </div>
        </div>

        {/* System Health Indicators */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1e2025] border border-[#2a2d34] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#8fd98b] animate-pulse" />
            <span>Celery: 4/4 Online</span>
          </span>
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#1e2025] border border-[#2a2d34] text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Meta API: 99.9% Uptime</span>
          </span>
        </div>
      </div>

      {/* 4 Stat Counters in a Row matching Buffer Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total MRR */}
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-[#26282f] flex items-center justify-center text-[#8fd98b]">
            <TrendingUp className="w-5 h-5 text-[#8fd98b]" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">
                ₹{totalMRR.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
              <span>Platform MRR</span>
              <span className="text-[10px] text-emerald-400 font-bold">↗ 14.2%</span>
            </p>
          </div>
        </div>

        {/* Card 2: Active Creators */}
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-[#26282f] flex items-center justify-center text-purple-400">
            <Users className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">842</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
              <span>Active Creators</span>
              <span className="text-[10px] text-purple-400 font-bold">+68 this wk</span>
            </p>
          </div>
        </div>

        {/* Card 3: Connected Channels */}
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-[#26282f] flex items-center justify-center text-blue-400">
            <Share2 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">1,940</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
              <span>Connected Channels</span>
              <span className="text-[10px] text-slate-500">FB & IG</span>
            </p>
          </div>
        </div>

        {/* Card 4: Dispatched Posts */}
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-[#26282f] flex items-center justify-center text-amber-400">
            <Send className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">18,450</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
              <span>Posts & Reels Dispatched</span>
              <span className="text-[10px] text-emerald-400 font-bold">99.4%</span>
            </p>
          </div>
        </div>
      </div>

      {/* Platform Quick Operations matching "Get Started with Buffer" Card */}
      <div className="bg-[#1e2025] rounded-2xl border border-[#2a2d34] p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#2a2d34]">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#8fd98b]" />
            <h2 className="text-sm font-bold text-white">Platform Quick Operations</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Root Access Privileges</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <button
            onClick={onOpenCreatePackage}
            className="p-4 rounded-xl bg-[#16171b] hover:bg-[#26282f] border border-[#2a2d34] hover:border-[#8fd98b] text-left transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1e2025] flex items-center justify-center text-[#8fd98b] mb-3 group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4 stroke-[3]" />
            </div>
            <h3 className="text-xs font-bold text-white">Create SaaS Package</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Add new pricing tiers, channel limits, and feature permissions.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('members')}
            className="p-4 rounded-xl bg-[#16171b] hover:bg-[#26282f] border border-[#2a2d34] hover:border-[#8fd98b] text-left transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1e2025] flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white">Manage Members</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Search creators, suspend abusive accounts, or grant tier upgrades.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('engine')}
            className="p-4 rounded-xl bg-[#16171b] hover:bg-[#26282f] border border-[#2a2d34] hover:border-[#8fd98b] text-left transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1e2025] flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white">Publishing Pipeline</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Inspect Celery multi-destination queue, Redis status, and retry failed jobs.
            </p>
          </button>

          <button
            onClick={() => onNavigateTab('settings')}
            className="p-4 rounded-xl bg-[#16171b] hover:bg-[#26282f] border border-[#2a2d34] hover:border-[#8fd98b] text-left transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1e2025] flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white">Meta API Config</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Update Graph API credentials, App secret, and verify webhooks.
            </p>
          </button>
        </div>
      </div>

      {/* Bottom Split Grid: Live Stream & Recent Members */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Publishing Stream */}
        <div className="bg-[#1e2025] rounded-2xl border border-[#2a2d34] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Multi-Destination Dispatch Stream</span>
            </h3>
            <button 
              onClick={() => onNavigateTab('engine')}
              className="text-[11px] text-[#8fd98b] hover:underline font-bold"
            >
              View Queue
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: '1', account: 'Avedan Tech Page', platform: 'facebook_page', type: 'Reel 9:16', status: 'Published', time: 'Just now' },
              { id: '2', account: 'Growth Pulse Agency', platform: 'instagram_business', type: 'Reel 9:16', status: 'Published', time: '2 mins ago' },
              { id: '3', account: 'Creator Studio IG', platform: 'instagram_business', type: 'Feed Video', status: 'Queued', time: 'In queue' },
              { id: '4', account: 'Tech Buzz Daily', platform: 'facebook_page', type: 'Post', status: 'Published', time: '6 mins ago' },
            ].map((job) => (
              <div
                key={job.id}
                className="p-3 bg-[#16171b] rounded-xl border border-[#26282f] flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${
                    job.platform === 'facebook_page' ? 'bg-[#1877F2]' : 'bg-gradient-to-tr from-amber-500 to-rose-600'
                  }`}>
                    {job.platform === 'facebook_page' ? 'f' : 'ig'}
                  </div>
                  <div>
                    <p className="font-bold text-white">{job.account}</p>
                    <p className="text-[10px] text-slate-400">{job.type} • {job.time}</p>
                  </div>
                </div>

                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                  job.status === 'Published'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Member Registrations */}
        <div className="bg-[#1e2025] rounded-2xl border border-[#2a2d34] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white">Recent Member Signups</h3>
            <button 
              onClick={() => onNavigateTab('members')}
              className="text-[11px] text-[#8fd98b] hover:underline font-bold"
            >
              All Members ({members.length})
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {members.slice(0, 4).map((m) => (
              <div
                key={m.id}
                className="p-3 bg-[#16171b] rounded-xl border border-[#26282f] flex items-center justify-between"
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <img
                    src={m.avatarUrl}
                    alt={m.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#2a2d34] shrink-0"
                  />
                  <div className="truncate">
                    <p className="font-bold text-white truncate">{m.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{m.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[10px] font-bold bg-[#1e2025] border border-[#2a2d34] px-2 py-0.5 rounded text-slate-300 uppercase">
                    {m.plan}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${
                    m.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
