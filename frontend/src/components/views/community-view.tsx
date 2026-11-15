'use client';

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Bookmark, 
  ListFilter, 
  ChevronDown, 
  Share2, 
  Sparkles,
  Inbox
} from 'lucide-react';

interface CommunityViewProps {
  onOpenConnectModal: () => void;
}

export function CommunityView({ onOpenConnectModal }: CommunityViewProps) {
  const [subTab, setSubTab] = useState<'comments' | 'mentions'>('comments');
  const [viewMode, setViewMode] = useState<'bypost' | 'list'>('bypost');

  const supportedChannels = [
    { name: 'Threads', icon: '@', bg: 'bg-black border border-[#2a2d34]' },
    { name: 'Facebook', icon: 'f', bg: 'bg-[#1877F2]' },
    { name: 'Instagram', icon: 'ig', bg: 'bg-gradient-to-tr from-amber-500 to-rose-600' },
    { name: 'LinkedIn', icon: 'in', bg: 'bg-[#0077b5]' },
    { name: 'Google Business', icon: '🏪', bg: 'bg-[#1e2025] border border-[#2a2d34]' },
    { name: 'Mastodon', icon: 'M', bg: 'bg-[#6364ff]' },
    { name: 'TikTok', icon: '♪', bg: 'bg-black border border-[#2a2d34]' },
    { name: 'YouTube', icon: '▶', bg: 'bg-[#ff0000]' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-white">
      {/* Top Header Bar matching Image 5 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26282f] pb-4">
        {/* Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1e2025] flex items-center justify-center text-slate-300">
            <MessageSquare className="w-5 h-5 text-slate-300" />
          </div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Community</h1>
            <Bookmark className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Right Controls: By post / List, Channels dropdown, All dropdown matching Image 5 */}
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center p-0.5 rounded-lg bg-[#1e2025] border border-[#2a2d34]">
            <button
              onClick={() => setViewMode('bypost')}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer ${
                viewMode === 'bypost'
                  ? 'bg-[#2a2d34] text-[#8fd98b]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              By post
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#2a2d34] text-[#8fd98b]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              List
            </button>
          </div>

          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] font-semibold text-slate-300 hover:text-white cursor-pointer">
            <span>Channels</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] font-semibold text-slate-300 hover:text-white cursor-pointer">
            <span>All</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Sub-Tabs: Comments / Mentions matching Image 5 */}
      <div className="flex items-center space-x-6 border-b border-[#26282f] text-xs font-semibold">
        <button
          onClick={() => setSubTab('comments')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 ${
            subTab === 'comments'
              ? 'text-white border-[#8fd98b] font-bold'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          Comments
        </button>
        <button
          onClick={() => setSubTab('mentions')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 ${
            subTab === 'mentions'
              ? 'text-white border-[#8fd98b] font-bold'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          Mentions
        </button>
      </div>

      {/* Split Screen Layout matching Image 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left Column: Posts List */}
        <div className="lg:col-span-4 bg-[#16171b] rounded-2xl border border-[#26282f] p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#26282f]">
            <span className="text-xs font-bold text-white">Posts</span>
            <div className="flex items-center space-x-1 text-slate-400">
              <span className="text-xs">⊞</span>
              <span className="text-xs">☰</span>
            </div>
          </div>

          <div className="py-20 text-center text-xs text-slate-400">
            <p>Your posts will appear here</p>
          </div>

          <div className="text-[11px] text-slate-500 text-center">
            Posts with new comments are pinned to the top.
          </div>
        </div>

        {/* Right Column: Community Hero & Channels Grid matching Image 5 */}
        <div className="lg:col-span-8 bg-[#16171b] rounded-2xl border border-[#26282f] p-8 lg:p-12 flex flex-col items-center justify-center text-center">
          {/* Chat bubbles illustration */}
          <div className="relative w-48 h-20 mb-6 flex items-center justify-center">
            <div className="absolute top-0 bg-white text-slate-900 rounded-xl px-4 py-2 text-xs font-bold shadow-md flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span>Great video! Love the insights.</span>
            </div>
            <div className="absolute bottom-0 right-4 bg-white/90 text-slate-900 rounded-xl px-3 py-1.5 text-[11px] font-medium shadow-md">
              Thanks! More coming next week 🔥
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-bold text-white max-w-md">
            Reply to all your social media comments in one place ✨
          </h2>
          <p className="mt-2 text-xs text-slate-400 max-w-lg leading-relaxed">
            Stop juggling tabs and apps. Manage every conversation from a single, distraction-free inbox.
          </p>

          {/* Supported Channels Box matching Image 5 */}
          <div className="mt-8 bg-[#1e2025] rounded-2xl p-6 border border-[#2a2d34] max-w-xl w-full">
            <p className="text-xs text-slate-400 font-medium mb-4">
              Connect one of the supported channels to start interacting with your audience.
            </p>

            <div className="grid grid-cols-4 gap-4">
              {supportedChannels.map((ch, idx) => (
                <button
                  key={idx}
                  onClick={onOpenConnectModal}
                  className="flex flex-col items-center space-y-1.5 group cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-full ${ch.bg} flex items-center justify-center text-xs font-bold text-white group-hover:scale-110 transition-transform shadow-xs`}>
                    {ch.icon}
                  </div>
                  <span className="text-[11px] text-slate-300 group-hover:text-white font-medium">
                    {ch.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
