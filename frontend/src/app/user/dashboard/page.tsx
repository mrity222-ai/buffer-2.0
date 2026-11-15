'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BufferSidebar } from '@/components/buffer-sidebar';
import { HomeView } from '@/components/views/home-view';
import { CreateView } from '@/components/views/create-view';
import { PublishView } from '@/components/views/publish-view';
import { CommunityView } from '@/components/views/community-view';
import { InsightsView } from '@/components/views/insights-view';
import { SettingsShell } from '@/components/settings/settings-shell';
import { ComposerModal } from '@/components/composer-modal';
import { UpgradeModal } from '@/components/upgrade-modal';
import { ConnectChannelModal } from '@/components/connect-channel-modal';
import { INITIAL_ACCOUNTS, INITIAL_POSTS } from '@/lib/mock-data';
import { SocialAccount, PostItem } from '@/types';
import { useAuth } from '@/lib/auth-context';

export default function UserDashboardPage() {
  const router = useRouter();
  const { user, logoutUser } = useAuth();

  // Navigation state (Default 'home' matching Image 2)
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [settingsInitialTab, setSettingsInitialTab] = useState<string>('profile');

  // Modals state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<string | undefined>(undefined);

  // Accounts & Posts state
  const [accounts, setAccounts] = useState<SocialAccount[]>(INITIAL_ACCOUNTS);
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_POSTS);

  // Restore posts & accounts from localStorage
  useEffect(() => {
    try {
      const savedAccounts = localStorage.getItem('sp_accounts');
      if (savedAccounts) setAccounts(JSON.parse(savedAccounts));

      const savedPosts = localStorage.getItem('sp_posts');
      if (savedPosts) setPosts(JSON.parse(savedPosts));
    } catch (e) {
      console.warn('LocalStorage restore error:', e);
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
    if (confirm('Are you sure you want to delete this scheduled post?')) {
      updatePosts(posts.filter((p) => p.id !== postId));
    }
  };

  const handleAddAccount = (account: SocialAccount) => {
    updateAccounts([...accounts, account]);
  };

  const handleNavigateSettings = (tab: string = 'profile') => {
    setSettingsInitialTab(tab);
    setCurrentTab('settings');
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/user/login');
  };

  // If in Settings view, render SettingsShell full layout matching Images 7-10
  if (currentTab === 'settings') {
    return (
      <SettingsShell
        initialTab={settingsInitialTab}
        onBackToDashboard={() => setCurrentTab('home')}
        onOpenConnectModal={() => setIsConnectModalOpen(true)}
        onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
        accounts={accounts}
      />
    );
  }

  return (
    <div className="flex h-screen bg-[#101114] text-white font-sans antialiased overflow-hidden selection:bg-[#8fd98b] selection:text-[#101114]">
      {/* Left Buffer Dark Sidebar matching Image 2 */}
      <BufferSidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        accounts={accounts}
        onOpenComposer={() => setIsComposerOpen(true)}
        onOpenConnectModal={() => setIsConnectModalOpen(true)}
        onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
        onNavigateSettings={handleNavigateSettings}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#101114]">
        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {currentTab === 'home' && (
            <HomeView
              onOpenComposer={() => setIsComposerOpen(true)}
              onOpenConnectModal={() => setIsConnectModalOpen(true)}
              onNavigateTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'create' && (
            <CreateView
              onOpenComposerWithIdea={(text) => {
                setIsComposerOpen(true);
              }}
            />
          )}

          {currentTab === 'publish' && (
            <PublishView
              posts={posts}
              accounts={accounts}
              onOpenComposer={() => setIsComposerOpen(true)}
              onPublishNow={handlePublishNow}
              onDeletePost={handleDeletePost}
            />
          )}

          {currentTab === 'community' && (
            <CommunityView
              onOpenConnectModal={() => setIsConnectModalOpen(true)}
            />
          )}

          {currentTab === 'insights' && (
            <InsightsView
              onOpenConnectModal={() => setIsConnectModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Video & Reels Post Composer (9:16 Auto-Detect) */}
      <ComposerModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
        accounts={accounts}
        onPublishPost={handlePublishPost}
      />

      {/* Channel Connection Modal */}
      <ConnectChannelModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
        onAddAccount={handleAddAccount}
        onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
        accountsCount={accounts.length}
        channelLimit={3}
      />

      {/* In-App Dynamic Upgrade Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        reason={upgradeReason}
      />
    </div>
  );
}
