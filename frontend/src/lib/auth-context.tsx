'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '@/types';

export interface PackagePlan {
  id: string;
  name: string;
  price: string;
  priceNumber: number;
  period: string;
  accountLimit: number;
  monthlyPostLimit: string;
  features: string[];
  isPopular?: boolean;
  subscribersCount: number;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'user';
  plan: string;
}

export interface AdminSession {
  id: string;
  name: string;
  email: string;
  role: 'admin';
  adminLevel: string;
}

interface AuthContextType {
  user: UserSession | null;
  admin: AdminSession | null;
  packages: PackagePlan[];
  members: AdminUser[];
  loginUser: (email: string, password?: string) => boolean;
  registerUser: (name: string, email: string, plan?: string) => boolean;
  upgradeUserPlan: (newPlanName: string) => void;
  logoutUser: () => void;
  loginAdmin: (email: string, secretKey: string) => boolean;
  logoutAdmin: () => void;
  createPackage: (pkg: Omit<PackagePlan, 'id' | 'subscribersCount'>) => void;
  deletePackage: (id: string) => void;
  toggleMemberStatus: (memberId: string) => void;
}

const INITIAL_PACKAGES: PackagePlan[] = [
  {
    id: 'plan-free',
    name: 'Free Tier',
    price: '₹0',
    priceNumber: 0,
    period: 'forever',
    accountLimit: 2,
    monthlyPostLimit: '10 posts / mo',
    features: ['2 Social Channels', '10 Posts / mo', 'Reels 9:16 Auto-Detect', 'Community Support'],
    isPopular: false,
    subscribersCount: 482,
  },
  {
    id: 'plan-starter',
    name: 'Starter Plan',
    price: '₹199',
    priceNumber: 199,
    period: '/month',
    accountLimit: 5,
    monthlyPostLimit: 'Unlimited',
    features: ['5 Social Channels', 'Unlimited Posts & Reels', '1080p HQ Mode', 'Queue Scheduling Feed'],
    isPopular: true,
    subscribersCount: 210,
  },
  {
    id: 'plan-pro',
    name: 'Pro Plan',
    price: '₹499',
    priceNumber: 499,
    period: '/month',
    accountLimit: 15,
    monthlyPostLimit: 'Unlimited',
    features: ['15 Social Channels', 'Unlimited Posts & Reels', 'Priority Queue Dispatch', '1-Click Retry Engine'],
    isPopular: false,
    subscribersCount: 114,
  },
  {
    id: 'plan-agency',
    name: 'Agency Plan',
    price: '₹999',
    priceNumber: 999,
    period: '/month',
    accountLimit: 30,
    monthlyPostLimit: 'Unlimited',
    features: ['30 Social Channels', 'Dedicated Celery Workers', 'White-Label Branding', 'VIP 24/7 Support'],
    isPopular: false,
    subscribersCount: 48,
  },
];

