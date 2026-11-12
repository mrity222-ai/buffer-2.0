'use client';

import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  RotateCw, 
  ExternalLink, 
  Share2,
  Calendar
} from 'lucide-react';
import { PostItem } from '@/types';

interface HistoryViewProps {
  posts: PostItem[];
  onRetryTarget: (postId: string, accountId: string) => void;
}

export function HistoryView({ posts, onRetryTarget }: HistoryViewProps) {
  // Flatten post targets to show per-destination granular publishing logs
  const flattenedHistory: Array<{
    postId: string;
    caption: string;
    mediaUrl?: string;
    target: PostItem['targets'][0];
    date: string;
  }> = [];

  posts.forEach((post) => {
    post.targets.forEach((tgt) => {
      flattenedHistory.push({
        postId: post.id,
        caption: post.caption,
        mediaUrl: post.media[0]?.url,
        target: tgt,
        date: tgt.publishedAt || post.publishedAt || 'Recently',
      });
    });
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Multi-Channel Publishing History</h3>
          <p className="text-xs text-slate-500">
            Real-time delivery status, error logs, and one-click retry across all social platforms
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full">
          {flattenedHistory.length} Total Dispatches
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3.5">Destination Channel</th>
              <th className="px-6 py-3.5">Post Content</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5">Time</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {flattenedHistory.map((item, idx) => (
              <tr key={`${item.postId}-${item.target.accountId}-${idx}`} className="hover:bg-slate-50/60 transition-colors">
                {/* Channel info */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2.5">
                    <div className="relative">
                      <img
                        src={item.target.accountAvatar}
                        alt={item.target.accountName}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full flex items-center justify-center text-[7px] text-white font-bold ${
                          item.target.platform === 'facebook_page'
                            ? 'bg-blue-600'
                            : 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600'
                        }`}
                      >
                        {item.target.platform === 'facebook_page' ? 'f' : 'ig'}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{item.target.accountName}</p>
                      <p className="text-[10px] text-slate-400">@{item.target.accountUsername}</p>
                    </div>
                  </div>
                </td>

                {/* Content excerpt + media */}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3 max-w-md">
                    {item.mediaUrl && (
                      <img
                        src={item.mediaUrl}
                        alt="thumbnail"
                        className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-200"
                      />
                    )}
                    <p className="truncate text-slate-800 font-medium">{item.caption}</p>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.target.status === 'published' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Published</span>
                    </span>
                  )}
                  {item.target.status === 'pending' && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Queued</span>
                    </span>
                  )}
                  {item.target.status === 'failed' && (
                    <div>
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Failed</span>
                      </span>
                      {item.target.errorMessage && (
                        <p className="text-[10px] text-rose-600 mt-1 max-w-xs truncate" title={item.target.errorMessage}>
                          {item.target.errorMessage}
                        </p>
                      )}
                    </div>
                  )}
                </td>

                {/* Timestamp */}
                <td className="px-6 py-4 whitespace-nowrap text-slate-500 font-medium">
                  {item.date}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end space-x-2">
                    {item.target.status === 'published' && item.target.permalink && (
                      <a
                        href={item.target.permalink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-purple-600 hover:text-purple-800 text-[11px] font-semibold flex items-center space-x-1 hover:underline"
                      >
                        <span>View Post</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {item.target.status === 'failed' && (
                      <button
                        onClick={() => onRetryTarget(item.postId, item.target.accountId)}
                        className="flex items-center space-x-1 bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Retry</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
