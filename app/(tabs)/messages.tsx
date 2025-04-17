import { View, Text } from "react-native";
import React from "react";
import CustomText from "@/components/CustomText";

export default function Messages() {
  const messages = []; // Assuming messages is an empty array for this example

  return (
    <View className="p-4 flex-1 justify-center items-center">
      {messages.length === 0 ? (
        <Text className="text-center text-gray-500 text-lg">
          You have no Messages!
        </Text>
      ) : (
        <View>
          <Text>Messages</Text>
        </View>
      )}
    </View>
  );
}
