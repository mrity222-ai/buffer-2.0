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

  const currentPlanName = user?.plan || 'Free Tier';

  const handleUpgrade = (planName: string) => {
    upgradeUserPlan(planName);
    setUpgradedPlan(planName);
    setTimeout(() => {
      setUpgradedPlan(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-4xl w-full overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-[#1877F2]/90 to-slate-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Unlock Publishing Power</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight">
            Upgrade Your Social Publisher Plan
          </h2>
          <p className="mt-1.5 text-xs md:text-sm text-slate-200 font-medium max-w-xl">
            {reason || 'Connect more Facebook Pages & Instagram accounts, publish unlimited 9:16 Reels in 1080p HQ, and scale your audience.'}
          </p>

          {/* Current Plan Pill */}
          <div className="mt-4 inline-flex items-center space-x-2 bg-white/15 px-3 py-1.5 rounded-full text-xs font-bold border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Current Plan: <span className="underline decoration-white/40">{currentPlanName}</span></span>
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
                      ? 'border-[#1877F2] ring-2 ring-[#1877F2]/20 bg-[#E7F3FF]/20 shadow-md'
                      : isCurrent
                      ? 'border-emerald-500 bg-emerald-50/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1877F2] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">{pkg.name}</h4>
                      {isCurrent && (
                        <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          Active
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-baseline space-x-1">
                      <span className="text-2xl font-black text-slate-900">{pkg.price}</span>
                      <span className="text-xs text-slate-500 font-semibold">{pkg.period}</span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#1877F2]" />
                        <span>{pkg.accountLimit} Social Channels</span>
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {pkg.monthlyPostLimit}
                      </p>
                    </div>

                    <ul className="mt-4 space-y-2 text-xs text-slate-600 font-medium">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100">
                    {isCurrent ? (
                      <button
                        disabled
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center space-x-1 cursor-default"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Active Plan</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpgrade(pkg.name)}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all active:scale-98 cursor-pointer flex items-center justify-center space-x-1 shadow-xs ${
                          pkg.isPopular
                            ? 'bg-[#1877F2] hover:bg-[#166FE5] text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
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

        {/* Modal Footer / Guarantee */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-medium">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Cancel or change plans anytime · Instant activation · GST invoice available</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Keep current plan
          </button>
        </div>
      </div>
    </div>
  );
}
