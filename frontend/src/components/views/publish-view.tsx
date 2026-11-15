'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Bookmark, 
  Plus, 
  Send, 
  Trash2, 
  Clock, 
  Share2, 
  Globe, 
  ListFilter, 
  CheckCircle, 
  AlertCircle,
  Video,
  ChevronDown
} from 'lucide-react';
import { PostItem, SocialAccount } from '@/types';

interface PublishViewProps {
  posts: PostItem[];
  accounts: SocialAccount[];
  onOpenComposer: (prefillSlot?: { day: string; time: string; platform: string }) => void;
  onPublishNow: (postId: string) => void;
  onDeletePost: (postId: string) => void;
}

export function PublishView({
  posts,
  accounts,
  onOpenComposer,
  onPublishNow,
  onDeletePost,
}: PublishViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<'queue' | 'drafts' | 'approvals' | 'sent'>('queue');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const queuedPosts = posts.filter(p => p.status === 'scheduled');
  const sentPosts = posts.filter(p => p.status === 'published' || p.status === 'partially_published');

  // Pre-configured recommended publishing slots matching Image 4
  const recommendedSlots = [
    {
      dateGroup: 'Today, November 15',
      slots: [
        { time: '5:00 PM', platform: 'linkedin', label: 'LinkedIn', color: 'bg-[#0077b5]' },
      ],
    },
    {
      dateGroup: 'Tomorrow, November 16',
      slots: [
        { time: '9:00 AM', platform: 'instagram', label: 'Instagram', color: 'bg-gradient-to-tr from-amber-500 to-rose-600' },
        { time: '1:00 PM', platform: 'facebook', label: 'Facebook', color: 'bg-[#1877F2]' },
        { time: '5:00 PM', platform: 'linkedin', label: 'LinkedIn', color: 'bg-[#0077b5]' },
      ],
    },
    {
      dateGroup: 'Tuesday, November 17',
      slots: [
        { time: '9:00 AM', platform: 'instagram', label: 'Instagram', color: 'bg-gradient-to-tr from-amber-500 to-rose-600' },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans text-white">
      {/* Top Header Bar matching Image 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26282f] pb-4">
        {/* Title */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1e2025] flex items-center justify-center text-slate-300">
            <Calendar className="w-5 h-5 text-slate-300" />
          </div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Publish</h1>
            <Bookmark className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Right Controls: List/Calendar, + New Post, Filters matching Image 4 */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* List / Calendar Toggle */}
          <div className="flex items-center p-0.5 rounded-lg bg-[#1e2025] border border-[#2a2d34] text-xs">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#2a2d34] text-[#8fd98b]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-md font-semibold cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-[#2a2d34] text-[#8fd98b]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Calendar
            </button>
          </div>

          {/* New Post Button */}
          <button
            onClick={() => onOpenComposer()}
            className="px-4 py-2 rounded-xl bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold flex items-center space-x-1.5 transition-all active:scale-98 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#101114] stroke-[3]" />
            <span>New Post</span>
          </button>

          {/* Filter Dropdowns matching Image 4 */}
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] text-xs font-semibold text-slate-300 hover:text-white cursor-pointer">
            <span>Channels</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] text-xs font-semibold text-slate-300 hover:text-white cursor-pointer">
            <span>Tags</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          <button className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] text-xs font-semibold text-slate-300 hover:text-white cursor-pointer">
            <span>Kolkata</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Sub-Tabs matching Image 4 */}
      <div className="flex items-center space-x-6 border-b border-[#26282f] text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('queue')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
            activeSubTab === 'queue'
              ? 'text-white border-[#8fd98b] font-bold'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          <span>Queue</span>
          <span className="text-[11px] font-bold bg-[#26282f] text-slate-300 px-1.5 py-0.2 rounded">
            {queuedPosts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('drafts')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
            activeSubTab === 'drafts'
              ? 'text-white border-[#8fd98b] font-bold'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          <span>Drafts</span>
          <span className="text-[11px] font-bold bg-[#26282f] text-slate-300 px-1.5 py-0.2 rounded">0</span>
        </button>

        <button
          onClick={() => setActiveSubTab('approvals')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
            activeSubTab === 'approvals'
              ? 'text-white border-[#8fd98b] font-bold'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          <span>Approvals</span>
          <span className="text-amber-400">⚡</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sent')}
          className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
            activeSubTab === 'sent'
              ? 'text-white border-[#8fd98b] font-bold'
              : 'text-slate-400 border-transparent hover:text-white'
          }`}
        >
          <span>Sent</span>
          <span className="text-[11px] font-bold bg-[#26282f] text-slate-300 px-1.5 py-0.2 rounded">
            {sentPosts.length}
          </span>
        </button>
      </div>

      {/* Queue View Content */}
      {activeSubTab === 'queue' && (
        <div className="space-y-8">
          {/* Active Queued Posts (if any exist) */}
          {queuedPosts.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Scheduled Posts ({queuedPosts.length})
              </h3>
              <div className="space-y-3">
                {queuedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 bg-[#1e2025] hover:bg-[#252830] border border-[#2a2d34] rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all shadow-xs"
                  >
                    <div className="flex items-start space-x-3.5">
                      {post.media && post.media.length > 0 ? (
                        <div className="w-16 h-20 rounded-xl bg-black overflow-hidden relative border border-[#2a2d34] shrink-0">
                          {post.media[0].type === 'video' ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-[#8fd98b]">
                              <Video className="w-6 h-6" />
                              <span className="text-[9px] font-bold mt-1">9:16</span>
                            </div>
                          ) : (
                            <img src={post.media[0].url} alt="Post" className="w-full h-full object-cover" />
                          )}
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#26282f] flex items-center justify-center text-slate-400 shrink-0">
                          <Share2 className="w-5 h-5" />
                        </div>
                      )}

                      <div>
                        <p className="text-xs font-medium text-white line-clamp-2 max-w-xl">
                          {post.caption || 'No caption'}
                        </p>
                        <div className="flex items-center space-x-2 mt-2 text-[11px] text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>{post.scheduledTime || 'Scheduled soon'}</span>
                          <span>•</span>
                          <span className="text-[#8fd98b] font-semibold">{post.targets.length} channels</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end md:self-center">
                      <button
                        onClick={() => onPublishNow(post.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold transition-all active:scale-98 cursor-pointer flex items-center space-x-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Publish Now</span>
                      </button>
                      <button
                        onClick={() => onDeletePost(post.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/20 rounded-xl transition-colors cursor-pointer"
                        title="Delete Post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Publishing Slots matching Image 4 */}
          <div className="space-y-6">
            {recommendedSlots.map((dayGroup, gIdx) => (
              <div key={gIdx} className="space-y-3">
                <p className="text-xs font-bold text-slate-300">
                  {dayGroup.dateGroup}
                </p>

                <div className="space-y-2.5">
                  {dayGroup.slots.map((slot, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-2xl bg-[#16171b] border border-[#26282f] hover:border-[#363942] flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="font-semibold text-slate-400 w-20">{slot.time}</span>
                        <div className="flex items-center space-x-2">
                          <div className={`w-5 h-5 rounded-full ${slot.color} flex items-center justify-center text-[9px] text-white font-bold`}>
                            {slot.platform === 'linkedin' ? 'in' : slot.platform === 'instagram' ? 'ig' : 'f'}
                          </div>
                          <span className="text-slate-400 text-xs font-medium">Slot ready</span>
                        </div>
                      </div>

                      <button
                        onClick={() => onOpenComposer({ day: dayGroup.dateGroup, time: slot.time, platform: slot.platform })}
                        className="px-3 py-1.5 rounded-xl bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] text-xs font-bold text-slate-300 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer group"
                      >
                        <Plus className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#8fd98b]" />
                        <span>New</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* "+ More Recommended Times" link matching Image 4 */}
            <div className="pt-2 text-center">
              <button
                onClick={() => onOpenComposer()}
                className="text-xs font-bold text-slate-400 hover:text-[#8fd98b] transition-colors cursor-pointer"
              >
                + More Recommended Times
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sent History Tab */}
      {activeSubTab === 'sent' && (
        <div className="space-y-4">
          {sentPosts.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-400 bg-[#16171b] rounded-2xl border border-[#26282f]">
              No posts have been published yet. Schedule or publish from the queue to see your live history.
            </div>
          ) : (
            <div className="space-y-3">
              {sentPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-[#1e2025] rounded-2xl border border-[#2a2d34] flex items-center justify-between"
                >
                  <div>
                    <p className="text-xs font-medium text-white line-clamp-1">{post.caption}</p>
                    <p className="text-[11px] text-emerald-400 font-bold mt-1">✓ Published {post.publishedAt || 'recently'}</p>
                  </div>
                  <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded font-bold">
                    Live on Facebook & Instagram
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
