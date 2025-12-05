import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Radio, Calendar, MessageSquare, Share2, Eye } from 'lucide-react-native';
import { TopAppBar } from '@/components/TopAppBar';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing, Radii } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';
import type { LiveStream } from '@/types';

const MOCK_LIVE_STREAMS: LiveStream[] = [
  {
    id: '1',
    title: 'Sunday Mass - St. Joseph Cathedral',
    parish: 'St. Joseph Cathedral',
    thumbnail: 'https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800',
    isLive: true,
    viewerCount: 1247,
    category: 'parish',
  },
  {
    id: '2',
    title: 'Evening Rosary Prayer',
    parish: 'Our Lady of Grace',
    thumbnail: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800',
    isLive: true,
    viewerCount: 523,
    category: 'parish',
  },
  {
    id: '3',
    title: 'Archdiocese Youth Conference',
    parish: 'Archdiocese',
    thumbnail: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800',
    isLive: false,
    scheduledTime: 'Tomorrow at 3:00 PM',
    category: 'archdiocese',
  },
];

type SegmentType = 'live' | 'upcoming' | 'recorded';

export default function LiveScreen() {
  const { enterMode, exitMode } = useNavigation();
  const [selectedSegment, setSelectedSegment] = useState<SegmentType>('live');

  React.useEffect(() => {
    enterMode('live');
    return () => exitMode();
  }, [enterMode, exitMode]);

  const renderLiveCard = ({ item }: { item: LiveStream }) => (
    <GlassCard style={styles.liveCard} interactive>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} contentFit="cover" />
        {item.isLive && (
          <View style={styles.liveBadge}>
            <Radio size={12} color={Colors.neutralWhite} />
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        )}
        {item.viewerCount !== undefined && (
          <View style={styles.viewerCount}>
            <Eye size={12} color={Colors.neutralWhite} />
            <Text style={styles.viewerCountText}>{item.viewerCount.toLocaleString()}</Text>
          </View>
        )}
      </View>
      <View style={styles.liveInfo}>
        <Text style={styles.liveTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.liveParish}>{item.parish}</Text>
        {item.scheduledTime && (
          <Text style={styles.scheduledTime}>{item.scheduledTime}</Text>
        )}
      </View>
      <View style={styles.liveActions}>
        <Pressable style={styles.actionButton}>
          <MessageSquare size={20} color={Colors.textSecondary} />
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Share2 size={20} color={Colors.textSecondary} />
        </Pressable>
      </View>
    </GlassCard>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F1B3D', '#1a2847', '#2a3a5f']} style={StyleSheet.absoluteFill} />

      <TopAppBar
        title="Live Streaming"
        rightActions={
          <Pressable accessibilityRole="button" accessibilityLabel="Schedule">
            <Calendar size={24} color={Colors.textPrimary} />
          </Pressable>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.segmentControl}>
            {(['live', 'upcoming', 'recorded'] as SegmentType[]).map((segment) => (
              <Pressable
                key={segment}
                style={[styles.segment, selectedSegment === segment && styles.segmentActive]}
                onPress={() => setSelectedSegment(segment)}
              >
                <Text
                  style={[
                    styles.segmentText,
                    selectedSegment === segment && styles.segmentTextActive,
                  ]}
                >
                  {segment === 'live' ? 'Live Now' : segment === 'upcoming' ? 'Upcoming' : 'Recorded'}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {selectedSegment === 'live' && 'Currently Streaming'}
              {selectedSegment === 'upcoming' && 'Coming Soon'}
              {selectedSegment === 'recorded' && 'Past Streams'}
            </Text>
            {MOCK_LIVE_STREAMS.filter((stream) => {
              if (selectedSegment === 'live') return stream.isLive;
              if (selectedSegment === 'upcoming') return !stream.isLive && stream.scheduledTime;
              return false;
            }).map((stream) => (
              <View key={stream.id}>{renderLiveCard({ item: stream })}</View>
            ))}
          </View>

          <View style={styles.bottomSpacer} />
        </View>
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
  content: {
    paddingTop: Spacing.lg,
  },
  segmentControl: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.glassBg,
    borderRadius: Radii.pill,
    padding: Spacing.xs,
  },
  segment: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderRadius: Radii.pill,
  },
  segmentActive: {
    backgroundColor: Colors.primaryGold,
  },
  segmentText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  segmentTextActive: {
    color: Colors.primaryDeepBlue,
    fontWeight: '700',
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.neutralWhite,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  liveCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
  },
  thumbnailContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: Radii.card,
    borderTopRightRadius: Radii.card,
  },
  liveBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.dangerRed,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.pill,
  },
  liveBadgeText: {
    ...Typography.small,
    color: Colors.neutralWhite,
    fontWeight: '700',
  },
  viewerCount: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.pill,
  },
  viewerCountText: {
    ...Typography.small,
    color: Colors.neutralWhite,
    fontWeight: '600',
  },
  liveInfo: {
    padding: Spacing.lg,
  },
  liveTitle: {
    ...Typography.h3,
    color: Colors.neutralWhite,
    marginBottom: Spacing.xs,
  },
  liveParish: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  scheduledTime: {
    ...Typography.small,
    color: Colors.primaryGold,
    fontWeight: '600',
  },
  liveActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  actionButton: {
    padding: Spacing.md,
    borderRadius: Radii.button,
    backgroundColor: Colors.glassBg,
  },
  bottomSpacer: {
    height: 100,
  },
});
