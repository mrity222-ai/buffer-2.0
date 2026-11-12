'use client';

import React, { useState } from 'react';
import { 
  Key, 
  CreditCard, 
  Check, 
  User, 
  Server, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export function SettingsView() {
  const [metaAppId, setMetaAppId] = useState('194820491823910');
  const [metaAppSecret, setMetaAppSecret] = useState('••••••••••••••••••••••••');
  const [currentPlan, setCurrentPlan] = useState('Starter');

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: 'forever',
      channels: '2 Accounts',
      posts: '10 posts/month',
      isPopular: false,
    },
    {
      name: 'Starter',
      price: '₹199',
      period: '/month',
      channels: '5 Accounts',
      posts: 'Unlimited posts',
      isPopular: true,
    },
    {
      name: 'Pro',
      price: '₹499',
      period: '/month',
      channels: '15 Accounts',
      posts: 'Unlimited + priority queue',
      isPopular: false,
    },
    {
      name: 'Agency',
      price: '₹999',
      period: '/month',
      channels: '30 Accounts',
      posts: 'Unlimited + dedicated workers',
      isPopular: false,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* SaaS Subscription Plans */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">SaaS Subscription & Pricing</h3>
            <p className="text-xs text-slate-500">
              Pick the right tier for your creator workflow or marketing agency
            </p>
          </div>
          <span className="text-xs bg-purple-100 text-purple-700 font-bold px-2.5 py-1 rounded-full">
            Current: {currentPlan} Tier
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {plans.map((p) => {
            const isCurrent = currentPlan === p.name;
            return (
              <div
                key={p.name}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                  p.isPopular
                    ? 'border-purple-600 ring-2 ring-purple-600/10 bg-purple-50/20'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  {p.isPopular && (
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-purple-600 text-white px-2 py-0.5 rounded-full inline-block mb-2">
                      Most Popular
                    </span>
                  )}
                  <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                  <div className="mt-2 flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-slate-900">{p.price}</span>
                    <span className="text-xs text-slate-400">{p.period}</span>
                  </div>

                  <ul className="mt-4 space-y-2 text-xs text-slate-600">
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{p.channels}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{p.posts}</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>FB Pages + IG Biz</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setCurrentPlan(p.name)}
                  className={`mt-5 w-full py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-slate-100 text-slate-700 cursor-default'
                      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs'
                  }`}
                >
                  {isCurrent ? 'Active Plan' : 'Select Plan'}
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
