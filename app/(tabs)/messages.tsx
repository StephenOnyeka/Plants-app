import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../_layout";

export default function Messages() {
  const { isDarkMode } = useContext(ThemeContext);
  const messages = []; // Assuming messages is an empty array for this example

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
      ]}
    >
      {messages.length === 0 ? (
        <Text
          style={[
            styles.emptyText,
            { color: isDarkMode ? "#9ca3af" : "#6b7280" },
          ]}
        >
          You have no Messages!
        </Text>
      ) : (
        <View>
          <Text style={{ color: isDarkMode ? "white" : "black" }}>Messages</Text>
        </View>
      )}
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
