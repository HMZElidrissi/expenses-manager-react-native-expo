import React, { useCallback, useState } from 'react';
import { Alert, FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/contexts/ThemeContext';
import Card from '@/components/ui/Card';
import SubscriptionCard from '@/components/subscriptions/SubscriptionCard';
import { Subscription } from '@/types/models';
import { calculateMonthlySubscriptionCost, formatCurrency } from '@/utils/helpers';
import { deleteSubscription, getSubscriptions } from '@/services/storageService';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { SPACING } from '@/constants/theme';

type SubscriptionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface SubscriptionsScreenProps {
  navigation: SubscriptionsScreenNavigationProp;
}

const SubscriptionsScreen: React.FC<SubscriptionsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCycle, setSelectedCycle] = useState<string>('All');

  // Load subscriptions
  const loadSubscriptions = async () => {
    try {
      const loadedSubscriptions = await getSubscriptions();
      setSubscriptions(loadedSubscriptions);
      applyFilters(loadedSubscriptions, searchTerm, selectedCycle);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    }
  };

  // Apply filters
  const applyFilters = (
    subs: Subscription[],
    search: string,
    cycle: string,
  ) => {
    let result = [...subs];

    // Filter by cycle
    if (cycle !== 'All') {
      result = result.filter(sub => sub.cycle === cycle);
    }

    // Filter by search term
    if (search.trim()) {
      const term = search.toLowerCase().trim();
      result = result.filter(sub =>
        sub.name.toLowerCase().includes(term) ||
        (sub.service && sub.service.toLowerCase().includes(term)) ||
        sub.description?.toLowerCase().includes(term) ||
        sub.category.toLowerCase().includes(term),
      );
    }

    // Sort by next billing date
    result.sort((a, b) => {
      return new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime();
    });

    setFilteredSubscriptions(result);
  };

  // Update filters when inputs change
  React.useEffect(() => {
    applyFilters(subscriptions, searchTerm, selectedCycle);
  }, [searchTerm, selectedCycle]);

  useFocusEffect(
    useCallback(() => {
      loadSubscriptions();
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSubscriptions();
    setRefreshing(false);
  };

  const handleDeleteSubscription = (id: string) => {
    Alert.alert(
      'Delete Subscription',
      'Are you sure you want to delete this subscription?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteSubscription(id);
              await loadSubscriptions();
            } catch (error) {
              console.error('Error deleting subscription:', error);
            }
          },
        },
      ],
    );
  };

  const handleAddSubscription = () => {
    navigation.navigate('AddSubscription', {});
  };

  // Calculate total monthly cost
  const totalMonthlyCost = calculateMonthlySubscriptionCost(filteredSubscriptions);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search and filter bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.secondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search subscriptions..."
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
      </View>

      {/* Billing cycle filter buttons */}
      <View style={styles.cycleFilterContainer}>
        <TouchableOpacity
          style={[
            styles.cycleFilterButton,
            {
              backgroundColor: selectedCycle === 'All' ? colors.accent : colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setSelectedCycle('All')}
        >
          <Text style={{ color: selectedCycle === 'All' ? '#FFFFFF' : colors.text }}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.cycleFilterButton,
            {
              backgroundColor: selectedCycle === 'Monthly' ? colors.accent : colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setSelectedCycle('Monthly')}
        >
          <Text style={{ color: selectedCycle === 'Monthly' ? '#FFFFFF' : colors.text }}>
            Monthly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.cycleFilterButton,
            {
              backgroundColor: selectedCycle === 'Quarterly' ? colors.accent : colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setSelectedCycle('Quarterly')}
        >
          <Text style={{ color: selectedCycle === 'Quarterly' ? '#FFFFFF' : colors.text }}>
            Quarterly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.cycleFilterButton,
            {
              backgroundColor: selectedCycle === 'Annual' ? colors.accent : colors.card,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setSelectedCycle('Annual')}
        >
          <Text style={{ color: selectedCycle === 'Annual' ? '#FFFFFF' : colors.text }}>
            Annual
          </Text>
        </TouchableOpacity>
      </View>

      {/* Subscriptions total summary */}
      <Card style={styles.totalCard}>
        <Text style={[styles.totalLabel, { color: colors.secondary }]}>
          Monthly Cost
        </Text>
        <Text style={[styles.totalAmount, { color: colors.text }]}>
          {formatCurrency(totalMonthlyCost)}
        </Text>
        <Text style={[styles.totalCount, { color: colors.secondary }]}>
          {filteredSubscriptions.length} {filteredSubscriptions.length === 1 ? 'subscription' : 'subscriptions'}
        </Text>
      </Card>

      {/* Subscriptions list */}
      <FlatList
        data={filteredSubscriptions}
        renderItem={({ item }) => (
          <SubscriptionCard
            subscription={item}
            onPress={() => navigation.navigate('AddSubscription', { subscriptionId: item.id })}
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
              No subscriptions found. Add your first subscription!
            </Text>
          </Card>
        }
      />

      {/* Add Subscription FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.accent }]}
        onPress={handleAddSubscription}
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
  cycleFilterContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  cycleFilterButton: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 2,
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

export default SubscriptionsScreen;