import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Music, ScrollText, MessageCircle, FileText, X } from 'lucide-react-native';
import { TopAppBar } from '@/components/TopAppBar';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing, Radii } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';
import type { MassReading, Hymn } from '@/types';

const MOCK_READINGS: MassReading[] = [
  {
    id: '1',
    type: 'first_reading',
    title: 'First Reading',
    reference: 'Isaiah 55:1-11',
    text: 'Thus says the LORD: All you who are thirsty, come to the water! You who have no money, come, receive grain and eat...',
  },
  {
    id: '2',
    type: 'psalm',
    title: 'Responsorial Psalm',
    reference: 'Psalm 145',
    text: 'R. The hand of the Lord feeds us; he answers all our needs.\n\nThe eyes of all look hopefully to you, and you give them their food in due season...',
  },
  {
    id: '3',
    type: 'second_reading',
    title: 'Second Reading',
    reference: 'Romans 8:35, 37-39',
    text: 'Brothers and sisters: What will separate us from the love of Christ? Will anguish, or distress, or persecution...',
  },
  {
    id: '4',
    type: 'gospel',
    title: 'Gospel',
    reference: 'Matthew 14:13-21',
    text: 'When Jesus heard of the death of John the Baptist, he withdrew in a boat to a deserted place by himself...',
  },
];

const MOCK_HYMNS: Hymn[] = [
  {
    id: '1',
    number: '423',
    title: 'Be Not Afraid',
    source: 'hymnbook',
  },
  {
    id: '2',
    number: '567',
    title: 'Here I Am Lord',
    source: 'hymnbook',
  },
  {
    id: '3',
    number: '789',
    title: 'How Great Thou Art',
    source: 'hymnbook',
  },
];

const RESPONSES = [
  { id: '1', title: 'Lord, hear our prayer', type: 'petition' },
  { id: '2', title: 'Thanks be to God', type: 'thanksgiving' },
  { id: '3', title: 'Praise to you, Lord Jesus Christ', type: 'acclamation' },
  { id: '4', title: 'And with your spirit', type: 'response' },
  { id: '5', title: 'We lift them up to the Lord', type: 'response' },
  { id: '6', title: 'It is right and just', type: 'response' },
  { id: '7', title: 'Holy, Holy, Holy', type: 'acclamation' },
  { id: '8', title: 'Memorial Acclamation', type: 'acclamation' },
  { id: '9', title: 'Amen', type: 'affirmation' },
  { id: '10', title: 'Lord, I am not worthy', type: 'humility' },
];

type MassSection = 'readings' | 'hymns' | 'psalms' | 'responses' | 'notes';

