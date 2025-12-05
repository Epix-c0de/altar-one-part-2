import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Play, Pause, X } from 'lucide-react-native';
import { GlassCard } from './GlassCard';
import { Colors, Typography, Spacing } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';

export function MiniPlayer() {
  const { 
    miniPlayerState, 
    currentTrack, 
    isPlaying, 
    toggleMiniPlayer, 
    playAudio, 
    pauseAudio, 
    stopAudio 
  } = useNavigation();

  if (miniPlayerState === 'hidden' || !currentTrack) {
    return null;
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio(currentTrack);
    }
  };

  return (
    <Pressable
      onPress={toggleMiniPlayer}
      style={styles.container}
      accessibilityRole="button"
      accessibilityLabel="Open audio player"
    >
      <GlassCard style={styles.card}>
        <View style={styles.content}>
          {currentTrack.thumbnail && (
            <Image
              source={{ uri: currentTrack.thumbnail }}
              style={styles.thumbnail}
              accessibilityLabel="Track thumbnail"
            />
          )}
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>
              {currentTrack.title}
            </Text>
            {currentTrack.artist && (
              <Text style={styles.artist} numberOfLines={1}>
                {currentTrack.artist}
              </Text>
            )}
          </View>
          <View style={styles.controls}>
            <Pressable
              onPress={handlePlayPause}
              style={styles.playButton}
              accessibilityRole="button"
              accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause size={24} color={Colors.neutralWhite} fill={Colors.neutralWhite} />
              ) : (
                <Play size={24} color={Colors.neutralWhite} fill={Colors.neutralWhite} />
              )}
            </Pressable>
            <Pressable
              onPress={stopAudio}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close player"
            >
              <X size={20} color={Colors.textSecondary} />
            </Pressable>
          </View>
        </View>
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80,
    left: Spacing.lg,
    right: Spacing.lg,
    zIndex: 100,
  },
  card: {
    padding: Spacing.md,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: Colors.glassTint,
  },
  info: {
    flex: 1,
    gap: Spacing.xs,
  },
  title: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  artist: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryDeepBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    padding: Spacing.sm,
  },
});
