import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Colors, Typography, Spacing, Radii, Shadows } from '@/constants/tokens';
import type { Story } from '@/types';

type StoryRowProps = {
  stories: Story[];
  currentUserId: string;
  currentUserAvatar: string;
  onCreateStory: () => void;
  onViewStory: (storyId: string) => void;
};

export function StoryRow({ 
  stories, 
  currentUserId, 
  currentUserAvatar, 
  onCreateStory, 
  onViewStory 
}: StoryRowProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      <Pressable 
        onPress={onCreateStory} 
        style={styles.storyItem}
        accessibilityLabel="Create story"
        accessibilityRole="button"
      >
        <View style={styles.createStoryCard}>
          <Image 
            source={{ uri: currentUserAvatar }} 
            style={styles.createStoryImage}
            accessibilityLabel="Your avatar"
          />
          <View style={styles.plusButton}>
            <Plus size={20} color={Colors.neutralWhite} strokeWidth={3} />
          </View>
        </View>
        <Text style={styles.storyLabel}>Create</Text>
      </Pressable>

      {stories.map((story) => (
        <Pressable
          key={story.id}
          onPress={() => onViewStory(story.id)}
          style={styles.storyItem}
          accessibilityLabel={`View ${story.userName}'s story`}
          accessibilityRole="button"
        >
          <View style={[styles.storyCard, story.viewed && styles.viewedStory]}>
            <Image 
              source={{ uri: story.preview }} 
              style={styles.storyImage}
              accessibilityLabel={`${story.userName} story preview`}
            />
            <View style={styles.storyAvatarContainer}>
              <Image 
                source={{ uri: story.userAvatar }} 
                style={styles.storyAvatar}
                accessibilityLabel={`${story.userName} avatar`}
              />
            </View>
          </View>
          <Text style={styles.storyLabel} numberOfLines={1}>
            {story.userName}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: Spacing.lg,
  },
  container: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  storyItem: {
    alignItems: 'center',
    gap: Spacing.sm,
    width: 84,
  },
  createStoryCard: {
    width: 84,
    height: 112,
    borderRadius: Radii.card,
    overflow: 'hidden',
    backgroundColor: Colors.glassBg,
    borderWidth: 2,
    borderColor: Colors.glassBorder,
    ...Shadows.light,
  },
  createStoryImage: {
    width: '100%',
    height: '70%',
    backgroundColor: Colors.glassTint,
  },
  plusButton: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryDeepBlue,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  storyCard: {
    width: 84,
    height: 112,
    borderRadius: Radii.card,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.primaryGold,
    ...Shadows.light,
  },
  viewedStory: {
    borderColor: Colors.divider,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.glassTint,
  },
  storyAvatarContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.neutralWhite,
    overflow: 'hidden',
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.glassTint,
  },
  storyLabel: {
    ...Typography.small,
    color: Colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },
});
