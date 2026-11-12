export type SocialPlatform = 'facebook_page' | 'instagram_business';

export type PostFormatType = 'reel' | 'feed_video' | 'story' | 'image' | 'carousel';
export type AspectRatioType = '9:16' | '4:5' | '1:1' | '16:9' | 'custom';

export interface SocialAccount {
  id: string;
  platform: SocialPlatform;
  name: string;
  username: string;
  avatarUrl: string;
  category?: string;
  followersCount?: number;
  isConnected: boolean;
  pageId?: string;
}

export type PostStatus = 'draft' | 'scheduled' | 'publishing' | 'published' | 'partially_published' | 'failed';

export interface PostTarget {
  accountId: string;
  accountName: string;
  accountUsername: string;
  accountAvatar: string;
  platform: SocialPlatform;
  status: 'pending' | 'publishing' | 'published' | 'failed';
  errorMessage?: string;
  permalink?: string;
  publishedAt?: string;
}

export interface MediaAttachment {
  id: string;
  url: string;
  type: 'image' | 'video';
  name?: string;
  aspectRatio?: AspectRatioType;
  resolution?: string;
  duration?: number;
  isHighQuality?: boolean;
}

export interface PostItem {
  id: string;
  caption: string;
  hashtags?: string[];
  media: MediaAttachment[];
  targets: PostTarget[];
  status: PostStatus;
  postFormat?: PostFormatType;
  isHighQuality?: boolean;
  scheduledTime?: string;
  createdAt: string;
  publishedAt?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  plan: 'free' | 'starter' | 'pro' | 'agency';
  status: 'active' | 'suspended' | 'trial';
  connectedChannelsCount: number;
  monthlyPostsUsed: number;
  joinedDate: string;
  lastActive: string;
}

export interface PlanMetric {
  name: string;
  price: string;
  subscribersCount: number;
  monthlyRevenue: number;
  features: string[];
}
