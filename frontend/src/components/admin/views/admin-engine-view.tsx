'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Server, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Send, 
  RotateCcw,
  Zap
} from 'lucide-react';

export function AdminEngineView() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [retriedId, setRetriedId] = useState<string | null>(null);

  const [jobs, setJobs] = useState([
    { id: 'job-101', target: 'Avedan Tech Page', platform: 'facebook_page', type: 'Reel 9:16 (1080p)', duration: '15s', status: 'completed', timestamp: '2 mins ago' },
    { id: 'job-102', target: 'Creator Studio Pro', platform: 'instagram_business', type: 'Reel 9:16 (1080p)', duration: '28s', status: 'completed', timestamp: '5 mins ago' },
    { id: 'job-103', target: 'Tech Buzz Daily', platform: 'facebook_page', type: 'Feed Video (4:5)', duration: '45s', status: 'completed', timestamp: '12 mins ago' },
    { id: 'job-104', target: 'Urban Vibes Agency', platform: 'instagram_business', type: 'Reel 9:16', duration: '12s', status: 'failed', error: 'OAuthException: Page token temporarily expired', timestamp: '24 mins ago' },
  ]);

  const handleRetryJob = (id: string) => {
    setRetriedId(id);
    setTimeout(() => {
      setJobs(jobs.map(j => j.id === id ? { ...j, status: 'completed', error: undefined } : j));
      setRetriedId(null);
    }, 1000);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans text-white">
      {/* Top Header Bar matching Buffer Views */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26282f] pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1e2025] flex items-center justify-center text-slate-300">
            <Cpu className="w-5 h-5 text-slate-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Publishing Engine</h1>
            <p className="text-xs text-slate-400 font-medium">
              Celery multi-destination queue, Redis message broker, and Meta Graph API quota
            </p>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          className="px-3.5 py-1.5 bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] text-xs font-bold text-slate-300 hover:text-white rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Infrastructure Health Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Celery */}
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Celery Workers</span>
            <span className="w-2 h-2 rounded-full bg-[#8fd98b] animate-pulse" />
          </div>
          <p className="text-2xl font-black text-white mt-2">4 Workers</p>
          <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Concurrency: 8 tasks/worker</p>
        </div>

        {/* Redis */}
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Redis 7 Broker</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">Connected</p>
          <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Latency: 0.4ms</p>
        </div>

        {/* Meta Quota */}
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Meta Graph API</span>
            <span className="text-xs text-slate-400">28/200</span>
          </div>
          <p className="text-2xl font-black text-white mt-2">14% Quota</p>
          <div className="mt-2 w-full bg-[#2a2d34] rounded-full h-1 overflow-hidden">
            <div className="bg-[#8fd98b] h-1 rounded-full w-[14%]" />
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-[#1e2025] p-5 rounded-2xl border border-[#2a2d34]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Delivery Rate</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">99.4%</p>
          <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Zero dropped frames</p>
        </div>
      </div>

      {/* Task Queue Pipeline & Retry Engine */}
      <div className="bg-[#1e2025] rounded-2xl border border-[#2a2d34] p-6 shadow-xs">
        <h3 className="text-xs font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#8fd98b]" />
          <span>Celery Task Dispatch Log & 2-Step Container Pipeline</span>
        </h3>

        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-3.5 bg-[#16171b] hover:bg-[#252830] rounded-xl border border-[#26282f] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${
                  job.platform === 'facebook_page' ? 'bg-[#1877F2]' : 'bg-gradient-to-tr from-amber-500 to-rose-600'
                }`}>
                  {job.platform === 'facebook_page' ? 'f' : 'ig'}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-bold text-white">{job.target}</p>
                    <span className="text-[10px] font-semibold text-slate-400 bg-[#1e2025] px-1.5 py-0.2 rounded border border-[#2a2d34]">
                      {job.type}
                    </span>
                  </div>
                  {job.error ? (
                    <p className="text-[11px] text-red-400 font-medium mt-0.5">Error: {job.error}</p>
                  ) : (
                    <p className="text-[11px] text-slate-400 mt-0.5">Processed in {job.duration} • {job.timestamp}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end md:self-center">
                <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold ${
                  job.status === 'completed'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : 'bg-red-950 text-red-400 border border-red-800'
                }`}>
                  {job.status === 'completed' ? '✓ Dispatched' : 'Failed'}
                </span>

                {job.status === 'failed' && (
                  <button
                    onClick={() => handleRetryJob(job.id)}
                    disabled={retriedId === job.id}
                    className="px-3 py-1 bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-[11px] font-bold rounded-lg flex items-center space-x-1 cursor-pointer"
                  >
                    <RotateCcw className={`w-3 h-3 ${retriedId === job.id ? 'animate-spin' : ''}`} />
                    <span>{retriedId === job.id ? 'Retrying...' : 'Retry Dispatch'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
