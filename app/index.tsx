import { View, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import CustomText from "@/components/CustomText";
import { useContext } from "react";
import { ThemeContext } from "./_layout";

export default function Index() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={styles.root}>
      <Image source={require("@/assets/icons/darkIon.png")} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.overlay}>
          <View style={styles.headingGroup}>
            <CustomText style={[styles.text, styles.heading]}>
              Home Is Where
            </CustomText>
            <CustomText style={[styles.text, styles.heading]}>
              My Plants Are
            </CustomText>
          </View>
          <CustomText style={styles.subtitle}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Doloremque maxime obcaecati dolore.
          </CustomText>
          <Link
            style={[
              styles.button,
              { backgroundColor: isDarkMode ? "#2d2d2d" : "white" },
            ]}
            href="/(tabs)"
          >
            <CustomText
              style={[
                styles.buttonText,
                { color: isDarkMode ? "white" : "#15803d" },
              ]}
            >
              Get Started
            </CustomText>
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#16a34a",
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 80,
    padding: 24,
    borderRadius: 12,
    width: "100%",
    gap: 16,
  },
  headingGroup: {
    gap: 8,
  },
  text: {
    fontFamily: "PoppinsSemiBold",
  },
  heading: {
    color: "white",
    fontSize: 36,
  },
  subtitle: {
    color: "white",
    lineHeight: 32,
    fontStyle: "italic",
  },
  button: {
    borderRadius: 12,
    textAlign: "center",
    padding: 16,
    width: "100%",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
  },
});
