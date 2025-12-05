import { BlurView } from 'expo-blur';
import React, { ReactNode } from 'react';
import { StyleSheet, View, Pressable, Platform } from 'react-native';
import { Colors, Radii, Shadows } from '@/constants/tokens';

type GlassCardProps = {
  children: ReactNode;
  style?: any;
  elevation?: 'light' | 'medium' | 'soft';
  interactive?: boolean;
  onPress?: () => void;
  blur?: number;
};

export function GlassCard({ 
  children, 
  style, 
  elevation = 'medium', 
  interactive = false, 
  onPress,
  blur = 20 
}: GlassCardProps) {
  const content = (
    <View style={[styles.glassCard, Shadows[elevation], style]}>
      {Platform.OS !== 'web' ? (
        <BlurView intensity={blur} style={StyleSheet.absoluteFill} />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.webBlur]} />
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );

  if (interactive && onPress) {
    return (
      <Pressable 
        onPress={onPress}
        style={({ pressed }) => [
          { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  glassCard: {
    borderRadius: Radii.card,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    overflow: 'hidden',
  },
  webBlur: {
    backgroundColor: Colors.glassBg,
    backdropFilter: 'blur(20px)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
