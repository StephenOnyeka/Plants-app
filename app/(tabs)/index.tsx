import {
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Text,
} from "react-native";
import { categories } from "@/constants";
import { useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import CustomText from "@/components/CustomText";
import plantData, { Plant } from "@/constants/plantData";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { FavoritesContext } from "../_layout";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const navigation = useNavigation();
  const router = useRouter();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const handleToggleFavorite = (item: Plant) => {
    toggleFavorite(item);
  };

  const handleProductClick = (product: Plant) => {
    router.push({
      pathname: "/productDetails",
      params: {
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        stars: product.stars,
        image: product.image,
        price: product.price,
      },
    });
  };

  return (
    <>
      <SafeAreaView>
        <View className="px-4">
          <FlatList
            ListHeaderComponent={
              <View className="flex flex-col gap-y-4 py-4">
                <View style={styles.container}>
                  <Ionicons
                    name="menu-outline"
                    size={30}
                    className="rounded-full"
                  />
                  <Ionicons
                    name="person-circle"
                    size={30}
                    className="rounded-full"
                  />
                </View>
                <View className="flex-1 mt-4">
                  <CustomText className="text-4xl font-PoppinsSemiBold">
                    Top Picks
                  </CustomText>
                </View>

                <View
                  className="bg-gray-200 rounded-xl p-2 px-6 flex-row items-center mx-2"
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <Ionicons name="search-outline" size={20} color="#9ca3af" />
                  <TextInput
                    placeholder="Search Product"
                    placeholderClassName="font-Poppins "
                    className="font-Poppins text-black text-base py-2"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      marginHorizontal: 12,
                    }}
                    placeholderTextColor="#9ca3af"
                  />
                  <Ionicons name="mic-outline" size={20} color="#9ca3af" />
                </View>
                <View>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={categories}
                    className="overflow-visible font-Poppins"
                    renderItem={({ item }) => {
                      let isActive = item.id === activeCategory;
                      let activeTextClass = isActive
                        ? "text-white"
                        : "text-gray-700";
                      return (
                        <TouchableOpacity
                          onPress={() => setActiveCategory(item.id)}
                          style={{
                            backgroundColor: isActive ? "#15803d" : "#00000012",
                          }}
                          className="p-2 px-5 rounded-full mr-2 text-green-700"
                        >
                          <CustomText
                            className={`font-PoppinsSemiBold + ${activeTextClass}`}
                          >
                            {item.title}
                          </CustomText>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
                <View className="pt-4">
                  <Text className="text-xl text-green-700">Recommended</Text>
                </View>
                {/* <View className="bg-gray-300 rounded-3xl flex flex-row gap-4 items-center p-4"> */}
                <View className="bg-green-500/20 rounded-3xl flex flex-row gap-4 items-center p-4">
                  <Image
                    source={require("@/assets/plants/5.jpeg")}
                    className="rounded-2xl size-28"
                    // className="rounded-2xl w-20 h-24"
                  />
                  <View className="flex-1">
                    <View className="flex flex-row justify-between items-center">
                      <CustomText
                        className="text-2xl"
                        style={{ fontFamily: "PoppinsSemiBold" }}
                      >
                        Cactus
                      </CustomText>
                      <CustomText className="text-2xl font-semibold">
                        $64
                      </CustomText>
                    </View>
                    <CustomText
                      className=" mt-2"
                      style={{ fontFamily: "Poppins" }}
                    >
                      Category: Outdoor
                    </CustomText>
                    <View className="flex flex-row items-center justify-between mt-2">
                      <View className="flex flex-row items-center gap-2 font-bold bg-gray-200 rounded-full p-2 px-4">
                        <Ionicons name="star" size={12} />
                        <Text className="" style={{ fontFamily: "" }}>
                          4.7
                        </Text>
                      </View>
                      <TouchableOpacity className="border rounded-full p-2">
                        <Fontisto name="plus-a" size={16} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            }
            data={plantData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleProductClick(item)}
                className="rounded-2xl overflow-hidden w-[48%] mb-4 border border-gray-200"
              >
                <View className="w-full bg-white rounded-2xl">
                  <ImageBackground
                    source={item.image}
                    resizeMode="contain"
                    className="size-44 w-full rounded-2xl"
                  >
                    <TouchableOpacity
                      onPress={() => handleToggleFavorite(item)}
                      style={{ position: "absolute", top: 8, right: 8 }}
                    >
                      <Ionicons
                        name={
                          favorites.some((fav) => fav.id === item.id)
                            ? "heart-sharp"
                            : "heart-outline"
                        }
                        size={24}
                        color={"green"}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
                <View className="p-2 w-full">
                  <View className="flex flex-row items-center justify-between">
                    <CustomText className="rounded-full text-sm text-gray-500">
                      {item.category}
                    </CustomText>
                    <View className="flex flex-row items-center gap-1 font-bold rounded-full p-2">
                      <Ionicons name="star" size={12} color={"#6b7280"} />
                      <Text className="text-gray-500">{item.stars}</Text>
                    </View>
                  </View>
                  <CustomText style={{ fontFamily: "PoppinsSemiBold" }}>
                    {item.title}
                  </CustomText>
                  <CustomText>${item.price}</CustomText>
                </View>
              </TouchableOpacity>
            )}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
    color: "#000",
  },
});
