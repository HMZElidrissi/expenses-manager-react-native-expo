import React, { useCallback, useState } from 'react';
import { Dimensions, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { eachMonthOfInterval, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';

import { useTheme } from '@/contexts/ThemeContext';
import Card from '@/components/ui/Card';
import { Expense, ExpenseCategory } from '@/types/models';
import {
  calculateTotalExpenses,
  filterExpensesByDateRange,
  formatCurrency,
  formatDataForPieChart,
  groupExpensesByCategory,
} from '@/utils/helpers';
import { getExpenses } from '@/services/storageService';
import { CATEGORY_COLORS, SPACING } from '@/constants/theme';

const { width: screenWidth } = Dimensions.get('window');

const StatisticsScreen: React.FC = () => {
  const { colors, isDark } = useTheme();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState<'3months' | '6months' | '1year'>('3months');
  const [currentMonth] = useState(new Date());

  // Load data
  const loadData = async () => {
    try {
      const loadedExpenses = await getExpenses();
      setExpenses(loadedExpenses);
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

  // Filter expenses based on selected time range
  const getTimeRangeDate = () => {
    switch (timeRange) {
      case '3months':
        return subMonths(currentMonth, 3);
      case '6months':
        return subMonths(currentMonth, 6);
      case '1year':
        return subMonths(currentMonth, 12);
      default:
        return subMonths(currentMonth, 3);
    }
  };

  const startDate = getTimeRangeDate();
  const endDate = currentMonth;

  const filteredExpenses = filterExpensesByDateRange(
    expenses,
    startDate,
    endDate
  );

  // Prepare data for pie chart - Category distribution
  const expensesByCategory = groupExpensesByCategory(filteredExpenses);
  const pieChartData = formatDataForPieChart(expensesByCategory);

  // Prepare data for line chart - Monthly trends
  const getMonthlyExpensesData = () => {
    const months = eachMonthOfInterval({
      start: startDate,
      end: endDate,
    });

    const labels = months.map(month => format(month, 'MMM'));
    const data = months.map(month => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      const monthExpenses = filterExpensesByDateRange(expenses, monthStart, monthEnd);
      return calculateTotalExpenses(monthExpenses);
    });

    return { labels, data };
  };

  const monthlyData = getMonthlyExpensesData();

  // Calculate top spending categories
  const getTopCategories = () => {
    return Object.entries(expensesByCategory)
      .sort(([, amountA], [, amountB]) => amountB - amountA)
      .slice(0, 3)
      .map(([category, amount]) => ({ category: category as ExpenseCategory, amount }));
  };

  const topCategories = getTopCategories();

  // Calculate total for the period
  const totalExpenses = calculateTotalExpenses(filteredExpenses);

  // Calculate average monthly spending
  const monthCount = monthlyData.labels.length || 1;
  const averageMonthlySpending = totalExpenses / monthCount;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Time range selector */}
      <View style={styles.timeRangeContainer}>
        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            timeRange === '3months' && { backgroundColor: colors.accent },
          ]}
          onPress={() => setTimeRange('3months')}
        >
          <Text
            style={[
              styles.timeRangeText,
              { color: timeRange === '3months' ? '#FFFFFF' : colors.text },
            ]}
          >
            3 Months
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            timeRange === '6months' && { backgroundColor: colors.accent },
          ]}
          onPress={() => setTimeRange('6months')}
        >
          <Text
            style={[
              styles.timeRangeText,
              { color: timeRange === '6months' ? '#FFFFFF' : colors.text },
            ]}
          >
            6 Months
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.timeRangeButton,
            timeRange === '1year' && { backgroundColor: colors.accent },
          ]}
          onPress={() => setTimeRange('1year')}
        >
          <Text
            style={[
              styles.timeRangeText,
              { color: timeRange === '1year' ? '#FFFFFF' : colors.text },
            ]}
          >
            1 Year
          </Text>
        </TouchableOpacity>
      </View>

      {/* Summary Card */}
      <Card>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Summary: {format(startDate, 'MMM yyyy')} - {format(endDate, 'MMM yyyy')}
        </Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.secondary }]}>
              Total Expenses
            </Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              {formatCurrency(totalExpenses)}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryLabel, { color: colors.secondary }]}>
              Monthly Average
            </Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              {formatCurrency(averageMonthlySpending)}
            </Text>
          </View>
        </View>
      </Card>

      {/* Top Categories */}
      <Card>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Top Spending Categories
        </Text>
        {topCategories.length > 0 ? (
          topCategories.map((item, index) => (
            <View key={index} style={styles.topCategoryItem}>
              <View style={styles.categoryLabel}>
                <View
                  style={[
                    styles.categoryColor,
                    { backgroundColor: CATEGORY_COLORS[item.category] }
                  ]}
                />
                <Text style={[styles.categoryText, { color: colors.text }]}>
                  {item.category}
                </Text>
              </View>
              <Text style={[styles.categoryAmount, { color: colors.text }]}>
                {formatCurrency(item.amount)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={[styles.emptyText, { color: colors.secondary }]}>
            No expense data available
          </Text>
        )}
      </Card>

      {/* Category Distribution Chart */}
      <Card>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Expenses by Category
        </Text>
        {pieChartData.length > 0 ? (
          <View style={styles.pieChartContainer}>
            <PieChart
              data={pieChartData}
              width={screenWidth - 64}
              height={200}
              chartConfig={{
                backgroundColor: colors.card,
                backgroundGradientFrom: colors.card,
                backgroundGradientTo: colors.card,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              center={[10, 0]}
              absolute
            />
          </View>
        ) : (
          <Text style={[styles.emptyText, { color: colors.secondary }]}>
            No expense data available
          </Text>
        )}
      </Card>

      {/* Monthly Trend Chart */}
      <Card>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Monthly Spending Trend
        </Text>
        {monthlyData.data.length > 0 ? (
          <LineChart
            data={{
              labels: monthlyData.labels,
              datasets: [{ data: monthlyData.data }],
            }}
            width={screenWidth - 64}
            height={220}
            yAxisLabel="$"
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
                r: '6',
                strokeWidth: '2',
                stroke: colors.accent,
              },
            }}
            bezier
            style={styles.chartStyle}
          />
        ) : (
          <Text style={[styles.emptyText, { color: colors.secondary }]}>
            No expense data available
          </Text>
        )}
      </Card>

      {/* Spacer for bottom padding */}
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  timeRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
  },
  timeRangeText: {
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  topCategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  categoryLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: SPACING.xs,
  },
  categoryText: {
    fontSize: 16,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  pieChartContainer: {
    alignItems: 'center',
    marginVertical: SPACING.sm,
  },
  chartStyle: {
    marginVertical: SPACING.md,
    borderRadius: 16,
  },
  emptyText: {
    textAlign: 'center',
    padding: SPACING.md,
  },
  bottomSpacer: {
    height: 40,
  },
});

export default StatisticsScreen;