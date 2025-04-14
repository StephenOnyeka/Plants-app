// filepath: c:\Users\Don\Desktop\Plants-prebuild\components\CustomText.tsx
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
// import React from "react";
// import { Text, TextProps, StyleSheet } from "react-native";
//
//
// export default function CustomText({
//   className,
//   style,
//   children,
//   ...props
// }: TextProps & { className?: string }) {
//   return (
//     <Text {...props} className={className} style={[styles.text, style]}>
//       {children}
//     </Text>
//   );
// }
//
// const styles = StyleSheet.create({
//   text: {
//     fontFamily: "Poppins", // Default font family
//   },
// });
