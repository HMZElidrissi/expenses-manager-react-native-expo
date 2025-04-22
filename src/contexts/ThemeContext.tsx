import React, {createContext, useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from 'react-native';
import {ThemeMode} from '../types/models';
import {COLORS, SHADOWS} from '../constants/theme';

interface ThemeContextType {
    theme: ThemeMode;
    isDark: boolean;
    colors: typeof COLORS.light | typeof COLORS.dark;
    shadows: typeof SHADOWS.light | typeof SHADOWS.dark;
    toggleTheme: () => void;
    setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@expense_tracker_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const deviceTheme = useColorScheme() as ThemeMode || 'light';
    const [theme, setThemeState] = useState<ThemeMode>(deviceTheme);

    useEffect(() => {
        // Load saved theme from AsyncStorage
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                if (savedTheme) {
                    setThemeState(savedTheme as ThemeMode);
                }
            } catch (error) {
                console.error('Failed to load theme preference:', error);
            }
        };

        loadTheme();
    }, []);

    const isDark = theme === 'dark';
    const colors = isDark ? COLORS.dark : COLORS.light;
    const shadows = isDark ? SHADOWS.dark : SHADOWS.light;

    const setTheme = async (newTheme: ThemeMode) => {
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
            setThemeState(newTheme);
        } catch (error) {
            console.error('Failed to save theme preference:', error);
        }
    };

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                isDark,
                colors,
                shadows,
                toggleTheme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};