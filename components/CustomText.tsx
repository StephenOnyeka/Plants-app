import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

export default function CustomText({ style, children, ...props }: TextProps) {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins", // Default font
  },
});