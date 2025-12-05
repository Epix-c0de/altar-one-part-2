import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { Sunrise, Sunset, Sparkles, Heart, BookMarked, Play } from 'lucide-react-native';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing, Shadows } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';
import type { PrayerCategory, Prayer } from '@/types';

const MOCK_CATEGORIES: PrayerCategory[] = [
  { id: '1', name: 'Morning', icon: 'sunrise', count: 12 },
  { id: '2', name: 'Evening', icon: 'sunset', count: 10 },
  { id: '3', name: 'Rosary', icon: 'sparkles', count: 5 },
  { id: '4', name: 'Novenas', icon: 'heart', count: 20 },
  { id: '5', name: 'Devotions', icon: 'bookmarked', count: 15 },
];

const FEATURED_PRAYERS: Prayer[] = [
  {
    id: '1',
    title: 'Morning Offering',
    category: 'Morning',
    content: 'O Jesus, through the Immaculate Heart of Mary, I offer You my prayers, works, joys and sufferings of this day...',
    audioUrl: 'https://example.com/morning-offering.mp3',
    duration: 180,
  },
  {
    id: '2',
    title: 'The Holy Rosary',
    category: 'Rosary',
    content: 'The Rosary is a Scripture-based prayer. It begins with the Apostles Creed...',
    audioUrl: 'https://example.com/rosary.mp3',
    duration: 1200,
  },
  {
    id: '3',
    title: 'Divine Mercy Chaplet',
    category: 'Devotions',
    content: 'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son...',
    audioUrl: 'https://example.com/divine-mercy.mp3',
    duration: 300,
  },
];

const getCategoryIcon = (iconName: string) => {
  const iconMap: Record<string, any> = {
    sunrise: Sunrise,
    sunset: Sunset,
    sparkles: Sparkles,
    heart: Heart,
    bookmarked: BookMarked,
  };
  return iconMap[iconName] || Heart;
};

export default function PrayersScreen() {
  const { enterMode, exitMode, playAudio } = useNavigation();

  useEffect(() => {
    enterMode('prayers');
    return () => exitMode();
  }, [enterMode, exitMode]);

  const handlePlayPrayer = (prayer: Prayer) => {
    console.log('[Prayers] Playing prayer:', prayer.title);
    playAudio({
      id: prayer.id,
      title: prayer.title,
      artist: prayer.category,
      duration: prayer.duration || 0,
      url: prayer.audioUrl || '',
      type: 'prayer',
    });
  };

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
              <Text style={styles.title}>Prayers</Text>
              <Text style={styles.subtitle}>Find peace in prayer</Text>
            </View>

            <View style={styles.categoriesGrid}>
              {MOCK_CATEGORIES.map(category => {
                const IconComponent = getCategoryIcon(category.icon);
                return (
                  <GlassCard
                    key={category.id}
                    style={styles.categoryCard}
                    interactive
                    onPress={() => console.log('[Prayers] Open category:', category.name)}
                  >
                    <View style={styles.categoryIcon}>
                      <IconComponent size={28} color={Colors.primaryGold} strokeWidth={2} />
                    </View>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryCount}>{category.count} prayers</Text>
                  </GlassCard>
                );
              })}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Featured Prayers</Text>

              {FEATURED_PRAYERS.map(prayer => (
                <GlassCard key={prayer.id} style={styles.prayerCard}>
                  <View style={styles.prayerHeader}>
                    <View style={styles.prayerInfo}>
                      <Text style={styles.prayerTitle}>{prayer.title}</Text>
                      <Text style={styles.prayerCategory}>{prayer.category}</Text>
                    </View>
                    {prayer.audioUrl && (
                      <Pressable
                        style={styles.playButton}
                        onPress={() => handlePlayPrayer(prayer)}
                        accessibilityRole="button"
                        accessibilityLabel={`Play ${prayer.title}`}
                      >
                        <Play size={20} color={Colors.neutralWhite} fill={Colors.neutralWhite} />
                      </Pressable>
                    )}
                  </View>
                  <Text style={styles.prayerContent} numberOfLines={3}>
                    {prayer.content}
                  </Text>
                  <View style={styles.prayerFooter}>
                    {prayer.duration && (
                      <Text style={styles.duration}>
                        {Math.floor(prayer.duration / 60)}:{(prayer.duration % 60).toString().padStart(2, '0')}
                      </Text>
                    )}
                  </View>
                </GlassCard>
              ))}
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
    marginBottom: Spacing.xxl,
  },
  title: {
    ...Typography.h1,
    color: Colors.neutralWhite,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xxxl,
  },
  categoryCard: {
    width: '47.5%',
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(248, 210, 106, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.light,
  },
  categoryName: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryCount: {
    ...Typography.small,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.neutralWhite,
    marginBottom: Spacing.lg,
  },
  prayerCard: {
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  prayerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  prayerInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  prayerTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  prayerCategory: {
    ...Typography.small,
    color: Colors.primaryGold,
    fontWeight: '500',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryDeepBlue,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  prayerContent: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  prayerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  duration: {
    ...Typography.small,
    color: Colors.textTertiary,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 100,
  },
});
