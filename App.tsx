import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import AppNavigator from '@/navigation/AppNavigator';
import { loadFonts } from '@/constants/font';
import { UserProvider } from '@/contexts/UserContext';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const prepareApp = async () => {
    try {
      // Load fonts
      await loadFonts();
    } catch (e) {
      console.warn('Error loading assets:', e);
    }
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={prepareApp}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const AppContent = () => {
  const { isDark } = useTheme();

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <AppNavigator />
    </SafeAreaProvider>
  );
};