export default function MassScreen() {
  const { enterMode, exitMode } = useNavigation();
  const [activeSection, setActiveSection] = useState<MassSection>('readings');
  const [notes] = useState<string>('');
  const [liturgicalSeason] = useState<string>('Ordinary Time');

  useEffect(() => {
    console.log('[Mass] Entering Mass Mode');
    enterMode('mass');
    return () => {
      console.log('[Mass] Exiting Mass Mode');
      exitMode();
    };
  }, [enterMode, exitMode]);

  const renderReadings = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.sectionContent}>
        <GlassCard style={styles.seasonCard}>
          <View style={styles.seasonBadge}>
            <Text style={styles.seasonText}>{liturgicalSeason}</Text>
          </View>
        </GlassCard>

        <Text style={styles.sectionTitle}>Today&apos;s Readings</Text>
        <Text style={styles.dateText}>Sunday, 18th Week in Ordinary Time</Text>

        {MOCK_READINGS.map((reading) => (
          <GlassCard key={reading.id} style={styles.readingCard}>
            <View style={styles.readingHeader}>
              <View>
                <Text style={styles.readingTitle}>{reading.title}</Text>
                <Text style={styles.readingReference}>{reading.reference}</Text>
              </View>
              {reading.type === 'gospel' && (
                <View style={styles.gospelBadge}>
                  <Text style={styles.gospelBadgeText}>Gospel</Text>
                </View>
              )}
            </View>
            <Text style={styles.readingText} numberOfLines={4}>
              {reading.text}
            </Text>
            <Pressable style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>Read Full Text →</Text>
            </Pressable>
          </GlassCard>
        ))}

        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );

  const renderHymns = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>Mass Hymns</Text>
        <Text style={styles.subtitle}>Suggested hymns for today&apos;s celebration</Text>

        <View style={styles.hymnSection}>
          <Text style={styles.hymnSectionTitle}>Entrance</Text>
          <GlassCard style={styles.hymnCard} interactive onPress={() => console.log('[Mass] Play hymn')}>
            <View style={styles.hymnContent}>
              <View style={styles.hymnInfo}>
                <Text style={styles.hymnNumber}># {MOCK_HYMNS[0].number}</Text>
                <Text style={styles.hymnTitle}>{MOCK_HYMNS[0].title}</Text>
              </View>
              <Music size={24} color={Colors.primaryGold} />
            </View>
          </GlassCard>
        </View>

        <View style={styles.hymnSection}>
          <Text style={styles.hymnSectionTitle}>Offertory</Text>
          <GlassCard style={styles.hymnCard} interactive onPress={() => console.log('[Mass] Play hymn')}>
            <View style={styles.hymnContent}>
              <View style={styles.hymnInfo}>
                <Text style={styles.hymnNumber}># {MOCK_HYMNS[1].number}</Text>
                <Text style={styles.hymnTitle}>{MOCK_HYMNS[1].title}</Text>
              </View>
              <Music size={24} color={Colors.primaryGold} />
            </View>
          </GlassCard>
        </View>

        <View style={styles.hymnSection}>
          <Text style={styles.hymnSectionTitle}>Communion</Text>
          <GlassCard style={styles.hymnCard} interactive onPress={() => console.log('[Mass] Play hymn')}>
            <View style={styles.hymnContent}>
              <View style={styles.hymnInfo}>
                <Text style={styles.hymnNumber}># {MOCK_HYMNS[2].number}</Text>
                <Text style={styles.hymnTitle}>{MOCK_HYMNS[2].title}</Text>
              </View>
              <Music size={24} color={Colors.primaryGold} />
            </View>
          </GlassCard>
        </View>

        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );

  const renderPsalms = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>Responsorial Psalm</Text>
        <GlassCard style={styles.psalmCard}>
          <Text style={styles.psalmReference}>Psalm 145</Text>
          <View style={styles.responseBox}>
            <Text style={styles.responseLabel}>Response:</Text>
            <Text style={styles.responseText}>
              The hand of the Lord feeds us; he answers all our needs.
            </Text>
          </View>
          <View style={styles.verseContainer}>
            <Text style={styles.verseText}>
              The eyes of all look hopefully to you,{'\n'}
              and you give them their food in due season;{'\n'}
              You open your hand{'\n'}
              and satisfy the desire of every living thing.
            </Text>
            <View style={styles.responseDivider} />
            <Text style={styles.verseText}>
              The LORD is just in all his ways{'\n'}
              and holy in all his works.{'\n'}
              The LORD is near to all who call upon him,{'\n'}
              to all who call upon him in truth.
            </Text>
          </View>
        </GlassCard>

        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );

  const renderResponses = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>Congregational Responses</Text>
        <Text style={styles.subtitle}>Common responses during Mass</Text>

        {RESPONSES.map((response) => (
          <GlassCard key={response.id} style={styles.responseCard}>
            <Text style={styles.responseTitle}>{response.title}</Text>
            <View style={styles.responseTypeBadge}>
              <Text style={styles.responseTypeText}>{response.type}</Text>
            </View>
          </GlassCard>
        ))}

        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );

  const renderNotes = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.sectionContent}>
        <Text style={styles.sectionTitle}>Mass Notes & Reflections</Text>
        <Text style={styles.subtitle}>Personal reflections from today&apos;s Mass</Text>

        <GlassCard style={styles.notesCard}>
          <Text style={styles.notesPlaceholder}>
            {notes || 'Tap to add your reflections, homily notes, or personal prayers...'}
          </Text>
        </GlassCard>

        <Pressable style={styles.addNoteButton}>
          <Text style={styles.addNoteButtonText}>+ Add Reflection</Text>
        </Pressable>

        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F1B3D', '#1a2847', '#2a3a5f']} style={StyleSheet.absoluteFill} />

      <TopAppBar
        title="Mass"
        rightActions={
          <Pressable onPress={() => exitMode()} accessibilityLabel="Exit Mass Mode">
            <X size={24} color={Colors.neutralWhite} />
          </Pressable>
        }
      />

      <View style={styles.tabBar}>
        <Pressable
          style={[styles.tab, activeSection === 'readings' && styles.activeTab]}
          onPress={() => setActiveSection('readings')}
        >
          <BookOpen size={20} color={activeSection === 'readings' ? Colors.primaryGold : Colors.textSecondary} />
          <Text style={[styles.tabText, activeSection === 'readings' && styles.activeTabText]}>
            Readings
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeSection === 'hymns' && styles.activeTab]}
          onPress={() => setActiveSection('hymns')}
        >
          <Music size={20} color={activeSection === 'hymns' ? Colors.primaryGold : Colors.textSecondary} />
          <Text style={[styles.tabText, activeSection === 'hymns' && styles.activeTabText]}>
            Hymns
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeSection === 'psalms' && styles.activeTab]}
          onPress={() => setActiveSection('psalms')}
        >
          <ScrollText size={20} color={activeSection === 'psalms' ? Colors.primaryGold : Colors.textSecondary} />
          <Text style={[styles.tabText, activeSection === 'psalms' && styles.activeTabText]}>
            Psalms
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeSection === 'responses' && styles.activeTab]}
          onPress={() => setActiveSection('responses')}
        >
          <MessageCircle size={20} color={activeSection === 'responses' ? Colors.primaryGold : Colors.textSecondary} />
          <Text style={[styles.tabText, activeSection === 'responses' && styles.activeTabText]}>
            Responses
          </Text>
        </Pressable>

        <Pressable
          style={[styles.tab, activeSection === 'notes' && styles.activeTab]}
          onPress={() => setActiveSection('notes')}
        >
          <FileText size={20} color={activeSection === 'notes' ? Colors.primaryGold : Colors.textSecondary} />
          <Text style={[styles.tabText, activeSection === 'notes' && styles.activeTabText]}>
            Notes
          </Text>
        </Pressable>
      </View>

      {activeSection === 'readings' && renderReadings()}
      {activeSection === 'hymns' && renderHymns()}
      {activeSection === 'psalms' && renderPsalms()}
      {activeSection === 'responses' && renderResponses()}
      {activeSection === 'notes' && renderNotes()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryDeepBlue,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(15, 27, 61, 0.5)',
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radii.button,
  },
  activeTab: {
    backgroundColor: 'rgba(248, 210, 106, 0.15)',
  },
  tabText: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.primaryGold,
    fontWeight: '600',
  },
  sectionContent: {
    flex: 1,
    padding: Spacing.lg,
  },
  seasonCard: {
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
  },
  seasonBadge: {
    backgroundColor: Colors.accentLavender,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  seasonText: {
    ...Typography.small,
    color: Colors.primaryDeepBlue,
    fontWeight: '600',
  },
  sectionTitle: {
    ...Typography.h1,
    color: Colors.neutralWhite,
    marginBottom: Spacing.sm,
  },
  dateText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  readingCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  readingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  readingTitle: {
    ...Typography.h3,
    color: Colors.neutralWhite,
    marginBottom: 4,
  },
  readingReference: {
    ...Typography.small,
    color: Colors.primaryGold,
    fontWeight: '600',
  },
  gospelBadge: {
    backgroundColor: Colors.primaryGold,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  gospelBadgeText: {
    ...Typography.small,
    color: Colors.primaryDeepBlue,
    fontWeight: '700',
  },
  readingText: {
    ...Typography.body,
    color: Colors.neutralWhite,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  readMoreButton: {
    alignSelf: 'flex-start',
  },
  readMoreText: {
    ...Typography.small,
    color: Colors.primaryGold,
    fontWeight: '600',
  },
  hymnSection: {
    marginBottom: Spacing.xxl,
  },
  hymnSectionTitle: {
    ...Typography.h3,
    color: Colors.neutralWhite,
    marginBottom: Spacing.md,
  },
  hymnCard: {
    padding: Spacing.lg,
  },
  hymnContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hymnInfo: {
    flex: 1,
  },
  hymnNumber: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  hymnTitle: {
    ...Typography.h3,
    color: Colors.neutralWhite,
  },
  psalmCard: {
    padding: Spacing.xl,
  },
  psalmReference: {
    ...Typography.h2,
    color: Colors.primaryGold,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  responseBox: {
    backgroundColor: 'rgba(248, 210, 106, 0.1)',
    padding: Spacing.lg,
    borderRadius: Radii.card,
    marginBottom: Spacing.xxl,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primaryGold,
  },
  responseLabel: {
    ...Typography.small,
    color: Colors.primaryGold,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
  },
  responseText: {
    ...Typography.h3,
    color: Colors.neutralWhite,
    lineHeight: 26,
  },
  verseContainer: {
    gap: Spacing.lg,
  },
  verseText: {
    ...Typography.body,
    color: Colors.neutralWhite,
    lineHeight: 26,
  },
  responseDivider: {
    height: 1,
    backgroundColor: Colors.glassBorder,
    marginVertical: Spacing.sm,
  },
  responseCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  responseTitle: {
    ...Typography.body,
    color: Colors.neutralWhite,
    fontWeight: '600',
    flex: 1,
  },
  responseTypeBadge: {
    backgroundColor: 'rgba(248, 210, 106, 0.15)',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  responseTypeText: {
    ...Typography.small,
    color: Colors.primaryGold,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  notesCard: {
    padding: Spacing.xl,
    minHeight: 200,
    marginBottom: Spacing.lg,
  },
  notesPlaceholder: {
    ...Typography.body,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  addNoteButton: {
    backgroundColor: Colors.primaryGold,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radii.button,
    alignItems: 'center',
  },
  addNoteButtonText: {
    ...Typography.body,
    color: Colors.primaryDeepBlue,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 120,
  },
});
