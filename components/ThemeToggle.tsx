import React, { useContext } from 'react';
import { View, Switch } from 'react-native';
import { ThemeContext } from '@/app/_layout';
import CustomText from './CustomText';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View className="flex-row items-center justify-between p-4">
      <CustomText className={`text-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Dark Mode
      </CustomText>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
} 