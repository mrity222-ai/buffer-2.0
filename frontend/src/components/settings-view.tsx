'use client';

import React, { useState } from 'react';
import { 
  Key, 
  CreditCard, 
  Check, 
  User, 
  Server, 
  ShieldAlert,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function SettingsView() {
  const { user, packages, upgradeUserPlan } = useAuth();
  const [metaAppId, setMetaAppId] = useState('194820491823910');
  const [metaAppSecret, setMetaAppSecret] = useState('••••••••••••••••••••••••');
  const [justUpgraded, setJustUpgraded] = useState<string | null>(null);

  const currentPlan = user?.plan || 'Free Tier';

  const handleSelectPlan = (planName: string) => {
    upgradeUserPlan(planName);
    setJustUpgraded(planName);
    setTimeout(() => {
      setJustUpgraded(null);
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      {/* SaaS Subscription Plans */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">SaaS Subscription & Creator Plans</h3>
            <p className="text-xs text-slate-500 font-medium">
              Upgrade your channels, queue capacity, and 1080p high quality video limits
            </p>
          </div>
          <span className="text-xs bg-[#E7F3FF] text-[#1877F2] font-bold px-3 py-1 rounded-full">
            Current: {currentPlan}
          </span>
        </div>

        {justUpgraded && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Success! Workspace upgraded to {justUpgraded}. Your new channel limit is active.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {packages.map((p) => {
            const isCurrent = currentPlan.toLowerCase() === p.name.toLowerCase();
            return (
              <div
                key={p.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  p.isPopular
                    ? 'border-[#1877F2] ring-2 ring-[#1877F2]/10 bg-[#E7F3FF]/20 shadow-xs'
                    : isCurrent
                    ? 'border-emerald-500 bg-emerald-50/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  {p.isPopular && (
                    <span className="text-[9px] font-black uppercase tracking-wider bg-[#1877F2] text-white px-2 py-0.5 rounded-full inline-block mb-2">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                    {isCurrent && (
                      <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-slate-900">{p.price}</span>
                    <span className="text-xs text-slate-400 font-semibold">{p.period}</span>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center space-x-2">
                      <Zap className="w-3.5 h-3.5 text-[#1877F2] shrink-0" />
                      <span>{p.accountLimit} Channels</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{p.monthlyPostLimit}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>FB Pages + IG Biz</span>
                    </li>
                  </ul>
                </div>

                <button
                  disabled={isCurrent}
                  onClick={() => handleSelectPlan(p.name)}
                  className={`mt-5 w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                      : p.isPopular
                      ? 'bg-[#1877F2] hover:bg-[#166FE5] text-white shadow-xs active:scale-98'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs active:scale-98'
                  }`}
                >
                  {isCurrent ? 'Active Plan' : `Upgrade to ${p.name.split(' ')[0]}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Meta Developer App Credentials */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Meta Developer Configuration</h3>
            <p className="text-xs text-slate-500">
              Graph API credentials configured for OAuth token exchange & Webhooks
            </p>
          </div>
        </div>

        <div className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Meta App ID
            </label>
            <input
              type="text"
              value={metaAppId}
              onChange={(e) => setMetaAppId(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Meta App Secret
            </label>
            <input
              type="password"
              value={metaAppSecret}
              onChange={(e) => setMetaAppSecret(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-mono"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => alert('Meta App credentials saved!')}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
            >
              Save Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
