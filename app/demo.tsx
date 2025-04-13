import { ImageBackground, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Demo() {
  return (
    <ImageBackground
      source={require("../assets/proj-img/LeafOnboarding.jpeg")}
      className="flex-1 bg-cover bg-center"
    >
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
                  className=""
                  
        >        </ScrollView>

          <View className="absolute bottom-10 bg-black/30 p-4 border border-white rounded-xl leading-8">
            <Text className="text-3xl font-bold text-white">
              Home Is Where
            </Text>
            <Text className="text-3xl font-bold text-white mb-1">
              My Plants Are
            </Text>
            <Text className=" text-white leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iusto
              unde, distinctio pariatur.
            </Text><Link
              className=" rounded-xl text-center mt-10 p-4 bg-white font-semibold"
              href={"/(tabs)"}
            >
              Get Started
            </Link>
          </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