const INITIAL_MEMBERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Avedan Sharma',
    email: 'avedan@growthpulse.in',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    plan: 'free',
    status: 'active',
    connectedChannelsCount: 2,
    monthlyPostsUsed: 8,
    joinedDate: '12 Jan 2026',
    lastActive: 'Just now',
  },
  {
    id: 'usr-2',
    name: 'Pooja Verma',
    email: 'pooja@creatorstudio.com',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    plan: 'pro',
    status: 'active',
    connectedChannelsCount: 12,
    monthlyPostsUsed: 89,
    joinedDate: '24 Jan 2026',
    lastActive: '2 hours ago',
  },
  {
    id: 'usr-3',
    name: 'Rahul Khanna',
    email: 'rahul@techbuzz.io',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    plan: 'starter',
    status: 'active',
    connectedChannelsCount: 4,
    monthlyPostsUsed: 28,
    joinedDate: '02 Feb 2026',
    lastActive: 'Yesterday',
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [admin, setAdmin] = useState<AdminSession | null>(null);
  const [packages, setPackages] = useState<PackagePlan[]>(INITIAL_PACKAGES);
  const [members, setMembers] = useState<AdminUser[]>(INITIAL_MEMBERS);

  // Restore sessions and dynamic packages from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('sp_user_session');
      if (savedUser) setUser(JSON.parse(savedUser));

      const savedAdmin = localStorage.getItem('sp_admin_session');
      if (savedAdmin) setAdmin(JSON.parse(savedAdmin));

      const savedPackages = localStorage.getItem('sp_dynamic_packages');
      if (savedPackages) setPackages(JSON.parse(savedPackages));

      const savedMembers = localStorage.getItem('sp_members_list');
      if (savedMembers) setMembers(JSON.parse(savedMembers));
    } catch (e) {
      console.warn('Auth storage restore error', e);
    }
  }, []);

  const loginUser = (email: string, password?: string): boolean => {
    const session: UserSession = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0] || 'Social Creator',
      email: email,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      role: 'user',
      plan: 'Free Tier',
    };
    setUser(session);
    try {
      localStorage.setItem('sp_user_session', JSON.stringify(session));
    } catch (e) {}
    return true;
  };

  const registerUser = (name: string, email: string, plan: string = 'Free Tier'): boolean => {
    const session: UserSession = {
      id: `usr-${Date.now()}`,
      name: name,
      email: email,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      role: 'user',
      plan: 'Free Tier', // Starts Free!
    };
    setUser(session);

    const newMember: AdminUser = {
      id: session.id,
      name: name,
      email: email,
      avatarUrl: session.avatarUrl,
      plan: 'free',
      status: 'active',
      connectedChannelsCount: 0,
      monthlyPostsUsed: 0,
      joinedDate: 'Today',
      lastActive: 'Just now',
    };
    const updatedMembers = [newMember, ...members];
    setMembers(updatedMembers);

    try {
      localStorage.setItem('sp_user_session', JSON.stringify(session));
      localStorage.setItem('sp_members_list', JSON.stringify(updatedMembers));
    } catch (e) {}
    return true;
  };

  const upgradeUserPlan = (newPlanName: string) => {
    if (!user) return;
    const updatedUser: UserSession = {
      ...user,
      plan: newPlanName,
    };
    setUser(updatedUser);

    // Update in admin members list as well
    const updatedMembers = members.map((m) => {
      if (m.email === user.email || m.id === user.id) {
        let planType: AdminUser['plan'] = 'starter';
        if (newPlanName.toLowerCase().includes('agency')) planType = 'agency';
        else if (newPlanName.toLowerCase().includes('pro')) planType = 'pro';
        else if (newPlanName.toLowerCase().includes('free')) planType = 'free';
        return { ...m, plan: planType };
      }
      return m;
    });
    setMembers(updatedMembers);

    try {
      localStorage.setItem('sp_user_session', JSON.stringify(updatedUser));
      localStorage.setItem('sp_members_list', JSON.stringify(updatedMembers));
    } catch (e) {}
  };

  const logoutUser = () => {
    setUser(null);
    try {
      localStorage.removeItem('sp_user_session');
    } catch (e) {}
  };

  const loginAdmin = (email: string, secretKey: string): boolean => {
    const adminSession: AdminSession = {
      id: 'adm-001',
      name: 'Super Administrator',
      email: email || 'admin@socialpublisher.io',
      role: 'admin',
      adminLevel: 'Master Admin',
    };
    setAdmin(adminSession);
    try {
      localStorage.setItem('sp_admin_session', JSON.stringify(adminSession));
    } catch (e) {}
    return true;
  };

  const logoutAdmin = () => {
    setAdmin(null);
    try {
      localStorage.removeItem('sp_admin_session');
    } catch (e) {}
  };

  const createPackage = (pkgData: Omit<PackagePlan, 'id' | 'subscribersCount'>) => {
    const newPkg: PackagePlan = {
      ...pkgData,
      id: `plan-${Date.now()}`,
      subscribersCount: 0,
    };
    const updated = [...packages, newPkg];
    setPackages(updated);
    try {
      localStorage.setItem('sp_dynamic_packages', JSON.stringify(updated));
    } catch (e) {}
  };

  const deletePackage = (id: string) => {
    const updated = packages.filter((p) => p.id !== id);
    setPackages(updated);
    try {
      localStorage.setItem('sp_dynamic_packages', JSON.stringify(updated));
    } catch (e) {}
  };

  const toggleMemberStatus = (memberId: string) => {
    const updated = members.map((m) => {
      if (m.id === memberId) {
        return {
          ...m,
          status: (m.status === 'active' ? 'suspended' : 'active') as AdminUser['status'],
        };
      }
      return m;
    });
    setMembers(updated);
    try {
      localStorage.setItem('sp_members_list', JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        packages,
        members,
        loginUser,
        registerUser,
        upgradeUserPlan,
        logoutUser,
        loginAdmin,
        logoutAdmin,
        createPackage,
        deletePackage,
        toggleMemberStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
