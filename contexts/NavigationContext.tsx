import createContextHook from '@nkzw/create-context-hook';
import { useState, useCallback } from 'react';
import type { AppMode, BottomNavItem, AudioTrack } from '@/types';

export const [NavigationProvider, useNavigation] = createContextHook(() => {
  const [mode, setMode] = useState<AppMode>('none');
  const [miniPlayerState, setMiniPlayerState] = useState<'hidden' | 'minimized' | 'expanded'>('hidden');
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(3);
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['/']);

  const enterMode = useCallback((newMode: AppMode) => {
    console.log('[Navigation] Entering mode:', newMode);
    setMode(newMode);
  }, []);

  const exitMode = useCallback(() => {
    console.log('[Navigation] Exiting mode');
    setMode('none');
  }, []);

  const getBottomBarConfig = useCallback((currentMode: AppMode, activeRoute: string): BottomNavItem[] => {
    switch (currentMode) {
      case 'bible':
        return [
          { key: 'today', label: "Today's Reading", icon: 'book-open', route: '/bible/today' },
          { key: 'bible', label: 'Holy Bible', icon: 'book-text', route: '/bible' },
          { key: 'audio', label: 'Audio Bible', icon: 'headphones', route: '/audio-bible' },
          { key: 'search', label: 'Search', icon: 'search', route: '/bible/search' },
          { key: 'notes', label: 'Notes', icon: 'file-text', route: '/bible/notes' },
        ];

      case 'mass':
        return [
          { key: 'readings', label: 'Readings', icon: 'book-open', route: '/mass/readings' },
          { key: 'hymns', label: 'Hymns', icon: 'music', route: '/mass/hymns' },
          { key: 'psalms', label: 'Psalms', icon: 'scroll-text', route: '/mass/psalms' },
          { key: 'responses', label: 'Responses', icon: 'message-circle', route: '/mass/responses' },
          { key: 'notes', label: 'Notes', icon: 'file-text', route: '/mass/notes' },
        ];

      case 'prayers':
        return [
          { key: 'morning', label: 'Morning', icon: 'sunrise', route: '/prayers/morning' },
          { key: 'evening', label: 'Evening', icon: 'sunset', route: '/prayers/evening' },
          { key: 'rosary', label: 'Rosary', icon: 'flower-2', route: '/prayers/rosary' },
          { key: 'intentions', label: 'Intentions', icon: 'heart', route: '/prayers/intentions' },
          { key: 'library', label: 'Library', icon: 'library', route: '/prayers' },
        ];

      case 'songs':
        return [
          { key: 'hymns', label: 'Hymns', icon: 'music-2', route: '/songs/hymns' },
          { key: 'choir', label: 'Choir', icon: 'users', route: '/songs/choir' },
          { key: 'youtube', label: 'YouTube', icon: 'youtube', route: '/songs/youtube' },
          { key: 'tiktok', label: 'TikTok', icon: 'video', route: '/songs/tiktok' },
          { key: 'playlists', label: 'Playlists', icon: 'list-music', route: '/songs' },
        ];

      case 'live':
        return [
          { key: 'live-now', label: 'Live Now', icon: 'radio', route: '/live/now' },
          { key: 'upcoming', label: 'Upcoming', icon: 'calendar-clock', route: '/live/upcoming' },
          { key: 'recorded', label: 'Recorded', icon: 'video', route: '/live/recorded' },
          { key: 'comments', label: 'Chat', icon: 'message-square', route: '/live/chat' },
          { key: 'share', label: 'Share', icon: 'share-2', route: '/live/share' },
        ];

      case 'groups':
        return [
          { key: 'posts', label: 'Posts', icon: 'layout-grid', route: '/groups/posts' },
          { key: 'members', label: 'Members', icon: 'users', route: '/groups/members' },
          { key: 'create', label: 'Create', icon: 'plus-circle', route: '/groups/create' },
          { key: 'media', label: 'Media', icon: 'image', route: '/groups/media' },
          { key: 'chat', label: 'Chat', icon: 'messages-square', route: '/groups' },
        ];

      case 'stations':
        return [
          { key: 'prev', label: 'Previous', icon: 'chevron-left', route: '/stations/prev' },
          { key: 'index', label: 'Stations', icon: 'list', route: '/stations' },
          { key: 'next', label: 'Next', icon: 'chevron-right', route: '/stations/next' },
          { key: 'audio', label: 'Audio', icon: 'volume-2', route: '/stations/audio' },
          { key: 'notes', label: 'Notes', icon: 'file-text', route: '/stations/notes' },
        ];

      case 'audiobible':
        return [
          { key: 'old', label: 'Old Testament', icon: 'book', route: '/audio-bible/old' },
          { key: 'new', label: 'New Testament', icon: 'book-open', route: '/audio-bible/new' },
          { key: 'playlists', label: 'Playlists', icon: 'list-music', route: '/audio-bible/playlists' },
          { key: 'downloads', label: 'Downloads', icon: 'download', route: '/audio-bible' },
          { key: 'speed', label: 'Speed', icon: 'gauge', route: '/audio-bible/speed' },
        ];

      case 'locations':
        return [
          { key: 'map', label: 'Map', icon: 'map', route: '/locations/map' },
          { key: 'list', label: 'List', icon: 'list', route: '/locations/list' },
          { key: 'nearby', label: 'Nearby', icon: 'locate', route: '/locations' },
          { key: 'filters', label: 'Filters', icon: 'filter', route: '/locations/filters' },
          { key: 'directions', label: 'Directions', icon: 'compass', route: '/locations/directions' },
        ];

      case 'notifications':
        return [
          { key: 'all', label: 'All', icon: 'bell', route: '/notifications' },
          { key: 'unread', label: 'Unread', icon: 'bell-dot', route: '/notifications/unread' },
          { key: 'parish', label: 'Parish', icon: 'church', route: '/notifications/parish' },
          { key: 'groups', label: 'Groups', icon: 'users', route: '/notifications/groups' },
          { key: 'settings', label: 'Settings', icon: 'settings', route: '/notifications/settings' },
        ];

      case 'search':
        return [
          { key: 'search', label: 'Search', icon: 'search', route: '/search' },
          { key: 'filters', label: 'Filters', icon: 'filter', route: '/search/filters' },
          { key: 'recent', label: 'Recent', icon: 'clock', route: '/search/recent' },
          { key: 'saved', label: 'Saved', icon: 'bookmark', route: '/search/saved' },
          { key: 'voice', label: 'Voice', icon: 'mic', route: '/search/voice' },
        ];

      case 'events':
        return [
          { key: 'calendar', label: 'Calendar', icon: 'calendar', route: '/events/calendar' },
          { key: 'list', label: 'List', icon: 'list', route: '/events' },
          { key: 'rsvp', label: 'My RSVPs', icon: 'check-circle', route: '/events/rsvp' },
          { key: 'create', label: 'Create', icon: 'plus-circle', route: '/events/create' },
          { key: 'search', label: 'Search', icon: 'search', route: '/events/search' },
        ];

      case 'settings':
        return [
          { key: 'account', label: 'Account', icon: 'user', route: '/settings/account' },
          { key: 'notifications', label: 'Notifications', icon: 'bell', route: '/settings/notifications' },
          { key: 'privacy', label: 'Privacy', icon: 'shield', route: '/settings/privacy' },
          { key: 'theme', label: 'Theme', icon: 'palette', route: '/settings' },
          { key: 'help', label: 'Help', icon: 'help-circle', route: '/settings/help' },
        ];

      case 'downloads':
        return [
          { key: 'all', label: 'All', icon: 'download', route: '/downloads' },
          { key: 'audio', label: 'Audio', icon: 'headphones', route: '/downloads/audio' },
          { key: 'video', label: 'Video', icon: 'video', route: '/downloads/video' },
          { key: 'documents', label: 'Documents', icon: 'file-text', route: '/downloads/documents' },
          { key: 'settings', label: 'Settings', icon: 'settings', route: '/downloads/settings' },
        ];

      case 'chat':
        return [
          { key: 'chat', label: 'Chat', icon: 'messages-square', route: '/chat' },
          { key: 'attach', label: 'Attach', icon: 'paperclip', route: '/chat/attach' },
          { key: 'emoji', label: 'Emoji', icon: 'smile', route: '/chat/emoji' },
          { key: 'send', label: 'Send', icon: 'send', route: '/chat/send' },
          { key: 'more', label: 'More', icon: 'more-horizontal', route: '/chat/more' },
        ];

      case 'theme':
        return [
          { key: 'light', label: 'Light', icon: 'sun', route: '/settings/theme/light' },
          { key: 'dark', label: 'Dark', icon: 'moon', route: '/settings/theme/dark' },
          { key: 'auto', label: 'Auto', icon: 'laptop', route: '/settings/theme/auto' },
          { key: 'custom', label: 'Custom', icon: 'palette', route: '/settings/theme/custom' },
          { key: 'preview', label: 'Preview', icon: 'eye', route: '/settings' },
        ];

      default:
        return [
          { key: 'home', label: 'Home', icon: 'home', route: '/' },
          { key: 'bible', label: 'Bible', icon: 'book-open', route: '/bible' },
          { key: 'mass', label: 'Mass', icon: 'church', route: '/mass' },
          { key: 'prayers', label: 'Prayers', icon: 'heart', route: '/prayers' },
          { key: 'profile', label: 'Profile', icon: 'user', route: '/profile' },
        ];
    }
  }, []);

  const toggleMiniPlayer = useCallback(() => {
    setMiniPlayerState(prev => {
      if (prev === 'hidden') return 'minimized';
      if (prev === 'minimized') return 'expanded';
      return 'minimized';
    });
  }, []);

  const playAudio = useCallback((track: AudioTrack) => {
    console.log('[Navigation] Playing audio:', track.title);
    setCurrentTrack(track);
    setIsPlaying(true);
    setMiniPlayerState('minimized');
  }, []);

  const pauseAudio = useCallback(() => {
    console.log('[Navigation] Pausing audio');
    setIsPlaying(false);
  }, []);

  const stopAudio = useCallback(() => {
    console.log('[Navigation] Stopping audio');
    setIsPlaying(false);
    setCurrentTrack(null);
    setMiniPlayerState('hidden');
  }, []);

  const pushToHistory = useCallback((route: string) => {
    console.log('[Navigation] Pushing to history:', route);
    setNavigationHistory(prev => {
      const filtered = prev.filter(r => r !== route);
      return [...filtered, route];
    });
  }, []);

  const goBack = useCallback(() => {
    console.log('[Navigation] Going back from history');
    setNavigationHistory(prev => {
      if (prev.length <= 1) {
        console.log('[Navigation] Already at root, staying at:', prev[0] || '/');
        return prev;
      }
      const newHistory = [...prev];
      newHistory.pop();
      console.log('[Navigation] Back to:', newHistory[newHistory.length - 1]);
      return newHistory;
    });
    return navigationHistory.length > 1 ? navigationHistory[navigationHistory.length - 2] : null;
  }, [navigationHistory]);

  const getCurrentRoute = useCallback(() => {
    return navigationHistory[navigationHistory.length - 1] || '/';
  }, [navigationHistory]);

  const canGoBack = useCallback(() => {
    return navigationHistory.length > 1;
  }, [navigationHistory]);

  return {
    mode,
    miniPlayerState,
    currentTrack,
    isPlaying,
    unreadNotifications,
    navigationHistory,
    getBottomBarConfig,
    enterMode,
    exitMode,
    toggleMiniPlayer,
    playAudio,
    pauseAudio,
    stopAudio,
    setUnreadNotifications,
    pushToHistory,
    goBack,
    getCurrentRoute,
    canGoBack,
  };
});
