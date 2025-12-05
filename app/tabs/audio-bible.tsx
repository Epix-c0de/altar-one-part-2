import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Headphones, PlayCircle, Download, Gauge } from 'lucide-react-native';
import { TopAppBar } from '@/components/TopAppBar';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing, Radii } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';
import type { BibleBook } from '@/types';

const MOCK_OLD_TESTAMENT: BibleBook[] = [
  { id: '1', name: 'Genesis', testament: 'old', chapters: 50, abbreviation: 'Gen' },
  { id: '2', name: 'Exodus', testament: 'old', chapters: 40, abbreviation: 'Exo' },
  { id: '3', name: 'Leviticus', testament: 'old', chapters: 27, abbreviation: 'Lev' },
  { id: '4', name: 'Numbers', testament: 'old', chapters: 36, abbreviation: 'Num' },
  { id: '5', name: 'Deuteronomy', testament: 'old', chapters: 34, abbreviation: 'Deu' },
];

const MOCK_NEW_TESTAMENT: BibleBook[] = [
  { id: '40', name: 'Matthew', testament: 'new', chapters: 28, abbreviation: 'Mat' },
  { id: '41', name: 'Mark', testament: 'new', chapters: 16, abbreviation: 'Mar' },
  { id: '42', name: 'Luke', testament: 'new', chapters: 24, abbreviation: 'Luk' },
  { id: '43', name: 'John', testament: 'new', chapters: 21, abbreviation: 'Joh' },
  { id: '44', name: 'Acts', testament: 'new', chapters: 28, abbreviation: 'Act' },
];

type Testament = 'old' | 'new';

export default function AudioBibleScreen() {
  const { enterMode, exitMode, playAudio } = useNavigation();
  const [selectedTestament, setSelectedTestament] = useState<Testament>('old');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  React.useEffect(() => {
    enterMode('audiobible');
    return () => exitMode();
  }, [enterMode, exitMode]);

  const books = selectedTestament === 'old' ? MOCK_OLD_TESTAMENT : MOCK_NEW_TESTAMENT;

  const handlePlayBook = (book: BibleBook) => {
    console.log('[AudioBible] Play book:', book.name);
    playAudio({
      id: book.id,
      title: book.name,
      duration: book.chapters * 300,
      url: '',
      type: 'audio_bible',
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F1B3D', '#1a2847', '#2a3a5f']} style={StyleSheet.absoluteFill} />

      <TopAppBar
        title="Audio Bible"
        rightActions={
          <Pressable
            style={styles.speedButton}
            onPress={() => setPlaybackSpeed((s) => (s === 2.0 ? 0.75 : s + 0.25))}
            accessibilityRole="button"
            accessibilityLabel="Playback speed"
          >
            <Gauge size={20} color={Colors.primaryGold} />
            <Text style={styles.speedText}>{playbackSpeed.toFixed(2)}x</Text>
          </Pressable>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <GlassCard style={styles.infoCard}>
            <Headphones size={32} color={Colors.primaryGold} />
            <Text style={styles.infoTitle}>Listen to God&apos;s Word</Text>
            <Text style={styles.infoText}>
              Experience the complete Bible in audio format. Perfect for devotional time or while
              commuting.
            </Text>
          </GlassCard>

          <View style={styles.testamentToggle}>
            <Pressable
              style={[
                styles.testamentButton,
                selectedTestament === 'old' && styles.testamentButtonActive,
              ]}
              onPress={() => setSelectedTestament('old')}
            >
              <Text
                style={[
                  styles.testamentButtonText,
                  selectedTestament === 'old' && styles.testamentButtonTextActive,
                ]}
              >
                Old Testament
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.testamentButton,
                selectedTestament === 'new' && styles.testamentButtonActive,
              ]}
              onPress={() => setSelectedTestament('new')}
            >
              <Text
                style={[
                  styles.testamentButtonText,
                  selectedTestament === 'new' && styles.testamentButtonTextActive,
                ]}
              >
                New Testament
              </Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {selectedTestament === 'old' ? 'Old Testament Books' : 'New Testament Books'}
            </Text>
            {books.map((book) => (
              <GlassCard key={book.id} style={styles.bookCard} interactive>
                <View style={styles.bookInfo}>
                  <BookOpen size={24} color={Colors.primaryGold} />
                  <View style={styles.bookTextInfo}>
                    <Text style={styles.bookName}>{book.name}</Text>
                    <Text style={styles.bookChapters}>{book.chapters} chapters</Text>
                  </View>
                </View>
                <View style={styles.bookActions}>
                  <Pressable
                    style={styles.iconButton}
                    onPress={() => handlePlayBook(book)}
                    accessibilityLabel="Play"
                  >
                    <PlayCircle size={24} color={Colors.primaryGold} />
                  </Pressable>
                  <Pressable
                    style={styles.iconButton}
                    onPress={() => console.log('[AudioBible] Download:', book.name)}
                    accessibilityLabel="Download"
                  >
                    <Download size={20} color={Colors.textSecondary} />
                  </Pressable>
                </View>
              </GlassCard>
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
  speedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.glassBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.pill,
  },
  speedText: {
    ...Typography.body,
    color: Colors.primaryGold,
    fontWeight: '700',
  },
  infoCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  infoTitle: {
    ...Typography.h2,
    color: Colors.neutralWhite,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  infoText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  testamentToggle: {
    flexDirection: 'row',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    backgroundColor: Colors.glassBg,
    borderRadius: Radii.pill,
    padding: Spacing.xs,
  },
  testamentButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderRadius: Radii.pill,
  },
  testamentButtonActive: {
    backgroundColor: Colors.primaryGold,
  },
  testamentButtonText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  testamentButtonTextActive: {
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
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
  },
  bookInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  bookTextInfo: {
    flex: 1,
  },
  bookName: {
    ...Typography.h3,
    fontSize: 16,
    color: Colors.neutralWhite,
    marginBottom: Spacing.xs / 2,
  },
  bookChapters: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  bookActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconButton: {
    padding: Spacing.sm,
  },
  bottomSpacer: {
    height: 100,
  },
});
