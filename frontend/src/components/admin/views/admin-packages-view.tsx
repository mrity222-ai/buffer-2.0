'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Sparkles, 
  Check, 
  Trash2, 
  Users, 
  TrendingUp, 
  Zap, 
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface AdminPackagesViewProps {
  onOpenCreatePackage: () => void;
}

export function AdminPackagesView({ onOpenCreatePackage }: AdminPackagesViewProps) {
  const { packages, deletePackage } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'packages' | 'discounts' | 'logs'>('packages');

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans text-white">
      {/* Top Header Bar matching Buffer Views */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26282f] pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1e2025] flex items-center justify-center text-slate-300">
            <CreditCard className="w-5 h-5 text-slate-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Packages & Pricing</h1>
            <p className="text-xs text-slate-400 font-medium">
              Create and manage subscription tiers visible across creator upgrade flows
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCreatePackage}
          className="px-4 py-2 bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-all active:scale-98 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5 text-[#101114] stroke-[3]" />
          <span>New Package</span>
        </button>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center space-x-6 border-b border-[#26282f] text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('packages')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
            activeSubTab === 'packages'
              ? 'text-white border-[#8fd98b] font-bold'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          <span>All Packages</span>
          <span className="text-[11px] font-bold bg-[#26282f] text-slate-300 px-1.5 py-0.2 rounded">
            {packages.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('discounts')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
            activeSubTab === 'discounts'
              ? 'text-white border-[#8fd98b] font-bold'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          <span>Promo Codes & Discounts</span>
          <span className="text-[10px] text-amber-400">⚡</span>
        </button>

        <button
          onClick={() => setActiveSubTab('logs')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
            activeSubTab === 'logs'
              ? 'text-white border-[#8fd98b] font-bold'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          <span>Subscription Logs</span>
        </button>
      </div>

      {/* Live Sync Banner */}
      <div className="p-3.5 bg-[#162018] border border-[#27452d] rounded-2xl flex items-center justify-between text-xs text-emerald-300">
        <div className="flex items-center space-x-2.5">
          <Sparkles className="w-4 h-4 text-[#8fd98b] shrink-0" />
          <span>
            <strong>Real-Time Sync Active:</strong> All package updates made here automatically propagate to Creator Dashboards and the In-App Upgrade Modal.
          </span>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const mrrGenerated = pkg.priceNumber * pkg.subscribersCount;
          return (
            <div
              key={pkg.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all relative ${
                pkg.isPopular
                  ? 'border-[#8fd98b] ring-1 ring-[#8fd98b] bg-[#1a281e]/30 shadow-md'
                  : 'border-[#2a2d34] bg-[#1e2025] hover:border-[#363942]'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-6 bg-[#8fd98b] text-[#101114] text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{pkg.name}</h3>
                  <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{pkg.subscribersCount} Users</span>
                  </span>
                </div>

                <div className="mt-4 flex items-baseline space-x-1">
                  <span className="text-3xl font-black text-white">{pkg.price}</span>
                  <span className="text-xs text-slate-400 font-semibold">{pkg.period}</span>
                </div>

                {/* MRR pill */}
                <div className="mt-2 text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Generates ₹{mrrGenerated.toLocaleString('en-IN')}/mo</span>
                </div>

                <div className="border-t border-[#2a2d34] my-4" />

                <div className="space-y-1.5 text-xs text-slate-300">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#8fd98b]" />
                    <span>{pkg.accountLimit} Social Channels</span>
                  </p>
                  <p className="text-[11px] text-slate-400">{pkg.monthlyPostLimit}</p>
                </div>

                <ul className="mt-4 space-y-2 text-xs text-slate-300">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Package Actions */}
              <div className="mt-6 pt-4 border-t border-[#2a2d34] flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-medium">ID: {pkg.id}</span>
                {pkg.id !== 'plan-free' && (
                  <button
                    onClick={() => {
                      if (confirm(`Delete package "${pkg.name}"?`)) {
                        deletePackage(pkg.id);
                      }
                    }}
                    className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                    title="Delete Package"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
