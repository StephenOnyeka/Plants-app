import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import plantData from "@/constants/plantData";
import { CartContext, FavoritesContext } from "@/app/_layout"; // Import FavoritesContext

export default function ProductDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addToCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext); // Access favorites and toggleFavorite from FavoritesContext

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
    <View className=" flex-1 bg-white">
      <Image
        source={imageSource}
        className="w-full h-64 rounded-2xl my-4"
        resizeMode="contain"
      />
      <ScrollView className="pr-0">
        <View className="p-4">
          <View className="flex flex-row justify-between items-center mb-2">
            <CustomText className="text-3xl font-semibold">
              {params.title}
            </CustomText>
            {matchedPlant && (
              <TouchableOpacity
                onPress={() => toggleFavorite(matchedPlant)}
                className="p-2 border border-green-800 rounded-full"
              >
                <Ionicons
                  name={
                    favorites.some((fav) => fav.id === matchedPlant.id)
                      ? "heart-sharp"
                      : "heart-outline"
                  }
                  size={25}
                  color="green"
                />
              </TouchableOpacity>
            )}
          </View>
          <CustomText className="text-xl text-gray-500 mb-4">
            {params.category}
          </CustomText>
          <CustomText className="text-3xl font-bold mb-4">
            ${params.price}
            {"\n"}
          </CustomText>
          {/* <CustomText className="text-lg mb-4">{params.description}</CustomText> */}
          <CustomText className="text-lg mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum at
            quidem et dolor placeat laudantium vitae impedit distinctio delectus
            fuga corporis,
            {"\n"}
            {"\n"}
            Omnis ipsum nobis consequatur pariatur harum id ut totam? Deleniti
            omnis iusto cumque temporibus consequuntur? Nesciunt modi enim
            tempore necessitatibus sunt maiores impedit, natus laborum,
            quibusdam ea deleniti.
            {"\n"}
            {"\n"}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia optio
            commodi delectus voluptatem veritatis nesciunt ullam nihil adipisci
            unde tempora quibusdam totam aut labore alias illum temporibus,
            earum doloremque sunt atque? Quo tempore ducimus aliquid!
          </CustomText>

          {/* <TouchableOpacity
            className="bg-green-500 rounded-full p-4 flex flex-row items-center justify-center"
            onPress={() => {
              if (matchedPlant) {
                addToCart(matchedPlant);
              }
            }}
          >
            <Ionicons name="cart-outline" size={20} color="white" />
            <Text className="text-white text-lg ml-2">Add to Cart</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <View className="p-4">
        <TouchableOpacity
          className="bg-green-500 rounded-2xl p-4 flex flex-row items-center justify-center"
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
