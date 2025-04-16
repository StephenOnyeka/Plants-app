import React from "react";
import { useContext } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import { FavoritesContext } from "../_layout";
import { Plant } from "@/constants/plantData";

export default function Favourite() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <View className="p-4">
      <FlatList
        data={favorites}
        keyExtractor={(item: Plant) => item.id.toString()}
        renderItem={({ item }: { item: Plant }) => (
          <View className="bg-gray-300 rounded-3xl flex flex-row gap-4 items-center p-4 mb-4">
            <Image source={item.image} className="rounded-2xl size-28" />
            <View className="flex-1">
              <View className="flex flex-row justify-between items-center">
                <CustomText
                  className="text-2xl"
                  style={{ fontFamily: "PoppinsSemiBold" }}
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
                <View className="flex flex-row items-center gap-2 font-bold bg-gray-200 rounded-full p-2 px-4">
                  <Ionicons name="star" size={12} />
                  <CustomText>{item.stars}</CustomText>
                </View>
                <TouchableOpacity
                  onPress={() => toggleFavorite(item)}
                  className="border rounded-full p-2"
                >
                  <Ionicons name="trash-outline" size={16} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
