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
import { useState, useContext, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import CustomText from "@/components/CustomText";
import plantData, { Plant } from "@/constants/plantData";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { FavoritesContext, ThemeContext } from "../_layout";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const router = useRouter();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { isDarkMode } = useContext(ThemeContext);

  const filteredProducts = useMemo(() => {
    let filtered = plantData;

    // Apply category filter
    if (activeCategory !== 1) {
      filtered = filtered.filter(
        product => product.category === categories.find(cat => cat.id === activeCategory)?.title
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        product => 
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  // Get 5 random products
  const randomProducts = useMemo(() => {
    const shuffled = [...plantData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }, []);

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
      <SafeAreaView
        className={`${isDarkMode ? "bg-dark-primary" : "bg-white"}`}
      >
        <View className="px-4">
          <FlatList
            ListHeaderComponent={
              <View className="flex flex-col gap-y-4 py-4">
                <View style={styles.container}>
                  {/* <Ionicons
                    name="menu-outline"
                    size={30}
                    color={isDarkMode ? 'white' : 'black'}
                    className="rounded-full"
                  /> */}{" "}
                  <ThemeToggle />
                  <View className="flex-row items-center gap-4">
                    {/* <ThemeToggle /> */}
                    <Ionicons
                      name="person-circle"
                      size={30}
                      color={isDarkMode ? "white" : "black"}
                      className="rounded-full"
                    />
                  </View>
                </View>
                <View className="flex-1">
                  <CustomText
                    className={`text-4xl font-PoppinsSemiBold ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Top Picks
                  </CustomText>
                </View>

                <View
                  className={`${
                    isDarkMode ? "bg-dark-secondary" : "bg-gray-200"
                  } rounded-xl p-2 px-6 flex-row items-center mx-2`}
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <Ionicons
                    name="search-outline"
                    size={20}
                    color={isDarkMode ? "#a0a0a0" : "#9ca3af"}
                  />
                  <TextInput
                    placeholder="Search Product"
                    placeholderClassName="font-Poppins"
                    className={`font-Poppins text-base py-2 ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      marginHorizontal: 12,
                    }}
                    placeholderTextColor={isDarkMode ? "#a0a0a0" : "#9ca3af"}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                  <Ionicons
                    name="mic-outline"
                    size={20}
                    color={isDarkMode ? "#a0a0a0" : "#9ca3af"}
                  />
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
                        : isDarkMode
                        ? "text-gray-300"
                        : "text-gray-700";
                      return (
                        <TouchableOpacity
                          onPress={() => setActiveCategory(item.id)}
                          style={{
                            backgroundColor: isActive
                              ? "#15803d"
                              : isDarkMode
                              ? "#2d2d2d"
                              : "#00000012",
                          }}
                          className="p-2 px-5 rounded-full mr-2"
                        >
                          <CustomText
                            className={`font-PoppinsSemiBold ${activeTextClass}`}
                          >
                            {item.title}
                          </CustomText>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
                <View className="pt-4">
                  <CustomText
                    className={`text-xl ${
                      isDarkMode ? "text-green-400" : "text-green-700"
                    }`}
                  >
                    Recommended
                  </CustomText>
                </View>
                <View
                  className={`${
                    isDarkMode ? "bg-dark-secondary" : "bg-green-500/20"
                  } rounded-3xl flex flex-row gap-4 items-center p-4 mb-2`}
                >
                  <Image
                    source={require("@/assets/plants/5.jpeg")}
                    className="rounded-2xl size-28"
                  />
                  <View className="flex-1">
                    <View className="flex flex-row justify-between items-center">
                      <CustomText
                        className={`text-2xl ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                        style={{ fontFamily: "PoppinsSemiBold" }}
                      >
                        Cactus
                      </CustomText>
                      <CustomText
                        className={`text-2xl font-semibold ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        $64
                      </CustomText>
                    </View>
                    <CustomText
                      className={`mt-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                      style={{ fontFamily: "Poppins" }}
                    >
                      Category: Outdoor
                    </CustomText>
                    <View className="flex flex-row items-center justify-between mt-2">
                      <View
                        className={`flex flex-row items-center gap-2 font-bold ${
                          isDarkMode ? "bg-dark-primary" : "bg-gray-200"
                        } rounded-full p-2 px-4`}
                      >
                        <Ionicons
                          name="star"
                          size={12}
                          color={isDarkMode ? "#f5dd4b" : "#6b7280"}
                        />
                        <Text
                          className={isDarkMode ? "text-white" : "text-black"}
                        >
                          4.7
                        </Text>
                      </View>
                      <TouchableOpacity
                        className={`border ${
                          isDarkMode ? "border-gray-600" : "border-gray-300"
                        } rounded-full p-2`}
                      >
                        <Fontisto
                          name="plus-a"
                          size={16}
                          color={isDarkMode ? "white" : "black"}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            }
            ListFooterComponent={
              <View className="mt-8 mb-4">
                <CustomText
                  className={`text-2xl font-PoppinsSemiBold mb-4 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  You Might Also Like
                </CustomText>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={randomProducts}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleProductClick(item)}
                      className="mr-4 w-40"
                    >
                      <View
                        className={`${
                          isDarkMode ? "bg-dark-secondary" : "bg-white"
                        } rounded-2xl overflow-hidden ${
                          isDarkMode ? "border-dark-border" : "border-gray-200"
                        } border`}
                      >
                        <ImageBackground
                          source={item.image}
                          resizeMode="contain"
                          className="h-32 w-full rounded-2xl bg-white"
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
                              size={20}
                              color={"green"}
                            />
                          </TouchableOpacity>
                        </ImageBackground>
                        <View className="p-2">
                          <CustomText
                            className={`text-sm ${
                              isDarkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {item.category}
                          </CustomText>
                          <CustomText
                            className={`text-base ${
                              isDarkMode ? "text-white" : "text-black"
                            }`}
                            style={{ fontFamily: "PoppinsSemiBold" }}
                          >
                            {item.title}
                          </CustomText>
                          <View className="flex-row items-center justify-between mt-1">
                            <CustomText
                              className={
                                isDarkMode ? "text-green-400" : "text-green-600"
                              }
                            >
                              ${item.price}
                            </CustomText>
                            <View className="flex-row items-center">
                              <Ionicons
                                name="star"
                                size={12}
                                color={isDarkMode ? "#f5dd4b" : "#6b7280"}
                              />
                              <Text
                                className={`${
                                  isDarkMode ? "text-gray-400" : "text-gray-500"
                                } text-xs ml-1`}
                              >
                                {item.stars}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            }
            data={filteredProducts}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleProductClick(item)}
                className={`rounded-2xl overflow-hidden w-[48%] mb-4 ${
                  isDarkMode ? "border-dark-border" : "border-gray-200"
                } border`}
              >
                <View className={`w-full bg-white rounded-2xl`}>
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
                    <CustomText
                      className={`rounded-full text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {item.category}
                    </CustomText>
                    <View className="flex flex-row items-center gap-1 font-bold rounded-full p-2">
                      <Ionicons
                        name="star"
                        size={12}
                        color={isDarkMode ? "#f5dd4b" : "#6b7280"}
                      />
                      <Text
                        className={
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }
                      >
                        {item.stars}
                      </Text>
                    </View>
                  </View>
                  <CustomText
                    className={isDarkMode ? "text-white" : "text-black"}
                    style={{ fontFamily: "PoppinsSemiBold" }}
                  >
                    {item.title}
                  </CustomText>
                  <CustomText
                    className={isDarkMode ? "text-white" : "text-black"}
                  >
                    ${item.price}
                  </CustomText>
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
