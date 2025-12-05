import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { Settings, Bookmark, Grid, Heart } from 'lucide-react-native';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing, Shadows } from '@/constants/tokens';

const MOCK_USER = {
  name: 'John Paul',
  username: '@johnpaul',
  avatar: 'https://i.pravatar.cc/300?img=1',
  bio: 'Follower of Christ | St. Joseph Cathedral Parish | Prayer Warrior 🙏',
  parishes: ['St. Joseph Cathedral', 'Holy Cross Parish'],
  postsCount: 47,
  groupsCount: 8,
  savedCount: 156,
};

const TABS = [
  { key: 'posts', label: 'Posts', icon: Grid },
  { key: 'saved', label: 'Saved', icon: Bookmark },
  { key: 'liked', label: 'Liked', icon: Heart },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = React.useState<string>('posts');
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        <LinearGradient
          colors={['#0F1B3D', '#1a2847', '#2a3a5f']}
          style={StyleSheet.absoluteFill}
        />

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Profile</Text>
              <Pressable
                onPress={() => router.push('/settings')}
                style={styles.settingsButton}
                accessibilityRole="button"
                accessibilityLabel="Settings"
              >
                <Settings size={24} color={Colors.primaryGold} />
              </Pressable>
            </View>

            <GlassCard style={styles.profileCard}>
              <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{MOCK_USER.name}</Text>
              <Text style={styles.username}>{MOCK_USER.username}</Text>
              <Text style={styles.bio}>{MOCK_USER.bio}</Text>

              <View style={styles.parishesContainer}>
                {MOCK_USER.parishes.map((parish, index) => (
                  <View key={index} style={styles.parishBadge}>
                    <Text style={styles.parishText}>{parish}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.stats}>
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{MOCK_USER.postsCount}</Text>
                  <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{MOCK_USER.groupsCount}</Text>
                  <Text style={styles.statLabel}>Groups</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text style={styles.statValue}>{MOCK_USER.savedCount}</Text>
                  <Text style={styles.statLabel}>Saved</Text>
                </View>
              </View>
            </GlassCard>

            <View style={styles.tabsContainer}>
              {TABS.map(tab => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <Pressable
                    key={tab.key}
                    style={[styles.tab, isActive && styles.activeTab]}
                    onPress={() => setActiveTab(tab.key)}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: isActive }}
                  >
                    <IconComponent
                      size={20}
                      color={isActive ? Colors.primaryGold : Colors.textSecondary}
                    />
                    <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                      {tab.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.contentArea}>
              <Text style={styles.emptyText}>Your {activeTab} will appear here</Text>
            </View>

            <View style={styles.bottomSpacer} />
          </View>
        </ScrollView>
      </View>
    </>
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
    padding: Spacing.lg,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xxl,
  },
  title: {
    ...Typography.h1,
    color: Colors.neutralWhite,
    fontWeight: '700',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(248, 210, 106, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    padding: Spacing.xxl,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.primaryGold,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.glassTint,
  },
  name: {
    ...Typography.h2,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  username: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  bio: {
    ...Typography.body,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  parishesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  parishBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.accentLavender,
    borderRadius: 16,
  },
  parishText: {
    ...Typography.small,
    color: Colors.primaryDeepBlue,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.divider,
  },
  statValue: {
    ...Typography.h2,
    color: Colors.primaryGold,
    fontWeight: '700',
  },
  statLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.glassBg,
    borderRadius: 16,
    padding: Spacing.xs,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    ...Shadows.light,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.md,
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: 'rgba(248, 210, 106, 0.15)',
  },
  tabLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: Colors.primaryGold,
    fontWeight: '600',
  },
  contentArea: {
    padding: Spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
});
