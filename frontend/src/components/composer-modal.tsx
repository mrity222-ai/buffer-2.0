'use client';

import React, { useState, useRef } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  Video, 
  Film, 
  Hash, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Send, 
  Calendar,
  Layers,
  ChevronDown,
  Trash2,
  Sliders,
  Maximize2
} from 'lucide-react';
import { SocialAccount, MediaAttachment, PostItem, PostFormatType, AspectRatioType } from '@/types';
import { FacebookPreview } from './previews/facebook-preview';
import { InstagramPreview } from './previews/instagram-preview';
import { ReelPreview } from './previews/reel-preview';

interface ComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: SocialAccount[];
  onPublishPost: (post: Omit<PostItem, 'id' | 'createdAt'>) => void;
}

export function ComposerModal({
  isOpen,
  onClose,
  accounts,
  onPublishPost,
}: ComposerModalProps) {
  if (!isOpen) return null;

  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>(
    accounts.map((a) => a.id)
  );
  const [caption, setCaption] = useState('');
  const [postFormat, setPostFormat] = useState<PostFormatType>('reel');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('9:16');
  const [activePreviewTab, setActivePreviewTab] = useState<'facebook' | 'instagram'>('instagram');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('video');
  const [mediaUrl, setMediaUrl] = useState<string>(
    'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4'
  );
  const [videoResolution, setVideoResolution] = useState<string>('1080 × 1920 (Auto-Detected)');
  const [videoDuration, setVideoDuration] = useState<number>(15);
  const [isHighQuality, setIsHighQuality] = useState<boolean>(true);
  const [hashtags, setHashtags] = useState<string[]>(['#Reels', '#Trending', '#SaaS']);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishingAction, setPublishingAction] = useState<'now' | 'queue'>('now');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleAccount = (id: string) => {
    setSelectedAccountIds((prev) =>
      prev.includes(id) ? prev.filter((aId) => aId !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedAccountIds.length === accounts.length) {
      setSelectedAccountIds([]);
    } else {
      setSelectedAccountIds(accounts.map((a) => a.id));
    }
  };

  const addHashtag = (tag: string) => {
    if (!hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  // Video & Image auto-detection
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVid = file.type.startsWith('video/');
    const url = URL.createObjectURL(file);
    setMediaUrl(url);

    if (isVid) {
      setMediaType('video');
      const tempVideo = document.createElement('video');
      tempVideo.src = url;
      tempVideo.onloadedmetadata = () => {
        const width = tempVideo.videoWidth;
        const height = tempVideo.videoHeight;
        const duration = Math.round(tempVideo.duration);
        setVideoDuration(duration);
        setVideoResolution(`${width} × ${height}`);

        const ratio = width / height;

        // Auto Aspect Ratio & Format Detection
        if (ratio < 0.65) {
          // ~ 9:16 (0.5625) -> Vertical Reel / Story
          setAspectRatio('9:16');
          setPostFormat('reel');
        } else if (ratio >= 0.75 && ratio <= 0.88) {
          // ~ 4:5 (0.8) -> Feed Portrait Video
          setAspectRatio('4:5');
          setPostFormat('feed_video');
        } else if (ratio > 0.88 && ratio <= 1.15) {
          // ~ 1:1 (1.0) -> Feed Square Video
          setAspectRatio('1:1');
          setPostFormat('feed_video');
        } else {
          // Landscape ~ 16:9 (1.77)
          setAspectRatio('16:9');
          setPostFormat('feed_video');
        }
      };
    } else {
      setMediaType('image');
      setPostFormat('image');
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setVideoResolution(`${img.naturalWidth} × ${img.naturalHeight}`);
        const r = img.naturalWidth / img.naturalHeight;
        if (r < 0.7) setAspectRatio('9:16');
        else if (r <= 0.9) setAspectRatio('4:5');
        else if (r <= 1.2) setAspectRatio('1:1');
        else setAspectRatio('16:9');
      };
    }
  };

  const handleDeleteMedia = () => {
    setMediaUrl('');
    setVideoResolution('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePublish = () => {
    if (!caption.trim() && !mediaUrl) {
      alert('Please add a caption or media before publishing.');
      return;
    }
    if (selectedAccountIds.length === 0) {
      alert('Please select at least one social media account.');
      return;
    }

    setIsPublishing(true);

    const selectedAccounts = accounts.filter((a) => selectedAccountIds.includes(a.id));

    const targets = selectedAccounts.map((acc) => ({
      accountId: acc.id,
      accountName: acc.name,
      accountUsername: acc.username,
      accountAvatar: acc.avatarUrl,
      platform: acc.platform,
      status: publishingAction === 'now' ? ('published' as const) : ('pending' as const),
      permalink:
        acc.platform === 'facebook_page'
          ? `https://facebook.com/${acc.username}/${postFormat === 'reel' ? 'reel' : 'posts'}/${Date.now()}`
          : `https://instagram.com/${postFormat === 'reel' ? 'reel' : 'p'}/live_${Date.now()}`,
      publishedAt: publishingAction === 'now' ? 'Just now' : undefined,
    }));

    const mediaList: MediaAttachment[] = mediaUrl
      ? [
          {
            id: `media-${Date.now()}`,
            url: mediaUrl,
            type: mediaType,
            aspectRatio,
            resolution: videoResolution,
            duration: videoDuration,
            isHighQuality,
            name: `${postFormat}-asset.${mediaType === 'video' ? 'mp4' : 'jpg'}`,
          },
        ]
      : [];

    setTimeout(() => {
      onPublishPost({
        caption,
        hashtags,
        media: mediaList,
        targets,
        status: publishingAction === 'now' ? 'published' : 'scheduled',
        postFormat,
        isHighQuality,
        scheduledTime: publishingAction === 'queue' ? 'Today at 6:00 PM' : undefined,
        publishedAt: publishingAction === 'now' ? 'Just now' : undefined,
      });

      setIsPublishing(false);
      onClose();
    }, 600);
  };

  const sampleFb = accounts.find((a) => a.platform === 'facebook_page') || accounts[0];
  const sampleIg = accounts.find((a) => a.platform === 'instagram_business') || accounts[0];

  const charCount = caption.length;
  const isOverInstagramLimit = charCount > 2200;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans text-white">
      <div className="bg-[#1e2025] rounded-3xl w-full max-w-5xl shadow-2xl border border-[#2a2d34] overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Top Header */}
        <div className="px-6 py-3.5 border-b border-[#2a2d34] flex items-center justify-between bg-[#16171b]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#8fd98b] flex items-center justify-center text-[#101114] font-bold text-sm shadow-xs">
              🎬
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Buffer · Video & Reels Composer
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                Auto-sizes Reels (9:16) & Feed Videos for Facebook Pages and Instagram Professional
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#26282f] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channel Selector Bar */}
        <div className="px-6 py-2.5 border-b border-[#2a2d34] bg-[#1a1c22] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            <span className="text-xs font-bold text-slate-300 mr-1">Publish to:</span>
            {accounts.map((acc) => {
              const isSelected = selectedAccountIds.includes(acc.id);
              return (
                <button
                  key={acc.id}
                  onClick={() => toggleAccount(acc.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#E7F3FF] border-[#1877F2] text-[#1877F2] shadow-xs'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 opacity-60'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={acc.avatarUrl}
                      alt={acc.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full flex items-center justify-center text-[6px] text-white font-bold ${
                        acc.platform === 'facebook_page'
                          ? 'bg-[#1877F2]'
                          : 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600'
                      }`}
                    >
                      {acc.platform === 'facebook_page' ? 'f' : 'ig'}
                    </div>
                  </div>
                  <span className="truncate max-w-[130px]">{acc.name}</span>
                  {isSelected && (
                    <span className="w-3.5 h-3.5 bg-[#1877F2] rounded-full flex items-center justify-center text-white text-[9px]">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={selectAll}
            className="text-xs font-bold text-[#1877F2] hover:text-[#166FE5] hover:underline cursor-pointer"
          >
            {selectedAccountIds.length === accounts.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {/* Main Body: 2 Columns */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {/* Left Column: Editor Controls (Col 7) */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Post Format Selector Tabs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-[#1877F2]" />
                  Content Format Type
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPostFormat('reel');
                      setAspectRatio('9:16');
                    }}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold flex flex-col items-center justify-center space-y-0.5 cursor-pointer transition-all ${
                      postFormat === 'reel'
                        ? 'border-[#1877F2] bg-[#E7F3FF] text-[#1877F2] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>🎬 Reel</span>
                    <span className="text-[10px] font-semibold text-slate-400">9:16 Full Screen</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPostFormat('feed_video');
                      setAspectRatio('4:5');
                    }}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold flex flex-col items-center justify-center space-y-0.5 cursor-pointer transition-all ${
                      postFormat === 'feed_video'
                        ? 'border-[#1877F2] bg-[#E7F3FF] text-[#1877F2] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>📹 Feed Video</span>
                    <span className="text-[10px] font-semibold text-slate-400">4:5 / 1:1 Feed</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPostFormat('story');
                      setAspectRatio('9:16');
                    }}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold flex flex-col items-center justify-center space-y-0.5 cursor-pointer transition-all ${
                      postFormat === 'story'
                        ? 'border-[#1877F2] bg-[#E7F3FF] text-[#1877F2] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>📱 Story</span>
                    <span className="text-[10px] font-semibold text-slate-400">24hr 9:16</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPostFormat('image');
                      setMediaType('image');
                    }}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold flex flex-col items-center justify-center space-y-0.5 cursor-pointer transition-all ${
                      postFormat === 'image'
                        ? 'border-[#1877F2] bg-[#E7F3FF] text-[#1877F2] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>🖼️ Image Post</span>
                    <span className="text-[10px] font-semibold text-slate-400">Square/Portrait</span>
                  </button>
                </div>
              </div>

              {/* Aspect Ratio Selector Pills */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#1877F2]" />
                    Target Aspect Ratio & Canvas
                  </span>
                  {videoResolution && (
                    <span className="text-[10px] font-bold bg-[#E7F3FF] text-[#1877F2] px-2 py-0.5 rounded-full">
                      {videoResolution}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: '9:16 Vertical', sub: 'Reels & Stories', value: '9:16' as AspectRatioType },
                    { label: '4:5 Portrait', sub: 'Feed Max View', value: '4:5' as AspectRatioType },
                    { label: '1:1 Square', sub: 'Classic Feed', value: '1:1' as AspectRatioType },
                    { label: '16:9 Landscape', sub: 'Widescreen FB', value: '16:9' as AspectRatioType },
                  ].map((ratio) => (
                    <button
                      key={ratio.value}
                      type="button"
                      onClick={() => setAspectRatio(ratio.value)}
                      className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                        aspectRatio === ratio.value
                          ? 'border-[#1877F2] bg-white text-[#1877F2] ring-1 ring-[#1877F2] shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <p className="text-[11px] font-bold">{ratio.label}</p>
                      <p className="text-[9px] text-slate-400">{ratio.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Caption Textarea */}
              <div className="relative">
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write caption, video description or hook here..."
                  rows={4}
                  className="w-full text-xs text-slate-800 placeholder-slate-400 p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/20 focus:border-[#1877F2] transition-all resize-none leading-relaxed"
                />

                <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1 font-medium">
                  <div className="flex items-center space-x-2">
                    <span className={isOverInstagramLimit ? 'text-red-600 font-bold' : ''}>
                      {charCount} chars
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[11px] text-slate-400">
                      IG limit: 2,200 · FB: 63k
                    </span>
                  </div>
                  {isOverInstagramLimit && (
                    <span className="text-red-500 flex items-center gap-1 font-bold text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Exceeds IG limit!
                    </span>
                  )}
                </div>
              </div>

              {/* Hashtag Tray */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-[#1877F2]" />
                    Reel Hashtags
                  </span>
                  <div className="flex gap-1 text-[11px] text-[#1877F2] font-semibold">
                    <button
                      type="button"
                      onClick={() => addHashtag('#ReelsViral')}
                      className="hover:underline cursor-pointer"
                    >
                      + #ReelsViral
                    </button>
                    <span>·</span>
                    <button
                      type="button"
                      onClick={() => addHashtag('#CreatorsOfInstagram')}
                      className="hover:underline cursor-pointer"
                    >
                      + #CreatorsOfInstagram
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md bg-[#E7F3FF] text-[#1877F2] text-xs font-bold border border-blue-100"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeHashtag(tag)}
                        className="text-blue-400 hover:text-blue-700 ml-1 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Media Uploader with Auto-Detection & Delete Button */}
              <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/60">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    {mediaType === 'video' ? (
                      <Video className="w-4 h-4 text-[#1877F2]" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-[#1877F2]" />
                    )}
                    Video / Reel Media File
                  </span>
                  {mediaUrl && (
                    <button
                      type="button"
                      onClick={handleDeleteMedia}
                      className="text-[11px] text-red-500 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer bg-red-50 px-2 py-0.5 rounded-md"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete Video
                    </button>
                  )}
                </div>

                {mediaUrl ? (
                  <div className="flex items-center space-x-3 bg-white p-2 rounded-xl border border-slate-200">
                    <div className="w-16 h-16 rounded-lg bg-black overflow-hidden shrink-0 flex items-center justify-center">
                      {mediaType === 'video' ? (
                        <video src={mediaUrl} className="w-full h-full object-cover" muted />
                      ) : (
                        <img src={mediaUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-bold text-slate-900">
                        {mediaType === 'video' ? 'Video File Attached' : 'Image Attached'}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Ratio: <strong className="text-[#1877F2]">{aspectRatio}</strong> · Resolution: {videoResolution}
                      </p>
                      {videoDuration > 0 && mediaType === 'video' && (
                        <p className="text-[10px] text-slate-400">Duration: {videoDuration} seconds</p>
                      )}
                    </div>
                    <label className="text-[11px] font-bold text-[#1877F2] bg-[#E7F3FF] hover:bg-blue-100 px-3 py-1.5 rounded-lg cursor-pointer">
                      Replace
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/*,image/*"
                        onChange={handleMediaUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-300 hover:border-[#1877F2] rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white">
                    <Video className="w-7 h-7 text-slate-400 mb-1.5" />
                    <span className="text-xs font-bold text-slate-700">
                      Upload Reel or Video (MP4 / MOV)
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">
                      Automatically detects 9:16 vertical reels, 1:1 square & 4:5 portrait
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*,image/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                    />
                  </label>
                )}

                {/* Sample reel presets */}
                <div className="mt-2.5 flex items-center space-x-2">
                  <span className="text-[10px] text-slate-400 font-semibold">Test Reel Sample:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaType('video');
                      setPostFormat('reel');
                      setAspectRatio('9:16');
                      setMediaUrl('https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4');
                      setVideoResolution('1080 × 1920 (9:16 Reel)');
                      setVideoDuration(15);
                    }}
                    className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700 hover:bg-slate-100 cursor-pointer font-bold"
                  >
                    Load 9:16 Neon Reel
                  </button>
                </div>
              </div>

              {/* High Quality Mode Toggle */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      High Quality Mode (1080p HD / 4K Preservation)
                      <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full">
                        RECOMMENDED
                      </span>
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      Prevents Meta compression artifacts; ensures maximum reel clarity
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isHighQuality}
                    onChange={(e) => setIsHighQuality(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#1877F2]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Previews (Col 5) */}
          <div className="lg:col-span-5 bg-slate-50/70 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Live Preview: {postFormat === 'reel' ? 'Reel 9:16' : 'Feed Post'}
                </span>
                <div className="flex bg-slate-200/80 p-0.5 rounded-xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('instagram')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activePreviewTab === 'instagram'
                        ? 'bg-white text-rose-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Instagram
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('facebook')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      activePreviewTab === 'facebook'
                        ? 'bg-white text-[#1877F2] shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Facebook
                  </button>
                </div>
              </div>

              {/* Dynamic Preview Canvas: Reel vs Feed */}
              <div className="flex items-center justify-center py-1">
                {postFormat === 'reel' || postFormat === 'story' ? (
                  <ReelPreview
                    platform={activePreviewTab}
                    username={
                      activePreviewTab === 'instagram'
                        ? sampleIg?.username || 'instagram_creator'
                        : sampleFb?.name || 'Facebook Page'
                    }
                    avatarUrl={
                      activePreviewTab === 'instagram'
                        ? sampleIg?.avatarUrl || ''
                        : sampleFb?.avatarUrl || ''
                    }
                    caption={caption}
                    hashtags={hashtags}
                    videoUrl={mediaType === 'video' ? mediaUrl : undefined}
                    isHighQuality={isHighQuality}
                  />
                ) : activePreviewTab === 'facebook' ? (
                  <FacebookPreview
                    pageName={sampleFb?.name || 'Your Facebook Page'}
                    avatarUrl={sampleFb?.avatarUrl || ''}
                    caption={caption}
                    hashtags={hashtags}
                    imageUrl={mediaUrl}
                  />
                ) : (
                  <InstagramPreview
                    username={sampleIg?.username || 'instagram_creator'}
                    avatarUrl={sampleIg?.avatarUrl || ''}
                    caption={caption}
                    hashtags={hashtags}
                    imageUrl={mediaUrl}
                  />
                )}
              </div>
            </div>

            <div className="mt-3 text-center text-[10px] text-slate-400 font-medium">
              Aspect Ratio Canvas: <strong className="text-slate-700">{aspectRatio}</strong>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-[#2a2d34] bg-[#16171b] flex items-center justify-between">
          <div className="text-xs text-slate-400 font-medium">
            Publishing to: <strong className="text-white">{selectedAccountIds.length}</strong> selected channels
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-[#26282f] rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <div className="inline-flex rounded-xl shadow-xs">
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="flex items-center space-x-2 bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] px-5 py-2.5 rounded-l-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                {isPublishing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#101114] border-t-transparent rounded-full animate-spin" />
                    <span>Publishing Reel...</span>
                  </>
                ) : publishingAction === 'now' ? (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish {postFormat === 'reel' ? 'Reel' : 'Post'} Now</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Schedule {postFormat === 'reel' ? 'Reel' : 'Post'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  setPublishingAction((prev) => (prev === 'now' ? 'queue' : 'now'))
                }
                className="bg-[#7ecf7a] hover:bg-[#6ec06a] text-[#101114] px-2.5 py-2.5 rounded-r-xl border-l border-[#6ebd69] flex items-center justify-center cursor-pointer"
                title="Switch between Publish Now and Add to Queue"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
