import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { GlassCard } from './GlassCard';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react-native';
import { Colors, Typography, Spacing } from '@/constants/tokens';
import type { FeedPost } from '@/types';

type FeedPostCardProps = {
  post: FeedPost;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onSave: (postId: string) => void;
  onUserPress: (postId: string) => void;
};

export function FeedPostCard({ 
  post, 
  onLike, 
  onComment, 
  onShare, 
  onSave,
  onUserPress 
}: FeedPostCardProps) {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <Pressable 
          onPress={() => onUserPress(post.id)} 
          style={styles.userInfo}
          accessibilityRole="button"
          accessibilityLabel={`View ${post.posterName}'s profile`}
        >
          <Image 
            source={{ uri: post.posterAvatar }} 
            style={styles.avatar}
            accessibilityLabel={`${post.posterName} avatar`}
          />
          <View style={styles.userText}>
            <Text style={styles.userName}>{post.posterName}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.parish}>{post.posterParish}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.timeAgo}>{post.timeAgo}</Text>
            </View>
          </View>
        </Pressable>
        <Pressable 
          onPress={() => {}} 
          style={styles.moreButton}
          accessibilityLabel="More options"
          accessibilityRole="button"
        >
          <MoreHorizontal size={20} color={Colors.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentText}>{post.content}</Text>
      </View>

      {post.media && post.media.length > 0 && (
        <View style={styles.mediaContainer}>
          <Image 
            source={{ uri: post.media[0] }} 
            style={styles.media}
            resizeMode="cover"
            accessibilityLabel="Post image"
          />
        </View>
      )}

      <View style={styles.actions}>
        <Pressable 
          onPress={() => onLike(post.id)} 
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel={post.likedByUser ? 'Unlike' : 'Like'}
        >
          <Heart 
            size={22} 
            color={post.likedByUser ? Colors.dangerRed : Colors.textSecondary}
            fill={post.likedByUser ? Colors.dangerRed : 'transparent'}
          />
          <Text style={[styles.actionText, post.likedByUser && styles.likedText]}>
            {post.likesCount}
          </Text>
        </Pressable>

        <Pressable 
          onPress={() => onComment(post.id)} 
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel="Comment"
        >
          <MessageCircle size={22} color={Colors.textSecondary} />
          <Text style={styles.actionText}>{post.commentsCount}</Text>
        </Pressable>

        <Pressable 
          onPress={() => onShare(post.id)} 
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel="Share"
        >
          <Share2 size={22} color={Colors.textSecondary} />
          <Text style={styles.actionText}>{post.sharesCount}</Text>
        </Pressable>

        <View style={styles.spacer} />

        <Pressable 
          onPress={() => onSave(post.id)} 
          style={styles.actionButton}
          accessibilityRole="button"
          accessibilityLabel={post.savedByUser ? 'Unsave' : 'Save'}
        >
          <Bookmark 
            size={22} 
            color={post.savedByUser ? Colors.primaryGold : Colors.textSecondary}
            fill={post.savedByUser ? Colors.primaryGold : 'transparent'}
          />
        </Pressable>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.glassTint,
  },
  userText: {
    flex: 1,
    gap: Spacing.xs,
  },
  userName: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  parish: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  separator: {
    ...Typography.small,
    color: Colors.textTertiary,
  },
  timeAgo: {
    ...Typography.small,
    color: Colors.textTertiary,
  },
  moreButton: {
    padding: Spacing.sm,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  contentText: {
    ...Typography.body,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  mediaContainer: {
    marginTop: Spacing.sm,
    overflow: 'hidden',
  },
  media: {
    width: '100%',
    aspectRatio: 4 / 3,
    backgroundColor: Colors.glassTint,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    gap: Spacing.xl,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    minHeight: 44,
    paddingVertical: Spacing.sm,
  },
  actionText: {
    ...Typography.small,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  likedText: {
    color: Colors.dangerRed,
  },
  spacer: {
    flex: 1,
  },
});
