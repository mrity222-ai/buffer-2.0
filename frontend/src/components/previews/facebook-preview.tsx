'use client';

import React from 'react';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe } from 'lucide-react';

interface FacebookPreviewProps {
  pageName: string;
  avatarUrl: string;
  caption: string;
  hashtags?: string[];
  imageUrl?: string;
}

export function FacebookPreview({
  pageName,
  avatarUrl,
  caption,
  hashtags = [],
  imageUrl,
}: FacebookPreviewProps) {
  const displayText = caption || 'Your caption will appear here...';
  const allText = hashtags.length > 0 ? `${displayText}\n\n${hashtags.join(' ')}` : displayText;

  return (
    <div className="w-full max-w-[480px] mx-auto bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden font-sans text-left transition-all">
      {/* Post Header */}
      <div className="p-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <img
            src={avatarUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100'}
            alt={pageName}
            className="w-10 h-10 rounded-full object-cover border border-slate-100"
          />
          <div>
            <div className="flex items-center space-x-1">
              <h4 className="text-sm font-semibold text-slate-900 hover:underline cursor-pointer">
                {pageName || 'Facebook Page'}
              </h4>
              <span className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold">
                ✓
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-slate-500">
              <span>Just now</span>
              <span>·</span>
              <Globe className="w-3 h-3 text-slate-400 inline" />
            </div>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Caption Content */}
      <div className="px-3.5 pb-3">
        <p className="text-[13.5px] leading-relaxed text-slate-800 whitespace-pre-wrap break-words">
          {allText.split(' ').map((word, i) => {
            if (word.startsWith('#')) {
              return (
                <span key={i} className="text-blue-600 font-medium hover:underline cursor-pointer">
                  {word}{' '}
                </span>
              );
            }
            return word + ' ';
          })}
        </p>
      </div>

      {/* Media Image */}
      {imageUrl ? (
        <div className="relative w-full aspect-[4/3] bg-slate-100 border-y border-slate-100 overflow-hidden">
          <img
            src={imageUrl}
            alt="Post preview"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-full py-12 bg-slate-50 border-y border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 text-xs">
          <span>No image attached</span>
        </div>
      )}

      {/* Social Reaction Bar */}
      <div className="px-3.5 py-2 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100">
        <div className="flex items-center space-x-1">
          <span className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white">
            👍
          </span>
          <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white -ml-2 border border-white">
            ❤️
          </span>
          <span className="ml-1 text-[11px] font-medium">124</span>
        </div>
        <div className="flex items-center space-x-3 text-[11px]">
          <span>18 comments</span>
          <span>5 shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-1 flex items-center justify-around text-slate-600 text-xs font-semibold">
        <button className="flex-1 flex items-center justify-center space-x-1.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors">
          <ThumbsUp className="w-4 h-4 text-slate-600" />
          <span>Like</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-1.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors">
          <MessageCircle className="w-4 h-4 text-slate-600" />
          <span>Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-1.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors">
          <Share2 className="w-4 h-4 text-slate-600" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
