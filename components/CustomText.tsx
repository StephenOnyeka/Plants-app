import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

export default function CustomText({
  className,
  style,
  children,
  ...props
}: TextProps & { className?: string }) {
  return (
    <Text
      {...props}
      className={className}
      style={[styles.text, style]} // Merge default font with custom styles
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins", // Default font
  },
});