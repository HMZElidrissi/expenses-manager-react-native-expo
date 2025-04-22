import { format, addMonths, addQuarters, addYears, isAfter, isBefore, parseISO } from 'date-fns';
import { Expense, Subscription, SubscriptionCycle, ExpenseCategory } from '@/types/models';
import { CATEGORY_COLORS } from '@/constants/theme';

// Generate a unique ID
export const generateId = (): string => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
};

// Format currency
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

// Format date
export const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
};

// Calculate next billing date based on cycle
export const calculateNextBillingDate = (
    startDate: string | Date,
    cycle: SubscriptionCycle
): Date => {
    const dateObj = typeof startDate === 'string' ? new Date(startDate) : startDate;

    switch (cycle) {
        case 'Monthly':
            return addMonths(dateObj, 1);
        case 'Quarterly':
            return addQuarters(dateObj, 1);
        case 'Annual':
            return addYears(dateObj, 1);
        default:
            return addMonths(dateObj, 1);
    }
};

// Filter expenses by date range
export const filterExpensesByDateRange = (
    expenses: Expense[],
    startDate: Date,
    endDate: Date
): Expense[] => {
    return expenses.filter(expense => {
        const expenseDate = parseISO(expense.date);
        return (
            (isAfter(expenseDate, startDate) || expenseDate.getTime() === startDate.getTime()) &&
            (isBefore(expenseDate, endDate) || expenseDate.getTime() === endDate.getTime())
        );
    });
};

// Group expenses by category
export const groupExpensesByCategory = (expenses: Expense[]): Record<ExpenseCategory, number> => {
    const result: Partial<Record<ExpenseCategory, number>> = {};

    expenses.forEach(expense => {
        if (!result[expense.category]) {
            result[expense.category] = 0;
        }
        result[expense.category] = (result[expense.category] || 0) + expense.amount;
    });

    return result as Record<ExpenseCategory, number>;
};

// Calculate total expenses
export const calculateTotalExpenses = (expenses: Expense[]): number => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Calculate monthly cost of all subscriptions
export const calculateMonthlySubscriptionCost = (subscriptions: Subscription[]): number => {
    return subscriptions.reduce((total, subscription) => {
        let monthlyAmount = subscription.amount;

        if (subscription.cycle === 'Quarterly') {
            monthlyAmount = subscription.amount / 3;
        } else if (subscription.cycle === 'Annual') {
            monthlyAmount = subscription.amount / 12;
        }

        return total + monthlyAmount;
    }, 0);
};

// Format data for pie chart
export const formatDataForPieChart = (
    categoryAmounts: Record<ExpenseCategory, number>
) => {
    return Object.entries(categoryAmounts).map(([category, amount]) => ({
        name: category,
        amount,
        color: CATEGORY_COLORS[category as ExpenseCategory] || '#CCCCCC',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
    }));
};

// Search expenses by term
export const searchExpensesByTerm = (expenses: Expense[], searchTerm: string): Expense[] => {
    const term = searchTerm.toLowerCase().trim();

    if (!term) return expenses;

    return expenses.filter(expense =>
        expense.description.toLowerCase().includes(term) ||
        expense.category.toLowerCase().includes(term)
    );
};

// Get upcoming subscriptions (due in the next 7 days)
export const getUpcomingSubscriptions = (subscriptions: Subscription[]): Subscription[] => {
    const today = new Date();
    const nextWeek = addMonths(today, 1);

    return subscriptions.filter(subscription => {
        const billingDate = parseISO(subscription.nextBillingDate);
        return (
            isAfter(billingDate, today) &&
            isBefore(billingDate, nextWeek)
        );
    });
};