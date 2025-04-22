import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';

import { useTheme } from '@/contexts/ThemeContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ExpenseCard from '@/components/expenses/ExpenseCard';
import { Expense } from '@/types/models';
import {
  calculateTotalExpenses,
  filterExpensesByDateRange,
  formatCurrency,
  searchExpensesByTerm,
} from '@/utils/helpers';
import { deleteExpense, getExpenses } from '@/services/storageService';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { SPACING } from '@/constants/theme';
import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';

type ExpensesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface ExpensesScreenProps {
  navigation: ExpensesScreenNavigationProp;
}

const ExpensesScreen: React.FC<ExpensesScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dateRange, setDateRange] = useState({
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Load expenses
  const loadExpenses = async () => {
    try {
      const loadedExpenses = await getExpenses();
      setExpenses(loadedExpenses);
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  // Apply filters
  useEffect(() => {
    let result = expenses;

    // Filter by date range
    result = filterExpensesByDateRange(
      result,
      dateRange.startDate,
      dateRange.endDate
    );

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(expense => expense.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      result = searchExpensesByTerm(result, searchTerm);
    }

    // Sort by date, newest first
    result = [...result].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    setFilteredExpenses(result);
  }, [expenses, searchTerm, selectedCategory, dateRange]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadExpenses();
    setRefreshing(false);
  };

  const handleDeleteExpense = (id: string) => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteExpense(id);
              await loadExpenses();
            } catch (error) {
              console.error('Error deleting expense:', error);
            }
          },
        },
      ]
    );
  };

  const handleAddExpense = () => {
    navigation.navigate('AddExpense', {});
  };

  // Date picker handlers
  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setDateRange({ ...dateRange, startDate: selectedDate });
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setDateRange({ ...dateRange, endDate: selectedDate });
    }
  };

  // Quick date range filters
  const setQuickDateRange = (months: number) => {
    const endDate = new Date();
    const startDate = subMonths(endDate, months);
    setDateRange({ startDate, endDate });
  };

  // Calculate total for filtered expenses
  const totalFilteredExpenses = calculateTotalExpenses(filteredExpenses);

  // Generate category picker items
  const categoryItems = [
    { label: 'All Categories', value: 'All' },
    { label: 'Food', value: 'Food' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Entertainment', value: 'Entertainment' },
    { label: 'Utilities', value: 'Utilities' },
    { label: 'Shopping', value: 'Shopping' },
    { label: 'Health', value: 'Health' },
    { label: 'Education', value: 'Education' },
    { label: 'Other', value: 'Other' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search and filter bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.secondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search expenses..."
            placeholderTextColor={colors.secondary}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          {searchTerm ? (
            <TouchableOpacity onPress={() => setSearchTerm('')}>
              <Ionicons name="close-circle" size={20} color={colors.secondary} />
            </TouchableOpacity>
          ) : null}
        </View>
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: colors.card }]}
          onPress={() => setShowFilters(!showFilters)}
        >
          <Ionicons
            name={showFilters ? "chevron-up" : "options"}
            size={20}
            color={colors.secondary}
          />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      {showFilters && (
        <Card style={styles.filtersContainer}>
          <Text style={[styles.filterTitle, { color: colors.text }]}>Filters</Text>

          {/* Category filter */}
          <View style={styles.filterRow}>
            <Text style={[styles.filterLabel, { color: colors.secondary }]}>Category</Text>
            <View style={[styles.pickerContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <RNPickerSelect
                onValueChange={(value) => setSelectedCategory(value)}
                value={selectedCategory}
                items={categoryItems}
                style={{
                  inputIOS: { color: colors.text },
                  inputAndroid: { color: colors.text },
                }}
              />
            </View>
          </View>

          {/* Date range filter */}
          <View style={styles.filterRow}>
            <Text style={[styles.filterLabel, { color: colors.secondary }]}>Date Range</Text>
            <View style={styles.dateRangeContainer}>
              <TouchableOpacity
                style={[styles.dateButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={{ color: colors.text }}>
                  {format(dateRange.startDate, 'MMM dd, yyyy')}
                </Text>
              </TouchableOpacity>
              <Text style={{ color: colors.secondary }}>to</Text>
              <TouchableOpacity
                style={[styles.dateButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Text style={{ color: colors.text }}>
                  {format(dateRange.endDate, 'MMM dd, yyyy')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick date range buttons */}
          <View style={styles.quickDateButtons}>
            <Button
              title="This Month"
              size="small"
              variant="outline"
              onPress={() => {
                setDateRange({
                  startDate: startOfMonth(new Date()),
                  endDate: endOfMonth(new Date()),
                });
              }}
              style={styles.quickDateButton}
            />
            <Button
              title="3 Months"
              size="small"
              variant="outline"
              onPress={() => setQuickDateRange(3)}
              style={styles.quickDateButton}
            />
            <Button
              title="6 Months"
              size="small"
              variant="outline"
              onPress={() => setQuickDateRange(6)}
              style={styles.quickDateButton}
            />
            <Button
              title="1 Year"
              size="small"
              variant="outline"
              onPress={() => setQuickDateRange(12)}
              style={styles.quickDateButton}
            />
          </View>

          {/* Reset filters button */}
          <Button
            title="Reset Filters"
            variant="secondary"
            onPress={() => {
              setSelectedCategory('All');
              setSearchTerm('');
              setDateRange({
                startDate: startOfMonth(new Date()),
                endDate: endOfMonth(new Date()),
              });
            }}
            style={styles.resetButton}
          />
        </Card>
      )}

      {/* Date pickers */}
      {showStartDatePicker && (
        <DateTimePicker
          value={dateRange.startDate}
          mode="date"
          display="default"
          onChange={onStartDateChange}
          maximumDate={dateRange.endDate}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          value={dateRange.endDate}
          mode="date"
          display="default"
          onChange={onEndDateChange}
          minimumDate={dateRange.startDate}
          maximumDate={new Date()}
        />
      )}

      {/* Expenses total summary */}
      <Card style={styles.totalCard}>
        <Text style={[styles.totalLabel, { color: colors.secondary }]}>
          Total Expenses
        </Text>
        <Text style={[styles.totalAmount, { color: colors.text }]}>
          {formatCurrency(totalFilteredExpenses)}
        </Text>
        <Text style={[styles.totalCount, { color: colors.secondary }]}>
          {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'}
        </Text>
      </Card>

      {/* Expenses list */}
      <FlatList
        data={filteredExpenses}
        renderItem={({ item }) => (
          <ExpenseCard
            expense={item}
            onPress={() => navigation.navigate('AddExpense', { expenseId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Card>
            <Text style={[styles.emptyText, { color: colors.secondary }]}>
              No expenses found for the selected filters.
            </Text>
          </Card>
        }
      />

      {/* Add Expense FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.accent }]}
        onPress={handleAddExpense}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.xs,
    height: '100%',
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: SPACING.xs,
  },
  filtersContainer: {
    marginBottom: SPACING.md,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  filterLabel: {
    fontSize: 14,
  },
  pickerContainer: {
    flex: 0.7,
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: SPACING.sm,
  },
  dateRangeContainer: {
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  quickDateButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  quickDateButton: {
    flex: 1,
    marginHorizontal: 2,
  },
  resetButton: {
    marginTop: SPACING.xs,
  },
  totalCard: {
    marginBottom: SPACING.md,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  totalCount: {
    fontSize: 12,
  },
  listContainer: {
    paddingBottom: 80, // Space for the FAB
  },
  emptyText: {
    textAlign: 'center',
    padding: SPACING.md,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ExpensesScreen;