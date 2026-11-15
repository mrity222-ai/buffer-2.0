'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart2, 
  Users, 
  CreditCard, 
  Download, 
  ChevronDown,
  Percent,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function AdminAnalyticsView() {
  const { packages, members } = useAuth();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'mtd' | 'last_month'>('30d');

  const totalMRR = packages.reduce((acc, p) => acc + p.priceNumber * p.subscribersCount, 0);
  const totalARR = totalMRR * 12;
  const activeSubscribers = packages.filter(p => p.priceNumber > 0).reduce((acc, p) => acc + p.subscribersCount, 0);
  const arpu = activeSubscribers > 0 ? Math.round(totalMRR / activeSubscribers) : 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans text-white">
      {/* Top Header Bar matching User Insights */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#26282f] pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1e2025] flex items-center justify-center text-slate-300">
            <TrendingUp className="w-5 h-5 text-slate-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">SaaS & Revenue Analytics</h1>
            <p className="text-xs text-slate-400 font-medium">
              Platform subscription metrics, MRR growth, and member expansion
            </p>
          </div>
        </div>

        {/* Date Filter Pills matching User Insights */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: 'mtd', label: 'Month to Date' },
            { id: 'last_month', label: 'Last Month' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setTimeRange(pill.id as any)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer ${
                timeRange === pill.id
                  ? 'bg-[#2a2d34] text-[#8fd98b] border border-[#343842]'
                  : 'bg-[#1e2025] text-slate-400 hover:text-white'
              }`}
            >
              {pill.label}
            </button>
          ))}

          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] font-semibold text-slate-300 hover:text-white cursor-pointer ml-2">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Metrics in a Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34]">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Current MRR</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#8fd98b]" />
          </div>
          <p className="text-2xl font-black text-white mt-2">₹{totalMRR.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">↗ 14.2% vs last month</p>
        </div>

        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34]">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Annual Run Rate (ARR)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">₹{totalARR.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-purple-400 font-semibold mt-0.5">Projected annualized</p>
        </div>

        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34]">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Paying Creators</span>
            <Users className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">{activeSubscribers}</p>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">out of {members.length} members</p>
        </div>

        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34]">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>ARPU (Avg Revenue)</span>
            <Percent className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">₹{arpu}</p>
          <p className="text-[11px] text-amber-400 font-semibold mt-0.5">per paying subscriber</p>
        </div>
      </div>

      {/* Package Revenue Contribution Breakdown */}
      <div className="bg-[#1e2025] rounded-2xl border border-[#2a2d34] p-6 shadow-xs">
        <h3 className="text-xs font-bold text-white mb-4">Revenue Breakdown by Subscription Tier</h3>
        <div className="space-y-4">
          {packages.map((pkg) => {
            const revenue = pkg.priceNumber * pkg.subscribersCount;
            const percentage = totalMRR > 0 ? Math.round((revenue / totalMRR) * 100) : 0;
            return (
              <div key={pkg.id} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{pkg.name}</span>
                    <span className="text-slate-400">({pkg.subscribersCount} subscribers)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-black text-white">₹{revenue.toLocaleString('en-IN')}</span>
                    <span className="text-slate-500 font-semibold w-10 text-right">{percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-[#16171b] h-2 rounded-full overflow-hidden border border-[#2a2d34]">
                  <div 
                    className="bg-[#8fd98b] h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
