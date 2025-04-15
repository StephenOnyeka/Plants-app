import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/CustomText";

type Plant = {
  id: number;
  title: string;
  description: string;
  category: string;
  stars: number;
  image: any;
};

const RenderPlantCard = ({ item }: { item: Plant }) => {
  return (
    <View className="bg-green-700 rounded-3xl p-6 px-8 ">
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={item.image} className="w-full h-64 rounded-2xl" />
      </View>
      <CustomText
        className="text-3xl mt-6 text-white"
        style={{ fontFamily: "PoppinsSemiBold" }}
      >
        {item.title}
      </CustomText>
      <CustomText className="text-white" style={{ fontFamily: "Poppins" }}>
        Category: {item.category}
      </CustomText>
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row items-center gap-2 font-bold bg-green-200 rounded-full p-2 px-4 self-start mt-2">
          <Ionicons name="star" size={12} color={"green"} />
          <Text className=" text-green-700" style={{ fontFamily: "" }}>
            {item.stars}
          </Text>
        </View>
        <TouchableOpacity className="border border-white rounded-full p-2 ">
          <Ionicons name="cart-outline" size={20} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RenderPlantCard;
