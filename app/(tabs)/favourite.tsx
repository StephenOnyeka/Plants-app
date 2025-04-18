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
import { FavoritesContext, ThemeContext } from "../_layout";
import { Plant } from "@/constants/plantData";
import { Text } from "react-native";
import { useRouter } from "expo-router";

export default function Favourite() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter();

  return (
    <View className={`pr-0 flex-1 ${isDarkMode ? 'bg-dark-primary' : 'bg-white'}`}>
      {favorites.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
            Nothing here yet!
          </Text>
        </View>
      ) : (
        <FlatList
          data={[...favorites].reverse()}
          keyExtractor={(item: Plant, index: number) => `${item.id}-${index}`}
          renderItem={({ item }) => (
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
              className={`${isDarkMode ? 'bg-dark-secondary' : 'bg-gray-300'} rounded-3xl flex flex-row gap-4 items-center p-4 mx-2 mb-4 mt-4`}
            >
              <View className={`${isDarkMode ? 'bg-dark-primary' : 'bg-white'} rounded-2xl`}>
                <ImageBackground
                  source={item.image}
                  className="rounded-2xl size-32"
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1">
                <View className="flex flex-row justify-between items-center">
                  <CustomText
                    className={`text-2xl w-[70%] ${isDarkMode ? 'text-white' : 'text-black'}`}
                  >
                    {item.title}
                  </CustomText>
                  <CustomText className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    ${item.price}
                  </CustomText>
                </View>
                <CustomText className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontFamily: "Poppins" }}>
                  Category: {item.category}
                </CustomText>
                <View className="flex flex-row items-center justify-between mt-2">
                  <View className={`flex flex-row items-center gap-1 font-bold ${isDarkMode ? 'bg-dark-primary' : 'bg-gray-200'} rounded-full p-2 px-4`}>
                    <Ionicons name="star" size={12} color={isDarkMode ? '#f5dd4b' : '#6b7280'} />
                    <Text className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{item.stars}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => toggleFavorite(item)}
                    className={`${isDarkMode ? 'border-gray-600' : 'border-gray-300'} border rounded-full p-2`}
                  >
                    <Ionicons name="heart-sharp" size={20} color={isDarkMode ? 'white' : 'black'} />
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
