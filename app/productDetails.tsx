import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import plantData from "@/constants/plantData";

export default function ProductDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const imageSource =
    typeof params.image === "string" && params.image.startsWith("http")
      ? { uri: params.image }
      : plantData.find((plant) => plant.image === params.image)?.image || null;

  return (
    <View className="p-4 flex-1 bg-white">
      <Image
        source={imageSource}
        className="w-full h-64 rounded-2xl mb-4"
        resizeMode="contain"
      />
      <CustomText className="text-3xl font-semibold mb-2">
        {params.title}
      </CustomText>
      <CustomText className="text-xl text-gray-500 mb-4">
        {params.category}
      </CustomText>
      <CustomText className="text-lg mb-4">{params.description}</CustomText>
      <CustomText className="text-2xl font-bold mb-4">
        ${params.price}
      </CustomText>
      <TouchableOpacity className="bg-green-500 rounded-full p-4 flex flex-row items-center justify-center">
        <Ionicons name="cart-outline" size={20} color="white" />
        <Text className="text-white text-lg ml-2">Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
