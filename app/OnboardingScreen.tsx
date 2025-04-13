import { Image, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
// import Onboarding from "react-native-onboarding-swiper";
import Onboarding from "react-native-onboarding-swiper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const DismissButton = ({ ...props }) => (
    <Link href="/(tabs)" className="bg-blue-500 text-white px-4 py-2 rounded-full" {...props}>
      Get Started
    </Link>
  );
  const handleDone = () => {
    navigation.navigate('(tabs)');
  }
  const doneButton = () => (  
    <TouchableOpacity className="text-white p-2 mr-4 border rounded-full" onPress={handleDone}>
      <Ionicons name="checkmark" size={30}/>      
    </TouchableOpacity>
  )

  return (
    <>
      <View className="flex-1 bg-white">
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
        {/* <Onboarding
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
        /> */}
      </View>
    </>
  );
}
