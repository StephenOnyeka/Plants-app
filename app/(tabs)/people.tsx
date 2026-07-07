import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../_layout";

export default function People() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
      ]}
    >
      <Text
        style={[
          styles.emptyText,
          { color: isDarkMode ? "#9ca3af" : "#6b7280" },
        ]}
      >
        Nothing here yet
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
  },
});
