'use client';

import React, { useState } from 'react';
import { 
  BarChart2, 
  ChevronDown, 
  Plus, 
  Download, 
  TrendingUp, 
  Heart, 
  MessageSquare, 
  Eye, 
  Percent,
  Search,
  Target,
  Sparkles
} from 'lucide-react';

interface InsightsViewProps {
  onOpenConnectModal: () => void;
}

export function InsightsView({ onOpenConnectModal }: InsightsViewProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'mtd' | 'last_month' | 'custom'>('7d');

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-white">
      {/* Top Header Bar matching Image 6 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#26282f] pb-4">
        {/* Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1e2025] flex items-center justify-center text-slate-300">
            <BarChart2 className="w-5 h-5 text-slate-300" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Insights</h1>
        </div>

        {/* Date Filter Pills matching Image 6 */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {[
            { id: '7d', label: '7 Days' },
            { id: '30d', label: '30 Days' },
            { id: 'mtd', label: 'Month to Date' },
            { id: 'last_month', label: 'Last Month' },
            { id: 'custom', label: 'Custom' },
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
        </div>

        {/* Right Dropdowns: Channels, Tags, Export matching Image 6 */}
        <div className="flex items-center space-x-2 text-xs">
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] font-semibold text-slate-300 hover:text-white cursor-pointer">
            <span>Channels</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] font-semibold text-slate-300 hover:text-white cursor-pointer">
            <span>Tags</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] font-semibold text-slate-300 hover:text-white cursor-pointer">
            <Download className="w-3 h-3 text-slate-400" />
            <span>Export</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Hero Grid Banner with Floating Analytics Icons matching Image 6 */}
      <div className="relative rounded-3xl overflow-hidden border border-[#2a2d34] p-8 lg:p-14 text-center bg-gradient-to-b from-[#14231b] via-[#101914] to-[#16171b]">
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #8fd98b 1px, transparent 1px), linear-gradient(to bottom, #8fd98b 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floating Icons matching Image 6 */}
        <div className="absolute top-6 left-12 p-2 rounded-xl bg-[#1e2b22] border border-[#2d4233] text-teal-400 hidden sm:block">
          <Search className="w-4 h-4" />
        </div>
        <div className="absolute bottom-6 left-24 p-2 rounded-xl bg-[#1e2b22] border border-[#2d4233] text-purple-400 hidden sm:block">
          <BarChart2 className="w-4 h-4" />
        </div>
        <div className="absolute top-8 right-16 p-2 rounded-xl bg-[#1e2b22] border border-[#2d4233] text-rose-400 hidden sm:block">
          <Target className="w-4 h-4" />
        </div>
        <div className="absolute bottom-8 right-24 p-2 rounded-xl bg-[#1e2b22] border border-[#2d4233] text-amber-400 hidden sm:block">
          <TrendingUp className="w-4 h-4" />
        </div>

        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Turn your posts into insights 🔥
          </h2>
          <p className="mt-2 text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
            Understand your performance and spot opportunities without the guesswork.
          </p>

          <button
            onClick={onOpenConnectModal}
            className="mt-6 inline-flex items-center space-x-1.5 bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold py-2.5 px-5 rounded-xl transition-all active:scale-98 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#101114] stroke-[3]" />
            <span>Connect a Channel</span>
          </button>
        </div>
      </div>

      {/* Summary Row matching Image 6 */}
      <div>
        <h3 className="text-xs font-bold text-slate-300 mb-3">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-[#1e2025] rounded-2xl border border-[#2a2d34]">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Likes</span>
              <Heart className="w-3.5 h-3.5" />
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">0</span>
              <span className="text-[10px] text-slate-500 font-bold">—</span>
            </div>
          </div>

          <div className="p-4 bg-[#1e2025] rounded-2xl border border-[#2a2d34]">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Comments</span>
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">0</span>
              <span className="text-[10px] text-slate-500 font-bold">—</span>
            </div>
          </div>

          <div className="p-4 bg-[#1e2025] rounded-2xl border border-[#2a2d34]">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Impressions</span>
              <Eye className="w-3.5 h-3.5" />
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">0</span>
              <span className="text-[10px] text-slate-500 font-bold">—</span>
            </div>
          </div>

          <div className="p-4 bg-[#1e2025] rounded-2xl border border-[#2a2d34]">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Engagement Rate</span>
              <Percent className="w-3.5 h-3.5" />
            </div>
            <div className="mt-2 flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">0.0%</span>
              <span className="text-[10px] text-slate-500 font-bold">—</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 Posts Skeletons matching Image 6 */}
      <div>
        <h3 className="text-xs font-bold text-slate-300 mb-3">Top 5 Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-3.5 bg-[#1e2025] rounded-xl border border-[#2a2d34] space-y-2">
              <div className="w-full bg-[#26282f] h-20 rounded-lg animate-pulse" />
              <div className="w-3/4 bg-[#26282f] h-2.5 rounded" />
              <div className="w-1/2 bg-[#26282f] h-2 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Chart Skeleton matching Image 6 */}
      <div className="bg-[#1e2025] rounded-2xl border border-[#2a2d34] p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold text-slate-300">Metrics</h3>
          <div className="flex items-center space-x-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8fd98b]" />
              <span>Posts</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
              <span>Reach</span>
            </span>
          </div>
        </div>

        {/* Chart representation */}
        <div className="relative h-44 flex items-end justify-between pt-6 border-b border-[#2a2d34]">
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-500">
            <span>100</span>
            <span>80</span>
            <span>60</span>
            <span>40</span>
            <span>0</span>
          </div>

          <div className="w-full pl-8 flex items-center justify-center text-xs text-slate-500 font-medium">
            Chart data updates automatically as your scheduled posts go live.
          </div>
        </div>
      </div>
    </div>
  );
}
