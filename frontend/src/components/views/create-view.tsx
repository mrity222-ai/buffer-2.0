'use client';

import React, { useState } from 'react';
import {
  Lightbulb,
  Bookmark,
  Plus,
  Sparkles,
  Tag,
  LayoutGrid,
  Kanban,
  MoreHorizontal,
  X,
  ArrowRight,
  Share2
} from 'lucide-react';

interface IdeaItem {
  id: string;
  title: string;
  description: string;
  status: 'unassigned' | 'todo' | 'inprogress' | 'done';
  tags?: string[];
  hasImage?: boolean;
}

const INITIAL_IDEAS: IdeaItem[] = [
  {
    id: 'idea-1',
    title: 'This is a place to plan your content 🔥',
    description: 'Save your ideas before converting them into posts. Brainstorm, plan themes, and prepare your 9:16 vertical video scripts.',
    status: 'unassigned',
    tags: ['Strategy', 'Planning'],
  },
  {
    id: 'idea-2',
    title: 'Save inspirations you find online with one click 💡',
    description: 'Use Maeaco ploit browser extension or quick capture to save viral reels, hooks, and captions from Instagram & Facebook.',
    status: 'unassigned',
    tags: ['Inspiration'],
    hasImage: true,
  },
];

interface CreateViewProps {
  onOpenComposerWithIdea?: (text: string) => void;
}

