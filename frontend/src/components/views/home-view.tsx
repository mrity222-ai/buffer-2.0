'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  MessageSquare, 
  ChevronUp, 
  ChevronDown, 
  HelpCircle, 
  Plus, 
  CheckCircle2, 
  Info, 
  Sparkles,
  ArrowRight,
  Share2
} from 'lucide-react';
import { BufferPlantIcon } from '@/components/buffer-logo';
import { useAuth } from '@/lib/auth-context';

interface HomeViewProps {
  onOpenComposer: () => void;
  onOpenConnectModal: () => void;
  onNavigateTab: (tab: string) => void;
}

export function HomeView({
  onOpenComposer,
  onOpenConnectModal,
  onNavigateTab,
}: HomeViewProps) {
  const { user } = useAuth();
  const [isChecklistCollapsed, setIsChecklistCollapsed] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  const displayName = user?.name || user?.email?.split('@')[0] || 'info.avedatechnologies';
  const currentDate = 'Sun, Nov 15 2026';

  const steps = [
    {
      id: 1,
      title: 'Connect a channel',
      desc: 'Pick where you post first, like Instagram or LinkedIn. Maeaco ploit publishes there for you.',
      actionText: 'Select Channel',
      action: onOpenConnectModal,
    },
    {
      id: 2,
      title: 'Create your first post',
      desc: 'Draft your message, add 9:16 vertical video reels, and schedule to your queue.',
      actionText: 'Create Post',
      action: onOpenComposer,
    },
    {
      id: 3,
      title: 'Reply to your first comment',
      desc: 'Manage your Facebook, Instagram, and LinkedIn social conversations in one inbox.',
      actionText: 'Open Community Inbox',
      action: () => onNavigateTab('community'),
    },
    {
      id: 4,
      title: 'Explore Insights',
      desc: 'Analyze reach, impressions, engagement rates, and see which posts perform best.',
      actionText: 'View Insights',
      action: () => onNavigateTab('insights'),
    },
  ];

  const currentStepData = steps.find((s) => s.id === activeStep) || steps[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans text-white">
      {/* Greeting Banner matching Image 2 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#1e2025] border border-[#2a2d34] flex items-center justify-center text-xl shadow-xs">
            👋
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Good Afternoon, {displayName}!
            </h1>
            <p className="text-xs text-slate-400 font-medium">{currentDate}</p>
          </div>
        </div>
      </div>

      {/* "Get Started with Buffer" Checklist Card matching Image 2 */}
      <div className="bg-[#1e2025] rounded-2xl border border-[#2a2d34] overflow-hidden shadow-xs">
        {/* Card Header */}
        <div className="p-4 px-6 border-b border-[#2a2d34] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">⚑</span>
            <h2 className="text-sm font-bold text-white">Get Started with Maeaco ploit</h2>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-slate-400 font-semibold">0/4 completed</span>
            <button
              onClick={() => setIsChecklistCollapsed(!isChecklistCollapsed)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              {isChecklistCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Collapsible Content */}
        {!isChecklistCollapsed && (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Steps List */}
            <div className="lg:col-span-5 space-y-2">
              {steps.map((step) => {
                const isActive = activeStep === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#26282f] text-white font-bold border border-[#363942]'
                        : 'text-slate-400 hover:text-white hover:bg-[#26282f]/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isActive ? 'border-[#8fd98b]' : 'border-slate-500'
                      }`}>
                        {isActive && <div className="w-2 h-2 rounded-full bg-[#8fd98b]" />}
                      </div>
                      <span>{step.title}</span>
                    </div>
                    <span className="text-slate-500 font-bold">&gt;</span>
                  </button>
                );
              })}
            </div>

            {/* Right Preview Box matching Image 2 */}
            <div className="lg:col-span-7 bg-[#16171b] rounded-2xl p-6 border border-[#2a2d34] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-sm">
                <h3 className="text-base font-bold text-white">
                  {currentStepData.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {currentStepData.desc}
                </p>
                <button
                  onClick={currentStepData.action}
                  className="bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold py-2.5 px-5 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer flex items-center space-x-1.5"
                >
                  <span>{currentStepData.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Illustration with Floating Avatars & Channels matching Image 2 */}
              <div className="relative w-36 h-28 flex items-center justify-center shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-[#1e2025] border border-[#2a2d34] p-3 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center space-x-2">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60" 
                      alt="Avatar"
                      className="w-7 h-7 rounded-full object-cover" 
                    />
                    <div className="w-4 h-4 rounded-full bg-[#0077b5] flex items-center justify-center text-[7px] text-white font-bold">
                      in
                    </div>
                  </div>
                  <div className="w-full bg-[#2a2d34] h-1.5 rounded-full" />
                  <div className="w-2/3 bg-[#2a2d34] h-1.5 rounded-full" />
                </div>

                {/* Floating Facebook Badge */}
                <div className="absolute -bottom-1 -left-2 w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-xs font-bold border-2 border-[#16171b] shadow-md">
                  f
                </div>

                {/* Floating Checkmark Badge */}
                <div className="absolute top-2 -right-2 w-6 h-6 rounded-full bg-[#8fd98b] text-[#101114] flex items-center justify-center text-xs font-bold border-2 border-[#16171b] shadow-md">
                  ✓
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3 Stat Counters in a Row matching Image 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Week Streak */}
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-[#26282f] flex items-center justify-center text-[#8fd98b]">
            <BufferPlantIcon className="w-5 h-5 text-[#8fd98b]" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">0</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
              <span>Week Streak</span>
              <span className="text-[10px] text-slate-500">ⓘ</span>
            </p>
          </div>
        </div>

        {/* Card 2: Posting Goal */}
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-[#26282f] flex items-center justify-center text-amber-400">
            <Calendar className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">0%</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
              <span>Posting Goal</span>
              <span className="text-[10px] text-slate-500">ⓘ</span>
            </p>
          </div>
        </div>

        {/* Card 3: Comment Score */}
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34] flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-[#26282f] flex items-center justify-center text-purple-400">
            <MessageSquare className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black text-white">0%</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold flex items-center gap-1 mt-0.5">
              <span>Comment Score</span>
              <span className="text-[10px] text-slate-500">ⓘ</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Grid: "Up Next" Calendar Feed & "Comments" matching Image 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* "Up Next" Card */}
        <div className="bg-[#1e2025] rounded-2xl border border-[#2a2d34] p-5">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-bold text-white">Up Next</h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Sunday */}
            <div>
              <p className="text-slate-400 font-semibold mb-2">Sunday, Nov 15</p>
              <button
                onClick={onOpenComposer}
                className="w-full py-3 px-4 rounded-xl border border-dashed border-[#343842] hover:border-[#8fd98b] text-slate-400 hover:text-white flex items-center justify-center space-x-2 transition-colors cursor-pointer group"
              >
                <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-[7px] text-white font-bold">
                  ig
                </div>
                <span className="group-hover:text-[#8fd98b] font-medium">Create Post</span>
              </button>
            </div>

            {/* Monday */}
            <div>
              <p className="text-slate-400 font-semibold mb-2">Monday, Nov 16</p>
              <button
                onClick={onOpenComposer}
                className="w-full py-3 px-4 rounded-xl border border-dashed border-[#343842] hover:border-[#8fd98b] text-slate-400 hover:text-white flex items-center justify-center space-x-2 transition-colors cursor-pointer group"
              >
                <Plus className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#8fd98b]" />
                <span className="group-hover:text-[#8fd98b] font-medium">Schedule for Monday</span>
              </button>
            </div>
          </div>
        </div>

        {/* "Comments" Card */}
        <div className="bg-[#1e2025] rounded-2xl border border-[#2a2d34] p-5 flex flex-col justify-between">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-bold text-white">Comments</h3>
          </div>

          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#26282f] border border-[#343842] flex items-center justify-center text-xl mb-3">
              👤
            </div>
            <p className="text-xs text-slate-400 font-medium">No comments to show yet</p>
            <p className="text-[11px] text-slate-500 mt-1 max-w-xs">
              When viewers comment on your Facebook posts or Instagram Reels, they will appear here.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('community')}
            className="w-full py-2 bg-[#26282f] hover:bg-[#343842] text-slate-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Go to Community Inbox
          </button>
        </div>
      </div>

      {/* Floating Bottom Right Help Button matching Image 2 */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => alert('Maeaco ploit Help Center: Visit support.maeacoploit.com for documentation or reach out at hello@maeacoploit.com')}
          className="w-10 h-10 rounded-full bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] text-slate-400 hover:text-white flex items-center justify-center shadow-2xl transition-colors cursor-pointer"
          title="Help & Resources"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
