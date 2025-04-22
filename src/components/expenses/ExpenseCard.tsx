import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '@/components/ui/Card';
import { useTheme } from '@/contexts/ThemeContext';
import { Expense, ExpenseCategory } from '@/types/models';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { CATEGORY_COLORS } from '@/constants/theme';

interface ExpenseCardProps {
  expense: Expense;
  onPress?: () => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onPress }) => {
  const { colors } = useTheme();

  const getCategoryIcon = (category: ExpenseCategory): React.ComponentProps<typeof Ionicons>['name'] => {
    switch (category) {
      case 'Food':
        return 'fast-food';
      case 'Transport':
        return 'car';
      case 'Entertainment':
        return 'film';
      case 'Utilities':
        return 'flash';
      case 'Shopping':
        return 'cart';
      case 'Health':
        return 'medical';
      case 'Education':
        return 'school';
      default:
        return 'pricetag';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card>
        <View style={styles.container}>
          <View style={styles.leftContent}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: CATEGORY_COLORS[expense.category] },
              ]}
            >
              <Ionicons
                name={getCategoryIcon(expense.category)}
                size={20}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.description, { color: colors.text }]}>
                {expense.description}
              </Text>
              <Text style={[styles.category, { color: colors.secondary }]}>
                {expense.category}
              </Text>
              <Text style={[styles.date, { color: colors.secondary }]}>
                {formatDate(expense.date)}
              </Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text style={[styles.amount, { color: colors.text }]}>
              {formatCurrency(expense.amount)}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpenseCard;