'use client';

import React, { useState } from 'react';
import { 
  X, 
  Image as ImageIcon, 
  Smile, 
  Hash, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Send, 
  Calendar,
  Layers,
  ChevronDown,
  Trash2
} from 'lucide-react';
import { SocialAccount, MediaAttachment, PostItem } from '@/types';
import { FacebookPreview } from './previews/facebook-preview';
import { InstagramPreview } from './previews/instagram-preview';

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

  // Selected accounts state
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>(
    accounts.map((a) => a.id)
  );
  const [caption, setCaption] = useState('');
  const [activePreviewTab, setActivePreviewTab] = useState<'facebook' | 'instagram'>('facebook');
  const [mediaUrl, setMediaUrl] = useState<string>(
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80'
  );
  const [hashtags, setHashtags] = useState<string[]>(['#SocialPublisher', '#Growth']);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishingAction, setPublishingAction] = useState<'now' | 'queue'>('now');

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

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setMediaUrl(fakeUrl);
    }
  };

  const handlePublish = () => {
    if (!caption.trim() && !mediaUrl) {
      alert('Please add a caption or an image before publishing.');
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
          ? `https://facebook.com/${acc.username}/posts/${Date.now()}`
          : `https://instagram.com/p/mock_${Date.now()}`,
      publishedAt: publishingAction === 'now' ? 'Just now' : undefined,
    }));

    const mediaList: MediaAttachment[] = mediaUrl
      ? [
          {
            id: `media-${Date.now()}`,
            url: mediaUrl,
            type: 'image',
            name: 'uploaded-asset.jpg',
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
        scheduledTime: publishingAction === 'queue' ? 'Today at 5:00 PM' : undefined,
        publishedAt: publishingAction === 'now' ? 'Just now' : undefined,
      });

      setIsPublishing(false);
      onClose();
    }, 600);
  };

  // Find sample preview accounts
  const sampleFb = accounts.find((a) => a.platform === 'facebook_page') || accounts[0];
  const sampleIg = accounts.find((a) => a.platform === 'instagram_business') || accounts[0];

  const charCount = caption.length;
  const isOverInstagramLimit = charCount > 2200;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              ✍️
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Create New Social Post</h3>
              <p className="text-xs text-slate-500">
                Craft once and broadcast simultaneously to Facebook Pages & Instagram
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channel Selector Bar (Buffer signature) */}
        <div className="px-6 py-3 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            <span className="text-xs font-semibold text-slate-500 mr-1">Post to:</span>
            {accounts.map((acc) => {
              const isSelected = selectedAccountIds.includes(acc.id);
              return (
                <button
                  key={acc.id}
                  onClick={() => toggleAccount(acc.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-xs'
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
                          ? 'bg-blue-600'
                          : 'bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600'
                      }`}
                    >
                      {acc.platform === 'facebook_page' ? 'f' : 'ig'}
                    </div>
                  </div>
                  <span className="truncate max-w-[130px] font-semibold">{acc.name}</span>
                  {isSelected && (
                    <span className="w-3.5 h-3.5 bg-purple-600 rounded-full flex items-center justify-center text-white text-[9px]">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={selectAll}
            className="text-xs font-semibold text-purple-600 hover:text-purple-700 hover:underline cursor-pointer"
          >
            {selectedAccountIds.length === accounts.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>

        {/* Main Body: 2 Columns (Left: Editor, Right: Previews) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {/* Left Column: Editor (Col 7) */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Caption Textarea */}
              <div className="relative">
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="What's happening? Write your post caption here..."
                  rows={6}
                  className="w-full text-sm text-slate-800 placeholder-slate-400 p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all resize-none leading-relaxed"
                />

                {/* Counter & Warning */}
                <div className="flex items-center justify-between text-xs text-slate-400 px-1 pt-1">
                  <div className="flex items-center space-x-2">
                    <span className={isOverInstagramLimit ? 'text-red-600 font-bold' : ''}>
                      {charCount} characters
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="text-[11px] text-slate-500">
                      IG limit: 2,200 · FB limit: 63k
                    </span>
                  </div>
                  {isOverInstagramLimit && (
                    <span className="text-red-500 flex items-center gap-1 font-semibold text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Caption exceeds Instagram limit!
                    </span>
                  )}
                </div>
              </div>

              {/* Hashtag Quick Chips */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Hash className="w-3.5 h-3.5 text-purple-600" />
                    Hashtag Tray
                  </span>
                  <div className="flex gap-1 text-[11px] text-purple-600 font-medium">
                    <button
                      onClick={() => addHashtag('#DigitalMarketing')}
                      className="hover:underline cursor-pointer"
                    >
                      + #DigitalMarketing
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => addHashtag('#StartupLife')}
                      className="hover:underline cursor-pointer"
                    >
                      + #StartupLife
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => removeHashtag(tag)}
                        className="text-purple-400 hover:text-purple-700 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Media Uploader Section */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-purple-600" />
                    Media Attachment (Photo / Video)
                  </span>
                  {mediaUrl && (
                    <button
                      onClick={() => setMediaUrl('')}
                      className="text-[11px] text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove Media
                    </button>
                  )}
                </div>

                {mediaUrl ? (
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-[16/9] max-h-48 bg-slate-900 group">
                    <img
                      src={mediaUrl}
                      alt="Selected upload"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <label className="bg-white text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm cursor-pointer hover:bg-slate-100">
                        Replace Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleMediaUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-slate-300 hover:border-purple-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-white">
                    <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                    <span className="text-xs font-semibold text-slate-700">
                      Upload photo or video
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      Drag & drop or browse from computer
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                    />
                  </label>
                )}

                {/* Sample Presets for quick testing */}
                <div className="mt-3 flex items-center space-x-2">
                  <span className="text-[11px] text-slate-400">Quick Test Samples:</span>
                  <button
                    onClick={() =>
                      setMediaUrl(
                        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&auto=format&fit=crop&q=80'
                      )
                    }
                    className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600 hover:bg-slate-100"
                  >
                    Office Team
                  </button>
                  <button
                    onClick={() =>
                      setMediaUrl(
                        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80'
                      )
                    }
                    className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600 hover:bg-slate-100"
                  >
                    Abstract 3D
                  </button>
                </div>
              </div>
            </div>

            {/* Meta API Note */}
            <div className="bg-purple-50/60 border border-purple-100 rounded-lg p-3 text-xs text-purple-800 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <p>
                <strong>Multi-Publishing Pipeline:</strong> We will dispatch simultaneous parallel
                publishing jobs to Meta Graph API for each selected destination.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Previews (Col 5) */}
          <div className="lg:col-span-5 bg-slate-50/60 p-6 flex flex-col">
            {/* Preview Switcher Tabs */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Live Channel Preview
              </span>
              <div className="flex bg-slate-200/80 p-0.5 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setActivePreviewTab('facebook')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activePreviewTab === 'facebook'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Facebook
                </button>
                <button
                  onClick={() => setActivePreviewTab('instagram')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activePreviewTab === 'instagram'
                      ? 'bg-white text-rose-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Instagram
                </button>
              </div>
            </div>

            {/* Preview Canvas */}
            <div className="flex-1 flex items-center justify-center py-2">
              {activePreviewTab === 'facebook' ? (
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
        </div>

        {/* Modal Footer / Action Bar (Buffer style) */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Selected: <strong className="text-slate-800">{selectedAccountIds.length}</strong> accounts
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {/* Publishing Mode Selector */}
            <div className="inline-flex rounded-xl shadow-xs">
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-l-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                {isPublishing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Publishing to Meta...</span>
                  </>
                ) : publishingAction === 'now' ? (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish to All Now</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Add to Queue (Schedule)</span>
                  </>
                )}
              </button>

              <button
                onClick={() =>
                  setPublishingAction((prev) => (prev === 'now' ? 'queue' : 'now'))
                }
                className="bg-purple-700 hover:bg-purple-800 text-white px-2.5 py-2.5 rounded-r-xl border-l border-purple-500 flex items-center justify-center cursor-pointer"
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
