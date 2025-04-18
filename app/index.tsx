import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import CustomText from "@/components/CustomText";
import { useContext } from "react";
import { ThemeContext } from "./_layout";

export default function Index() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <View className="flex-1 bg-green-600">
        <Image source={require("@/assets/icons/darkIon.png")} />
        {/* <ImageBackground
        source={require("@/assets/proj-img/LeafOnboarding.jpeg")}
        className="flex-1 bg-cover bg-center "
      > */}
        {/* <SafeAreaView className="flex-1 bg-black/40"> */}
        <SafeAreaView className="flex-1 ">
          <View className="absolute bottom-20 p-6 rounded-xl leading-8 flex flex-col gap-y-4 w-full">
            <View className="gap-y-2">
              <CustomText style={styles.text} className="text-white text-4xl">
                Home Is Where
              </CustomText>
              <CustomText style={styles.text} className="text-white text-4xl">
                My Plants Are
              </CustomText>
            </View>
            <CustomText className="text-white leading-8 italic">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Doloremque maxime obcaecati dolore.
            </CustomText>
            <Link
              className={`rounded-xl text-center p-4 w-full ${
                isDarkMode ? "bg-dark-secondary" : "bg-white"
              }`}
              href="/(tabs)"
            >
              <CustomText
                className={`text-xl font-PoppinsSemiBold ${
                  isDarkMode ? "text-white" : "text-green-700"
                }`}
              >
                Get Started
              </CustomText>
            </Link>
          </View>
        </SafeAreaView>
        {/* </ImageBackground> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  text: { fontFamily: "PoppinsSemiBold" },
});
