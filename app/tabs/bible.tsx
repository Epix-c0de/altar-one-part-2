import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { BookOpen, Volume2, Bookmark, Share2 } from 'lucide-react-native';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing, Radii } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';

const MOCK_READING = {
  date: 'Monday, December 5, 2025',
  liturgicalSeason: 'Advent',
  readings: [
    {
      title: 'First Reading',
      reference: 'Isaiah 35:1-6, 10',
      text: 'The wilderness and the dry land shall be glad, the desert shall rejoice and blossom; like the crocus it shall blossom abundantly, and rejoice with joy and singing.',
    },
    {
      title: 'Responsorial Psalm',
      reference: 'Psalm 146',
      text: 'Praise the LORD, O my soul! I will praise the LORD as long as I live; I will sing praises to my God all my life long.',
    },
    {
      title: 'Gospel',
      reference: 'Luke 5:17-26',
      text: 'One day, while he was teaching, Pharisees and teachers of the law were sitting nearby, and the power of the Lord was with him to heal...',
    },
  ],
};

const BIBLE_BOOKS = [
  { testament: 'Old Testament', books: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'] },
  { testament: 'New Testament', books: ['Matthew', 'Mark', 'Luke', 'John', 'Acts'] },
];

export default function BibleScreen() {
  const { enterMode, exitMode } = useNavigation();

  useEffect(() => {
    enterMode('bible');
    return () => exitMode();
  }, [enterMode, exitMode]);

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
              <Text style={styles.title}>Bible</Text>
              <View style={styles.headerActions}>
                <Pressable style={styles.iconButton} accessibilityLabel="Audio Bible">
                  <Volume2 size={22} color={Colors.primaryGold} />
                </Pressable>
                <Pressable style={styles.iconButton} accessibilityLabel="Bookmarks">
                  <Bookmark size={22} color={Colors.primaryGold} />
                </Pressable>
                <Pressable style={styles.iconButton} accessibilityLabel="Share">
                  <Share2 size={22} color={Colors.primaryGold} />
                </Pressable>
              </View>
            </View>

            <GlassCard style={styles.todayCard}>
              <View style={styles.seasonBadge}>
                <Text style={styles.seasonText}>{MOCK_READING.liturgicalSeason}</Text>
              </View>
              <Text style={styles.dateText}>{MOCK_READING.date}</Text>
              <Text style={styles.sectionTitle}>Today&apos;s Readings</Text>

              {MOCK_READING.readings.map((reading, index) => (
                <View key={index} style={styles.readingSection}>
                  <Text style={styles.readingTitle}>{reading.title}</Text>
                  <Text style={styles.readingReference}>{reading.reference}</Text>
                  <Text style={styles.readingText}>{reading.text}</Text>
                </View>
              ))}

              <Pressable style={styles.readFullButton} accessibilityRole="button">
                <BookOpen size={20} color={Colors.neutralWhite} />
                <Text style={styles.readFullText}>Read Full Liturgy</Text>
              </Pressable>
            </GlassCard>

            <Text style={styles.libraryTitle}>Bible Library</Text>

            {BIBLE_BOOKS.map((section, index) => (
              <View key={index} style={styles.testamentSection}>
                <Text style={styles.testamentTitle}>{section.testament}</Text>
                <View style={styles.booksGrid}>
                  {section.books.map((book, bookIndex) => (
                    <GlassCard
                      key={bookIndex}
                      style={styles.bookCard}
                      interactive
                      onPress={() => console.log('[Bible] Open book:', book)}
                    >
                      <BookOpen size={24} color={Colors.primaryGold} />
                      <Text style={styles.bookName}>{book}</Text>
                    </GlassCard>
                  ))}
                </View>
              </View>
            ))}

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
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(248, 210, 106, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayCard: {
    padding: Spacing.xxl,
    marginBottom: Spacing.xxl,
  },
  seasonBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.accentLavender,
    borderRadius: Radii.pill,
    marginBottom: Spacing.md,
  },
  seasonText: {
    ...Typography.small,
    color: Colors.primaryDeepBlue,
    fontWeight: '600',
  },
  dateText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  readingSection: {
    marginBottom: Spacing.xxl,
  },
  readingTitle: {
    ...Typography.body,
    color: Colors.primaryGold,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  readingReference: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  readingText: {
    ...Typography.body,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  readFullButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryDeepBlue,
    paddingVertical: Spacing.lg,
    borderRadius: Radii.button,
    marginTop: Spacing.md,
  },
  readFullText: {
    ...Typography.body,
    color: Colors.neutralWhite,
    fontWeight: '600',
  },
  libraryTitle: {
    ...Typography.h2,
    color: Colors.neutralWhite,
    marginBottom: Spacing.lg,
  },
  testamentSection: {
    marginBottom: Spacing.xxl,
  },
  testamentTitle: {
    ...Typography.h3,
    color: Colors.primaryGold,
    marginBottom: Spacing.lg,
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  bookCard: {
    width: '31%',
    aspectRatio: 1,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  bookName: {
    ...Typography.small,
    color: Colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomSpacer: {
    height: 100,
  },
});
