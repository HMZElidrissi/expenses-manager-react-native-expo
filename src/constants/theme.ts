export const COLORS = {
    light: {
        primary: '#000000',
        secondary: '#666666',
        background: '#FFFFFF',
        card: '#FAFAFA',
        text: '#000000',
        border: '#EAEAEA',
        notification: '#FF0000',
        accent: '#0070F3',
        success: '#0070F3',
        error: '#F31260',
        warning: '#F5A623',
        info: '#0070F3',
    },
    dark: {
        primary: '#FFFFFF',
        secondary: '#888888',
        background: '#000000',
        card: '#111111',
        text: '#FFFFFF',
        border: '#333333',
        notification: '#FF0000',
        accent: '#0070F3',
        success: '#17C964',
        error: '#F31260',
        warning: '#F5A623',
        info: '#0070F3',
    },
};

export const FONTS = {
    regular: 'Geist-Regular',
    medium: 'Geist-Medium',
    bold: 'Geist-Bold',
    // Fallbacks
    regularFallback: 'System',
    mediumFallback: 'System',
    boldFallback: 'System',
};

export const SIZES = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 24,
    xxxl: 32,
};

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const SHADOWS = {
    light: {
        small: {
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.15,
            shadowRadius: 3.84,
            elevation: 5,
        },
    },
    dark: {
        small: {
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 2,
        },
        medium: {
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.3,
            shadowRadius: 3.84,
            elevation: 5,
        },
    },
};

// Category colors for charts and visualization using Geist palette
export const CATEGORY_COLORS = {
    Food: '#0070F3', // Blue
    Transport: '#F5A623', // Amber
    Entertainment: '#7928CA', // Purple
    Utilities: '#17C964', // Green
    Shopping: '#F31260', // Red
    Health: '#0AC5B3', // Teal
    Education: '#9751F2', // Light Purple
    Other: '#888888', // Gray
};