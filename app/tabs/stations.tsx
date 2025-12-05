import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { ChevronLeft, ChevronRight, BookOpen, Volume2, FileText } from 'lucide-react-native';
import { TopAppBar } from '@/components/TopAppBar';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing, Radii } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';
import type { Station } from '@/types';

const MOCK_STATIONS: Station[] = [
  {
    number: 1,
    title: 'Jesus is Condemned to Death',
    scripture: 'Matthew 27:22-26',
    reflection: 'Lord Jesus, help us to stand up for what is right even when others oppose us.',
    image: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800',
    audioUrl: '',
  },
  {
    number: 2,
    title: 'Jesus Carries His Cross',
    scripture: 'John 19:17',
    reflection: 'Help us to accept our crosses willingly and to carry them with patience.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    audioUrl: '',
  },
  {
    number: 3,
    title: 'Jesus Falls the First Time',
    scripture: 'Isaiah 53:4-6',
    reflection: 'When we fall into sin, help us to get up with renewed faith in your mercy.',
    image: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800',
    audioUrl: '',
  },
];

export default function StationsScreen() {
  const { enterMode, exitMode, playAudio } = useNavigation();
  const [currentStation, setCurrentStation] = useState<number>(0);

  React.useEffect(() => {
    enterMode('stations');
    return () => exitMode();
  }, [enterMode, exitMode]);

  const handlePrevious = () => {
    if (currentStation > 0) {
      setCurrentStation(currentStation - 1);
      console.log('[Stations] Previous station:', currentStation - 1);
    }
  };

  const handleNext = () => {
    if (currentStation < MOCK_STATIONS.length - 1) {
      setCurrentStation(currentStation + 1);
      console.log('[Stations] Next station:', currentStation + 1);
    }
  };

  const station = MOCK_STATIONS[currentStation];

  const handlePlayAudio = () => {
    console.log('[Stations] Play audio for station:', station.number);
    playAudio({
      id: `station-${station.number}`,
      title: station.title,
      duration: 180,
      url: station.audioUrl || '',
      type: 'prayer',
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F1B3D', '#1a2847', '#2a3a5f']} style={StyleSheet.absoluteFill} />

      <TopAppBar
        title="Stations of the Cross"
        rightActions={
          <View style={styles.progressIndicator}>
            <Text style={styles.progressText}>
              {currentStation + 1} / {MOCK_STATIONS.length}
            </Text>
          </View>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <GlassCard style={styles.stationCard}>
            <Image source={{ uri: station.image }} style={styles.stationImage} contentFit="cover" />

            <View style={styles.stationHeader}>
              <Text style={styles.stationNumber}>Station {station.number}</Text>
              <Text style={styles.stationTitle}>{station.title}</Text>
            </View>

            <View style={styles.stationSection}>
              <View style={styles.sectionHeader}>
                <BookOpen size={20} color={Colors.primaryGold} />
                <Text style={styles.sectionTitle}>Scripture</Text>
              </View>
              <Text style={styles.scriptureText}>{station.scripture}</Text>
            </View>

            <View style={styles.stationSection}>
              <View style={styles.sectionHeader}>
                <FileText size={20} color={Colors.primaryGold} />
                <Text style={styles.sectionTitle}>Reflection</Text>
              </View>
              <Text style={styles.reflectionText}>{station.reflection}</Text>
            </View>

            <View style={styles.actionRow}>
              <Pressable style={styles.audioButton} onPress={handlePlayAudio}>
                <Volume2 size={20} color={Colors.neutralWhite} />
                <Text style={styles.audioButtonText}>Play Audio</Text>
              </Pressable>
            </View>
          </GlassCard>

          <View style={styles.navigationRow}>
            <Pressable
              style={[styles.navButton, currentStation === 0 && styles.navButtonDisabled]}
              onPress={handlePrevious}
              disabled={currentStation === 0}
            >
              <ChevronLeft size={24} color={Colors.neutralWhite} />
              <Text style={styles.navButtonText}>Previous</Text>
            </Pressable>

            <Pressable
              style={[
                styles.navButton,
                currentStation === MOCK_STATIONS.length - 1 && styles.navButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={currentStation === MOCK_STATIONS.length - 1}
            >
              <Text style={styles.navButtonText}>Next</Text>
              <ChevronRight size={24} color={Colors.neutralWhite} />
            </Pressable>
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
    paddingBottom: Spacing.xxl,
  },
  progressIndicator: {
    backgroundColor: Colors.glassBg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.pill,
  },
  progressText: {
    ...Typography.body,
    color: Colors.neutralWhite,
    fontWeight: '600',
  },
  stationCard: {
    marginHorizontal: Spacing.lg,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  stationImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: Radii.card,
    borderTopRightRadius: Radii.card,
  },
  stationHeader: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  stationNumber: {
    ...Typography.body,
    color: Colors.primaryGold,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  stationTitle: {
    ...Typography.h2,
    color: Colors.neutralWhite,
    textAlign: 'center',
  },
  stationSection: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.neutralWhite,
  },
  scriptureText: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  reflectionText: {
    ...Typography.body,
    color: Colors.neutralWhite,
    lineHeight: 24,
  },
  actionRow: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.primaryGold,
    paddingVertical: Spacing.lg,
    borderRadius: Radii.button,
  },
  audioButtonText: {
    ...Typography.body,
    color: Colors.primaryDeepBlue,
    fontWeight: '700',
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.glassBg,
    paddingVertical: Spacing.lg,
    borderRadius: Radii.button,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    ...Typography.body,
    color: Colors.neutralWhite,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 100,
  },
});
