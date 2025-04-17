import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import plantData from "@/constants/plantData";
import { CartContext } from "@/app/_layout";

export default function ProductDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addToCart } = useContext(CartContext);

  const imageSource = (() => {
    const matchedPlant = plantData.find(
      (plant) => plant.id === Number(params.id)
    ); // Convert params.id to a number
    if (matchedPlant) {
      return matchedPlant.image; // Use the pre-resolved image directly from plantData
    }

    console.warn("Image source not found for params.id:", params.id);
    return null;
  })();

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
      <CustomText className="text-2xl font-bold mb-4">
        ${params.price}
      </CustomText>
      <CustomText className="text-lg mb-4">{params.description}</CustomText>
      <CustomText className="text-lg mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum at quidem
        et dolor placeat laudantium vitae impedit distinctio delectus fuga
        corporis,
        {"\n"}
        {"\n"}
        Omnis ipsum nobis consequatur pariatur harum id ut totam? Deleniti omnis
        iusto cumque temporibus consequuntur? Nesciunt modi enim tempore
        necessitatibus sunt maiores impedit, natus laborum, quibusdam ea
        deleniti.
      </CustomText>

      <TouchableOpacity
        className="bg-green-500 rounded-full p-4 flex flex-row items-center justify-center"
        onPress={() => {
          const matchedPlant = plantData.find(
            (plant) => plant.id === Number(params.id)
          );
          if (matchedPlant) {
            addToCart(matchedPlant);
          }
        }}
      >
        <Ionicons name="cart-outline" size={20} color="white" />
        <Text className="text-white text-lg ml-2">Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}
