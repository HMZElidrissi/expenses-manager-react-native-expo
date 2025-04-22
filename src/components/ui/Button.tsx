import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { SPACING } from '@/constants/theme';
import { getFontFamily } from '@/constants/font';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
                                         title,
                                         onPress,
                                         variant = 'primary',
                                         loading = false,
                                         size = 'medium',
                                         style,
                                         textStyle,
                                         disabled = false,
                                         icon,
                                         ...props
                                       }) => {
  const { colors } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    let buttonStyle: ViewStyle = {
      ...styles.button,
      opacity: disabled ? 0.6 : 1,
    };

    // Apply size
    switch (size) {
      case 'small':
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: SPACING.xs,
          paddingHorizontal: SPACING.sm,
          borderRadius: 6,
        };
        break;
      case 'large':
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: SPACING.md,
          paddingHorizontal: SPACING.lg,
          borderRadius: 8,
        };
        break;
      default:
        buttonStyle = {
          ...buttonStyle,
          paddingVertical: SPACING.sm,
          paddingHorizontal: SPACING.md,
          borderRadius: 7,
        };
    }

    // Apply variant
    switch (variant) {
      case 'primary':
        buttonStyle = {
          ...buttonStyle,
          backgroundColor: colors.accent,
          borderColor: colors.accent,
        };
        break;
      case 'secondary':
        buttonStyle = {
          ...buttonStyle,
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
        };
        break;
      case 'outline':
        buttonStyle = {
          ...buttonStyle,
          backgroundColor: 'transparent',
          borderColor: colors.accent,
          borderWidth: 1,
        };
        break;
      case 'danger':
        buttonStyle = {
          ...buttonStyle,
          backgroundColor: colors.error,
          borderColor: colors.error,
        };
        break;
    }

    return { ...buttonStyle, ...style };
  };

  const getTextStyle = (): TextStyle => {
    let textStyleVar: TextStyle = {
      ...styles.text,
      fontFamily: getFontFamily('medium'),
      color: variant === 'outline' ? colors.accent :
        variant === 'secondary' ? colors.text : '#FFFFFF',
    };

    // Apply size
    switch (size) {
      case 'small':
        textStyleVar = { ...textStyleVar, fontSize: 14 };
        break;
      case 'large':
        textStyleVar = { ...textStyleVar, fontSize: 18 };
        break;
      default:
        textStyleVar = { ...textStyleVar, fontSize: 16 };
    }

    return { ...textStyleVar, ...textStyle };
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? colors.accent : '#FFFFFF'} />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={getTextStyle()}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: SPACING.xs,
  },
  text: {
    textAlign: 'center',
  },
});

export default Button;