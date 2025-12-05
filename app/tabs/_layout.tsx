import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, useSegments, useRouter } from 'expo-router';
import { BottomNavBar } from '@/components/BottomNavBar';
import { MiniPlayer } from '@/components/MiniPlayer';
import { useNavigation } from '@/contexts/NavigationContext';
import type { AppMode } from '@/types';

export default function TabLayout() {
  const { mode, getBottomBarConfig, enterMode, exitMode } = useNavigation();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const activeSegment = segments[1] as string;
    console.log('[TabLayout] Active segment:', activeSegment);

    const modeMap: Record<string, AppMode> = {
      'bible': 'bible',
      'mass': 'mass',
      'prayers': 'prayers',
      'songs': 'songs',
      'live': 'live',
      'groups': 'groups',
      'stations': 'stations',
      'audio-bible': 'audiobible',
      'events': 'events',
      'settings': 'settings',
      'notifications': 'notifications',
      'search': 'search',
    };

    const detectedMode = modeMap[activeSegment];
    if (detectedMode && detectedMode !== mode) {
      enterMode(detectedMode);
    } else if (!detectedMode && mode !== 'none') {
      exitMode();
    }
  }, [segments, mode, enterMode, exitMode]);

  const activeRoute = segments[1] || 'index';
  const routeMap: Record<string, string> = {
    index: '/',
    bible: '/bible',
    prayers: '/prayers',
    mass: '/mass',
    songs: '/songs',
    live: '/live',
    groups: '/groups',
    stations: '/stations',
    'audio-bible': '/audio-bible',
    events: '/events',
    profile: '/profile',
  };
  const currentRoute = routeMap[activeRoute as string] || '/';

  const bottomBarConfig = getBottomBarConfig(mode, currentRoute);

  const { pushToHistory } = useNavigation();

  const handleNavigate = (route: string) => {
    console.log('[Navigation] Navigate to:', route);
    const routeToScreen: Record<string, string> = {
      '/': '/',
      '/bible': '/bible',
      '/prayers': '/prayers',
      '/mass': '/mass',
      '/songs': '/songs',
      '/live': '/live',
      '/groups': '/groups',
      '/stations': '/stations',
      '/audio-bible': '/audio-bible',
      '/events': '/events',
      '/profile': '/profile',
      '/search': '/search',
      '/notifications': '/notifications',
      '/settings': '/settings',
    };
    const screen = routeToScreen[route] || '/';
    pushToHistory(route);
    router.push(screen as any);
  };

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="bible" />
        <Tabs.Screen name="prayers" />
        <Tabs.Screen name="mass" />
        <Tabs.Screen name="songs" />
        <Tabs.Screen name="live" />
        <Tabs.Screen name="groups" />
        <Tabs.Screen name="stations" />
        <Tabs.Screen name="audio-bible" />
        <Tabs.Screen name="events" />
        <Tabs.Screen name="profile" />
        <Tabs.Screen name="search" />
        <Tabs.Screen name="notifications" />
        <Tabs.Screen name="settings" />
      </Tabs>

      <MiniPlayer />

      <BottomNavBar
        items={bottomBarConfig}
        activeRoute={currentRoute}
        onNavigate={handleNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
