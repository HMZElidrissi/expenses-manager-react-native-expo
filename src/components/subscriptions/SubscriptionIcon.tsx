import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { SUBSCRIPTION_ICONS } from '@/constants/subscriptions';

interface SubscriptionIconProps {
  name: string;
  size?: number;
  style?: ViewStyle;
}

const SubscriptionIcon: React.FC<SubscriptionIconProps> = ({
                                                             name,
                                                             size = 24,
                                                             style,
                                                           }) => {
  // Convert name to lowercase for case-insensitive matching
  const serviceName = name.toLowerCase();

  // Get service data or use custom as fallback
  const serviceData = SUBSCRIPTION_ICONS[serviceName] || SUBSCRIPTION_ICONS['custom'];

  // Render the SVG icon
  const renderSvgIcon = () => {
    try {
      const SvgComponent = serviceData.icon;
      return (
        <View style={[styles.iconContainer, { width: size, height: size, borderRadius: size / 2 }]}>
          <SvgComponent width={size * 0.5} height={size * 0.5} />
        </View>
      );
    } catch (error) {
      // Fallback to the first letter if SVG fails
      return (
        <View style={[styles.fallbackIcon, {
          width: size,
          height: size,
          backgroundColor: serviceData.color,
          borderRadius: size / 2
        }]}>
          <Text style={[styles.textIcon, { fontSize: size * 0.5, color: '#FFFFFF' }]}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
      );
    }
  };

  return (
    <View style={[styles.container, style]}>
      {renderSvgIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIcon: {
    fontWeight: 'bold',
  },
});

export default SubscriptionIcon;