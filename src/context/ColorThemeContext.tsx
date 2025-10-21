import React, { createContext, useContext, useState, ReactNode } from 'react';

// Color Palette Definition
export interface ColorTheme {
  // Primary Colors
  primary: {
    dark: string;      // #001f44
    medium: string;    // #012f72
    blue: string;      // #043ea5
    bright: string;    // #0344d6
    light: string;     // #377aef
    lighter: string;   // #83b5fc
    lightest: string;  // #c5e2ff
  };
  
  // Neutral Colors
  neutral: {
    white: string;     // #ffffff
    black: string;     // #000000
  };
  
  // Background Colors
  background: {
    page: string;      // Main page background
    header: string;     // Header background
    footer: string;     // Footer background
    card: string;       // Card background
    overlay: string;    // Overlay background
  };
  
  // Text Colors
  text: {
    primary: string;   // Primary text color
    secondary: string; // Secondary text color
    light: string;     // Light text color
    white: string;     // White text
    dark: string;      // Dark text
  };
  
  // Border Colors
  border: {
    primary: string;  // Primary border
    secondary: string; // Secondary border
    light: string;    // Light border
  };
  
  // Shadow Colors
  shadow: {
    primary: string;  // Primary shadow
    secondary: string; // Secondary shadow
    glow: string;     // Glow effect shadow
  };
}

// Default Color Theme
const defaultTheme: ColorTheme = {
  primary: {
    dark: '#001f44',
    medium: '#012f72',
    blue: '#043ea5',
    bright: '#0344d6',
    light: '#377aef',
    lighter: '#83b5fc',
    lightest: '#c5e2ff',
  },
  neutral: {
    white: '#ffffff',
    black: '#000000',
  },
  background: {
    page: '#ffffff',
    header: '#ffffff',
    footer: '#83b5fc',
    card: 'rgba(255, 255, 255, 0.8)',
    overlay: 'rgba(255, 255, 255, 0.9)',
  },
  text: {
    primary: '#001f44',
    secondary: '#012f72',
    light: '#0344d6',
    white: '#ffffff',
    dark: '#001f44',
  },
  border: {
    primary: '#83b5fc',
    secondary: '#377aef',
    light: 'rgba(131, 181, 252, 0.3)',
  },
  shadow: {
    primary: '0 8px 25px rgba(3, 68, 214, 0.4)',
    secondary: '0 8px 32px rgba(0, 31, 68, 0.2)',
    glow: '0 0 20px rgba(3, 68, 214, 0.4)',
  },
};

// Context
interface ColorThemeContextType {
  theme: ColorTheme;
  updateTheme: (newTheme: Partial<ColorTheme>) => void;
  resetTheme: () => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

// Provider Component
interface ColorThemeProviderProps {
  children: ReactNode;
}

export const ColorThemeProvider: React.FC<ColorThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ColorTheme>(defaultTheme);

  const updateTheme = (newTheme: Partial<ColorTheme>) => {
    setTheme(prevTheme => ({
      ...prevTheme,
      ...newTheme,
      primary: { ...prevTheme.primary, ...newTheme.primary },
      neutral: { ...prevTheme.neutral, ...newTheme.neutral },
      background: { ...prevTheme.background, ...newTheme.background },
      text: { ...prevTheme.text, ...newTheme.text },
      border: { ...prevTheme.border, ...newTheme.border },
      shadow: { ...prevTheme.shadow, ...newTheme.shadow },
    }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ColorThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

// Hook to use the color theme
export const useColorTheme = (): ColorThemeContextType => {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
};

export default ColorThemeContext;
