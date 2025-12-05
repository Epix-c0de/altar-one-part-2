import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Search, Bell, Edit3 } from 'lucide-react-native';
import { TopAppBar } from '@/components/TopAppBar';
import { StoryRow } from '@/components/StoryRow';
import { FeedPostCard } from '@/components/FeedPostCard';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing } from '@/constants/tokens';
import type { FeedPost, Story } from '@/types';

const MOCK_STORIES: Story[] = [
  {
    id: '1',
    userName: 'Fr. James',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    preview: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=400',
    viewed: false,
  },
  {
    id: '2',
    userName: 'Sister Mary',
    userAvatar: 'https://i.pravatar.cc/150?img=45',
    preview: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=400',
    viewed: false,
  },
  {
    id: '3',
    userName: 'John Paul',
    userAvatar: 'https://i.pravatar.cc/150?img=33',
    preview: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400',
    viewed: true,
  },
];

const MOCK_POSTS: FeedPost[] = [
  {
    id: '1',
    type: 'text',
    posterName: 'Father Michael',
    posterAvatar: 'https://i.pravatar.cc/150?img=68',
    posterParish: 'St. Joseph Cathedral',
    timeAgo: '2h ago',
    content: 'Blessed are the peacemakers, for they will be called children of God. Let us pray for peace in our communities and around the world. 🙏',
    likesCount: 234,
    commentsCount: 45,
    sharesCount: 12,
    likedByUser: false,
    savedByUser: false,
  },
  {
    id: '2',
    type: 'image',
    posterName: 'Maria Santos',
    posterAvatar: 'https://i.pravatar.cc/150?img=47',
    posterParish: 'Our Lady of Grace',
    timeAgo: '4h ago',
    content: 'Beautiful morning Mass at our parish. The choir was magnificent today! ✨',
    media: ['https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800'],
    likesCount: 567,
    commentsCount: 89,
    sharesCount: 23,
    likedByUser: true,
    savedByUser: true,
  },
  {
    id: '3',
    type: 'prayer',
    posterName: 'Prayer Warriors',
    posterAvatar: 'https://i.pravatar.cc/150?img=26',
    posterParish: 'Holy Cross Parish',
    timeAgo: '6h ago',
    content: 'Join us in praying the Rosary at 6 PM today. All are welcome to participate in this powerful devotion. Mother Mary, pray for us! 📿',
    likesCount: 892,
    commentsCount: 156,
    sharesCount: 67,
    likedByUser: false,
    savedByUser: false,
  },
];

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [posts, setPosts] = useState<FeedPost[]>(MOCK_POSTS);
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
  const router = useRouter();

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      console.log('[Feed] Refreshed');
      setRefreshing(false);
    }, 1500);
  };

  const handleLike = (postId: string) => {
    console.log('[Feed] Like post:', postId);
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? {
              ...p,
              likedByUser: !p.likedByUser,
              likesCount: p.likedByUser ? p.likesCount - 1 : p.likesCount + 1,
            }
          : p
      )
    );
  };

  const handleComment = (postId: string) => {
    console.log('[Feed] Comment on post:', postId);
  };

  const handleShare = (postId: string) => {
    console.log('[Feed] Share post:', postId);
  };

  const handleSave = (postId: string) => {
    console.log('[Feed] Save post:', postId);
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, savedByUser: !p.savedByUser } : p))
    );
  };

  const handleUserPress = (postId: string) => {
    console.log('[Feed] View user profile from post:', postId);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F1B3D', '#1a2847', '#2a3a5f']}
        style={StyleSheet.absoluteFill}
      />

      <TopAppBar
        title="Epix Shots"
        leftAction={
          <Pressable 
            onPress={() => router.push('/search')}
            accessibilityRole="button" 
            accessibilityLabel="Search"
          >
            <Search size={24} color={Colors.textPrimary} />
          </Pressable>
        }
        rightActions={
          <>
            <Pressable 
              onPress={() => router.push('/notifications')}
              accessibilityRole="button" 
              accessibilityLabel="Notifications"
            >
              <View>
                <Bell size={24} color={Colors.textPrimary} />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </View>
            </Pressable>
          </>
        }
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.content}>
          <StoryRow
            stories={MOCK_STORIES}
            currentUserId="me"
            currentUserAvatar="https://i.pravatar.cc/150?img=1"
            onCreateStory={() => console.log('[Feed] Create story')}
            onViewStory={id => console.log('[Feed] View story:', id)}
          />

          <GlassCard
            style={styles.createPostCard}
            interactive
            onPress={() => setShowCreatePost(!showCreatePost)}
          >
            <View style={styles.createPost}>
              <Edit3 size={20} color={Colors.textSecondary} />
              <Text style={styles.createPostText}>Share your faith journey...</Text>
            </View>
          </GlassCard>

          {posts.map(post => (
            <FeedPostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onShare={handleShare}
              onSave={handleSave}
              onUserPress={handleUserPress}
            />
          ))}

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
  createPostCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
  },
  createPost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  createPostText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.dangerRed,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.neutralWhite,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 100,
  },
});
