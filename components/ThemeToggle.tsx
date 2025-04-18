import React, { useContext } from 'react';
import { View, Switch } from 'react-native';
import { ThemeContext } from '@/app/_layout';
import CustomText from './CustomText';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <View className="py-2">
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "white" }}
          thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </>
  );
} 