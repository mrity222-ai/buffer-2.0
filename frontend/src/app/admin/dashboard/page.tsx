'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminOverviewView } from '@/components/admin/views/admin-overview-view';
import { AdminMembersView } from '@/components/admin/views/admin-members-view';
import { AdminPackagesView } from '@/components/admin/views/admin-packages-view';
import { AdminEngineView } from '@/components/admin/views/admin-engine-view';
import { AdminAnalyticsView } from '@/components/admin/views/admin-analytics-view';
import { AdminSettingsView } from '@/components/admin/views/admin-settings-view';
import { CreatePackageModal } from '@/components/admin/create-package-modal';
import { useAuth } from '@/lib/auth-context';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { admin, logoutAdmin } = useAuth();

  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [isCreatePackageOpen, setIsCreatePackageOpen] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#101114] text-white font-sans antialiased overflow-hidden selection:bg-[#8fd98b] selection:text-[#101114]">
      {/* Left Admin Buffer Dark Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenCreatePackage={() => setIsCreatePackageOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#101114]">
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {currentTab === 'overview' && (
            <AdminOverviewView
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenCreatePackage={() => setIsCreatePackageOpen(true)}
            />
          )}

          {currentTab === 'members' && (
            <AdminMembersView />
          )}

          {currentTab === 'packages' && (
            <AdminPackagesView
              onOpenCreatePackage={() => setIsCreatePackageOpen(true)}
            />
          )}

          {currentTab === 'engine' && (
            <AdminEngineView />
          )}

          {currentTab === 'analytics' && (
            <AdminAnalyticsView />
          )}

          {currentTab === 'settings' && (
            <AdminSettingsView />
          )}
        </main>
      </div>

      {/* Create Package Dynamic Modal */}
      <CreatePackageModal
        isOpen={isCreatePackageOpen}
        onClose={() => setIsCreatePackageOpen(false)}
      />
    </div>
  );
}
