import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@/contexts/ThemeContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ExpenseCard from '@/components/expenses/ExpenseCard';
import SubscriptionCard from '@/components/subscriptions/SubscriptionCard';
import { Budget, Expense, Subscription } from '@/types/models';
import {
  calculateMonthlySubscriptionCost,
  calculateTotalExpenses,
  filterExpensesByDateRange,
  formatCurrency,
  getUpcomingSubscriptions,
} from '@/utils/helpers';
import { getBudget, getExpenses, getSubscriptions } from '@/services/storageService';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { addMonths, endOfMonth, format, startOfMonth } from 'date-fns';
import { SPACING } from '@/constants/theme';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors, isDark } = useTheme();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentMonth] = useState(new Date());

  // Load data
  const loadData = async () => {
    try {
      const loadedExpenses = await getExpenses();
      const loadedSubscriptions = await getSubscriptions();
      const loadedBudget = await getBudget();

      setExpenses(loadedExpenses);
      setSubscriptions(loadedSubscriptions);
      setBudget(loadedBudget);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // Calculate current month's expenses
  const currentMonthExpenses = filterExpensesByDateRange(
    expenses,
    startOfMonth(currentMonth),
    endOfMonth(currentMonth)
  );

  const totalExpensesThisMonth = calculateTotalExpenses(currentMonthExpenses);
  const monthlySubscriptionCost = calculateMonthlySubscriptionCost(subscriptions);
  const upcomingSubscriptions = getUpcomingSubscriptions(subscriptions);

  // Budget calculations
  const budgetAmount = budget?.total || 0;
  const remaining = budgetAmount - totalExpensesThisMonth;
  const percentUsed = budgetAmount > 0 ? (totalExpensesThisMonth / budgetAmount) * 100 : 0;

  // For the chart - last 6 months expenses
  const getLastSixMonthsData = () => {
    const labels = [];
    const data = [];

    for (let i = 5; i >= 0; i--) {
      const month = addMonths(currentMonth, -i);
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      const monthExpenses = filterExpensesByDateRange(expenses, monthStart, monthEnd);
      const totalForMonth = calculateTotalExpenses(monthExpenses);

      labels.push(format(month, 'MMM'));
      data.push(totalForMonth);
    }

    return { labels, data };
  };

  const chartData = getLastSixMonthsData();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Budget Overview Card */}
      <Card style={styles.budgetCard}>
        <View style={styles.budgetHeader}>
          <Text style={[styles.budgetTitle, { color: colors.text }]}>
            Budget Overview
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Budget')}
            style={styles.settingsButton}
          >
            <Ionicons name="settings-outline" size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.budgetInfo}>
          <View style={styles.budgetItem}>
            <Text style={[styles.budgetLabel, { color: colors.secondary }]}>
              Budget
            </Text>
            <Text style={[styles.budgetValue, { color: colors.text }]}>
              {formatCurrency(budgetAmount)}
            </Text>
          </View>

          <View style={styles.budgetItem}>
            <Text style={[styles.budgetLabel, { color: colors.secondary }]}>
              Spent
            </Text>
            <Text style={[styles.budgetValue, { color: colors.text }]}>
              {formatCurrency(totalExpensesThisMonth)}
            </Text>
          </View>

          <View style={styles.budgetItem}>
            <Text style={[styles.budgetLabel, { color: colors.secondary }]}>
              Remaining
            </Text>
            <Text
              style={[
                styles.budgetValue,
                { color: remaining < 0 ? colors.error : colors.success }
              ]}
            >
              {formatCurrency(remaining)}
            </Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={[styles.progressBarContainer, { backgroundColor: isDark ? '#333' : '#EEE' }]}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${Math.min(percentUsed, 100)}%`,
                backgroundColor: percentUsed > 100 ? colors.error : colors.success
              }
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: colors.secondary }]}>
          {percentUsed.toFixed(0)}% of budget used
        </Text>
      </Card>

      {/* Monthly Expenses Chart */}
      <Card>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Expenses Trend
        </Text>
        {expenses.length > 0 ? (
          <LineChart
            data={{
              labels: chartData.labels,
              datasets: [{ data: chartData.data }],
            }}
            width={340}
            height={200}
            chartConfig={{
              backgroundColor: colors.card,
              backgroundGradientFrom: colors.card,
              backgroundGradientTo: colors.card,
              decimalPlaces: 0,
              color: () => colors.accent,
              labelColor: () => colors.secondary,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '5',
                strokeWidth: '2',
                stroke: colors.accent,
              },
            }}
            bezier
            style={styles.chart}
          />
        ) : (
          <Text style={[styles.emptyText, { color: colors.secondary }]}>
            Add expenses to see your spending trends
          </Text>
        )}
        <Button
          title="View Statistics"
          variant="outline"
          size="small"
          onPress={() => navigation.navigate('Statistics')}
          style={styles.viewMoreButton}
        />
      </Card>

      {/* Recent Expenses */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Recent Expenses
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddExpense', {})}>
          <Ionicons name="add-circle-outline" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {currentMonthExpenses.length > 0 ? (
        currentMonthExpenses
          .slice(0, 3)
          .map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              onPress={() => navigation.navigate('AddExpense', { expenseId: expense.id })}
            />
          ))
      ) : (
        <Card>
          <Text style={[styles.emptyText, { color: colors.secondary }]}>
            No expenses this month. Add your first expense!
          </Text>
        </Card>
      )}

      <Button
        title="View All Expenses"
        variant="secondary"
        onPress={() => navigation.navigate('Expenses')}
        style={styles.viewMoreButton}
      />

      {/* Upcoming Subscriptions */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Upcoming Subscriptions
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddSubscription', {})}>
          <Ionicons name="add-circle-outline" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {upcomingSubscriptions.length > 0 ? (
        upcomingSubscriptions
          .slice(0, 3)
          .map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onPress={() => navigation.navigate('AddSubscription', { subscriptionId: subscription.id })}
            />
          ))
      ) : (
        <Card>
          <Text style={[styles.emptyText, { color: colors.secondary }]}>
            No upcoming subscriptions in the next 30 days
          </Text>
        </Card>
      )}

      <Button
        title="View All Subscriptions"
        variant="secondary"
        onPress={() => navigation.navigate('Subscriptions')}
        style={styles.viewMoreButton}
      />

      {/* Monthly subscription cost summary */}
      <Card style={styles.subscriptionSummary}>
        <Text style={[styles.summaryTitle, { color: colors.text }]}>
          Monthly Subscription Cost
        </Text>
        <Text style={[styles.summaryAmount, { color: colors.accent }]}>
          {formatCurrency(monthlySubscriptionCost)}
        </Text>
      </Card>

      {/* Spacer for bottom tabs */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  budgetCard: {
    marginBottom: SPACING.md,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  settingsButton: {
    padding: 4,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  budgetItem: {
    alignItems: 'center',
  },
  budgetLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'right',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    padding: SPACING.md,
  },
  chart: {
    marginVertical: SPACING.md,
    borderRadius: 16,
  },
  viewMoreButton: {
    marginTop: SPACING.sm,
  },
  subscriptionSummary: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 14,
    marginBottom: SPACING.sm,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default HomeScreen;