import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, Subscription, Budget } from '@/types/models';

// Storage keys
const EXPENSES_KEY = '@expense_tracker_expenses';
const SUBSCRIPTIONS_KEY = '@expense_tracker_subscriptions';
const BUDGET_KEY = '@expense_tracker_budget';

// Expense Operations
export const saveExpense = async (expense: Expense): Promise<void> => {
  try {
    const expenses = await getExpenses();
    const updatedExpenses = [...expenses, expense];
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
  } catch (error) {
    console.error('Error saving expense:', error);
    throw error;
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const expensesJson = await AsyncStorage.getItem(EXPENSES_KEY);
    return expensesJson ? JSON.parse(expensesJson) : [];
  } catch (error) {
    console.error('Error retrieving expenses:', error);
    return [];
  }
};

export const updateExpense = async (updatedExpense: Expense): Promise<void> => {
  try {
    const expenses = await getExpenses();
    const updatedExpenses = expenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(updatedExpenses));
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (expenseId: string): Promise<void> => {
  try {
    const expenses = await getExpenses();
    const filteredExpenses = expenses.filter((expense) => expense.id !== expenseId);
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(filteredExpenses));
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

// Subscription Operations
export const saveSubscription = async (subscription: Subscription): Promise<void> => {
  try {
    const subscriptions = await getSubscriptions();
    const updatedSubscriptions = [...subscriptions, subscription];
    await AsyncStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(updatedSubscriptions));
  } catch (error) {
    console.error('Error saving subscription:', error);
    throw error;
  }
};

export const getSubscriptions = async (): Promise<Subscription[]> => {
  try {
    const subscriptionsJson = await AsyncStorage.getItem(SUBSCRIPTIONS_KEY);
    return subscriptionsJson ? JSON.parse(subscriptionsJson) : [];
  } catch (error) {
    console.error('Error retrieving subscriptions:', error);
    return [];
  }
};

export const updateSubscription = async (updatedSubscription: Subscription): Promise<void> => {
  try {
    const subscriptions = await getSubscriptions();
    const updatedSubscriptions = subscriptions.map((subscription) =>
      subscription.id === updatedSubscription.id ? updatedSubscription : subscription
    );
    await AsyncStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(updatedSubscriptions));
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

export const deleteSubscription = async (subscriptionId: string): Promise<void> => {
  try {
    const subscriptions = await getSubscriptions();
    const filteredSubscriptions = subscriptions.filter(
      (subscription) => subscription.id !== subscriptionId
    );
    await AsyncStorage.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(filteredSubscriptions));
  } catch (error) {
    console.error('Error deleting subscription:', error);
    throw error;
  }
};

// Budget Operations
export const saveBudget = async (budget: Budget): Promise<void> => {
  try {
    await AsyncStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
  } catch (error) {
    console.error('Error saving budget:', error);
    throw error;
  }
};

export const getBudget = async (): Promise<Budget | null> => {
  try {
    const budgetJson = await AsyncStorage.getItem(BUDGET_KEY);
    return budgetJson ? JSON.parse(budgetJson) : null;
  } catch (error) {
    console.error('Error retrieving budget:', error);
    return null;
  }
};

// Clear all data (for testing or reset functionality)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([EXPENSES_KEY, SUBSCRIPTIONS_KEY, BUDGET_KEY]);
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
};