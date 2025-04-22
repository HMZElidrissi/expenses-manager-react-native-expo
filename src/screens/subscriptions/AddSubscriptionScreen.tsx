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
  Modal,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SubscriptionIcon from '@/components/subscriptions/SubscriptionIcon';
import { Subscription, ExpenseCategory, SubscriptionCycle } from '@/types/models';
import { generateId, calculateNextBillingDate } from '@/utils/helpers';
import { getSubscriptions, saveSubscription, updateSubscription, deleteSubscription } from '@/services/storageService';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { SPACING, CATEGORY_COLORS } from '@/constants/theme';
import { format } from 'date-fns';
import { SUBSCRIPTION_ICONS } from '@/constants/subscriptions';

type AddSubscriptionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddSubscription'>;
type AddSubscriptionScreenRouteProp = RouteProp<RootStackParamList, 'AddSubscription'>;

interface AddSubscriptionScreenProps {
  navigation: AddSubscriptionScreenNavigationProp;
  route: AddSubscriptionScreenRouteProp;
}

// Subscription service type for the new approach
interface SubscriptionServiceEntry {
  name: string;
  color: string;
  icon: React.ComponentType<any>;
}

// Extract subscription service names from the SUBSCRIPTION_ICONS object
const subscriptionServices = Object.keys(SUBSCRIPTION_ICONS).map(key => {
  return {
    name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
    color: SUBSCRIPTION_ICONS[key].color,
    icon: SUBSCRIPTION_ICONS[key].icon
  };
});

const categories: ExpenseCategory[] = [
  'Entertainment',
  'Utilities',
  'Shopping',
  'Food',
  'Health',
  'Education',
  'Other',
];

const cycles: SubscriptionCycle[] = [
  'Monthly',
  'Quarterly',
  'Annual',
];

