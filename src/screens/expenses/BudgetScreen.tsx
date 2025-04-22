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
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Budget, ExpenseCategory } from '@/types/models';
import { formatCurrency } from '@/utils/helpers';
import { getBudget, saveBudget } from '@/services/storageService';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { SPACING, CATEGORY_COLORS } from '@/constants/theme';

type BudgetScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Budget'>;

interface BudgetScreenProps {
  navigation: BudgetScreenNavigationProp;
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

const BudgetScreen: React.FC<BudgetScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [totalBudget, setTotalBudget] = useState('');
  const [categoryBudgets, setCategoryBudgets] = useState<Record<ExpenseCategory, string>>({
    Food: '',
    Transport: '',
    Entertainment: '',
    Utilities: '',
    Shopping: '',
    Health: '',
    Education: '',
    Other: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showCategoryBudgets, setShowCategoryBudgets] = useState(false);

  // Load budget data
  useEffect(() => {
    loadBudgetData();
  }, []);

  const loadBudgetData = async () => {
    try {
      const budget = await getBudget();

      if (budget) {
        setTotalBudget(budget.total.toString());

        const categoryValues: Record<ExpenseCategory, string> = {
          Food: '',
          Transport: '',
          Entertainment: '',
          Utilities: '',
          Shopping: '',
          Health: '',
          Education: '',
          Other: '',
        };

        // Set category budget values
        Object.entries(budget.categories).forEach(([category, amount]) => {
          categoryValues[category as ExpenseCategory] = amount.toString();
        });

        setCategoryBudgets(categoryValues);

        // Show category budgets if any are set
        const hasCategoryBudgets = Object.values(categoryValues).some(value => value !== '');
        setShowCategoryBudgets(hasCategoryBudgets);
      }
    } catch (error) {
      console.error('Error loading budget data:', error);
    }
  };

  const handleSave = async () => {
    if (!totalBudget || isNaN(parseFloat(totalBudget))) {
      Alert.alert('Error', 'Please enter a valid total budget');
      return;
    }

    try {
      setIsSaving(true);

      const categories: Partial<Record<ExpenseCategory, number>> = {};

      // Parse category budgets
      Object.entries(categoryBudgets).forEach(([category, value]) => {
        if (value && !isNaN(parseFloat(value))) {
          categories[category as ExpenseCategory] = parseFloat(value);
        }
      });

      const budgetData: Budget = {
        total: parseFloat(totalBudget),
        categories,
      };

      await saveBudget(budgetData);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving budget:', error);
      Alert.alert('Error', 'Failed to save budget. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateCategoryBudget = (category: ExpenseCategory, value: string) => {
    setCategoryBudgets(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  // Calculate sum of category budgets
  const categoryBudgetsSum = Object.values(categoryBudgets)
    .reduce((sum, value) => {
      return sum + (value && !isNaN(parseFloat(value)) ? parseFloat(value) : 0);
    }, 0);

  // Calculate unallocated budget
  const totalBudgetValue = totalBudget && !isNaN(parseFloat(totalBudget))
    ? parseFloat(totalBudget)
    : 0;

  const unallocatedBudget = totalBudgetValue - categoryBudgetsSum;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Total Budget Input */}
        <Card>
          <Text style={[styles.label, { color: colors.text }]}>Total Monthly Budget</Text>
          <View style={[styles.amountInputContainer, { borderColor: colors.border, backgroundColor: colors.card }]}>
            <Text style={[styles.currencySymbol, { color: colors.text }]}>$</Text>
            <TextInput
              style={[styles.amountInput, { color: colors.text }]}
              value={totalBudget}
              onChangeText={setTotalBudget}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor={colors.secondary}
            />
          </View>
        </Card>

        {/* Category Budget Toggle */}
        <TouchableOpacity
          style={[styles.toggleContainer, { borderColor: colors.border }]}
          onPress={() => setShowCategoryBudgets(!showCategoryBudgets)}
        >
          <Text style={[styles.toggleText, { color: colors.text }]}>
            {showCategoryBudgets ? 'Hide Category Budgets' : 'Set Category Budgets'}
          </Text>
          <Ionicons
            name={showCategoryBudgets ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.secondary}
          />
        </TouchableOpacity>

        {/* Category Budgets */}
        {showCategoryBudgets && (
          <Card>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Category Budgets
            </Text>

            {categories.map((category) => (
              <View key={category} style={styles.categoryBudgetItem}>
                <View style={styles.categoryLabel}>
                  <View
                    style={[
                      styles.categoryColor,
                      { backgroundColor: CATEGORY_COLORS[category] },
                    ]}
                  />
                  <Text style={[styles.categoryText, { color: colors.text }]}>
                    {category}
                  </Text>
                </View>

                <View style={[
                  styles.categoryInputContainer,
                  { borderColor: colors.border, backgroundColor: colors.card },
                ]}>
                  <Text style={[styles.categoryCurrency, { color: colors.text }]}>$</Text>
                  <TextInput
                    style={[styles.categoryInput, { color: colors.text }]}
                    value={categoryBudgets[category]}
                    onChangeText={(value) => updateCategoryBudget(category, value)}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor={colors.secondary}
                  />
                </View>
              </View>
            ))}

            {/* Unallocated Budget */}
            <View style={styles.unallocatedContainer}>
              <Text style={[styles.unallocatedLabel, { color: colors.secondary }]}>
                Unallocated:
              </Text>
              <Text
                style={[
                  styles.unallocatedValue,
                  {
                    color: unallocatedBudget < 0
                      ? colors.error
                      : unallocatedBudget > 0
                        ? colors.success
                        : colors.text,
                  },
                ]}
              >
                {formatCurrency(unallocatedBudget)}
              </Text>
            </View>
          </Card>
        )}

        {/* Save Button */}
        <Button
          title="Save Budget"
          onPress={handleSave}
          loading={isSaving}
          style={styles.saveButton}
        />

        <Button
          title="Cancel"
          variant="secondary"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        />
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: SPACING.sm,
    marginVertical: SPACING.md,
  },
  toggleText: {
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  categoryBudgetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  categoryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    width: 120,
  },
  categoryCurrency: {
    fontSize: 16,
    marginRight: 4,
  },
  categoryInput: {
    flex: 1,
    paddingVertical: SPACING.xs,
    fontSize: 16,
  },
  unallocatedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderStyle: 'dashed',
  },
  unallocatedLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  unallocatedValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  saveButton: {
    marginTop: SPACING.lg,
  },
  cancelButton: {
    marginTop: SPACING.sm,
  },
});

export default BudgetScreen;