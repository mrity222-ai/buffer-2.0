'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Key, 
  ShieldCheck, 
  Check, 
  Server, 
  Lock, 
  Eye, 
  EyeOff 
} from 'lucide-react';

export function AdminSettingsView() {
  const [appId, setAppId] = useState('194820491823910');
  const [appSecret, setAppSecret] = useState('8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d');
  const [webhookToken, setWebhookToken] = useState('maeaco_meta_verify_secret_2026');
  const [celeryConcurrency, setCeleryConcurrency] = useState('8');
  const [showSecret, setShowSecret] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans text-white">
      {/* Top Header Bar matching Buffer Views */}
      <div className="flex items-center justify-between border-b border-[#26282f] pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1e2025] flex items-center justify-center text-slate-300">
            <Settings className="w-5 h-5 text-slate-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Platform Configuration</h1>
            <p className="text-xs text-slate-400 font-medium">
              Manage Meta Graph API developer app, webhook tokens, and worker concurrency
            </p>
          </div>
        </div>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-bold flex items-center space-x-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Configuration saved and synced with Celery background workers!</span>
        </div>
      )}

      {/* Meta Developer App Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-[#1e2025] rounded-2xl border border-[#2a2d34] p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#2a2d34]">
            <Key className="w-4 h-4 text-[#8fd98b]" />
            <h3 className="text-xs font-bold text-white">Meta Developer App Credentials (OAuth & Graph API)</h3>
          </div>

          <div className="space-y-4 text-xs max-w-lg">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Meta App ID</label>
              <input
                type="text"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white font-mono focus:outline-none focus:border-[#8fd98b]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Meta App Secret</label>
              <div className="relative">
                <input
                  type={showSecret ? 'text' : 'password'}
                  value={appSecret}
                  onChange={(e) => setAppSecret(e.target.value)}
                  className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 pr-10 text-white font-mono focus:outline-none focus:border-[#8fd98b]"
                />
                <button
                  type="button"
                  onClick={() => setShowSecret(!showSecret)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Webhook Verify Token</label>
              <input
                type="text"
                value={webhookToken}
                onChange={(e) => setWebhookToken(e.target.value)}
                className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white font-mono focus:outline-none focus:border-[#8fd98b]"
              />
            </div>
          </div>
        </div>

        {/* Worker Concurrency */}
        <div className="bg-[#1e2025] rounded-2xl border border-[#2a2d34] p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#2a2d34]">
            <Server className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-white">Celery Worker Architecture</h3>
          </div>

          <div className="space-y-4 text-xs max-w-lg">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Max Tasks Per Worker Concurrency</label>
              <select
                value={celeryConcurrency}
                onChange={(e) => setCeleryConcurrency(e.target.value)}
                className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white focus:outline-none cursor-pointer"
              >
                <option value="4">4 Tasks Concurrent (Light)</option>
                <option value="8">8 Tasks Concurrent (Recommended)</option>
                <option value="16">16 Tasks Concurrent (High Throughput)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
