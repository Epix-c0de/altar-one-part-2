export type AppMode = 
  | 'none' 
  | 'bible' 
  | 'prayers' 
  | 'mass' 
  | 'songs' 
  | 'live' 
  | 'groups' 
  | 'stations' 
  | 'audiobible'
  | 'locations'
  | 'notifications'
  | 'search'
  | 'events'
  | 'settings'
  | 'downloads'
  | 'chat'
  | 'theme';

export type BottomNavItem = {
  key: string;
  label: string;
  icon: string;
  route: string;
};

export type NavigationState = {
  currentScreen: string;
  mode: AppMode;
  bottomBarConfig: BottomNavItem[];
  miniPlayerState: 'hidden' | 'minimized' | 'expanded';
  unreadNotificationsCount: number;
};

export type PostType = 'text' | 'image' | 'gallery' | 'video' | 'event' | 'livestream' | 'prayer' | 'mass_announcement';

export type FeedPost = {
  id: string;
  type: PostType;
  posterName: string;
  posterAvatar: string;
  posterParish: string;
  timeAgo: string;
  content: string;
  media?: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  likedByUser: boolean;
  savedByUser: boolean;
};

export type Story = {
  id: string;
  userName: string;
  userAvatar: string;
  preview: string;
  viewed: boolean;
};

export type BibleBook = {
  id: string;
  name: string;
  testament: 'old' | 'new';
  chapters: number;
  abbreviation: string;
};

export type BibleChapter = {
  bookId: string;
  chapter: number;
  verses: BibleVerse[];
};

export type BibleVerse = {
  number: number;
  text: string;
  highlighted?: boolean;
  bookmarked?: boolean;
  note?: string;
};

export type Prayer = {
  id: string;
  title: string;
  category: string;
  content: string;
  audioUrl?: string;
  duration?: number;
};

export type PrayerCategory = {
  id: string;
  name: string;
  icon: string;
  count: number;
};

export type AudioTrack = {
  id: string;
  title: string;
  artist?: string;
  duration: number;
  url: string;
  thumbnail?: string;
  type: 'prayer' | 'hymn' | 'audio_bible' | 'music';
};

export type UserProfile = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  parishes: string[];
  postsCount: number;
  groupsCount: number;
  savedCount: number;
};

export type MassReading = {
  id: string;
  type: 'first_reading' | 'second_reading' | 'gospel' | 'psalm';
  title: string;
  reference: string;
  text: string;
};

export type Hymn = {
  id: string;
  number?: string;
  title: string;
  artist?: string;
  lyrics?: string;
  audioUrl?: string;
  videoUrl?: string;
  source: 'youtube' | 'tiktok' | 'hymnbook' | 'local';
  thumbnail?: string;
  duration?: number;
};

export type LiveStream = {
  id: string;
  title: string;
  parish: string;
  thumbnail: string;
  isLive: boolean;
  scheduledTime?: string;
  viewerCount?: number;
  category: 'parish' | 'archdiocese' | 'national';
};

export type Group = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  memberCount: number;
  category: 'youth' | 'choir' | 'bible_study' | 'prayer' | 'other';
  isJoined: boolean;
};

export type Station = {
  number: number;
  title: string;
  scripture: string;
  reflection: string;
  image: string;
  audioUrl?: string;
};

export type Church = {
  id: string;
  name: string;
  address: string;
  distance?: number;
  nextMassTime?: string;
  latitude: number;
  longitude: number;
  type: 'parish' | 'outstation' | 'cathedral';
};

export type Notification = {
  id: string;
  type: 'parish' | 'group' | 'live' | 'system' | 'feed';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  deepLink?: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'mass' | 'prayer' | 'meeting' | 'celebration' | 'other';
  rsvpCount: number;
  hasRsvped: boolean;
};

export type DownloadItem = {
  id: string;
  title: string;
  type: 'audio' | 'video' | 'document';
  size: number;
  downloadedAt: string;
  filePath: string;
  thumbnail?: string;
};

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'prayer' | 'hymn' | 'media';
};

export type SearchResult = {
  id: string;
  type: 'post' | 'user' | 'group' | 'hymn' | 'verse' | 'event' | 'parish';
  title: string;
  subtitle?: string;
  thumbnail?: string;
  route: string;
};
