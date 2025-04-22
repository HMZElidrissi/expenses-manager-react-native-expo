export type ExpenseCategory =
    | 'Food'
    | 'Transport'
    | 'Entertainment'
    | 'Utilities'
    | 'Shopping'
    | 'Health'
    | 'Education'
    | 'Other';

export type SubscriptionCycle = 'Monthly' | 'Quarterly' | 'Annual';

export interface Expense {
    id: string;
    amount: number;
    category: ExpenseCategory;
    date: string; // ISO string format
    description: string;
}

export interface Subscription {
    id: string;
    name: string;
    service: string;
    amount: number;
    cycle: SubscriptionCycle;
    startDate: string; // ISO string format
    nextBillingDate: string; // ISO string format
    category: ExpenseCategory;
    description?: string;
}

export interface Budget {
    total: number;
    categories: {
        [key in ExpenseCategory]?: number;
    };
}

export type ThemeMode = 'light' | 'dark';