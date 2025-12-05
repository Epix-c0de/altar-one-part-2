import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, X, BookOpen, Music, Users, MapPin, Calendar, MessageCircle } from 'lucide-react-native';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';
import type { SearchResult } from '@/types';

const MOCK_RECENT: string[] = [
  'Rosary prayers',
  'Sunday Mass readings',
  'Holy Cross Parish',
  'Amazing Grace hymn',
];

const CATEGORIES = [
  { key: 'feed', label: 'Feed', icon: MessageCircle },
  { key: 'bible', label: 'Bible', icon: BookOpen },
  { key: 'songs', label: 'Songs', icon: Music },
  { key: 'groups', label: 'Groups', icon: Users },
  { key: 'churches', label: 'Churches', icon: MapPin },
  { key: 'events', label: 'Events', icon: Calendar },
];

const MOCK_RESULTS: SearchResult[] = [
  {
    id: '1',
    type: 'verse',
    title: 'John 3:16',
    subtitle: 'For God so loved the world...',
    route: '/bible/john/3',
  },
  {
    id: '2',
    type: 'hymn',
    title: 'Amazing Grace',
    subtitle: 'Traditional Hymn',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    route: '/songs/amazing-grace',
  },
  {
    id: '3',
    type: 'parish',
    title: 'Holy Cross Parish',
    subtitle: '2.5 km away',
    route: '/locations/holy-cross',
  },
  {
    id: '4',
    type: 'group',
    title: 'Youth Prayer Group',
    subtitle: '234 members',
    thumbnail: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=100',
    route: '/groups/youth-prayer',
  },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(MOCK_RECENT);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  console.log('[Search] Active category:', activeCategory);
  const router = useRouter();
  const { goBack, canGoBack, enterMode } = useNavigation();

  React.useEffect(() => {
    enterMode('search');
  }, [enterMode]);

  const handleBack = () => {
    if (canGoBack()) {
      const previousRoute = goBack();
      if (previousRoute) {
        router.push(previousRoute as any);
      }
    } else {
      router.push('/');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      console.log('[Search] Searching for:', query);
      setResults(MOCK_RESULTS.filter(r => 
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle?.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setResults([]);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setResults([]);
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleRemoveRecent = (query: string) => {
    setRecentSearches(prev => prev.filter(q => q !== query));
  };

  const handleResultPress = (result: SearchResult) => {
    console.log('[Search] Navigate to:', result.route);
    if (!recentSearches.includes(searchQuery) && searchQuery.length > 0) {
      setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
    }
    router.push(result.route as any);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'verse': return BookOpen;
      case 'hymn': return Music;
      case 'parish': return MapPin;
      case 'group': return Users;
      case 'event': return Calendar;
      default: return MessageCircle;
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <LinearGradient
          colors={['#0F1B3D', '#1a2847', '#2a3a5f']}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.header}>
          <Pressable 
            onPress={handleBack} 
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <ArrowLeft size={24} color={Colors.neutralWhite} />
          </Pressable>

          <View style={styles.searchContainer}>
            <GlassCard style={styles.searchCard}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search Bible, Songs, Groups..."
                placeholderTextColor={Colors.textSecondary}
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={handleClearSearch} style={styles.clearButton}>
                  <X size={20} color={Colors.textSecondary} />
                </Pressable>
              )}
            </GlassCard>
          </View>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {searchQuery.length === 0 && (
              <>
                <Text style={styles.sectionTitle}>Search Categories</Text>
                <View style={styles.categoriesGrid}>
                  {CATEGORIES.map(category => {
                    const IconComponent = category.icon;
                    return (
                      <Pressable
                        key={category.key}
                        onPress={() => setActiveCategory(category.key)}
                        style={styles.categoryCard}
                      >
                        <GlassCard style={styles.categoryCardInner}>
                          <IconComponent size={28} color={Colors.primaryGold} />
                          <Text style={styles.categoryLabel}>{category.label}</Text>
                        </GlassCard>
                      </Pressable>
                    );
                  })}
                </View>

                {recentSearches.length > 0 && (
                  <>
                    <Text style={styles.sectionTitle}>Recent Searches</Text>
                    {recentSearches.map((query, index) => (
                      <GlassCard key={index} style={styles.recentCard}>
                        <Pressable
                          onPress={() => handleRecentSearch(query)}
                          style={styles.recentContent}
                        >
                          <Text style={styles.recentText}>{query}</Text>
                          <Pressable
                            onPress={() => handleRemoveRecent(query)}
                            style={styles.removeButton}
                          >
                            <X size={16} color={Colors.textSecondary} />
                          </Pressable>
                        </Pressable>
                      </GlassCard>
                    ))}
                  </>
                )}
              </>
            )}

            {results.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>
                  {results.length} Result{results.length !== 1 ? 's' : ''}
                </Text>
                {results.map(result => {
                  const IconComponent = getResultIcon(result.type);
                  return (
                    <Pressable
                      key={result.id}
                      onPress={() => handleResultPress(result)}
                    >
                      <GlassCard style={styles.resultCard}>
                        <View style={styles.resultIconContainer}>
                          <IconComponent size={24} color={Colors.primaryGold} />
                        </View>
                        <View style={styles.resultContent}>
                          <Text style={styles.resultTitle}>{result.title}</Text>
                          {result.subtitle && (
                            <Text style={styles.resultSubtitle}>{result.subtitle}</Text>
                          )}
                        </View>
                      </GlassCard>
                    </Pressable>
                  );
                })}
              </>
            )}

            {searchQuery.length > 2 && results.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No results found for &quot;{searchQuery}&quot;</Text>
                <Text style={styles.emptySubtext}>Try different keywords</Text>
              </View>
            )}

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.md,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flex: 1,
  },
  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.textPrimary,
    paddingVertical: Spacing.sm,
  },
  clearButton: {
    padding: Spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.neutralWhite,
    fontWeight: '600',
    marginBottom: Spacing.lg,
    marginTop: Spacing.lg,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  categoryCard: {
    width: '31%',
  },
  categoryCardInner: {
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  categoryLabel: {
    ...Typography.small,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  recentCard: {
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  recentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentText: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
  removeButton: {
    padding: Spacing.sm,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  resultIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(248, 210, 106, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  resultSubtitle: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.huge,
  },
  emptyText: {
    ...Typography.h3,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.textTertiary,
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
});
