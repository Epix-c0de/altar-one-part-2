import React from 'react';
import { View, Text, StyleSheet, Pressable, Animated, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Home,
  BookOpen,
  Heart,
  User,
  Church,
  Music,
  Radio,
  Users,
  Compass,
  Bell,
  Search,
  Settings,
  Download,
  MessageCircle,
  Sun,
  Moon,
  Laptop,
  Palette,
  Eye,
  Calendar,
  List,
  CheckCircle,
  PlusCircle,
  Filter,
  Clock,
  Bookmark,
  Mic,
  Shield,
  HelpCircle,
  Headphones,
  Gauge,
  Video,
  FileText,
  Sunrise,
  Sunset,
  Flower2,
  Library,
  Music2,
  Youtube,
  ListMusic,
  CalendarClock,
  Share2,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Map,
  Locate,
  BookText,
  ScrollText,
  MessagesSquare,
  BellDot,
  Image,
  Paperclip,
  Smile,
  Send,
  MoreHorizontal,
} from 'lucide-react-native';
import { Colors, Typography, Spacing, Shadows, Animations } from '@/constants/tokens';
import type { BottomNavItem } from '@/types';

type BottomNavBarProps = {
  items: BottomNavItem[];
  activeRoute: string;
  onNavigate: (route: string) => void;
};

const iconMap: Record<string, any> = {
  home: Home,
  bible: BookOpen,
  prayers: Heart,
  profile: User,
  'book-open': BookOpen,
  'book-text': BookText,
  headphones: Headphones,
  search: Search,
  'file-text': FileText,
  church: Church,
  music: Music,
  'scroll-text': ScrollText,
  'message-circle': MessageCircle,
  mass: Church,
  sunrise: Sunrise,
  sunset: Sunset,
  'flower-2': Flower2,
  heart: Heart,
  library: Library,
  'music-2': Music2,
  users: Users,
  youtube: Youtube,
  video: Video,
  'list-music': ListMusic,
  'radio': Radio,
  'calendar-clock': CalendarClock,
  'message-square': MessageCircle,
  'share-2': Share2,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'volume-2': Volume2,
  list: List,
  book: BookOpen,
  download: Download,
  gauge: Gauge,
  map: Map,
  locate: Locate,
  filter: Filter,
  compass: Compass,
  bell: Bell,
  'bell-dot': BellDot,
  'check-circle': CheckCircle,
  'plus-circle': PlusCircle,
  clock: Clock,
  bookmark: Bookmark,
  mic: Mic,
  user: User,
  shield: Shield,
  palette: Palette,
  'help-circle': HelpCircle,
  settings: Settings,
  'messages-square': MessagesSquare,
  image: Image,
  'layout-grid': Home,
  calendar: Calendar,
  paperclip: Paperclip,
  smile: Smile,
  send: Send,
  'more-horizontal': MoreHorizontal,
  sun: Sun,
  moon: Moon,
  laptop: Laptop,
  eye: Eye,
};

export function BottomNavBar({ items, activeRoute, onNavigate }: BottomNavBarProps) {
  const insets = useSafeAreaInsets();
  const scaleAnims = items.map(() => new Animated.Value(1));

  const handlePress = (route: string, index: number) => {
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 1.12,
        duration: Animations.short / 2,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
    ]).start();

    onNavigate(route);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + Spacing.sm }]}>
      {Platform.OS !== 'web' ? (
        <BlurView intensity={36} tint="dark" style={StyleSheet.absoluteFill} />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.webBlur]} />
      )}
      <View style={styles.content}>
        {items.map((item, index) => {
          const isActive = activeRoute === item.route;
          const IconComponent = iconMap[item.icon] || Home;
          
          return (
            <Pressable
              key={item.key}
              onPress={() => handlePress(item.route, index)}
              style={styles.navItem}
              accessibilityLabel={item.label}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Animated.View style={{ transform: [{ scale: scaleAnims[index] }] }}>
                <View style={[styles.iconContainer, isActive && styles.activeIconContainer]}>
                  <IconComponent
                    size={24}
                    color={isActive ? Colors.primaryGold : Colors.textSecondary}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </View>
              </Animated.View>
              <Text style={[styles.label, isActive && styles.activeLabel]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 27, 61, 0.3)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
    ...Shadows.medium,
  },
  webBlur: {
    backgroundColor: 'rgba(15, 27, 61, 0.3)',
    backdropFilter: 'blur(36px)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    minHeight: 56,
  },
  iconContainer: {
    padding: Spacing.sm,
    borderRadius: 12,
  },
  activeIconContainer: {
    backgroundColor: 'rgba(248, 210, 106, 0.12)',
  },
  label: {
    ...Typography.small,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeLabel: {
    color: Colors.primaryGold,
    fontWeight: '600',
  },
});
