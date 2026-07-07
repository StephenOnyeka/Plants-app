import React, { useContext } from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '@/app/_layout';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: "#767577", true: "white" }}
        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});