import { Image, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();

  const handleDone = () => {
    router.push("/(tabs)");
  };

  const doneButton = () => (
    <TouchableOpacity
      className="text-white p-2 mr-4 border rounded-full"
      onPress={handleDone}
    >
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
              className="w-full h-[400px]"
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
              className="w-full h-[400px]"
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
              className="w-full h-[400px]"
            />
          ),
          title: "Welcome to the App",
          subtitle: "This is a simple onboarding screen",
        },
      ]}
    />
  );
}
