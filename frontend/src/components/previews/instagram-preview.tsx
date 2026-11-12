'use client';

import React from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

interface InstagramPreviewProps {
  username: string;
  avatarUrl: string;
  caption: string;
  hashtags?: string[];
  imageUrl?: string;
}

export function InstagramPreview({
  username,
  avatarUrl,
  caption,
  hashtags = [],
  imageUrl,
}: InstagramPreviewProps) {
  const displayText = caption || 'Your Instagram caption will appear here...';
  const allText = hashtags.length > 0 ? `${displayText}\n\n${hashtags.join(' ')}` : displayText;

  return (
    <div className="w-full max-w-[390px] mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden font-sans text-left transition-all">
      {/* IG Header */}
      <div className="px-3.5 py-3 flex items-center justify-between border-b border-slate-50">
        <div className="flex items-center space-x-2.5">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600">
            <img
              src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
              alt={username}
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
          </div>
          <span className="text-xs font-semibold text-slate-900 tracking-tight hover:underline cursor-pointer">
            {username ? username.toLowerCase().replace(/\s+/g, '_') : 'instagram_creator'}
          </span>
        </div>
        <button className="text-slate-500 hover:text-slate-800 p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* IG Image Canvas (1:1 Square) */}
      <div className="relative w-full aspect-square bg-slate-900 overflow-hidden flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Instagram post preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-500 text-xs">
            <span>No image selected</span>
            <span className="text-[11px] text-slate-600 mt-1">Recommended: 1080 x 1080px (1:1)</span>
          </div>
        )}
      </div>

      {/* Action Icons */}
      <div className="px-3.5 pt-3 pb-1 flex items-center justify-between text-slate-800">
        <div className="flex items-center space-x-3.5">
          <Heart className="w-5 h-5 hover:text-rose-500 cursor-pointer transition-colors" />
          <MessageCircle className="w-5 h-5 hover:text-slate-500 cursor-pointer transition-colors -rotate-90" />
          <Send className="w-5 h-5 hover:text-slate-500 cursor-pointer transition-colors" />
        </div>
        <Bookmark className="w-5 h-5 hover:text-slate-500 cursor-pointer transition-colors" />
      </div>

      {/* Likes */}
      <div className="px-3.5 py-1">
        <p className="text-xs font-semibold text-slate-900">
          842 likes
        </p>
      </div>

      {/* Caption & Comments */}
      <div className="px-3.5 pb-3 space-y-1">
        <p className="text-xs text-slate-800 leading-normal line-clamp-4">
          <span className="font-semibold text-slate-900 mr-1.5">
            {username ? username.toLowerCase().replace(/\s+/g, '_') : 'instagram_creator'}
          </span>
          {allText.split(' ').map((word, i) => {
            if (word.startsWith('#')) {
              return (
                <span key={i} className="text-indigo-600 font-medium">
                  {word}{' '}
                </span>
              );
            }
            return word + ' ';
          })}
        </p>
        <p className="text-[11px] text-slate-400 cursor-pointer hover:text-slate-600">
          View all 42 comments
        </p>
        <p className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
          JUST NOW
        </p>
      </div>
    </div>
  );
}
