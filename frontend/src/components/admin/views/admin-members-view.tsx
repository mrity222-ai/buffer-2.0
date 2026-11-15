'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Share2, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export function AdminMembersView() {
  const { members, toggleMemberStatus } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan =
      planFilter === 'all' || m.plan.toLowerCase() === planFilter.toLowerCase();
    const matchesStatus =
      statusFilter === 'all' || m.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesPlan && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans text-white">
      {/* Top Header Bar matching Buffer Views */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26282f] pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1e2025] flex items-center justify-center text-slate-300">
            <Users className="w-5 h-5 text-slate-300" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Members Directory</h1>
            <p className="text-xs text-slate-400 font-medium">
              View, search, and manage registered creators and agencies
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-[#1e2025] border border-[#2a2d34] px-3 py-1.5 rounded-xl font-bold text-slate-300">
            Total Members: <strong className="text-white">{members.length}</strong>
          </span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, brand, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#8fd98b]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center p-0.5 bg-[#16171b] border border-[#2a2d34] rounded-xl">
            {['all', 'free', 'starter', 'pro', 'agency'].map((p) => (
              <button
                key={p}
                onClick={() => setPlanFilter(p)}
                className={`px-2.5 py-1 rounded-lg font-semibold capitalize cursor-pointer transition-colors ${
                  planFilter === p
                    ? 'bg-[#26282f] text-[#8fd98b] font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center p-0.5 bg-[#16171b] border border-[#2a2d34] rounded-xl">
            {['all', 'active', 'suspended'].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 rounded-lg font-semibold capitalize cursor-pointer transition-colors ${
                  statusFilter === s
                    ? 'bg-[#26282f] text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Members Directory List */}
      <div className="space-y-3">
        {filteredMembers.length === 0 ? (
          <div className="p-16 text-center text-xs text-slate-400 bg-[#16171b] rounded-2xl border border-[#26282f]">
            No members matched your search or filter criteria.
          </div>
        ) : (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              className="p-4 bg-[#1e2025] hover:bg-[#252830] border border-[#2a2d34] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-xs"
            >
              {/* Member Profile info */}
              <div className="flex items-center space-x-3.5">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#2a2d34] shrink-0"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-bold text-white">{member.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#26282f] text-slate-300 border border-[#343842] px-2 py-0.2 rounded">
                      {member.plan}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{member.email}</p>
                </div>
              </div>

              {/* Usage & Stats */}
              <div className="flex items-center space-x-6 text-xs text-slate-300">
                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Channels</span>
                  <span className="font-bold text-white">{member.connectedChannelsCount} Connected</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Posts Used</span>
                  <span className="font-bold text-white">{member.monthlyPostsUsed} this mo</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Joined</span>
                  <span className="text-slate-400">{member.joinedDate}</span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Status</span>
                  <span className={`inline-flex items-center space-x-1 font-bold ${
                    member.status === 'active' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      member.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'
                    }`} />
                    <span className="capitalize">{member.status}</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 self-end md:self-center">
                <button
                  onClick={() => toggleMemberStatus(member.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    member.status === 'active'
                      ? 'bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800'
                      : 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {member.status === 'active' ? 'Suspend Access' : 'Activate User'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
