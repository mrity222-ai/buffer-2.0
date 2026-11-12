'use client';

import React from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Share2, 
  MoreVertical, 
  ExternalLink, 
  AlertCircle,
  CheckCircle2,
  Trash2,
  Send
} from 'lucide-react';
import { PostItem, SocialAccount } from '@/types';

interface QueueViewProps {
  posts: PostItem[];
  accounts: SocialAccount[];
  selectedAccountId: string | null;
  onOpenComposer: () => void;
  onPublishNow: (postId: string) => void;
  onDeletePost: (postId: string) => void;
}

export function QueueView({
  posts,
  accounts,
  selectedAccountId,
  onOpenComposer,
  onPublishNow,
  onDeletePost,
}: QueueViewProps) {
  // Filter by selected account if any
  const filteredPosts = selectedAccountId
    ? posts.filter((p) => p.targets.some((t) => t.accountId === selectedAccountId))
    : posts;

  const queuedPosts = filteredPosts.filter((p) => p.status === 'scheduled' || p.status === 'draft');
  const publishedCount = filteredPosts.filter((p) => p.status === 'published').length;
  const failedCount = filteredPosts.filter((p) => p.status === 'failed' || p.status === 'partially_published').length;

  return (
    <div className="space-y-6">
      {/* Top Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Queued & Scheduled
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{queuedPosts.length}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Successfully Published
            </p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">{publishedCount}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Failed / Attention Needed
            </p>
            <h3 className="text-2xl font-bold text-rose-600 mt-1">{failedCount}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Buffer-style Quick Post Trigger Banner */}
      <div
        onClick={onOpenComposer}
        className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between cursor-pointer hover:border-purple-300 hover:shadow-sm transition-all group"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
            ✨
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 group-hover:text-purple-700 transition-colors">
              What would you like to share today?
            </p>
            <p className="text-xs text-slate-400">
              Click to write a caption, attach media, and select destination channels
            </p>
          </div>
        </div>
        <button className="flex items-center space-x-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl text-xs font-bold group-hover:bg-purple-600 group-hover:text-white transition-all">
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Queued Posts Feed */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            Upcoming Queue
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            {queuedPosts.length} posts scheduled
          </span>
        </div>

        {queuedPosts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Your publishing queue is empty</h4>
            <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
              Queue up content in advance so your Facebook Pages and Instagram accounts stay consistently active.
            </p>
            <button
              onClick={onOpenComposer}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all"
            >
              + Create Scheduled Post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {queuedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden"
              >
                {/* Header bar of post card */}
                <div className="px-5 py-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-purple-700 bg-purple-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.scheduledTime || 'Scheduled'}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 font-medium">
                      Publishing to {post.targets.length} channels
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onPublishNow(post.id)}
                      className="flex items-center space-x-1 text-slate-600 hover:text-purple-700 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors font-medium text-[11px]"
                    >
                      <Send className="w-3 h-3" />
                      <span>Publish Now</span>
                    </button>
                    <button
                      onClick={() => onDeletePost(post.id)}
                      className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete Post"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col md:flex-row gap-5">
                  {/* Left: Media Thumbnail */}
                  {post.media.length > 0 && (
                    <div className="w-full md:w-44 h-36 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                      <img
                        src={post.media[0].url}
                        alt="Post media"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Right: Caption & Destinations */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-line line-clamp-3">
                        {post.caption}
                      </p>

                      {post.hashtags && post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.hashtags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-medium text-purple-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Target Channels Badges */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center space-x-2">
                      <span className="text-[11px] text-slate-400 font-medium">Target Channels:</span>
                      <div className="flex -space-x-1.5 overflow-hidden">
                        {post.targets.map((tgt) => (
                          <div
                            key={tgt.accountId}
                            className="relative"
                            title={`${tgt.accountName} (${tgt.platform})`}
                          >
                            <img
                              src={tgt.accountAvatar}
                              alt={tgt.accountName}
                              className="w-6 h-6 rounded-full border-2 border-white object-cover"
                            />
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full flex items-center justify-center text-[5px] text-white font-bold ${
                                tgt.platform === 'facebook_page'
                                  ? 'bg-blue-600'
                                  : 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600'
                              }`}
                            >
                              {tgt.platform === 'facebook_page' ? 'f' : 'ig'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
