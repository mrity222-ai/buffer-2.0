export type SocialPlatform = 'facebook_page' | 'instagram_business';

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
}

export interface PostItem {
  id: string;
  caption: string;
  hashtags?: string[];
  media: MediaAttachment[];
  targets: PostTarget[];
  status: PostStatus;
  scheduledTime?: string;
  createdAt: string;
  publishedAt?: string;
}