const AddSubscriptionScreen: React.FC<AddSubscriptionScreenProps> = ({ navigation, route }) => {
  const { colors } = useTheme();
  const { subscriptionId } = route.params || {};

  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Entertainment');
  const [cycle, setCycle] = useState<SubscriptionCycle>('Monthly');
  const [startDate, setStartDate] = useState(new Date());
  const [nextBillingDate, setNextBillingDate] = useState<Date>(
    calculateNextBillingDate(new Date(), 'Monthly')
  );
  const [isEditing, setIsEditing] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showNextDatePicker, setShowNextDatePicker] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showServiceSelector, setShowServiceSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load subscription data if editing
  useEffect(() => {
    if (subscriptionId) {
      loadSubscriptionData();
    }
  }, [subscriptionId]);

  // Update next billing date when cycle or start date changes
  useEffect(() => {
    if (!isEditing) {
      setNextBillingDate(calculateNextBillingDate(startDate, cycle));
    }
  }, [cycle, startDate, isEditing]);

  // Update category when service changes (if not editing)
  // Note: With the new approach, we don't have category information in the subscription icons
  // So we'll set a default category when service changes
  useEffect(() => {
    if (!isEditing && service) {
      // Default to Entertainment category for subscription services
      setCategory('Entertainment');
    }
  }, [service, isEditing]);

  const loadSubscriptionData = async () => {
    try {
      const subscriptions = await getSubscriptions();
      const subscription = subscriptions.find((s) => s.id === subscriptionId);

      if (subscription) {
        setName(subscription.name);
        setService(subscription.service || '');
        setAmount(subscription.amount.toString());
        setDescription(subscription.description || '');
        setCategory(subscription.category);
        setCycle(subscription.cycle);
        setStartDate(new Date(subscription.startDate));
        setNextBillingDate(new Date(subscription.nextBillingDate));
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error loading subscription data:', error);
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a subscription name');
      return false;
    }

    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsSaving(true);

      const subscriptionData: Subscription = {
        id: subscriptionId || generateId(),
        name,
        service,
        amount: parseFloat(amount),
        description,
        category,
        cycle,
        startDate: startDate.toISOString(),
        nextBillingDate: nextBillingDate.toISOString(),
      };

      if (isEditing) {
        await updateSubscription(subscriptionData);
      } else {
        await saveSubscription(subscriptionData);
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving subscription:', error);
      Alert.alert('Error', 'Failed to save subscription. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!subscriptionId) return;

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
              setIsDeleting(true);
              await deleteSubscription(subscriptionId);
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting subscription:', error);
              Alert.alert('Error', 'Failed to delete subscription. Please try again.');
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onNextDateChange = (event: any, selectedDate?: Date) => {
    setShowNextDatePicker(false);
    if (selectedDate) {
      setNextBillingDate(selectedDate);
    }
  };

  const handleSelectService = (selectedService: SubscriptionServiceEntry) => {
    setService(selectedService.name);

    // If it's a new subscription and the name field is empty,
    // set the name to the service name by default
    if (!isEditing && !name.trim()) {
      setName(selectedService.name);
    }

    setShowServiceSelector(false);
  };

  const renderServiceItem = ({ item }: { item: SubscriptionServiceEntry }) => (
    <TouchableOpacity
      style={[
        styles.serviceItem,
        {
          backgroundColor: colors.card,
          borderColor: colors.border
        }
      ]}
      onPress={() => handleSelectService(item)}
    >
      <SubscriptionIcon name={item.name} size={70} />
      <Text style={[styles.serviceItemText, { color: colors.text }]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const filteredServices = searchQuery
    ? subscriptionServices.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : subscriptionServices;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Service Selector */}
        <Card>
          <Text style={[styles.label, { color: colors.text }]}>Subscription Service</Text>
          <TouchableOpacity
            style={[
              styles.serviceSelector,
              {
                borderColor: colors.border,
                backgroundColor: colors.card
              }
            ]}
            onPress={() => setShowServiceSelector(true)}
          >
            {service ? (
              <View style={styles.selectedService}>
                <SubscriptionIcon name={service} size={34} />
                <Text style={[styles.selectedServiceText, { color: colors.text }]}>
                  {service}
                </Text>
              </View>
            ) : (
              <Text style={[styles.servicePlaceholder, { color: colors.secondary }]}>
                Select a subscription service
              </Text>
            )}
            <Ionicons name="chevron-down" size={20} color={colors.secondary} />
          </TouchableOpacity>
        </Card>

        {/* Name Input */}
        <Card>
          <Text style={[styles.label, { color: colors.text }]}>Subscription Name</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, backgroundColor: colors.card, color: colors.text },
            ]}
            value={name}
            onChangeText={setName}
            placeholder="My subscription name"
            placeholderTextColor={colors.secondary}
          />
        </Card>

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
          <Text style={[styles.label, { color: colors.text }]}>Description (Optional)</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: colors.border, backgroundColor: colors.card, color: colors.text },
            ]}
            value={description}
            onChangeText={setDescription}
            placeholder="Additional details"
            placeholderTextColor={colors.secondary}
            multiline
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

        {/* Billing Cycle Selector */}
        <Card>
          <Text style={[styles.label, { color: colors.text }]}>Billing Cycle</Text>
          <View style={styles.cyclesContainer}>
            {cycles.map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.cycleItem,
                  {
                    backgroundColor: cycle === c
                      ? colors.accent
                      : colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => setCycle(c as SubscriptionCycle)}
              >
                <Text
                  style={[
                    styles.cycleText,
                    { color: cycle === c ? '#FFFFFF' : colors.text },
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Date Pickers */}
        <Card>
          <Text style={[styles.label, { color: colors.text }]}>Start Date</Text>
          <TouchableOpacity
            style={[
              styles.dateButton,
              { borderColor: colors.border, backgroundColor: colors.card },
            ]}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Text style={{ color: colors.text }}>{format(startDate, 'MMMM dd, yyyy')}</Text>
            <Ionicons name="calendar-outline" size={20} color={colors.secondary} />
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onStartDateChange}
              maximumDate={new Date()}
            />
          )}
        </Card>

        <Card>
          <Text style={[styles.label, { color: colors.text }]}>Next Billing Date</Text>
          <TouchableOpacity
            style={[
              styles.dateButton,
              { borderColor: colors.border, backgroundColor: colors.card },
            ]}
            onPress={() => setShowNextDatePicker(true)}
          >
            <Text style={{ color: colors.text }}>{format(nextBillingDate, 'MMMM dd, yyyy')}</Text>
            <Ionicons name="calendar-outline" size={20} color={colors.secondary} />
          </TouchableOpacity>
          {showNextDatePicker && (
            <DateTimePicker
              value={nextBillingDate}
              mode="date"
              display="default"
              onChange={onNextDateChange}
              minimumDate={new Date()}
            />
          )}
        </Card>

        {/* Save Button */}
        <Button
          title={isEditing ? 'Update Subscription' : 'Add Subscription'}
          onPress={handleSave}
          loading={isSaving}
          style={styles.saveButton}
        />

        {/* Delete Button (only for editing) */}
        {isEditing && (
          <Button
            title="Delete Subscription"
            variant="danger"
            onPress={handleDelete}
            loading={isDeleting}
            style={styles.deleteButton}
          />
        )}
      </ScrollView>

      {/* Service Selection Modal */}
      <Modal
        visible={showServiceSelector}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowServiceSelector(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[
            styles.serviceModal,
            {
              backgroundColor: colors.background,
              borderColor: colors.border
            }
          ]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Select Subscription Service
              </Text>
              <TouchableOpacity
                onPress={() => setShowServiceSelector(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={[
              styles.searchContainer,
              {
                backgroundColor: colors.card,
                borderColor: colors.border
              }
            ]}>
              <Ionicons name="search" size={20} color={colors.secondary} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search services..."
                placeholderTextColor={colors.secondary}
                autoFocus
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color={colors.secondary} />
                </TouchableOpacity>
              ) : null}
            </View>

            <FlatList
              data={filteredServices}
              renderItem={renderServiceItem}
              keyExtractor={item => item.name}
              numColumns={3}
              contentContainerStyle={styles.servicesList}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.md,
    paddingBottom: 100,
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
  cyclesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cycleItem: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: SPACING.sm,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  cycleText: {
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
  serviceSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
    height: 48,
  },
  selectedService: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedServiceText: {
    marginLeft: SPACING.sm,
    fontSize: 16,
  },
  servicePlaceholder: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceModal: {
    width: '90%',
    height: '80%',
    borderRadius: 12,
    borderWidth: 1,
    padding: SPACING.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    height: 40,
    marginBottom: SPACING.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.xs,
    height: '100%',
  },
  servicesList: {
    paddingBottom: SPACING.lg,
  },
  serviceItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1,
    height: 100,
  },
  serviceItemText: {
    marginTop: SPACING.xs,
    textAlign: 'center',
    fontSize: 12,
  },
});

export default AddSubscriptionScreen;