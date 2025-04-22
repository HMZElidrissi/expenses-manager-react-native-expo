import React from 'react';
import { View, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'none' | 'small' | 'medium';
}

const Card: React.FC<CardProps> = ({
                                     children,
                                     style,
                                     elevation = 'small',
                                     ...props
                                   }) => {
  const { colors, shadows, isDark } = useTheme();

  const getShadowStyle = () => {
    switch (elevation) {
      case 'none':
        return {};
      case 'small':
        return shadows.small;
      case 'medium':
        return shadows.medium;
      default:
        return shadows.small;
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
        getShadowStyle(),
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    marginVertical: 8,
    overflow: 'hidden',
  },
});

export default Card;