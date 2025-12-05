import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Colors, Typography, Spacing, Shadows } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';

type TopAppBarProps = {
  title?: string;
  leftAction?: ReactNode;
  rightActions?: ReactNode;
  transparent?: boolean;
  showBack?: boolean;
};

export function TopAppBar({ title, leftAction, rightActions, transparent = false, showBack = false }: TopAppBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { canGoBack, goBack } = useNavigation();

  const handleBack = () => {
    console.log('[TopAppBar] Back button pressed');
    const prevRoute = goBack();
    if (prevRoute && canGoBack()) {
      console.log('[TopAppBar] Navigating to:', prevRoute);
      router.push(prevRoute as any);
    } else {
      console.log('[TopAppBar] Already at root, going to home');
      router.push('/');
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.sm }]}>
      {!transparent && (
        Platform.OS !== 'web' ? (
          <BlurView intensity={30} style={StyleSheet.absoluteFill} />
        ) : (
          <View style={[StyleSheet.absoluteFill, styles.webBlur]} />
        )
      )}
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBack && canGoBack() ? (
            <Pressable onPress={handleBack} accessibilityRole="button" accessibilityLabel="Go back">
              <ArrowLeft size={24} color={Colors.textPrimary} />
            </Pressable>
          ) : leftAction}
        </View>
        {title && (
          <View style={styles.centerSection}>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
          </View>
        )}
        <View style={styles.rightSection}>
          {rightActions}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.glassBg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.glassBorder,
    ...Shadows.light,
  },
  webBlur: {
    backgroundColor: Colors.glassBg,
    backdropFilter: 'blur(30px)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 56,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: Spacing.md,
  },
  title: {
    ...Typography.h3,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});
