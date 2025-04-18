import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import plantData from "@/constants/plantData";
import { CartContext, FavoritesContext } from "@/app/_layout"; // Import FavoritesContext
import { ThemeContext } from "@/app/_layout"; // Import ThemeContext

export default function ProductDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addToCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext); // Access favorites and toggleFavorite from FavoritesContext
  const { isDarkMode } = useContext(ThemeContext); // Access isDarkMode from ThemeContext

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

  const matchedPlant = plantData.find(
    (plant) => plant.id === Number(params.id)
  );

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-dark-primary" : "bg-white"}`}>
      <Image
        source={imageSource}
        className="w-full h-64 rounded-2xl my-4 bg-white"
        resizeMode="contain"
      />
      <ScrollView className="pr-0">
        <View className="p-4">
          <View className="flex flex-row justify-between items-center mb-2">
            <CustomText
              className={`text-3xl font-semibold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {params.title}
            </CustomText>
            {matchedPlant && (
              <TouchableOpacity
                onPress={() => toggleFavorite(matchedPlant)}
                className={`p-2 border rounded-full ${
                  isDarkMode ? "border-gray-600" : "border-green-800"
                }`}
              >
                <Ionicons
                  name={
                    favorites.some((fav) => fav.id === matchedPlant.id)
                      ? "heart-sharp"
                      : "heart-outline"
                  }
                  size={25}
                  color={isDarkMode ? "white" : "green"}
                />
              </TouchableOpacity>
            )}
          </View>
          <CustomText
            className={`text-xl mb-4 ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {params.category}
          </CustomText>
          <CustomText
            className={`text-3xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            ${params.price}
            {"\n"}
          </CustomText>
          <CustomText
            className={`text mb-4 leading-8 ${
              isDarkMode ? "text-gray-300" : "text-black"
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum at
            quidem et dolor placeat laudantium vitae impedit distinctio delectus
            fuga corporis,
            {"\n"}
            {"\n"}
            Omnis ipsum nobis consequatur pariatur harum id ut totam? Deleniti
            omnis iusto cumque temporibus consequuntur? Nesciunt modi enim
            tempore necessitatibus sunt maiores impedit, natus laborum,
            {"\n"}
            {"\n"}
            Omnis ipsum nobis consequatur pariatur harum id ut totam? Deleniti
            omnis iusto cumque temporibus consequuntur? Nesciunt modi enim
            tempore necessitatibus sunt maiores impedit, natus laborum,
            {"\n"}
            {"\n"}
            Omnis ipsum nobis consequatur pariatur harum id ut totam? Deleniti
            omnis iusto cumque temporibus consequuntur? Nesciunt modi enim
            tempore necessitatibus sunt maiores impedit, natus laborum,
          </CustomText>
        </View>
      </ScrollView>
      <View className="p-4">
        <TouchableOpacity
          className={`rounded-2xl p-4 flex flex-row items-center justify-center ${
            isDarkMode ? "bg-green-700" : "bg-green-500"
          }`}
          onPress={() => {
            if (matchedPlant) {
              addToCart(matchedPlant);
            }
          }}
        >
          <Ionicons name="cart-outline" size={20} color="white" />
          <Text className="text-white text-lg ml-2">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
