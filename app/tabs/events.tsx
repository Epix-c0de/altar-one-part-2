import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  CheckCircle,
  PlusCircle,
  List,
} from 'lucide-react-native';
import { TopAppBar } from '@/components/TopAppBar';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing, Radii } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';
import type { Event } from '@/types';

const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Sunday Mass',
    description: 'Weekly celebration of the Eucharist',
    date: '2025-12-08',
    time: '10:00 AM',
    location: 'St. Joseph Cathedral',
    type: 'mass',
    rsvpCount: 234,
    hasRsvped: true,
  },
  {
    id: '2',
    title: 'Youth Fellowship Meeting',
    description: 'Monthly gathering for young adults',
    date: '2025-12-10',
    time: '6:00 PM',
    location: 'Parish Hall',
    type: 'meeting',
    rsvpCount: 45,
    hasRsvped: false,
  },
  {
    id: '3',
    title: 'Christmas Concert',
    description: 'Annual choir performance celebrating the birth of Jesus',
    date: '2025-12-24',
    time: '7:00 PM',
    location: 'Main Church',
    type: 'celebration',
    rsvpCount: 567,
    hasRsvped: true,
  },
];

type ViewMode = 'calendar' | 'list';

export default function EventsScreen() {
  const { enterMode, exitMode } = useNavigation();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);

  React.useEffect(() => {
    enterMode('events');
    return () => exitMode();
  }, [enterMode, exitMode]);

  const handleRsvp = (eventId: string) => {
    console.log('[Events] RSVP to event:', eventId);
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              hasRsvped: !e.hasRsvped,
              rsvpCount: e.hasRsvped ? e.rsvpCount - 1 : e.rsvpCount + 1,
            }
          : e
      )
    );
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'mass':
        return Colors.primaryGold;
      case 'prayer':
        return Colors.accentLavender;
      case 'meeting':
        return '#6B9CFF';
      case 'celebration':
        return '#FF9F6B';
      default:
        return Colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F1B3D', '#1a2847', '#2a3a5f']} style={StyleSheet.absoluteFill} />

      <TopAppBar
        title="Events"
        rightActions={
          <>
            <Pressable
              onPress={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}
              accessibilityRole="button"
              accessibilityLabel="Toggle view"
            >
              {viewMode === 'list' ? (
                <CalendarIcon size={24} color={Colors.textPrimary} />
              ) : (
                <List size={24} color={Colors.textPrimary} />
              )}
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Create event">
              <PlusCircle size={24} color={Colors.primaryGold} />
            </Pressable>
          </>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <Text style={styles.sectionCount}>{events.length}</Text>
            </View>

            {events.map((event) => (
              <GlassCard key={event.id} style={styles.eventCard} interactive>
                <View style={styles.eventHeader}>
                  <View
                    style={[
                      styles.eventTypeIndicator,
                      { backgroundColor: getEventTypeColor(event.type) },
                    ]}
                  />
                  <View style={styles.eventHeaderText}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDescription}>{event.description}</Text>
                  </View>
                </View>

                <View style={styles.eventDetails}>
                  <View style={styles.eventDetail}>
                    <CalendarIcon size={16} color={Colors.textSecondary} />
                    <Text style={styles.eventDetailText}>{event.date}</Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <Clock size={16} color={Colors.textSecondary} />
                    <Text style={styles.eventDetailText}>{event.time}</Text>
                  </View>
                  <View style={styles.eventDetail}>
                    <MapPin size={16} color={Colors.textSecondary} />
                    <Text style={styles.eventDetailText}>{event.location}</Text>
                  </View>
                </View>

                <View style={styles.eventFooter}>
                  <Text style={styles.rsvpCount}>
                    {event.rsvpCount} {event.rsvpCount === 1 ? 'person' : 'people'} going
                  </Text>
                  <Pressable
                    style={[styles.rsvpButton, event.hasRsvped && styles.rsvpButtonActive]}
                    onPress={() => handleRsvp(event.id)}
                  >
                    <CheckCircle
                      size={18}
                      color={event.hasRsvped ? Colors.primaryDeepBlue : Colors.neutralWhite}
                    />
                    <Text
                      style={[
                        styles.rsvpButtonText,
                        event.hasRsvped && styles.rsvpButtonTextActive,
                      ]}
                    >
                      {event.hasRsvped ? 'Going' : 'RSVP'}
                    </Text>
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
  eventCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  eventTypeIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: Spacing.md,
  },
  eventHeaderText: {
    flex: 1,
  },
  eventTitle: {
    ...Typography.h3,
    fontSize: 17,
    color: Colors.neutralWhite,
    marginBottom: Spacing.xs,
  },
  eventDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  eventDetails: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  eventDetailText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  eventFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.glassBorder,
  },
  rsvpCount: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  rsvpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.neutralWhite,
  },
  rsvpButtonActive: {
    backgroundColor: Colors.primaryGold,
    borderColor: Colors.primaryGold,
  },
  rsvpButtonText: {
    ...Typography.body,
    color: Colors.neutralWhite,
    fontWeight: '600',
  },
  rsvpButtonTextActive: {
    color: Colors.primaryDeepBlue,
  },
  bottomSpacer: {
    height: 100,
  },
});
