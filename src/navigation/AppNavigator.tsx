import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import ExpensesScreen from '@/screens/expenses/ExpensesScreen';
import AddExpenseScreen from '@/screens/expenses/AddExpenseScreen';
import SubscriptionsScreen from '@/screens/subscriptions/SubscriptionsScreen';
import AddSubscriptionScreen from '@/screens/subscriptions/AddSubscriptionScreen';
import SettingsScreen from '@/screens/settings/SettingsScreen';
import BudgetScreen from '@/screens/expenses/BudgetScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import StatisticsScreen from '@/screens/home/StatisticsScreen';

// Import contexts
import { useTheme } from '@/contexts/ThemeContext';
import { useUser } from '@/contexts/UserContext';

// Define root stack parameter list
export type RootStackParamList = {
  Main: undefined;
  AddExpense: { expenseId?: string };
  AddSubscription: { subscriptionId?: string };
  ExpenseDetails: { expenseId: string };
  SubscriptionDetails: { subscriptionId: string };
  Budget: undefined;
  Statistics: undefined;
  Settings: undefined;
  Expenses: undefined;
  Subscriptions: undefined;
};

// Define tab parameter list
export type TabParamList = {
  Home: undefined;
  Expenses: undefined;
  Subscriptions: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const MainTabs = () => {
  const { colors, isDark } = useTheme();
  const { userName } = useUser();
  const [greeting, setGreeting] = useState(`Hello ${userName}`);

  // Update greeting when userName changes
  useEffect(() => {
    setGreeting(`Hello ${userName}`);
  }, [userName]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Expenses') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Subscriptions') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: isDark ? '#000' : undefined,
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: greeting }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{ title: 'Expenses' }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{ title: 'Subscriptions' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { colors, isDark } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
            shadowColor: isDark ? '#000' : undefined,
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddExpense"
          component={AddExpenseScreen}
          options={({ route }) => ({
            title: route.params?.expenseId ? 'Edit Expense' : 'Add Expense',
          })}
        />
        <Stack.Screen
          name="AddSubscription"
          component={AddSubscriptionScreen}
          options={({ route }) => ({
            title: route.params?.subscriptionId ? 'Edit Subscription' : 'Add Subscription',
          })}
        />
        <Stack.Screen
          name="Budget"
          component={BudgetScreen}
          options={{ title: 'Budget Settings' }}
        />
        <Stack.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{ title: 'Statistics' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;