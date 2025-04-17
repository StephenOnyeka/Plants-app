import React from "react";
import { useContext } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "../_layout";
import { Plant } from "@/constants/plantData";
import { Text } from "react-native";
import { useRouter } from "expo-router";

export default function Favourite() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const router = useRouter();

  return (
    <View className=" pr-0 flex-1">
      {favorites.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-gray-500 text-lg">
            Nothing here yet!
          </Text>
        </View>
      ) : (
        <FlatList
          data={[...favorites].reverse()} // Reverse the array to show new items at the top
          keyExtractor={(item: Plant, index: number) => `${item.id}-${index}`}
          renderItem={({ item }: { item: Plant }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/productDetails",
                  params: {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    category: item.category,
                    stars: item.stars,
                    image: item.image,
                    price: item.price,
                  },
                })
              }
              className="bg-gray-300 rounded-3xl flex flex-row gap-4 items-center p-4 mx-2 mb-4 mt-4"
            >
              <View className="bg-white ">
                <ImageBackground
                  source={item.image}
                  className="rounded-2xl size-32"
                  resizeMode="contain"
                >
                  {/* Add any overlay or content here if needed */}
                </ImageBackground>
              </View>
              <View className="flex-1">
                <View className="flex flex-row justify-between items-center">
                  <CustomText
                    className="text-2xl w-[70%]"
                    // style={{ fontFamily: "PoppinsSemiBold" }}
                  >
                    {item.title}
                  </CustomText>
                  <CustomText className="text-2xl font-semibold">
                    ${item.price}
                  </CustomText>
                </View>
                <CustomText className="mt-2" style={{ fontFamily: "Poppins" }}>
                  Category: {item.category}
                </CustomText>
                <View className="flex flex-row items-center justify-between mt-2">
                  <View className="flex flex-row items-center gap-1 font-bold bg-gray-200 rounded-full p-2 px-4">
                    <Ionicons name="star" size={12} />
                    <Text className="text-gray-500">{item.stars}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleFavorite(item)}
                    className="rounded-full p-2"
                  >
                    <Ionicons name="trash-outline" size={16} color="" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
