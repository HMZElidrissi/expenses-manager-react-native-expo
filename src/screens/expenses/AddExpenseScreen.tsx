import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Expense, ExpenseCategory } from '@/types/models';
import { generateId } from '@/utils/helpers';
import { getExpenses, saveExpense, updateExpense, deleteExpense } from '@/services/storageService';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { SPACING, CATEGORY_COLORS } from '@/constants/theme';
import { format } from 'date-fns';

type AddExpenseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddExpense'>;
type AddExpenseScreenRouteProp = RouteProp<RootStackParamList, 'AddExpense'>;

interface AddExpenseScreenProps {
  navigation: AddExpenseScreenNavigationProp;
  route: AddExpenseScreenRouteProp;
}

const categories: ExpenseCategory[] = [
  'Food',
  'Transport',
  'Entertainment',
  'Utilities',
  'Shopping',
  'Health',
  'Education',
  'Other',
];

const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { expenseId } = route.params || {};

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [date, setDate] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load expense data if editing
  useEffect(() => {
    if (expenseId) {
      loadExpenseData();
    }
  }, [expenseId]);

  const loadExpenseData = async () => {
    try {
      const expenses = await getExpenses();
      const expense = expenses.find((e) => e.id === expenseId);

      if (expense) {
        setAmount(expense.amount.toString());
        setDescription(expense.description);
        setCategory(expense.category);
        setDate(new Date(expense.date));
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error loading expense data:', error);
    }
  };

  const validateForm = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }

    if (!description) {
      Alert.alert('Error', 'Please enter a description');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsSaving(true);

      const expenseData: Expense = {
        id: expenseId || generateId(),
        amount: parseFloat(amount),
        description,
        category,
        date: date.toISOString(),
      };

      if (isEditing) {
        await updateExpense(expenseData);
      } else {
        await saveExpense(expenseData);
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving expense:', error);
      Alert.alert('Error', 'Failed to save expense. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!expenseId) return;

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
              setIsDeleting(true);
              await deleteExpense(expenseId);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting expense:', error);
              Alert.alert('Error', 'Failed to delete expense. Please try again.');
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Amount Input */}
        <Card>
          <Text style={[styles.label, { color: colors.text }]}>Amount</Text>
          <View style={[styles.amountInputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={[styles.currencySymbol, { color: colors.text }]}>$</Text>
            <TextInput
              style={[styles.amountInput, { color: colors.text }]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={colors.secondary}
            />
          </View>
        </Card>

        {/* Description Input */}
        <Card>
          <Text style={[styles.label, { color: colors.text }]}>Description</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, backgroundColor: colors.card, color: colors.text },
            ]}
            value={description}
            onChangeText={setDescription}
            placeholder="What was this expense for?"
            placeholderTextColor={colors.secondary}
          />
        </Card>

        {/* Category Selector */}
        <Card>
          <Text style={[styles.label, { color: colors.text }]}>Category</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryItem,
                  {
                    backgroundColor: category === cat
                      ? CATEGORY_COLORS[cat]
                      : colors.card,
                    borderColor: CATEGORY_COLORS[cat],
                  },
                ]}
                onPress={() => setCategory(cat as ExpenseCategory)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: category === cat ? '#FFFFFF' : colors.text },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Date Picker */}
        <Card>
          <Text style={[styles.label, { color: colors.text }]}>Date</Text>
          <TouchableOpacity
            style={[
              styles.dateButton,
              { borderColor: colors.border, backgroundColor: colors.card },
            ]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: colors.text }}>{format(date, 'MMMM dd, yyyy')}</Text>
            <Ionicons name="calendar-outline" size={20} color={colors.secondary} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}
        </Card>

        {/* Save Button */}
        <Button
          title={isEditing ? 'Update Expense' : 'Add Expense'}
          onPress={handleSave}
          loading={isSaving}
          style={styles.saveButton}
        />

        {/* Delete Button (only for editing) */}
        {isEditing && (
          <Button
            title="Delete Expense"
            variant="danger"
            onPress={handleDelete}
            loading={isDeleting}
            style={styles.deleteButton}
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  label: {
    fontSize: 16,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    fontSize: 16,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
  },
  currencySymbol: {
    fontSize: 20,
    fontWeight: '500',
    marginRight: SPACING.xs,
  },
  amountInput: {
    flex: 1,
    paddingVertical: SPACING.sm,
    fontSize: 24,
    fontWeight: '500',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryItem: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  categoryText: {
    fontWeight: '500',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  saveButton: {
    marginTop: SPACING.md,
  },
  deleteButton: {
    marginTop: SPACING.sm,
  },
});

export default AddExpenseScreen;