'use client';

import React, { useState } from 'react';
import { X, Check, Sparkles, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
}

export function UpgradeModal({ isOpen, onClose, reason }: UpgradeModalProps) {
  const { user, packages, upgradeUserPlan } = useAuth();
  const [upgradedPlan, setUpgradedPlan] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentPlanName = user?.plan || 'Free Plan';

  const handleUpgrade = (planName: string) => {
    upgradeUserPlan(planName);
    setUpgradedPlan(planName);
    setTimeout(() => {
      setUpgradedPlan(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-sans text-white animate-in fade-in duration-200">
      <div className="bg-[#1e2025] rounded-3xl shadow-2xl border border-[#2a2d34] max-w-4xl w-full overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-[#16171b] via-[#1a281e] to-[#16171b] text-white relative border-b border-[#2a2d34]">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-[#8fd98b] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-[#8fd98b]" />
            <span>Unlock Publishing Power</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            Upgrade Your Buffer Workspace
          </h2>
          <p className="mt-1.5 text-xs md:text-sm text-slate-300 font-medium max-w-xl leading-relaxed">
            {reason || 'Connect more Facebook Pages & Instagram accounts, publish unlimited 9:16 Reels in 1080p HQ, and scale your audience.'}
          </p>

          {/* Current Plan Pill */}
          <div className="mt-4 inline-flex items-center space-x-2 bg-[#26282f] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#343842]">
            <span className="w-2 h-2 rounded-full bg-[#8fd98b] animate-pulse" />
            <span>Current Plan: <span className="text-[#8fd98b]">{currentPlanName}</span></span>
          </div>
        </div>

        {/* Upgraded Success Banner */}
        {upgradedPlan && (
          <div className="bg-emerald-600 text-white py-2.5 px-6 text-center text-xs font-bold animate-in slide-in-from-top flex items-center justify-center space-x-2">
            <Check className="w-4 h-4" />
            <span>Successfully upgraded to {upgradedPlan}! Your channel limits are now updated.</span>
          </div>
        )}

        {/* Packages Grid */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((pkg) => {
              const isCurrent = currentPlanName.toLowerCase() === pkg.name.toLowerCase();
              return (
                <div
                  key={pkg.id}
                  className={`rounded-2xl p-5 border flex flex-col justify-between transition-all relative ${
                    pkg.isPopular
                      ? 'border-[#8fd98b] ring-1 ring-[#8fd98b] bg-[#1a281e]/30 shadow-md'
                      : isCurrent
                      ? 'border-emerald-500 bg-emerald-950/20'
                      : 'border-[#2a2d34] bg-[#16171b] hover:border-[#363942]'
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8fd98b] text-[#101114] text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{pkg.name}</h4>
                      {isCurrent && (
                        <span className="text-[9px] font-bold bg-[#14261b] text-[#8fd98b] border border-[#8fd98b]/30 px-2 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-baseline space-x-1">
                      <span className="text-2xl font-black text-white">{pkg.price}</span>
                      <span className="text-xs text-slate-400 font-semibold">{pkg.period}</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#26282f]">
                      <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#8fd98b]" />
                        <span>{pkg.accountLimit} Social Channels</span>
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {pkg.monthlyPostLimit}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs text-slate-300 font-medium">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#26282f]">
                    {isCurrent ? (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#1e2025] text-slate-400 border border-[#2a2d34] flex items-center justify-center space-x-1 cursor-default"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Active Plan</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpgrade(pkg.name)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-1 shadow-xs ${
                          pkg.isPopular
                            ? 'bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114]'
                            : 'bg-white hover:bg-slate-100 text-[#101114]'
                        }`}
                      >
                        <span>Upgrade to {pkg.name.split(' ')[0]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#16171b] border-t border-[#2a2d34] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#8fd98b]" />
            <span>Cancel or change plans anytime · Instant activation · GST invoice available</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
          >
            Keep current plan
          </button>
        </div>
      </div>
    </div>
  );
}
