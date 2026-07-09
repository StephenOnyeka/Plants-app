import { Image, TouchableOpacity, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { Check } from "lucide-react-native";
import { useRouter } from "expo-router";
import { setJSON } from "@/utils/storage";

export default function OnboardingScreen() {
  const router = useRouter();

  const handleDone = async () => {
    await setJSON("@onboarded", true);
    router.replace("/(tabs)");
  };

  const doneButton = () => (
    <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
      <Check size={28} color="#15803d" />
    </TouchableOpacity>
  );

  return (
    <Onboarding
      onDone={handleDone}
      onSkip={handleDone}
      DoneButtonComponent={doneButton}
      bottomBarColor="#ffffff"
      pages={[
        {
          backgroundColor: "#dcfce7",
          image: (
            <Image
              source={require("../assets/plants/9.jpeg")}
              style={styles.image}
              resizeMode="contain"
            />
          ),
          title: "Find Your Perfect Plant",
          subtitle:
            "Browse a curated collection of indoor, outdoor, patio, and garden plants.",
        },
        {
          backgroundColor: "#fef9c3",
          image: (
            <Image
              source={require("../assets/plants/13.jpeg")}
              style={styles.image}
              resizeMode="contain"
            />
          ),
          title: "Know How to Care",
          subtitle:
            "Every plant comes with light, water, and care details so it thrives at home.",
        },
        {
          backgroundColor: "#e0f2fe",
          image: (
            <Image
              source={require("../assets/plants/2.jpeg")}
              style={styles.image}
              resizeMode="contain"
            />
          ),
          title: "Shop & Connect",
          subtitle:
            "Add to cart, check out securely, and join a community of plant lovers.",
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
    borderColor: "#15803d",
    borderRadius: 9999,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 24,
  },
});
