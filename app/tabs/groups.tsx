import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Search, Users, PlusCircle, Grid3x3, List } from 'lucide-react-native';
import { TopAppBar } from '@/components/TopAppBar';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing, Radii } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';
import type { Group } from '@/types';

const MOCK_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Youth Fellowship',
    description: 'Connect with young Catholics in our community',
    thumbnail: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=600',
    memberCount: 234,
    category: 'youth',
    isJoined: true,
  },
  {
    id: '2',
    name: 'Choir Ministry',
    description: 'Join us in praising the Lord through music',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
    memberCount: 87,
    category: 'choir',
    isJoined: true,
  },
  {
    id: '3',
    name: 'Bible Study Circle',
    description: 'Weekly Scripture reflection and discussion',
    thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600',
    memberCount: 156,
    category: 'bible_study',
    isJoined: false,
  },
  {
    id: '4',
    name: 'Prayer Warriors',
    description: 'United in faith, interceding for our community',
    thumbnail: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=600',
    memberCount: 421,
    category: 'prayer',
    isJoined: false,
  },
];

type ViewMode = 'grid' | 'list';

export default function GroupsScreen() {
  const { enterMode, exitMode } = useNavigation();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [groups, setGroups] = useState<Group[]>(MOCK_GROUPS);

  React.useEffect(() => {
    enterMode('groups');
    return () => exitMode();
  }, [enterMode, exitMode]);

  const handleJoinGroup = (groupId: string) => {
    console.log('[Groups] Join group:', groupId);
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, isJoined: !g.isJoined } : g))
    );
  };

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F1B3D', '#1a2847', '#2a3a5f']} style={StyleSheet.absoluteFill} />

      <TopAppBar
        title="Groups"
        rightActions={
          <>
            <Pressable
              onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              accessibilityRole="button"
              accessibilityLabel="Toggle view"
            >
              {viewMode === 'grid' ? (
                <List size={24} color={Colors.textPrimary} />
              ) : (
                <Grid3x3 size={24} color={Colors.textPrimary} />
              )}
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Create group">
              <PlusCircle size={24} color={Colors.primaryGold} />
            </Pressable>
          </>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <GlassCard style={styles.searchCard}>
            <Search size={20} color={Colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search groups..."
              placeholderTextColor={Colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </GlassCard>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Groups</Text>
              <Text style={styles.sectionCount}>
                {groups.filter((g) => g.isJoined).length}
              </Text>
            </View>
            <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
              {filteredGroups
                .filter((g) => g.isJoined)
                .map((group) => (
                  <GroupCard
                    key={group.id}
                    group={group}
                    viewMode={viewMode}
                    onJoin={handleJoinGroup}
                  />
                ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Discover Groups</Text>
              <Text style={styles.sectionCount}>
                {groups.filter((g) => !g.isJoined).length}
              </Text>
            </View>
            <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
              {filteredGroups
                .filter((g) => !g.isJoined)
                .map((group) => (
                  <GroupCard
                    key={group.id}
                    group={group}
                    viewMode={viewMode}
                    onJoin={handleJoinGroup}
                  />
                ))}
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
    </View>
  );
}

function GroupCard({
  group,
  viewMode,
  onJoin,
}: {
  group: Group;
  viewMode: ViewMode;
  onJoin: (id: string) => void;
}) {
  return (
    <GlassCard
      style={viewMode === 'grid' ? styles.groupCardGrid : styles.groupCardList}
      interactive
    >
      <Image
        source={{ uri: group.thumbnail }}
        style={viewMode === 'grid' ? styles.thumbnailGrid : styles.thumbnailList}
        contentFit="cover"
      />
      <View style={styles.groupInfo}>
        <Text style={styles.groupName} numberOfLines={viewMode === 'grid' ? 2 : 1}>
          {group.name}
        </Text>
        <Text style={styles.groupDescription} numberOfLines={2}>
          {group.description}
        </Text>
        <View style={styles.groupMeta}>
          <Users size={14} color={Colors.textSecondary} />
          <Text style={styles.memberCount}>{group.memberCount} members</Text>
        </View>
      </View>
      <Pressable
        style={[styles.joinButton, group.isJoined && styles.joinedButton]}
        onPress={() => onJoin(group.id)}
      >
        <Text style={[styles.joinButtonText, group.isJoined && styles.joinedButtonText]}>
          {group.isJoined ? 'Joined' : 'Join'}
        </Text>
      </Pressable>
    </GlassCard>
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
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.neutralWhite,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.neutralWhite,
  },
  sectionCount: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  listContainer: {
    gap: Spacing.lg,
  },
  groupCardGrid: {
    width: '47%',
    overflow: 'hidden',
  },
  groupCardList: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  thumbnailGrid: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: Radii.card,
    borderTopRightRadius: Radii.card,
  },
  thumbnailList: {
    width: 100,
    height: 100,
    borderRadius: Radii.button,
  },
  groupInfo: {
    padding: Spacing.md,
    flex: 1,
  },
  groupName: {
    ...Typography.h3,
    fontSize: 16,
    color: Colors.neutralWhite,
    marginBottom: Spacing.xs,
  },
  groupDescription: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  memberCount: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  joinButton: {
    backgroundColor: Colors.primaryGold,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.pill,
    margin: Spacing.md,
    alignItems: 'center',
  },
  joinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primaryGold,
  },
  joinButtonText: {
    ...Typography.body,
    color: Colors.primaryDeepBlue,
    fontWeight: '700',
  },
  joinedButtonText: {
    color: Colors.primaryGold,
  },
  bottomSpacer: {
    height: 100,
  },
});
