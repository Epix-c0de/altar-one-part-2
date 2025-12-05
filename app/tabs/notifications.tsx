import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { ArrowLeft, Bell, Church, Users, Radio, Settings as SettingsIcon } from 'lucide-react-native';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';
import type { Notification } from '@/types';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'parish', label: 'Parish' },
  { key: 'groups', label: 'Groups' },
  { key: 'live', label: 'Live' },
  { key: 'system', label: 'System' },
];

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'parish',
    title: 'Sunday Mass Reminder',
    message: 'Mass starts in 1 hour at St. Joseph Cathedral',
    timestamp: '10 mins ago',
    read: false,
    deepLink: '/mass',
  },
  {
    id: '2',
    type: 'live',
    title: 'Live Stream Started',
    message: 'Holy Cross Parish is now live streaming',
    timestamp: '25 mins ago',
    read: false,
    deepLink: '/live',
  },
  {
    id: '3',
    type: 'group',
    title: 'New Group Post',
    message: 'Youth Prayer Group: Join us for evening prayers',
    timestamp: '1 hour ago',
    read: true,
    deepLink: '/groups',
  },
  {
    id: '4',
    type: 'feed',
    title: 'Fr. Michael posted',
    message: 'Blessed are the peacemakers...',
    timestamp: '2 hours ago',
    read: true,
    deepLink: '/',
  },
  {
    id: '5',
    type: 'system',
    title: 'App Update Available',
    message: 'Version 2.0 is now available with new features',
    timestamp: '3 hours ago',
    read: true,
  },
];

export default function NotificationsScreen() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const router = useRouter();
  const { goBack, canGoBack, enterMode, setUnreadNotifications } = useNavigation();

  React.useEffect(() => {
    enterMode('notifications');
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

  const filteredNotifications = notifications.filter(notif => {
    if (activeCategory === 'all') return true;
    return notif.type === activeCategory;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationPress = (notification: Notification) => {
    console.log('[Notifications] Opening:', notification.title);
    
    setNotifications(prev =>
      prev.map(n => (n.id === notification.id ? { ...n, read: true } : n))
    );
    
    const newUnreadCount = notifications.filter(n => !n.read && n.id !== notification.id).length;
    setUnreadNotifications(newUnreadCount);
    
    if (notification.deepLink) {
      router.push(notification.deepLink as any);
    }
  };

  const handleMarkAllRead = () => {
    console.log('[Notifications] Marking all as read');
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadNotifications(0);
  };

  const handleClearAll = () => {
    console.log('[Notifications] Clearing all notifications');
    setNotifications([]);
    setUnreadNotifications(0);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'parish': return Church;
      case 'group': return Users;
      case 'live': return Radio;
      case 'system': return SettingsIcon;
      default: return Bell;
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

          <Text style={styles.title}>Notifications</Text>

          <Pressable 
            onPress={handleMarkAllRead}
            style={styles.actionButton}
            accessibilityRole="button"
            accessibilityLabel="Mark all as read"
          >
            <Text style={styles.actionText}>Mark Read</Text>
          </Pressable>
        </View>

        {unreadCount > 0 && (
          <View style={styles.unreadBanner}>
            <GlassCard style={styles.unreadCard}>
              <Text style={styles.unreadText}>
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </Text>
            </GlassCard>
          </View>
        )}

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map(category => (
            <Pressable
              key={category.key}
              onPress={() => setActiveCategory(category.key)}
              style={[
                styles.categoryChip,
                activeCategory === category.key && styles.activeCategoryChip,
              ]}
            >
              <Text
                style={[
                  styles.categoryLabel,
                  activeCategory === category.key && styles.activeCategoryLabel,
                ]}
              >
                {category.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {filteredNotifications.length === 0 ? (
              <View style={styles.emptyState}>
                <Bell size={48} color={Colors.textSecondary} />
                <Text style={styles.emptyText}>No notifications</Text>
                <Text style={styles.emptySubtext}>
                  {activeCategory === 'all' 
                    ? "You're all caught up!" 
                    : `No ${activeCategory} notifications`}
                </Text>
              </View>
            ) : (
              <>
                {filteredNotifications.map(notification => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <Pressable
                      key={notification.id}
                      onPress={() => handleNotificationPress(notification)}
                    >
                      <GlassCard
                        style={[
                          styles.notificationCard,
                          !notification.read && styles.unreadNotificationCard,
                        ]}
                      >
                        <View style={styles.notificationIconContainer}>
                          <IconComponent size={20} color={Colors.primaryGold} />
                        </View>
                        <View style={styles.notificationContent}>
                          <View style={styles.notificationHeader}>
                            <Text style={styles.notificationTitle}>
                              {notification.title}
                            </Text>
                            {!notification.read && (
                              <View style={styles.unreadDot} />
                            )}
                          </View>
                          <Text style={styles.notificationMessage}>
                            {notification.message}
                          </Text>
                          <Text style={styles.notificationTime}>
                            {notification.timestamp}
                          </Text>
                        </View>
                      </GlassCard>
                    </Pressable>
                  );
                })}

                {filteredNotifications.length > 0 && (
                  <Pressable
                    onPress={handleClearAll}
                    style={styles.clearButton}
                  >
                    <Text style={styles.clearButtonText}>Clear All Notifications</Text>
                  </Pressable>
                )}
              </>
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
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.h2,
    color: Colors.neutralWhite,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  actionButton: {
    width: 80,
    alignItems: 'flex-end',
  },
  actionText: {
    ...Typography.small,
    color: Colors.primaryGold,
    fontWeight: '600',
  },
  unreadBanner: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  unreadCard: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  unreadText: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  categoriesScroll: {
    maxHeight: 60,
  },
  categoriesContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  categoryChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 20,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
  },
  activeCategoryChip: {
    backgroundColor: 'rgba(248, 210, 106, 0.20)',
    borderColor: Colors.primaryGold,
  },
  categoryLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeCategoryLabel: {
    color: Colors.primaryGold,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  unreadNotificationCard: {
    borderWidth: 1,
    borderColor: Colors.primaryGold,
    backgroundColor: 'rgba(248, 210, 106, 0.05)',
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(248, 210, 106, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  notificationTitle: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryGold,
    marginLeft: Spacing.sm,
  },
  notificationMessage: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  notificationTime: {
    ...Typography.small,
    color: Colors.textTertiary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.huge,
    paddingTop: 100,
  },
  emptyText: {
    ...Typography.h2,
    color: Colors.textSecondary,
    marginTop: Spacing.xl,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.textTertiary,
  },
  clearButton: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    marginTop: Spacing.lg,
  },
  clearButtonText: {
    ...Typography.body,
    color: Colors.dangerRed,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 100,
  },
});
