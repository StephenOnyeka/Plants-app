import { View, Text } from "react-native";
import React, { useContext } from "react";
import CustomText from "@/components/CustomText";
import { ThemeContext } from "../_layout";

export default function Messages() {
  const { isDarkMode } = useContext(ThemeContext);
  const messages = []; // Assuming messages is an empty array for this example

  return (
    <View className={`p-4 flex-1 justify-center items-center ${isDarkMode ? 'bg-dark-primary' : 'bg-white'}`}>
      {messages.length === 0 ? (
        <Text className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
          You have no Messages!
        </Text>
      ) : (
        <View>
          <Text className={isDarkMode ? 'text-white' : 'text-black'}>Messages</Text>
        </View>
      )}
    </View>
  );
}
