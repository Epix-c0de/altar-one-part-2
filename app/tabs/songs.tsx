import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Music2, Users, Youtube, Video, ListMusic } from 'lucide-react-native';
import { TopAppBar } from '@/components/TopAppBar';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing, Radii } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';
import type { Hymn } from '@/types';

const MOCK_HYMNS: Hymn[] = [
  {
    id: '1',
    number: '423',
    title: 'Be Not Afraid',
    artist: 'Bob Dufford',
    source: 'hymnbook',
    duration: 240,
  },
  {
    id: '2',
    number: '567',
    title: 'Here I Am Lord',
    artist: 'Dan Schutte',
    source: 'hymnbook',
    duration: 300,
  },
  {
    id: '3',
    title: 'How Great Thou Art',
    artist: 'Carl Gustav Boberg',
    source: 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    duration: 270,
  },
  {
    id: '4',
    title: 'Amazing Grace',
    artist: 'John Newton',
    source: 'youtube',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300',
    duration: 250,
  },
];

type SongsTab = 'hymns' | 'choir' | 'youtube' | 'tiktok' | 'playlists';

export default function SongsScreen() {
  const { enterMode, exitMode, playAudio } = useNavigation();
  const [activeTab, setActiveTab] = useState<SongsTab>('hymns');

  useEffect(() => {
    console.log('[Songs] Entering Songs Mode');
    enterMode('songs');
    return () => {
      console.log('[Songs] Exiting Songs Mode');
      exitMode();
    };
  }, [enterMode, exitMode]);

  const handlePlayHymn = (hymn: Hymn) => {
    console.log('[Songs] Playing hymn:', hymn.title);
    playAudio({
      id: hymn.id,
      title: hymn.title,
      artist: hymn.artist,
      duration: hymn.duration || 0,
      url: 'https://example.com/audio.mp3',
      thumbnail: hymn.thumbnail,
      type: 'hymn',
    });
  };

  const renderHymns = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Hymnbook</Text>
      <Text style={styles.subtitle}>Traditional Catholic hymns and songs</Text>

      {MOCK_HYMNS.filter(h => h.source === 'hymnbook').map((hymn) => (
        <GlassCard key={hymn.id} style={styles.hymnCard} interactive onPress={() => handlePlayHymn(hymn)}>
          <View style={styles.hymnContent}>
            <View style={styles.hymnInfo}>
              <Text style={styles.hymnNumber}>#{hymn.number}</Text>
              <Text style={styles.hymnTitle}>{hymn.title}</Text>
              <Text style={styles.hymnArtist}>{hymn.artist}</Text>
            </View>
            <Music2 size={24} color={Colors.primaryGold} />
          </View>
        </GlassCard>
      ))}
    </View>
  );

  const renderYouTube = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>YouTube Music</Text>
      <Text style={styles.subtitle}>Sacred music from YouTube</Text>

      {MOCK_HYMNS.filter(h => h.source === 'youtube').map((hymn) => (
        <GlassCard key={hymn.id} style={styles.videoCard} interactive onPress={() => handlePlayHymn(hymn)}>
          <Image
            source={{ uri: hymn.thumbnail }}
            style={styles.videoThumbnail}
            accessibilityLabel={`Thumbnail for ${hymn.title}`}
          />
          <View style={styles.videoInfo}>
            <Text style={styles.videoTitle}>{hymn.title}</Text>
            <Text style={styles.videoArtist}>{hymn.artist}</Text>
            <View style={styles.videoDuration}>
              <Text style={styles.videoDurationText}>
                {Math.floor((hymn.duration || 0) / 60)}:{String((hymn.duration || 0) % 60).padStart(2, '0')}
              </Text>
            </View>
          </View>
        </GlassCard>
      ))}
    </View>
  );

  const renderPlaylists = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Playlists</Text>
      <Text style={styles.subtitle}>Curated collections of sacred music</Text>

      <GlassCard style={styles.playlistCard}>
        <Text style={styles.playlistTitle}>Sunday Mass Favorites</Text>
        <Text style={styles.playlistCount}>24 hymns</Text>
      </GlassCard>

      <GlassCard style={styles.playlistCard}>
        <Text style={styles.playlistTitle}>Advent & Christmas</Text>
        <Text style={styles.playlistCount}>18 hymns</Text>
      </GlassCard>

      <GlassCard style={styles.playlistCard}>
        <Text style={styles.playlistTitle}>Lenten Journey</Text>
        <Text style={styles.playlistCount}>15 hymns</Text>
      </GlassCard>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F1B3D', '#1a2847', '#2a3a5f']} style={StyleSheet.absoluteFill} />

      <TopAppBar title="Songs & Hymns" />

      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, activeTab === 'hymns' && styles.activeTab]}
          onPress={() => setActiveTab('hymns')}
        >
          <Music2 size={20} color={activeTab === 'hymns' ? Colors.primaryGold : Colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'hymns' && styles.activeTabText]}>
            Hymns
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'choir' && styles.activeTab]}
          onPress={() => setActiveTab('choir')}
        >
          <Users size={20} color={activeTab === 'choir' ? Colors.primaryGold : Colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'choir' && styles.activeTabText]}>
            Choir
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'youtube' && styles.activeTab]}
          onPress={() => setActiveTab('youtube')}
        >
          <Youtube size={20} color={activeTab === 'youtube' ? Colors.primaryGold : Colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'youtube' && styles.activeTabText]}>
            YouTube
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'tiktok' && styles.activeTab]}
          onPress={() => setActiveTab('tiktok')}
        >
          <Video size={20} color={activeTab === 'tiktok' ? Colors.primaryGold : Colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'tiktok' && styles.activeTabText]}>
            TikTok
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeTab === 'playlists' && styles.activeTab]}
          onPress={() => setActiveTab('playlists')}
        >
          <ListMusic size={20} color={activeTab === 'playlists' ? Colors.primaryGold : Colors.textSecondary} />
          <Text style={[styles.tabText, activeTab === 'playlists' && styles.activeTabText]}>
            Playlists
          </Text>
        </Pressable>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === 'hymns' && renderHymns()}
        {activeTab === 'youtube' && renderYouTube()}
        {activeTab === 'playlists' && renderPlaylists()}
        {(activeTab === 'choir' || activeTab === 'tiktok') && (
          <View style={styles.tabContent}>
            <Text style={styles.comingSoonText}>Coming Soon</Text>
          </View>
        )}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDeepBlue,
  },
  scrollView: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(15, 27, 61, 0.5)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radii.button,
  },
  activeTab: {
    backgroundColor: 'rgba(248, 210, 106, 0.15)',
  },
  tabText: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.primaryGold,
    fontWeight: '600',
  },
  tabContent: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h1,
    color: Colors.neutralWhite,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  hymnCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  hymnContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hymnInfo: {
    flex: 1,
  },
  hymnNumber: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  hymnTitle: {
    ...Typography.h3,
    color: Colors.neutralWhite,
    marginBottom: 4,
  },
  hymnArtist: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  videoCard: {
    marginBottom: Spacing.lg,
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: '100%',
    height: 180,
    backgroundColor: Colors.primaryDeepBlue,
  },
  videoInfo: {
    padding: Spacing.lg,
  },
  videoTitle: {
    ...Typography.h3,
    color: Colors.neutralWhite,
    marginBottom: 4,
  },
  videoArtist: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  videoDuration: {
    backgroundColor: 'rgba(248, 210, 106, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  videoDurationText: {
    ...Typography.small,
    color: Colors.primaryGold,
    fontWeight: '600',
  },
  playlistCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  playlistTitle: {
    ...Typography.h2,
    color: Colors.neutralWhite,
    marginBottom: Spacing.sm,
  },
  playlistCount: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  comingSoonText: {
    ...Typography.h2,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.huge,
  },
  bottomSpacer: {
    height: 120,
  },
});
