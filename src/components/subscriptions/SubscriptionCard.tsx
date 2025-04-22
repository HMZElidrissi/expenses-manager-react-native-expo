import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '@/components/ui/Card';
import { useTheme } from '@/contexts/ThemeContext';
import { Subscription } from '@/types/models';
import { formatCurrency, formatDate } from '@/utils/helpers';
import SubscriptionIcon from '@/components/subscriptions/SubscriptionIcon';

interface SubscriptionCardProps {
  subscription: Subscription;
  onPress?: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ subscription, onPress }) => {
  const { colors } = useTheme();

  const isUpcoming = () => {
    const nextBillingDate = new Date(subscription.nextBillingDate);
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);

    return nextBillingDate <= sevenDaysFromNow && nextBillingDate >= today;
  };

  // Use the service name if available, otherwise fallback to subscription name
  const serviceName = subscription.service || subscription.name;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card>
        <View style={styles.container}>
          <View style={styles.leftContent}>
            <View style={styles.iconWrapper}>
              <SubscriptionIcon
                name={serviceName}
                size={60}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.name, { color: colors.text }]}>
                {subscription.name}
              </Text>
              <Text style={[styles.category, { color: colors.secondary }]}>
                {subscription.category}
              </Text>
              <View style={styles.cycleContainer}>
                <Text style={[styles.cycleText, { color: colors.secondary }]}>
                  {subscription.cycle}
                </Text>
                {isUpcoming() && (
                  <View style={[styles.upcomingBadge, { backgroundColor: colors.warning }]}>
                    <Text style={styles.upcomingText}>Upcoming</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.rightContent}>
            <Text style={[styles.amount, { color: colors.text }]}>
              {formatCurrency(subscription.amount)}
            </Text>
            <Text style={[styles.nextBillingDate, { color: colors.secondary }]}>
              Next: {formatDate(subscription.nextBillingDate)}
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
  iconWrapper: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    marginBottom: 2,
  },
  cycleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cycleText: {
    fontSize: 12,
    marginRight: 8,
  },
  upcomingBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  upcomingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  nextBillingDate: {
    fontSize: 12,
  },
});

export default SubscriptionCard;