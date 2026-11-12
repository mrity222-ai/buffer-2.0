'use client';

import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle, 
  UserCheck, 
  UserX,
  Sparkles,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';
import { AdminUser, PlanMetric } from '@/types';

const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Avedan Sharma',
    email: 'avedan@growthpulse.in',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    plan: 'agency',
    status: 'active',
    connectedChannelsCount: 18,
    monthlyPostsUsed: 142,
    joinedDate: '12 Jan 2026',
    lastActive: 'Just now',
  },
  {
    id: 'usr-2',
    name: 'Pooja Verma',
    email: 'pooja@creatorstudio.com',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    plan: 'pro',
    status: 'active',
    connectedChannelsCount: 12,
    monthlyPostsUsed: 89,
    joinedDate: '24 Jan 2026',
    lastActive: '2 hours ago',
  },
  {
    id: 'usr-3',
    name: 'Rahul Khanna',
    email: 'rahul@techbuzz.io',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    plan: 'starter',
    status: 'active',
    connectedChannelsCount: 4,
    monthlyPostsUsed: 28,
    joinedDate: '02 Feb 2026',
    lastActive: 'Yesterday',
  },
  {
    id: 'usr-4',
    name: 'Sneha Kapur',
    email: 'sneha@fashiondaily.co',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    plan: 'starter',
    status: 'active',
    connectedChannelsCount: 5,
    monthlyPostsUsed: 44,
    joinedDate: '15 Feb 2026',
    lastActive: '3 days ago',
  },
  {
    id: 'usr-5',
    name: 'Vikram Singh',
    email: 'vikram@fitnessfirst.org',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    plan: 'free',
    status: 'trial',
    connectedChannelsCount: 2,
    monthlyPostsUsed: 9,
    joinedDate: '10 Nov 2026',
    lastActive: 'Today',
  },
  {
    id: 'usr-6',
    name: 'Arjun Mehta',
    email: 'arjun@digitalmarketing.biz',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    plan: 'agency',
    status: 'suspended',
    connectedChannelsCount: 24,
    monthlyPostsUsed: 210,
    joinedDate: '08 Mar 2026',
    lastActive: '1 week ago',
  },
];

const PLAN_METRICS: PlanMetric[] = [
  {
    name: 'Free Tier',
    price: '₹0',
    subscribersCount: 482,
    monthlyRevenue: 0,
    features: ['2 Channels', '10 posts/month', 'Basic Analytics'],
  },
  {
    name: 'Starter Plan',
    price: '₹199/mo',
    subscribersCount: 210,
    monthlyRevenue: 41790,
    features: ['5 Channels', 'Unlimited Posts', 'Reels Auto-Size', 'Queue Scheduling'],
  },
  {
    name: 'Pro Plan',
    price: '₹499/mo',
    subscribersCount: 114,
    monthlyRevenue: 56886,
    features: ['15 Channels', 'Unlimited Posts', 'High-Quality 1080p', 'Priority Dispatch'],
  },
  {
    name: 'Agency Plan',
    price: '₹999/mo',
    subscribersCount: 48,
    monthlyRevenue: 47952,
    features: ['30 Channels', 'Dedicated Celery Workers', 'White-labeling', 'VIP Support'],
  },
];

export function AdminView() {
  const [users, setUsers] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState<string>('all');

  const totalMRR = PLAN_METRICS.reduce((acc, p) => acc + p.monthlyRevenue, 0);
  const totalSubscribers = PLAN_METRICS.reduce((acc, p) => acc + p.subscribersCount, 0);

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'active' ? 'suspended' : 'active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === 'all' || u.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Admin Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              🛡️
            </span>
            <h2 className="text-base font-bold text-slate-900">
              SaaS Admin & User Management Panel
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Monitor registered creators, manage subscription plans, review publishing revenue and system health.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Meta API & Workers Operational</span>
          </span>
        </div>
      </div>

      {/* Revenue & Subscription Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Monthly Recurring Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-1">₹{totalMRR.toLocaleString()}</h3>
          <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" />
            +18.4% from last month
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Total Paying Users</span>
            <Users className="w-4 h-4 text-[#1877F2]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-1">{totalSubscribers.toLocaleString()}</h3>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Across 4 subscription tiers
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Posts & Reels Dispatched</span>
            <CheckCircle2 className="w-4 h-4 text-[#1877F2]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mt-1">14,892</h3>
          <p className="text-[11px] text-[#1877F2] font-bold mt-1">99.4% Meta API success rate</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Active Celery Workers</span>
            <ShieldCheck className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-2xl font-black text-purple-600 mt-1">4 Nodes</h3>
          <p className="text-[11px] text-slate-500 font-medium mt-1">0 Queue Backlog</p>
        </div>
      </div>

      {/* Subscription Plans Breakdown Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-1">
          Subscription Plans & Tier Metrics
        </h3>
        <p className="text-xs text-slate-500 mb-4 font-medium">
          Manage your user quotas, pricing, and active subscription distribution
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLAN_METRICS.map((plan) => (
            <div
              key={plan.name}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{plan.name}</h4>
                  <span className="text-[10px] font-bold bg-[#E7F3FF] text-[#1877F2] px-2 py-0.5 rounded-full">
                    {plan.price}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-slate-500 font-semibold">Subscribers</p>
                  <p className="text-xl font-black text-slate-900">{plan.subscribersCount}</p>
                </div>
                <div className="mt-2 text-xs">
                  <p className="text-[11px] text-slate-500 font-medium">Revenue/mo:</p>
                  <p className="font-bold text-emerald-600">₹{plan.monthlyRevenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500 space-y-1 font-medium">
                {plan.features.map((feat) => (
                  <p key={feat}>✓ {feat}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registered Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Filter Bar */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search user by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2]"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-bold shrink-0">Filter Plan:</span>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="text-xs font-semibold p-2 rounded-xl border border-slate-200 bg-white focus:outline-none"
            >
              <option value="all">All Plans</option>
              <option value="free">Free Tier</option>
              <option value="starter">Starter Plan</option>
              <option value="pro">Pro Plan</option>
              <option value="agency">Agency Plan</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Plan</th>
                <th className="px-6 py-3.5">Connected Channels</th>
                <th className="px-6 py-3.5">Posts Used / mo</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Joined Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        user.plan === 'agency'
                          ? 'bg-purple-100 text-purple-700'
                          : user.plan === 'pro'
                          ? 'bg-[#E7F3FF] text-[#1877F2]'
                          : user.plan === 'starter'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {user.plan}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-800">
                    {user.connectedChannelsCount} Channels
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                    {user.monthlyPostsUsed} posts
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.status === 'active' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Active</span>
                      </span>
                    )}
                    {user.status === 'suspended' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span>Suspended</span>
                      </span>
                    )}
                    {user.status === 'trial' && (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span>Trial</span>
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                    {user.joinedDate}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        user.status === 'active'
                          ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      }`}
                    >
                      {user.status === 'active' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
