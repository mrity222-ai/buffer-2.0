'use client';

import React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreVertical, 
  Music, 
  Volume2, 
  Sparkles,
  Play
} from 'lucide-react';

interface ReelPreviewProps {
  platform: 'instagram' | 'facebook';
  username: string;
  avatarUrl: string;
  caption: string;
  hashtags?: string[];
  videoUrl?: string;
  isHighQuality?: boolean;
}

export function ReelPreview({
  platform,
  username,
  avatarUrl,
  caption,
  hashtags = [],
  videoUrl,
  isHighQuality = true,
}: ReelPreviewProps) {
  const displayText = caption || 'Write a caption for your reel...';
  const allText = hashtags.length > 0 ? `${displayText} ${hashtags.join(' ')}` : displayText;

  return (
    <div className="w-full max-w-[310px] mx-auto bg-black text-white rounded-3xl shadow-2xl border-4 border-slate-800 overflow-hidden font-sans relative aspect-[9/16] flex flex-col justify-between select-none">
      {/* Background Video Canvas */}
      {videoUrl ? (
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 border border-white/20">
            <Play className="w-6 h-6 text-white ml-1 fill-white" />
          </div>
          <p className="text-xs font-bold text-white/90">9:16 Vertical Reel Canvas</p>
          <p className="text-[10px] text-white/60 mt-1">Upload a video to preview live playback</p>
        </div>
      )}

      {/* Subtle overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 p-3.5 flex items-center justify-between text-xs font-bold text-white/90">
        <div className="flex items-center space-x-1.5">
          <span className="text-sm font-extrabold tracking-tight">
            {platform === 'facebook' ? 'Facebook Reels' : 'Reels'}
          </span>
          {isHighQuality && (
            <span className="text-[9px] bg-[#1877F2]/90 text-white font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              1080p HQ
            </span>
          )}
        </div>
        <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <Volume2 className="w-3.5 h-3.5 text-white" />
        </div>
      </div>

      {/* Right Side Action Floating Buttons */}
      <div className="absolute right-2.5 bottom-16 z-10 flex flex-col items-center space-y-4 text-white">
        {/* Like */}
        <div className="flex flex-col items-center">
          <button className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 text-white" />
          </button>
          <span className="text-[10px] font-bold mt-1">14.2K</span>
        </div>

        {/* Comment */}
        <div className="flex flex-col items-center">
          <button className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
            <MessageCircle className="w-5 h-5 text-white" />
          </button>
          <span className="text-[10px] font-bold mt-1">328</span>
        </div>

        {/* Share */}
        <div className="flex flex-col items-center">
          <button className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
            <Send className="w-4 h-4 text-white" />
          </button>
          <span className="text-[10px] font-bold mt-1">1.8K</span>
        </div>

        {/* Bookmark */}
        <button className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
          <Bookmark className="w-4 h-4 text-white" />
        </button>

        {/* Audio Vinyl icon */}
        <div className="w-7 h-7 rounded-full border-2 border-white/60 overflow-hidden bg-slate-800 animate-spin flex items-center justify-center">
          <img
            src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt="Audio"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Information (Creator handle, caption, music) */}
      <div className="relative z-10 p-3.5 pr-14 space-y-2">
        {/* Creator Info */}
        <div className="flex items-center space-x-2">
          <img
            src={avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
            alt={username}
            className="w-7 h-7 rounded-full object-cover border border-white"
          />
          <span className="text-xs font-bold text-white tracking-tight">
            @{username || 'creator'}
          </span>
          <button className="text-[10px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded-full border border-white/30 backdrop-blur-xs">
            Follow
          </button>
        </div>

        {/* Caption */}
        <p className="text-[11px] leading-relaxed text-white/95 line-clamp-2">
          {allText}
        </p>

        {/* Music / Audio tag */}
        <div className="flex items-center space-x-1.5 text-[10px] text-white/80 font-medium">
          <Music className="w-3 h-3 text-white/90" />
          <span className="truncate max-w-[170px]">Original Audio · {username || 'creator'}</span>
        </div>
      </div>
    </div>
  );
}
