'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Sliders, 
  Bell, 
  Building, 
  ShieldCheck, 
  Share2, 
  CreditCard, 
  Tag, 
  FolderSync, 
  MessageSquare, 
  Code, 
  Grid, 
  FlaskConical, 
  Gift, 
  Zap, 
  Check, 
  AlertTriangle, 
  Trash2, 
  Plus, 
  Minus,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { SocialAccount } from '@/types';

interface SettingsShellProps {
  initialTab?: string;
  onBackToDashboard: () => void;
  onOpenConnectModal: () => void;
  onOpenUpgradeModal: () => void;
  accounts: SocialAccount[];
}

export function SettingsShell({
  initialTab = 'profile',
  onBackToDashboard,
  onOpenConnectModal,
  onOpenUpgradeModal,
  accounts,
}: SettingsShellProps) {
  const { user, upgradeUserPlan, logoutUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Profile Form state
  const [name, setName] = useState(user?.name || 'Info.avedatechnologies');
  const [email, setEmail] = useState(user?.email || 'info.avedatechnologies@gmail.com');
  const [backupEmail, setBackupEmail] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [profileSavedToast, setProfileSavedToast] = useState(false);

  // Preferences Form state
  const [appearance, setAppearance] = useState('Dark');
  const [timezone, setTimezone] = useState('Kolkata');
  const [timeFormat, setTimeFormat] = useState('12-hour');
  const [startOfWeek, setStartOfWeek] = useState('Sunday');
  const [landingPage, setLandingPage] = useState('Buffer Home');
  const [postingAction, setPostingAction] = useState('Next Available');
  const [mentionsCounter, setMentionsCounter] = useState('Counter');

  // Billing Tab state
  const [billingCycle, setBillingCycle] = useState<'yearly' | 'monthly'>('yearly');
  const [channelQty, setChannelQty] = useState(1);

  const handleSaveProfile = (field: string) => {
    setProfileSavedToast(true);
    setTimeout(() => setProfileSavedToast(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#101114] text-white font-sans antialiased overflow-hidden">
      {/* Left Settings Sub-Sidebar matching Images 7-10 */}
      <aside className="w-64 bg-[#16171b] border-r border-[#26282f] flex flex-col h-screen select-none shrink-0 overflow-y-auto">
        {/* Back Button matching Image 7 */}
        <div className="p-4 border-b border-[#26282f]">
          <button
            onClick={onBackToDashboard}
            className="flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>

        <div className="p-3 space-y-5 text-xs">
          {/* Group: Account */}
          <div>
            <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Account
            </p>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <User className="w-4 h-4 mr-2.5 text-slate-400" />
                <span>Profile</span>
              </button>

              <button
                onClick={() => setActiveTab('preferences')}
                className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'preferences'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <Sliders className="w-4 h-4 mr-2.5 text-slate-400" />
                <span>Preferences</span>
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <Bell className="w-4 h-4 mr-2.5 text-slate-400" />
                <span>Notifications</span>
              </button>
            </div>
          </div>

          {/* Group: Organization */}
          <div>
            <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Organization
            </p>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'general'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <Building className="w-4 h-4 mr-2.5 text-slate-400" />
                <span>General</span>
              </button>

              <button
                onClick={() => setActiveTab('roles')}
                className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'roles'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mr-2.5 text-slate-400" />
                <span>Role & Permissions</span>
              </button>

              <button
                onClick={() => setActiveTab('channels')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'channels'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <div className="flex items-center">
                  <Share2 className="w-4 h-4 mr-2.5 text-slate-400" />
                  <span>Channels</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500">{accounts.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('billing')}
                className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'billing'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <CreditCard className="w-4 h-4 mr-2.5 text-slate-400" />
                <span>Plans and Billing</span>
              </button>
            </div>
          </div>

          {/* Group: Features */}
          <div>
            <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Features
            </p>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab('tags')}
                className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'tags'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <Tag className="w-4 h-4 mr-2.5 text-slate-400" />
                <span>Tags</span>
              </button>

              <button
                onClick={() => setActiveTab('channel_groups')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'channel_groups'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <div className="flex items-center">
                  <FolderSync className="w-4 h-4 mr-2.5 text-slate-400" />
                  <span>Channel Groups</span>
                </div>
                <span className="text-[10px] text-purple-400 font-bold">⚡</span>
              </button>

              <button
                onClick={() => setActiveTab('saved_replies')}
                className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'saved_replies'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <MessageSquare className="w-4 h-4 mr-2.5 text-slate-400" />
                <span>Saved Replies</span>
              </button>
            </div>
          </div>

          {/* Group: Other */}
          <div>
            <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Other
            </p>
            <div className="space-y-0.5">
              <button
                onClick={() => setActiveTab('api')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'api'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <div className="flex items-center">
                  <Code className="w-4 h-4 mr-2.5 text-slate-400" />
                  <span>API</span>
                </div>
                <span className="text-[9px] bg-purple-900/60 text-purple-300 font-bold px-1.5 py-0.2 rounded">
                  New
                </span>
              </button>

              <button
                onClick={() => setActiveTab('apps')}
                className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'apps'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <Grid className="w-4 h-4 mr-2.5 text-slate-400" />
                <span>Apps & Extras</span>
              </button>

              <button
                onClick={() => setActiveTab('beta')}
                className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'beta'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <FlaskConical className="w-4 h-4 mr-2.5 text-slate-400" />
                <span>Beta Features</span>
              </button>

              <button
                onClick={() => setActiveTab('refer')}
                className={`w-full flex items-center px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                  activeTab === 'refer'
                    ? 'bg-[#1e2025] text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#1e2025]/50'
                }`}
              >
                <Gift className="w-4 h-4 mr-2.5 text-slate-400" />
                <span>Refer a Friend</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Settings Content Area */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* PROFILE TAB matching Image 7 */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight">Profile</h2>

              {/* Toast banner */}
              {profileSavedToast && (
                <div className="p-3 bg-emerald-950 border border-emerald-800 text-emerald-300 rounded-xl text-xs font-bold flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Profile changes saved successfully!</span>
                </div>
              )}

              {/* Alert 1: Verify Email Alert matching Image 7 */}
              <div className="p-4 bg-[#2b2210] border border-[#523d18] rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start space-x-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-amber-200">
                    <strong>Verify your email:</strong> An email has been sent to your inbox to verify your email address.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Verification email resent to ' + email)}
                  className="bg-[#c28e2b] hover:bg-[#b07e22] text-[#101114] text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 cursor-pointer"
                >
                  Re-send Verification Email
                </button>
              </div>

              {/* Alert 2: Add Backup Email matching Image 7 */}
              <div className="p-3.5 bg-[#142338] border border-[#1e3a5f] rounded-xl text-xs flex items-center justify-between text-blue-200">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Add a backup email to your account as an additional security measure</span>
                </div>
                <button className="text-slate-400 hover:text-white cursor-pointer">×</button>
              </div>

              {/* Alert 3: 2FA recommendation matching Image 7 */}
              <div className="p-3.5 bg-[#142338] border border-[#1e3a5f] rounded-xl text-xs flex items-center justify-between text-blue-200">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>
                    For added security and easier logins, we recommend setting up two-factor authentication.{' '}
                    <a href="#" className="underline font-bold">Learn more ↗</a>
                  </span>
                </div>
                <button className="text-slate-400 hover:text-white cursor-pointer">×</button>
              </div>

              {/* Avatar Section matching Image 7 */}
              <div className="flex items-center space-x-4 pt-2">
                <div className="w-14 h-14 rounded-2xl bg-[#1e2025] border border-[#2a2d34] flex items-center justify-center text-slate-400 text-2xl">
                  👤
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Photo</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Please choose a photo that is at least 180×180 pixels in size.
                  </p>
                </div>
              </div>

              {/* Form Inputs matching Image 7 */}
              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Name</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 bg-[#16171b] border border-[#2a2d34] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#8fd98b]"
                    />
                    <button
                      onClick={() => handleSaveProfile('name')}
                      className="px-3.5 py-2.5 bg-[#26282f] hover:bg-[#343842] text-xs font-bold text-white rounded-xl transition-colors cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#16171b] border border-[#2a2d34] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#8fd98b]"
                      />
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 absolute right-3 top-3" />
                    </div>
                    <button
                      onClick={() => handleSaveProfile('email')}
                      className="px-3.5 py-2.5 bg-[#26282f] hover:bg-[#343842] text-xs font-bold text-white rounded-xl transition-colors cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Backup Email</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="email"
                      placeholder="backup@email.com"
                      value={backupEmail}
                      onChange={(e) => setBackupEmail(e.target.value)}
                      className="flex-1 bg-[#16171b] border border-[#2a2d34] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#8fd98b]"
                    />
                    <button
                      onClick={() => handleSaveProfile('backup')}
                      className="px-3.5 py-2.5 bg-[#26282f] hover:bg-[#343842] text-xs font-bold text-white rounded-xl transition-colors cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="password"
                      placeholder="New password"
                      className="flex-1 bg-[#16171b] border border-[#2a2d34] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#8fd98b]"
                    />
                    <button
                      onClick={() => handleSaveProfile('password')}
                      className="px-3.5 py-2.5 bg-[#26282f] hover:bg-[#343842] text-xs font-bold text-white rounded-xl transition-colors cursor-pointer"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>

              {/* Two Factor Authentication matching Image 7 */}
              <div className="pt-4 border-t border-[#26282f]">
                <div className="flex items-center justify-between max-w-xl">
                  <div>
                    <h3 className="text-xs font-bold text-white">Two Factor Authentication</h3>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-md leading-relaxed">
                      Two factor authentication adds an extra layer of security for your Buffer account. Whenever you log in, you will be asked for a security code.
                    </p>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      twoFactorEnabled ? 'bg-[#8fd98b]' : 'bg-[#2a2d34]'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Delete Account matching Image 7 */}
              <div className="pt-6 border-t border-[#26282f] flex items-center justify-between max-w-xl">
                <div>
                  <h3 className="text-xs font-bold text-white">Delete your account</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    When you delete your account, you lose access to Buffer workspace and scheduled posts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to delete your account?')) {
                      logoutUser();
                      window.location.href = '/user/login';
                    }
                  }}
                  className="px-3.5 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-red-300 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {/* PREFERENCES TAB matching Image 8 */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight">Preferences</h2>

              <div className="space-y-6 max-w-xl text-xs">
                {/* 1. Appearance */}
                <div className="flex items-center justify-between pb-4 border-b border-[#26282f]">
                  <div>
                    <h3 className="font-bold text-white">Appearance</h3>
                    <p className="text-slate-400 text-[11px] mt-0.5">Customize the look and feel of Buffer on this device.</p>
                  </div>
                  <select
                    value={appearance}
                    onChange={(e) => setAppearance(e.target.value)}
                    className="bg-[#1e2025] border border-[#2a2d34] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Dark">Dark</option>
                    <option value="Light">Light</option>
                    <option value="System">System</option>
                  </select>
                </div>

                {/* 2. Timezone */}
                <div className="flex items-center justify-between pb-4 border-b border-[#26282f]">
                  <div>
                    <h3 className="font-bold text-white">Timezone</h3>
                    <p className="text-slate-400 text-[11px] mt-0.5">Used as the default timezone for new connected channels.</p>
                  </div>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="bg-[#1e2025] border border-[#2a2d34] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Kolkata">Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                    <option value="New York">New York (EST)</option>
                    <option value="London">London (GMT)</option>
                  </select>
                </div>

                {/* 3. Time Format */}
                <div className="flex items-center justify-between pb-4 border-b border-[#26282f]">
                  <div>
                    <h3 className="font-bold text-white">Time Format</h3>
                    <p className="text-slate-400 text-[11px] mt-0.5">Set the time format for the Calendar and Queue.</p>
                  </div>
                  <select
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value)}
                    className="bg-[#1e2025] border border-[#2a2d34] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="12-hour">12-hour (9:00 AM)</option>
                    <option value="24-hour">24-hour (09:00)</option>
                  </select>
                </div>

                {/* 4. Start of Week */}
                <div className="flex items-center justify-between pb-4 border-b border-[#26282f]">
                  <div>
                    <h3 className="font-bold text-white">Start of Week</h3>
                    <p className="text-slate-400 text-[11px] mt-0.5">Set the first day of the week for the Calendar and date picker.</p>
                  </div>
                  <select
                    value={startOfWeek}
                    onChange={(e) => setStartOfWeek(e.target.value)}
                    className="bg-[#1e2025] border border-[#2a2d34] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                  </select>
                </div>

                {/* 5. Landing Page */}
                <div className="flex items-center justify-between pb-4 border-b border-[#26282f]">
                  <div>
                    <h3 className="font-bold text-white">Landing Page</h3>
                    <p className="text-slate-400 text-[11px] mt-0.5">Choose where you land after logging in.</p>
                  </div>
                  <select
                    value={landingPage}
                    onChange={(e) => setLandingPage(e.target.value)}
                    className="bg-[#1e2025] border border-[#2a2d34] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Buffer Home">Buffer Home</option>
                    <option value="Publish Queue">Publish Queue</option>
                    <option value="Create Ideas">Create Ideas</option>
                  </select>
                </div>

                {/* 6. Default Posting Action */}
                <div className="flex items-center justify-between pb-4 border-b border-[#26282f]">
                  <div>
                    <h3 className="font-bold text-white">Default Posting Action</h3>
                    <p className="text-slate-400 text-[11px] mt-0.5">Set a default time to post for the composer.</p>
                  </div>
                  <select
                    value={postingAction}
                    onChange={(e) => setPostingAction(e.target.value)}
                    className="bg-[#1e2025] border border-[#2a2d34] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Next Available">Next Available</option>
                    <option value="Add to Queue">Add to Queue</option>
                    <option value="Share Next">Share Next</option>
                  </select>
                </div>

                {/* 7. Mentions Counter */}
                <div className="flex items-center justify-between pb-4 border-b border-[#26282f]">
                  <div>
                    <h3 className="font-bold text-white">Mentions Counter</h3>
                    <p className="text-slate-400 text-[11px] mt-0.5">Choose how new mentions are shown in Community.</p>
                  </div>
                  <select
                    value={mentionsCounter}
                    onChange={(e) => setMentionsCounter(e.target.value)}
                    className="bg-[#1e2025] border border-[#2a2d34] rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Counter">Counter</option>
                    <option value="Badge">Badge</option>
                    <option value="Off">Off</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* CHANNELS TAB matching Image 9 */}
          {activeTab === 'channels' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white tracking-tight">Channels</h2>
                <button
                  onClick={onOpenConnectModal}
                  className="px-4 py-2 bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Connect Channel
                </button>
              </div>

              {/* Plan Banner matching Image 9 */}
              <div className="p-4 bg-[#1e2025] rounded-2xl border border-[#2a2d34] flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Get to know your plan</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    You are on the Free plan and can connect up to 3 channels.
                  </p>
                </div>
                <button
                  onClick={onOpenUpgradeModal}
                  className="px-3.5 py-1.5 bg-[#26282f] hover:bg-[#343842] border border-[#343842] text-xs font-bold text-white rounded-xl transition-colors cursor-pointer"
                >
                  Upgrade Plan
                </button>
              </div>

              {/* Empty state or connected channels list matching Image 9 */}
              {accounts.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#1e2025] border border-[#2a2d34] flex items-center justify-center text-slate-400 mb-4 cursor-pointer hover:border-[#8fd98b]" onClick={onOpenConnectModal}>
                    <Plus className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Connect a channel to get started</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Once connected, you'll see your channels listed here.
                  </p>
                  <button
                    onClick={onOpenConnectModal}
                    className="mt-4 px-4 py-2 bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Connect Channel
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accounts.map((acc) => (
                    <div
                      key={acc.id}
                      className="p-4 bg-[#1e2025] rounded-2xl border border-[#2a2d34] flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <img src={acc.avatarUrl} alt={acc.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="text-xs font-bold text-white">{acc.name}</p>
                          <p className="text-[10px] text-slate-400">@{acc.username}</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-800">
                        Connected
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PLANS AND BILLING TAB matching Image 10 */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              {/* Header & Frequency Toggle matching Image 10 */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Flexible Pricing for Everyone</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    You're on the <strong className="text-white">Free</strong> plan with up to 3 channels. Add or remove channels to customize your plan.
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Quantity Stepper matching Image 10 */}
                  <div className="flex items-center space-x-2 bg-[#1e2025] border border-[#2a2d34] rounded-xl px-2.5 py-1 text-xs">
                    <button
                      onClick={() => setChannelQty(Math.max(1, channelQty - 1))}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-white">{channelQty} channel</span>
                    <button
                      onClick={() => setChannelQty(channelQty + 1)}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Frequency Toggle matching Image 10 */}
                  <div className="flex items-center p-0.5 bg-[#1e2025] border border-[#2a2d34] rounded-xl text-xs">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${
                        billingCycle === 'monthly'
                          ? 'bg-[#2a2d34] text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Pay Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-3 py-1 rounded-lg font-semibold cursor-pointer ${
                        billingCycle === 'yearly'
                          ? 'bg-[#8fd98b] text-[#101114]'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Pay Yearly
                    </button>
                  </div>
                </div>
              </div>

              {/* 3 Pricing Cards matching Image 10 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                {/* 1. Free Plan Card */}
                <div className="p-6 bg-[#16171b] rounded-2xl border border-emerald-500/40 relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white">Free</h3>
                      <span className="text-[10px] font-bold bg-[#14261b] text-[#8fd98b] border border-[#8fd98b]/30 px-2 py-0.5 rounded-full">
                        Current Plan
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline space-x-1">
                      <span className="text-3xl font-black text-white">$0</span>
                      <span className="text-xs text-slate-400">/ forever</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Connect up to 3 channels</p>

                    <div className="border-t border-[#26282f] my-5" />

                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>10 scheduled posts per channel</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>1 scheduled thread</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>100 ideas</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>1 user account</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>1 API key & client</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Insights</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Community inbox</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Notes</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#26282f]">
                    <div className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#1e2025] text-slate-400 border border-[#2a2d34] text-center">
                      Active Plan
                    </div>
                  </div>
                </div>

                {/* 2. Essentials Plan Card */}
                <div className="p-6 bg-[#16171b] rounded-2xl border border-[#26282f] hover:border-[#363942] relative flex flex-col justify-between transition-all">
                  <div>
                    <h3 className="text-base font-bold text-white">Essentials</h3>

                    <div className="mt-4 flex items-baseline space-x-1">
                      <span className="text-3xl font-black text-white">
                        ${billingCycle === 'yearly' ? 60 * channelQty : 6 * channelQty}
                      </span>
                      <span className="text-xs text-slate-400">
                        {billingCycle === 'yearly' ? '/ year + applicable tax' : '/ month'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {channelQty} channel • billed {billingCycle} {billingCycle === 'yearly' && '($12 saved)'}
                    </p>

                    <button
                      onClick={() => {
                        upgradeUserPlan('Essentials Plan');
                        alert('Upgraded to Essentials Plan!');
                      }}
                      className="mt-5 w-full py-2.5 rounded-xl bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold transition-all active:scale-98 cursor-pointer shadow-xs"
                    >
                      Upgrade to Essentials
                    </button>

                    <div className="border-t border-[#26282f] my-5" />

                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Unlimited posts, incl. threads</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Unlimited ideas, tags and replies</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>1 user account</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>3 API keys & client with more usage</span>
                      </li>
                    </ul>

                    <p className="text-[11px] font-bold text-slate-400 mt-4 mb-2">Everything in Free, plus:</p>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Unlimited insights and reporting</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Hashtag Manager</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>First comment</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 3. Team Plan Card */}
                <div className="p-6 bg-[#16171b] rounded-2xl border border-[#26282f] hover:border-[#363942] relative flex flex-col justify-between transition-all">
                  <div>
                    <h3 className="text-base font-bold text-white">Team</h3>

                    <div className="mt-4 flex items-baseline space-x-1">
                      <span className="text-3xl font-black text-white">
                        ${billingCycle === 'yearly' ? 120 * channelQty : 12 * channelQty}
                      </span>
                      <span className="text-xs text-slate-400">
                        {billingCycle === 'yearly' ? '/ year + applicable tax' : '/ month'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {channelQty} channel • billed {billingCycle} {billingCycle === 'yearly' && '($24 saved)'}
                    </p>

                    <button
                      onClick={() => {
                        upgradeUserPlan('Team Plan');
                        alert('Upgraded to Team Plan!');
                      }}
                      className="mt-5 w-full py-2.5 rounded-xl bg-[#8fd98b] hover:bg-[#7ecf7a] text-[#101114] text-xs font-bold transition-all active:scale-98 cursor-pointer shadow-xs"
                    >
                      Upgrade to Team
                    </button>

                    <div className="border-t border-[#26282f] my-5" />

                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Unlimited posts, incl. threads</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Unlimited ideas, tags and replies</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Unlimited users</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>5 API keys & clients with more usage</span>
                      </li>
                    </ul>

                    <p className="text-[11px] font-bold text-slate-400 mt-4 mb-2">Everything in Essentials, plus:</p>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Access levels</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Content approval workflows</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#8fd98b] shrink-0" />
                        <span>Notes on content</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Compare All Features Link matching Image 10 */}
              <div className="pt-4 text-center">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenUpgradeModal();
                  }}
                  className="text-xs text-slate-400 hover:text-[#8fd98b] font-medium inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Compare All Features</span>
                </a>
              </div>
            </div>
          )}

          {/* Fallback for other settings tabs */}
          {!['profile', 'preferences', 'channels', 'billing'].includes(activeTab) && (
            <div className="p-12 text-center text-xs text-slate-400 bg-[#16171b] rounded-2xl border border-[#26282f]">
              <p className="font-bold text-white text-sm capitalize">{activeTab.replace('_', ' ')} Settings</p>
              <p className="mt-1">Configuration options for this section are active and synced with your workspace.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
