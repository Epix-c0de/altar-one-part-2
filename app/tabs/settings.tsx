import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Bell, 
  Moon, 
  Sun, 
  Type,
  Globe,
  Trash2,
  Database,
  Smartphone,
  HelpCircle,
  FileText,
  Shield,
  ChevronRight,
} from 'lucide-react-native';
import { GlassCard } from '@/components/GlassCard';
import { Colors, Typography, Spacing } from '@/constants/tokens';
import { useNavigation } from '@/contexts/NavigationContext';

type SettingsSection = {
  title: string;
  items: SettingItem[];
};

type SettingItem = {
  key: string;
  label: string;
  icon: any;
  type: 'nav' | 'toggle' | 'action';
  value?: boolean;
  onPress?: () => void;
  destructive?: boolean;
};

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [offlineDownloads, setOfflineDownloads] = useState<boolean>(true);
  const router = useRouter();
  const { goBack, canGoBack, enterMode } = useNavigation();

  React.useEffect(() => {
    enterMode('settings');
  }, [enterMode]);

  const handleBack = () => {
    if (canGoBack()) {
      const previousRoute = goBack();
      if (previousRoute) {
        router.push(previousRoute as any);
      }
    } else {
      router.push('/profile');
    }
  };

  const handleEditProfile = () => {
    console.log('[Settings] Edit profile');
    Alert.alert('Edit Profile', 'Profile editing coming soon');
  };

  const handleChangeEmail = () => {
    console.log('[Settings] Change email');
    Alert.alert('Change Email', 'Email change coming soon');
  };

  const handleChangePassword = () => {
    console.log('[Settings] Change password');
    Alert.alert('Change Password', 'Password change coming soon');
  };

  const handleManagePhone = () => {
    console.log('[Settings] Manage phone');
    Alert.alert('Phone Number', 'Phone management coming soon');
  };

  const handleNotificationSettings = () => {
    console.log('[Settings] Notification settings');
    Alert.alert('Notifications', 'Notification preferences coming soon');
  };

  const handleTextSize = () => {
    console.log('[Settings] Text size');
    Alert.alert('Text Size', 'Text size adjustment coming soon');
  };

  const handleLanguage = () => {
    console.log('[Settings] Language');
    Alert.alert('Language', 'Language selection coming soon');
  };

  const handleClearCache = () => {
    console.log('[Settings] Clear cache');
    Alert.alert('Clear Cache', 'Are you sure you want to clear cache?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: () => console.log('[Settings] Cache cleared') },
    ]);
  };

  const handleManageDevices = () => {
    console.log('[Settings] Manage devices');
    Alert.alert('Connected Devices', 'Device management coming soon');
  };

  const handleFAQ = () => {
    console.log('[Settings] FAQ');
    Alert.alert('FAQ', 'Frequently asked questions coming soon');
  };

  const handleSupport = () => {
    console.log('[Settings] Contact support');
    Alert.alert('Support', 'Contact support coming soon');
  };

  const handlePrivacy = () => {
    console.log('[Settings] Privacy policy');
    Alert.alert('Privacy Policy', 'Privacy policy coming soon');
  };

  const handleTerms = () => {
    console.log('[Settings] Terms of service');
    Alert.alert('Terms of Service', 'Terms of service coming soon');
  };

  const handleDeleteAccount = () => {
    console.log('[Settings] Delete account');
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => console.log('[Settings] Account deletion requested') 
        },
      ]
    );
  };

  const sections: SettingsSection[] = [
    {
      title: 'Account',
      items: [
        { key: 'edit', label: 'Edit Profile Info', icon: User, type: 'nav', onPress: handleEditProfile },
        { key: 'email', label: 'Change Email', icon: Mail, type: 'nav', onPress: handleChangeEmail },
        { key: 'password', label: 'Change Password', icon: Lock, type: 'nav', onPress: handleChangePassword },
        { key: 'phone', label: 'Phone Number', icon: Phone, type: 'nav', onPress: handleManagePhone },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { key: 'notifications', label: 'Notifications', icon: Bell, type: 'toggle', value: notificationsEnabled, onPress: () => setNotificationsEnabled(!notificationsEnabled) },
        { key: 'darkmode', label: 'Dark Mode', icon: darkMode ? Moon : Sun, type: 'toggle', value: darkMode, onPress: () => setDarkMode(!darkMode) },
        { key: 'textsize', label: 'Text Size', icon: Type, type: 'nav', onPress: handleTextSize },
        { key: 'language', label: 'App Language', icon: Globe, type: 'nav', onPress: handleLanguage },
        { key: 'offline', label: 'Offline Downloads', icon: Database, type: 'toggle', value: offlineDownloads, onPress: () => setOfflineDownloads(!offlineDownloads) },
      ],
    },
    {
      title: 'App Controls',
      items: [
        { key: 'cache', label: 'Clear Cache', icon: Trash2, type: 'action', onPress: handleClearCache },
        { key: 'notifSettings', label: 'Notification Settings', icon: Bell, type: 'nav', onPress: handleNotificationSettings },
        { key: 'devices', label: 'Connected Devices', icon: Smartphone, type: 'nav', onPress: handleManageDevices },
      ],
    },
    {
      title: 'About & Support',
      items: [
        { key: 'faq', label: 'FAQ', icon: HelpCircle, type: 'nav', onPress: handleFAQ },
        { key: 'support', label: 'Contact Support', icon: Mail, type: 'nav', onPress: handleSupport },
        { key: 'privacy', label: 'Privacy Policy', icon: Shield, type: 'nav', onPress: handlePrivacy },
        { key: 'terms', label: 'Terms of Service', icon: FileText, type: 'nav', onPress: handleTerms },
      ],
    },
    {
      title: 'Danger Zone',
      items: [
        { key: 'delete', label: 'Delete Account', icon: Trash2, type: 'action', onPress: handleDeleteAccount, destructive: true },
      ],
    },
  ];

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

          <Text style={styles.title}>Settings</Text>

          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.versionCard}>
              <GlassCard style={styles.versionCardInner}>
                <Text style={styles.appName}>Epix Shots</Text>
                <Text style={styles.versionText}>Version 1.0.0</Text>
              </GlassCard>
            </View>

            {sections.map((section, sectionIndex) => (
              <View key={sectionIndex} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <GlassCard style={styles.sectionCard}>
                  {section.items.map((item, itemIndex) => {
                    const IconComponent = item.icon;
                    const isLast = itemIndex === section.items.length - 1;

                    return (
                      <View key={item.key}>
                        <Pressable
                          onPress={item.onPress}
                          style={styles.settingItem}
                          accessibilityRole="button"
                          accessibilityLabel={item.label}
                        >
                          <View style={styles.settingLeft}>
                            <View style={[
                              styles.iconContainer,
                              item.destructive && styles.destructiveIconContainer,
                            ]}>
                              <IconComponent
                                size={20}
                                color={item.destructive ? Colors.dangerRed : Colors.primaryGold}
                              />
                            </View>
                            <Text style={[
                              styles.settingLabel,
                              item.destructive && styles.destructiveLabel,
                            ]}>
                              {item.label}
                            </Text>
                          </View>

                          {item.type === 'toggle' && (
                            <Switch
                              value={item.value}
                              onValueChange={item.onPress}
                              trackColor={{ 
                                false: Colors.textTertiary, 
                                true: Colors.primaryGold 
                              }}
                              thumbColor={Colors.neutralWhite}
                            />
                          )}

                          {item.type === 'nav' && (
                            <ChevronRight size={20} color={Colors.textSecondary} />
                          )}
                        </Pressable>

                        {!isLast && <View style={styles.divider} />}
                      </View>
                    );
                  })}
                </GlassCard>
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
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  versionCard: {
    marginBottom: Spacing.xxl,
  },
  versionCardInner: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  appName: {
    ...Typography.h2,
    color: Colors.primaryGold,
    fontWeight: '700',
    marginBottom: Spacing.xs,
  },
  versionText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.neutralWhite,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  sectionCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(248, 210, 106, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  destructiveIconContainer: {
    backgroundColor: 'rgba(166, 28, 44, 0.12)',
  },
  settingLabel: {
    ...Typography.body,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  destructiveLabel: {
    color: Colors.dangerRed,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginLeft: Spacing.lg + 40 + Spacing.md,
  },
  bottomSpacer: {
    height: 100,
  },
});
