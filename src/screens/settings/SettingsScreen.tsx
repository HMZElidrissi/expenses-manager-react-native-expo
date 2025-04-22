import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { clearAllData } from '@/services/storageService';
import { SPACING } from '@/constants/theme';
import { getFontFamily } from '@/constants/font';

const SettingsScreen: React.FC = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const { userName, setUserName } = useUser();
  const [isResetting, setIsResetting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [nameInput, setNameInput] = useState(userName);

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'Are you sure you want to reset all data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsResetting(true);
              await clearAllData();
              Alert.alert('Success', 'All data has been reset successfully.');
            } catch (error) {
              console.error('Error resetting data:', error);
              Alert.alert('Error', 'Failed to reset data. Please try again.');
            } finally {
              setIsResetting(false);
            }
          },
        },
      ],
    );
  };

  const handleOpenGitHub = () => {
    Linking.openURL('https://github.com/hamelID/ExpenseTracker');
  };

  const handleSaveName = async () => {
    if (nameInput.trim()) {
      await setUserName(nameInput.trim());
      setModalVisible(false);
      Alert.alert('Success', 'Your name has been updated!');
    } else {
      Alert.alert('Error', 'Please enter a valid name');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* User Profile */}
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          User Profile
        </Text>
        <View style={styles.profileSection}>
          <View style={[styles.profileAvatar, { backgroundColor: colors.accent }]}>
            <Text style={styles.avatarText}>
              {userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>
              {userName}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.editButton}
            >
              <Text style={[styles.editButtonText, { color: colors.accent }]}>
                Edit Name
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      {/* App Info */}
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          About
        </Text>
        <View style={styles.appInfoContainer}>
          <Text style={[styles.appName, { color: colors.text }]}>
            Expense Tracker
          </Text>
          <Text style={[styles.appVersion, { color: colors.secondary }]}>
            Version 1.0.0
          </Text>
          <Text style={[styles.appAuthor, { color: colors.secondary }]}>
            Created by Hamza El IDRISSI
          </Text>
        </View>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Appearance
        </Text>
        <View style={styles.settingItem}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>
            Dark Mode
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: colors.accent }}
            thumbColor={'#f4f3f4'}
          />
        </View>
      </Card>

      {/* Data Management */}
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Data Management
        </Text>
        <Button
          title="Reset All Data"
          variant="danger"
          onPress={handleResetData}
          loading={isResetting}
          style={styles.resetButton}
        />
        <Text style={[styles.warningText, { color: colors.secondary }]}>
          Warning: This will permanently delete all your expenses, subscriptions, and budget settings.
        </Text>
      </Card>

      {/* Support & Links */}
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Support & Links
        </Text>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={handleOpenGitHub}
        >
          <View style={styles.linkContent}>
            <Ionicons name="logo-github" size={20} color={colors.accent} />
            <Text style={[styles.linkText, { color: colors.text }]}>
              GitHub Repository
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.secondary} />
        </TouchableOpacity>
      </Card>

      {/* Privacy Policy */}
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Privacy
        </Text>
        <Text style={[styles.privacyText, { color: colors.secondary }]}>
          All your data is stored locally on your device. We do not collect any personal information or usage data.
        </Text>
      </Card>

      {/* App Credits */}
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Credits
        </Text>
        <Text style={[styles.creditsText, { color: colors.secondary }]}>
          This app was built with React Native, Expo, and TypeScript.
        </Text>
        <Text style={[styles.creditsText, { color: colors.secondary }]}>
          Icons provided by Ionicons.
        </Text>
      </Card>

      {/* Bottom space for tab navigation */}
      <View style={styles.bottomSpace} />

      {/* Name Edit Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.modalTitle, { color: colors.text, fontFamily: getFontFamily('medium') }]}>
              Edit Your Name
            </Text>

            <TextInput
              style={[
                styles.nameInput,
                {
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border,
                  fontFamily: getFontFamily('regular'),
                },
              ]}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Enter your name"
              placeholderTextColor={colors.secondary}
              autoFocus
            />

            <View style={styles.modalButtons}>
              <Button
                title="Cancel"
                variant="secondary"
                size="small"
                onPress={() => {
                  setNameInput(userName);
                  setModalVisible(false);
                }}
                style={styles.modalButton}
              />
              <Button
                title="Save"
                variant="primary"
                size="small"
                onPress={handleSaveName}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  appInfoContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  appVersion: {
    fontSize: 16,
    marginBottom: SPACING.xs,
  },
  appAuthor: {
    fontSize: 14,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
  },
  settingLabel: {
    fontSize: 16,
  },
  resetButton: {
    marginBottom: SPACING.sm,
  },
  warningText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  linkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    marginLeft: SPACING.sm,
  },
  privacyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  creditsText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: SPACING.xs,
  },
  bottomSpace: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: 10,
    padding: SPACING.lg,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  nameInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default SettingsScreen;