import { View, Text } from "react-native";
import React, { useContext } from "react";
import CustomText from "@/components/CustomText";
import { ThemeContext } from "../_layout";

export default function People() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View className={`p-4 flex-1 justify-center items-center ${isDarkMode ? 'bg-dark-primary' : 'bg-white'}`}>
      <Text className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
        Nothing here yet
      </Text>
    </View>
  );
}
