'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Users, 
  CreditCard, 
  Plus, 
  Search, 
  TrendingUp, 
  LogOut, 
  Check, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  ArrowUpRight,
  ExternalLink,
  Layers,
  X,
  Filter
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { 
    admin, 
    logoutAdmin, 
    packages, 
    members, 
    createPackage, 
    deletePackage, 
    toggleMemberStatus 
  } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [isCreatePackageOpen, setIsCreatePackageOpen] = useState(false);

  // New package form state
  const [newPlanName, setNewPlanName] = useState('');
  const [newPlanPrice, setNewPlanPrice] = useState('₹299');
  const [newPlanPriceNum, setNewPlanPriceNum] = useState(299);
  const [newPlanPeriod, setNewPlanPeriod] = useState('/month');
  const [newPlanChannels, setNewPlanChannels] = useState(8);
  const [newPlanPosts, setNewPlanPosts] = useState('Unlimited');
  const [newPlanFeatures, setNewPlanFeatures] = useState<string[]>([
    'Reels 9:16 Auto-Detect',
    '1080p High Quality Mode',
    'Queue Scheduling',
  ]);
  const [newPlanIsPopular, setNewPlanIsPopular] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanName) return;

    createPackage({
      name: newPlanName,
      price: newPlanPrice.startsWith('₹') ? newPlanPrice : `₹${newPlanPrice}`,
      priceNumber: newPlanPriceNum || 299,
      period: newPlanPeriod,
      accountLimit: Number(newPlanChannels),
      monthlyPostLimit: newPlanPosts,
      features: [
        `${newPlanChannels} Social Channels`,
        `${newPlanPosts} Posts / mo`,
        ...newPlanFeatures,
      ],
      isPopular: newPlanIsPopular,
    });

    // Reset form
    setNewPlanName('');
    setIsCreatePackageOpen(false);
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === 'all' || m.plan.toLowerCase().includes(planFilter.toLowerCase());
    return matchesSearch && matchesPlan;
  });

  const totalMRR = packages.reduce((acc, p) => acc + p.priceNumber * p.subscribersCount, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-purple-900 selection:text-white">
      {/* Admin Top Navigation */}
      <header className="h-18 bg-slate-950 border-b border-slate-800 px-6 md:px-10 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-black text-white tracking-tight">Social Publisher Admin</h1>
              <span className="text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">
                MASTER PORTAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Administrator: {admin?.name || 'Super Admin'} · {admin?.email || 'admin@socialpublisher.io'}
            </p>
          </div>
        </div>

        {/* Right Admin Bar */}
        <div className="flex items-center space-x-4">
          <Link
            href="/user/dashboard"
            target="_blank"
            className="text-xs font-bold text-slate-400 hover:text-white flex items-center space-x-1 transition-colors"
          >
            <span>Open User App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all border border-slate-700 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        {/* KPI Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Total Joined Members</span>
              <Users className="w-4 h-4 text-[#1877F2]" />
            </div>
            <h3 className="text-3xl font-black text-white mt-2">{members.length}</h3>
            <p className="text-[11px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              100% platform health
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Monthly Recurring Revenue</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-3xl font-black text-white mt-2">₹{totalMRR.toLocaleString()}</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              Active subscriber cashflow
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Available Packages</span>
              <CreditCard className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="text-3xl font-black text-purple-400 mt-2">{packages.length} Plans</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              Custom admin packages enabled
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Celery Worker Nodes</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-3xl font-black text-emerald-400 mt-2">4 Active</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-1">0 Queue Backlog</p>
          </div>
        </div>

        {/* SECTION 1: Package Management & Creation */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                  💎
                </span>
                <h2 className="text-base font-black text-white">Subscription Packages & Pricing Control</h2>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Create new subscription tiers, edit channel limits, or delete outdated packages. Changes reflect instantly for users.
              </p>
            </div>

            <button
              onClick={() => setIsCreatePackageOpen(true)}
              className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-purple-900/30 transition-all flex items-center space-x-2 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Package</span>
            </button>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-slate-900/80 rounded-xl border border-slate-800 p-5 flex flex-col justify-between relative group hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white truncate max-w-[130px]">{pkg.name}</span>
                    <div className="flex items-center space-x-1">
                      {pkg.isPopular && (
                        <span className="text-[9px] font-bold bg-purple-500 text-white px-1.5 py-0.5 rounded">
                          HOT
                        </span>
                      )}
                      {pkg.id.startsWith('plan-') && !['plan-free', 'plan-starter', 'plan-pro', 'plan-agency'].includes(pkg.id) && (
                        <button
                          onClick={() => deletePackage(pkg.id)}
                          className="p-1 text-slate-500 hover:text-red-400 rounded transition-colors"
                          title="Delete Package"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="mt-2 flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-white">{pkg.price}</span>
                    <span className="text-xs text-slate-400">{pkg.period}</span>
                  </div>

                  <div className="mt-3 py-2 px-2.5 rounded-lg bg-slate-950 text-xs border border-slate-800">
                    <p className="text-slate-400 text-[11px]">
                      Channels: <strong className="text-white">{pkg.accountLimit}</strong>
                    </p>
                    <p className="text-slate-400 text-[11px]">
                      Posts: <strong className="text-white">{pkg.monthlyPostLimit}</strong>
                    </p>
                  </div>

                  <ul className="mt-3 space-y-1.5 text-[11px] text-slate-400 font-medium">
                    {pkg.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center space-x-1.5 truncate">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Subscribers:</span>
                  <span className="font-bold text-purple-300">{pkg.subscribersCount} users</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Members Directory */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-md overflow-hidden">
          {/* Header & Filter Bar */}
          <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 rounded-lg bg-blue-600/20 text-[#1877F2] flex items-center justify-center font-bold text-xs">
                  👥
                </span>
                <h2 className="text-base font-black text-white">Registered Members Directory</h2>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">
                View all registered creators, track active channels, and manage access status
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search member..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="text-xs font-semibold p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none"
              >
                <option value="all">All Plans</option>
                <option value="free">Free</option>
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
                <option value="agency">Agency</option>
              </select>
            </div>
          </div>

          {/* Members Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Member Name</th>
                  <th className="px-6 py-3.5">Plan Tier</th>
                  <th className="px-6 py-3.5">Connected Channels</th>
                  <th className="px-6 py-3.5">Posts Used</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Joined Date</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-bold text-white">{member.name}</p>
                          <p className="text-[11px] text-slate-500">{member.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase bg-slate-800 text-purple-300 border border-slate-700">
                        {member.plan}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-bold text-slate-200">
                      {member.connectedChannelsCount} Channels
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      {member.monthlyPostsUsed} posts
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.status === 'active' && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Active</span>
                        </span>
                      )}
                      {member.status === 'suspended' && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          <span>Suspended</span>
                        </span>
                      )}
                      {member.status === 'trial' && (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>Trial</span>
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                      {member.joinedDate}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => toggleMemberStatus(member.id)}
                        className={`text-[11px] font-bold px-3 py-1 rounded-lg transition-all cursor-pointer ${
                          member.status === 'active'
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30'
                        }`}
                      >
                        {member.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* CREATE PACKAGE MODAL */}
      {isCreatePackageOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-800 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>✨ Create New Subscription Package</span>
              </h3>
              <button
                onClick={() => setIsCreatePackageOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Package Plan Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Growth Booster 20"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="299"
                    value={newPlanPriceNum}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setNewPlanPriceNum(val);
                      setNewPlanPrice(`₹${val}`);
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Billing Cycle
                  </label>
                  <select
                    value={newPlanPeriod}
                    onChange={(e) => setNewPlanPeriod(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="/month">Monthly (/month)</option>
                    <option value="/year">Yearly (/year)</option>
                    <option value="forever">Forever Free</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Connected Channels Limit
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="8"
                    value={newPlanChannels}
                    onChange={(e) => setNewPlanChannels(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Monthly Post Limit
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Unlimited"
                    value={newPlanPosts}
                    onChange={(e) => setNewPlanPosts(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPlanIsPopular}
                    onChange={(e) => setNewPlanIsPopular(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded bg-slate-950 border-slate-800"
                  />
                  <span className="font-bold text-slate-300">Mark as "Most Popular" Plan</span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreatePackageOpen(false)}
                  className="px-4 py-2 font-bold text-slate-400 hover:text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg shadow-purple-900/30 cursor-pointer"
                >
                  Save & Publish Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