export function CreateView({ onOpenComposerWithIdea }: CreateViewProps) {
  const [ideas, setIdeas] = useState<IdeaItem[]>(INITIAL_IDEAS);
  const [activeSubTab, setActiveSubTab] = useState<'ideas' | 'templates' | 'feeds'>('ideas');
  const [viewMode, setViewMode] = useState<'board' | 'gallery'>('board');
  const [isNewIdeaModalOpen, setIsNewIdeaModalOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  // Form states
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDesc, setIdeaDesc] = useState('');
  const [ideaTargetColumn, setIdeaTargetColumn] = useState<'unassigned' | 'todo' | 'inprogress' | 'done'>('unassigned');

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle.trim()) return;

    const newIdea: IdeaItem = {
      id: `idea-${Date.now()}`,
      title: ideaTitle,
      description: ideaDesc,
      status: ideaTargetColumn,
      tags: ['New'],
    };

    setIdeas([...ideas, newIdea]);
    setIdeaTitle('');
    setIdeaDesc('');
    setIsNewIdeaModalOpen(false);
  };

  const handleMoveIdea = (id: string, newStatus: IdeaItem['status']) => {
    setIdeas(ideas.map(i => i.id === id ? { ...i, status: newStatus } : i));
  };

  const handleDeleteIdea = (id: string) => {
    setIdeas(ideas.filter(i => i.id !== id));
  };

  const columns: { key: IdeaItem['status']; title: string }[] = [
    { key: 'unassigned', title: 'Unassigned' },
    { key: 'todo', title: 'To Do' },
    { key: 'inprogress', title: 'In Progress' },
    { key: 'done', title: 'Done' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-sans text-white">
      {/* Top Bar matching Image 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26282f] pb-4">
        {/* Title & Icon */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#1e2025] flex items-center justify-center text-amber-300">
            <Lightbulb className="w-5 h-5 text-amber-300" />
          </div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-white tracking-tight">Create</h1>
            <Bookmark className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Right CTA Actions matching Image 3 */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsGenerateModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#1e2025] hover:bg-[#26282f] border border-[#2a2d34] text-xs font-bold text-slate-200 hover:text-white flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8fd98b]" />
            <span>Generate Ideas</span>
          </button>

          <button
            onClick={() => {
              setIdeaTargetColumn('unassigned');
              setIsNewIdeaModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold flex items-center space-x-1.5 transition-all active:scale-98 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#101114] stroke-[3]" />
            <span>New Idea</span>
          </button>
        </div>
      </div>

      {/* Sub-tabs & Filter Controls matching Image 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Sub-tabs */}
        <div className="flex items-center space-x-6 border-b border-transparent text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('ideas')}
            className={`pb-2 transition-colors cursor-pointer border-b-2 ${activeSubTab === 'ideas'
              ? 'text-white border-[#8fd98b]'
              : 'text-slate-400 border-transparent hover:text-white'
              }`}
          >
            Ideas
          </button>
          <button
            onClick={() => setActiveSubTab('templates')}
            className={`pb-2 transition-colors cursor-pointer border-b-2 ${activeSubTab === 'templates'
              ? 'text-white border-[#8fd98b]'
              : 'text-slate-400 border-transparent hover:text-white'
              }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveSubTab('feeds')}
            className={`pb-2 transition-colors cursor-pointer border-b-2 ${activeSubTab === 'feeds'
              ? 'text-white border-[#8fd98b]'
              : 'text-slate-400 border-transparent hover:text-white'
              }`}
          >
            Feeds
          </button>
        </div>

        {/* View Switches & Tags */}
        <div className="flex items-center space-x-3 text-xs">
          <button className="flex items-center space-x-1 text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-[#1e2025] cursor-pointer">
            <Tag className="w-3.5 h-3.5" />
            <span>Tags</span>
            <span className="text-[10px]">▼</span>
          </button>

          <div className="flex items-center p-0.5 rounded-lg bg-[#1e2025] border border-[#2a2d34]">
            <button
              onClick={() => setViewMode('board')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md font-semibold cursor-pointer ${viewMode === 'board'
                ? 'bg-[#2a2d34] text-white'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <Kanban className="w-3.5 h-3.5 text-[#8fd98b]" />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('gallery')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-md font-semibold cursor-pointer ${viewMode === 'gallery'
                ? 'bg-[#2a2d34] text-white'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Gallery</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board matching Image 3 */}
      {activeSubTab === 'ideas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start overflow-x-auto pb-6">
          {columns.map((col) => {
            const colIdeas = ideas.filter((i) => i.status === col.key);
            return (
              <div
                key={col.key}
                className="bg-[#16171b] rounded-2xl border border-[#26282f] p-3.5 flex flex-col min-h-[480px] justify-between shadow-xs"
              >
                <div>
                  {/* Column Header matching Image 3 */}
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xs font-bold text-white">{col.title}</h3>
                      <span className="text-[11px] font-semibold text-slate-400 bg-[#26282f] px-1.5 py-0.2 rounded">
                        {colIdeas.length}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-slate-400">
                      <button
                        onClick={() => {
                          setIdeaTargetColumn(col.key);
                          setIsNewIdeaModalOpen(true);
                        }}
                        className="p-1 hover:text-white hover:bg-[#26282f] rounded cursor-pointer"
                        title="Add Idea"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1 hover:text-white hover:bg-[#26282f] rounded cursor-pointer">
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Cards List */}
                  <div className="space-y-3">
                    {colIdeas.map((idea) => (
                      <div
                        key={idea.id}
                        className="bg-[#1e2025] hover:bg-[#252830] border border-[#2a2d34] rounded-xl p-3.5 text-xs transition-all shadow-xs group"
                      >
                        {/* Image Mockup for Idea 2 matching Image 3 */}
                        {idea.hasImage && (
                          <div className="mb-3 rounded-lg bg-gradient-to-br from-slate-800 to-indigo-950 p-3 border border-indigo-500/20 text-center">
                            <div className="inline-block bg-white text-slate-900 px-3 py-1 rounded-md text-[10px] font-black shadow-xs mb-1">
                              Create Post
                            </div>
                            <p className="text-[9px] text-indigo-300 font-bold">Save to Ideas</p>
                          </div>
                        )}

                        <h4 className="font-bold text-white leading-snug">{idea.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                          {idea.description}
                        </p>

                        {/* Tags & Action Bar */}
                        <div className="mt-3 pt-2.5 border-t border-[#2a2d34] flex items-center justify-between text-[10px]">
                          <div className="flex items-center space-x-1">
                            {idea.tags?.map((t, idx) => (
                              <span key={idx} className="bg-[#26282f] text-slate-300 px-1.5 py-0.5 rounded font-medium">
                                #{t}
                              </span>
                            ))}
                          </div>

                          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5">
                            {col.key !== 'done' && (
                              <button
                                onClick={() => {
                                  const nextStatus = col.key === 'unassigned' ? 'todo' : col.key === 'todo' ? 'inprogress' : 'done';
                                  handleMoveIdea(idea.id, nextStatus);
                                }}
                                className="text-[#8fd98b] hover:underline font-bold"
                              >
                                Move &gt;
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteIdea(idea.id)}
                              className="text-red-400 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom "+ New Idea" button matching Image 3 */}
                <button
                  onClick={() => {
                    setIdeaTargetColumn(col.key);
                    setIsNewIdeaModalOpen(true);
                  }}
                  className="mt-3 w-full py-2 border border-dashed border-[#2a2d34] hover:border-[#8fd98b] rounded-xl text-xs text-slate-400 hover:text-[#8fd98b] font-medium flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Idea</span>
                </button>
              </div>
            );
          })}
        </div>
      )}


      {/* template code */}
      {activeSubTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
          {[
            {
              title: 'Instagram Reel',
              description: 'Create engaging short-form video content.',
            },
            {
              title: 'Product Promotion',
              description: 'Promote your product with attractive content.',
            },
            {
              title: 'Educational Carousel',
              description: 'Share educational tips in multiple slides.',
            },
          ].map((template) => (
            <div
              key={template.title}
              className="bg-[#1e2025] border border-[#2a2d34] rounded-xl p-5 text-white"
            >
              <h3 className="font-bold text-sm mb-2">{template.title}</h3>
              <p className="text-xs text-slate-400 mb-4">
                {template.description}
              </p>
              <button
                onClick={() => {
                  setIdeaTitle(template.title);
                  setIdeaDesc(template.description);
                  setIdeaTargetColumn('unassigned');
                  setIsNewIdeaModalOpen(true);
                }}
                className="bg-[#8fd98b] text-black px-4 py-2 rounded-lg text-xs font-semibold"
              >
                Use Template
              </button>
            </div>
          ))}
        </div>
      )}


      {/* feeds code */}
      {activeSubTab === 'feeds' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6">
          {[
            {
              title: 'Trending Content',
              description: 'Explore trending topics and create engaging posts.',
              tag: 'Trending',
            },
            {
              title: 'Industry Updates',
              description: 'Stay updated with the latest industry news and ideas.',
              tag: 'Updates',
            },
            {
              title: 'Content Inspiration',
              description: 'Discover fresh ideas for your next social media post.',
              tag: 'Inspiration',
            },
          ].map((feed) => (
            <div
              key={feed.title}
              className="bg-[#1e2025] border border-[#2a2d34] rounded-xl p-5 text-white"
            >
              <span className="text-[10px] text-[#8fd98b] font-bold">
                {feed.tag}
              </span>
              <h3 className="font-bold text-sm mt-2 mb-2">{feed.title}</h3>
              <p className="text-xs text-slate-400">{feed.description}</p>
            </div>
          ))}
        </div>
      )}


      {/* New Idea Modal */}
      {isNewIdeaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#1e2025] border border-[#2a2d34] rounded-2xl max-w-md w-full p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-300" />
                <span>Add Idea to {columns.find(c => c.key === ideaTargetColumn)?.title}</span>
              </h3>
              <button onClick={() => setIsNewIdeaModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddIdea} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Idea Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Viral Reel hooks for Monday engagement..."
                  value={ideaTitle}
                  onChange={(e) => setIdeaTitle(e.target.value)}
                  className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#8fd98b]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Notes & Inspiration</label>
                <textarea
                  rows={3}
                  placeholder="Draft caption, hashtags, audio track references or script notes..."
                  value={ideaDesc}
                  onChange={(e) => setIdeaDesc(e.target.value)}
                  className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#8fd98b]"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewIdeaModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Save Idea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Generate Ideas Modal */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#1e2025] border border-[#2a2d34] rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8fd98b]" />
                <span>Maeaco ploit AI Idea Generator</span>
              </h3>
              <button onClick={() => setIsGenerateModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Select one of the suggested high-converting social hooks or generate customized ideas for Facebook Pages & Instagram Reels:
            </p>

            <div className="space-y-2.5 text-xs">
              {[
                { title: 'Behind the Scenes: How our studio builds content 🎬', tag: 'Storytelling' },
                { title: '3 Common mistakes creators make with 9:16 vertical video ❌', tag: 'Educational' },
                { title: 'Weekly Q&A: Answering your top 5 social strategy questions 💬', tag: 'Community' },
                { title: 'Productivity breakdown: Tools we use to save 10 hours weekly ⚡', tag: 'Productivity' },
              ].map((rec, i) => (
                <div
                  key={i}
                  className="p-3 bg-[#16171b] hover:bg-[#26282f] rounded-xl border border-[#2a2d34] flex items-center justify-between group cursor-pointer transition-colors"
                  onClick={() => {
                    setIdeas([...ideas, {
                      id: `idea-${Date.now()}-${i}`,
                      title: rec.title,
                      description: 'AI Generated social post angle ready to draft into queue.',
                      status: 'unassigned',
                      tags: [rec.tag],
                    }]);
                    setIsGenerateModalOpen(false);
                  }}
                >
                  <div>
                    <p className="font-bold text-white">{rec.title}</p>
                    <span className="text-[10px] text-[#8fd98b] font-medium">#{rec.tag}</span>
                  </div>
                  <button className="text-xs font-bold text-[#8fd98b] opacity-0 group-hover:opacity-100 transition-opacity">
                    Add +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
