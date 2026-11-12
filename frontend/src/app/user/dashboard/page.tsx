'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { TopHeader } from '@/components/top-header';
import { QueueView } from '@/components/queue-view';
import { AccountsView } from '@/components/accounts-view';
import { HistoryView } from '@/components/history-view';
import { SettingsView } from '@/components/settings-view';
import { ComposerModal } from '@/components/composer-modal';
import { INITIAL_ACCOUNTS, INITIAL_POSTS } from '@/lib/mock-data';
import { SocialAccount, PostItem } from '@/types';
import { useAuth } from '@/lib/auth-context';
import { LogOut } from 'lucide-react';

export default function UserDashboardPage() {
  const router = useRouter();
  const { user, logoutUser } = useAuth();

  const [currentTab, setCurrentTab] = useState<string>('queue');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [accounts, setAccounts] = useState<SocialAccount[]>(INITIAL_ACCOUNTS);
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_POSTS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Restore posts & accounts
  useEffect(() => {
    try {
      const savedAccounts = localStorage.getItem('sp_accounts');
      if (savedAccounts) setAccounts(JSON.parse(savedAccounts));

      const savedPosts = localStorage.getItem('sp_posts');
      if (savedPosts) setPosts(JSON.parse(savedPosts));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const updatePosts = (newPosts: PostItem[]) => {
    setPosts(newPosts);
    try {
      localStorage.setItem('sp_posts', JSON.stringify(newPosts));
    } catch (e) {}
  };

  const updateAccounts = (newAccounts: SocialAccount[]) => {
    setAccounts(newAccounts);
    try {
      localStorage.setItem('sp_accounts', JSON.stringify(newAccounts));
    } catch (e) {}
  };

  const handlePublishPost = (newPostData: Omit<PostItem, 'id' | 'createdAt'>) => {
    const newPost: PostItem = {
      ...newPostData,
      id: `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    updatePosts([newPost, ...posts]);
  };

  const handlePublishNow = (postId: string) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          status: 'published' as const,
          publishedAt: 'Just now',
          targets: post.targets.map((tgt) => ({
            ...tgt,
            status: 'published' as const,
            publishedAt: 'Just now',
            permalink:
              tgt.platform === 'facebook_page'
                ? `https://facebook.com/${tgt.accountUsername}/posts/${Date.now()}`
                : `https://instagram.com/reel/live_${Date.now()}`,
          })),
        };
      }
      return post;
    });
    updatePosts(updated);
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post/reel?')) {
      updatePosts(posts.filter((p) => p.id !== postId));
    }
  };

  const handleRetryTarget = (postId: string, accountId: string) => {
    const updated = posts.map((post) => {
      if (post.id === postId) {
        const updatedTargets = post.targets.map((tgt) => {
          if (tgt.accountId === accountId) {
            return {
              ...tgt,
              status: 'published' as const,
              errorMessage: undefined,
              publishedAt: 'Retried successfully just now',
              permalink: `https://instagram.com/reel/retry_${Date.now()}`,
            };
          }
          return tgt;
        });

        const hasRemainingFailures = updatedTargets.some((t) => t.status === 'failed');
        return {
          ...post,
          targets: updatedTargets,
          status: hasRemainingFailures ? ('partially_published' as const) : ('published' as const),
        };
      }
      return post;
    });
    updatePosts(updated);
  };

  const handleAddAccount = (account: SocialAccount) => {
    updateAccounts([...accounts, account]);
  };

  const handleRemoveAccount = (id: string) => {
    if (confirm('Disconnect this social channel?')) {
      updateAccounts(accounts.filter((a) => a.id !== id));
      if (selectedAccountId === id) setSelectedAccountId(null);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleUserLogout = () => {
    logoutUser();
    router.push('/user/login');
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased overflow-hidden">
      {/* Left Channel Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        accounts={accounts}
        selectedAccountId={selectedAccountId}
        setSelectedAccountId={setSelectedAccountId}
        onOpenConnectModal={() => setCurrentTab('accounts')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white">
          <div className="flex-1">
            <TopHeader
              accounts={accounts}
              selectedAccountId={selectedAccountId}
              onOpenComposer={() => setIsComposerOpen(true)}
              activeTab={currentTab}
              setActiveTab={setCurrentTab}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />
          </div>

          {/* User Signout quick pill */}
          <div className="pr-6 bg-white flex items-center space-x-2">
            <button
              onClick={handleUserLogout}
              className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center space-x-1 p-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
              title="Logout from User Account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {currentTab === 'queue' && (
              <QueueView
                posts={posts}
                accounts={accounts}
                selectedAccountId={selectedAccountId}
                onOpenComposer={() => setIsComposerOpen(true)}
                onPublishNow={handlePublishNow}
                onDeletePost={handleDeletePost}
              />
            )}

            {currentTab === 'history' && (
              <HistoryView posts={posts} onRetryTarget={handleRetryTarget} />
            )}

            {currentTab === 'accounts' && (
              <AccountsView
                accounts={accounts}
                onAddAccount={handleAddAccount}
                onRemoveAccount={handleRemoveAccount}
              />
            )}

            {currentTab === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>

      {/* Video & Reels Post Composer */}
      <ComposerModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        accounts={accounts}
        onPublishPost={handlePublishPost}
      />
    </div>
  );
}
