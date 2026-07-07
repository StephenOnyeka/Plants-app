import { Image, TouchableOpacity, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();

  const handleDone = () => {
    router.push("/(tabs)");
  };

  const doneButton = () => (
    <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
      <Ionicons name="checkmark" size={30} />
    </TouchableOpacity>
  );

  return (
    <Onboarding
      onDone={handleDone}
      onSkip={handleDone}
      DoneButtonComponent={doneButton}
      bottomBarColor="transparent"
      pages={[
        {
          backgroundColor: "purple",
          image: (
            <Image
              source={require("../assets/images/icon.png")}
              style={styles.image}
            />
          ),
          title: "Welcome to the App",
          subtitle: "This is a simple onboarding screen",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/images/icon.png")}
              style={styles.image}
            />
          ),
          title: "Welcome to the App",
          subtitle: "This is a simple onboarding screen",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../assets/images/icon.png")}
              style={styles.image}
            />
          ),
          title: "Welcome to the App",
          subtitle: "This is a simple onboarding screen",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  doneButton: {
    padding: 8,
    marginRight: 16,
    borderWidth: 1,
    borderRadius: 9999,
  },
  image: {
    width: "100%",
    height: 400,
  },
});
