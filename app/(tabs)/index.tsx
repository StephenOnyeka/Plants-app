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
    <SafeAreaView
      style={{ backgroundColor: isDarkMode ? "#1a1a1a" : "white" }}
    >
      <View style={styles.screenPadding}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.container}>
                <ThemeToggle />
                <View style={styles.profileRow}>
                  <Ionicons
                    name="person-circle"
                    size={30}
                    color={isDarkMode ? "white" : "black"}
                  />
                </View>
              </View>
              <View style={styles.flex1}>
                <CustomText
                  style={[
                    styles.topPicks,
                    { color: isDarkMode ? "white" : "black" },
                  ]}
                >
                  Top Picks
                </CustomText>
              </View>

              <View
                style={[
                  styles.searchBar,
                  { backgroundColor: isDarkMode ? "#2d2d2d" : "#e5e7eb" },
                ]}
              >
                <Ionicons
                  name="search-outline"
                  size={20}
                  color={isDarkMode ? "#a0a0a0" : "#9ca3af"}
                />
                <TextInput
                  placeholder="Search Product"
                  style={[
                    styles.searchInput,
                    { color: isDarkMode ? "white" : "black" },
                  ]}
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
                  style={styles.categoryList}
                  renderItem={({ item }) => {
                    let isActive = item.id === activeCategory;
                    let activeTextColor = isActive
                      ? "white"
                      : isDarkMode
                      ? "#d1d5db"
                      : "#374151";
                    return (
                      <TouchableOpacity
                        onPress={() => setActiveCategory(item.id)}
                        style={[
                          styles.categoryPill,
                          {
                            backgroundColor: isActive
                              ? "#15803d"
                              : isDarkMode
                              ? "#2d2d2d"
                              : "#00000012",
                          },
                        ]}
                      >
                        <CustomText
                          style={[
                            styles.categoryText,
                            { color: activeTextColor },
                          ]}
                        >
                          {item.title}
                        </CustomText>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <View style={styles.recommendedWrapper}>
                <CustomText
                  style={[
                    styles.recommendedText,
                    { color: isDarkMode ? "#4ade80" : "#15803d" },
                  ]}
                >
                  Recommended
                </CustomText>
              </View>
              <View
                style={[
                  styles.recommendedCard,
                  {
                    backgroundColor: isDarkMode
                      ? "#2d2d2d"
                      : "rgba(34,197,94,0.2)",
                  },
                ]}
              >
                <Image
                  source={require("@/assets/plants/5.jpeg")}
                  style={styles.recommendedImage}
                />
                <View style={styles.flex1}>
                  <View style={styles.recommendedTitleRow}>
                    <CustomText
                      style={[
                        styles.recommendedName,
                        { color: isDarkMode ? "white" : "black" },
                      ]}
                    >
                      Cactus
                    </CustomText>
                    <CustomText
                      style={[
                        styles.recommendedPrice,
                        { color: isDarkMode ? "white" : "black" },
                      ]}
                    >
                      $64
                    </CustomText>
                  </View>
                  <CustomText
                    style={[
                      styles.recommendedCategory,
                      { color: isDarkMode ? "#d1d5db" : "#4b5563" },
                    ]}
                  >
                    Category: Outdoor
                  </CustomText>
                  <View style={styles.recommendedFooter}>
                    <View
                      style={[
                        styles.starPill,
                        {
                          backgroundColor: isDarkMode ? "#1a1a1a" : "#e5e7eb",
                        },
                      ]}
                    >
                      <Ionicons
                        name="star"
                        size={12}
                        color={isDarkMode ? "#f5dd4b" : "#6b7280"}
                      />
                      <Text
                        style={{ color: isDarkMode ? "white" : "black" }}
                      >
                        4.7
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.plusButton,
                        { borderColor: isDarkMode ? "#4b5563" : "#d1d5db" },
                      ]}
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
            <View style={styles.footer}>
              <CustomText
                style={[
                  styles.footerTitle,
                  { color: isDarkMode ? "white" : "black" },
                ]}
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
                    style={styles.likeCard}
                  >
                    <View
                      style={[
                        styles.likeCardInner,
                        {
                          backgroundColor: isDarkMode ? "#2d2d2d" : "white",
                          borderColor: isDarkMode ? "#3d3d3d" : "#e5e7eb",
                        },
                      ]}
                    >
                      <ImageBackground
                        source={item.image}
                        resizeMode="contain"
                        style={styles.likeCardImage}
                      >
                        <TouchableOpacity
                          onPress={() => handleToggleFavorite(item)}
                          style={styles.favIcon}
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
                      <View style={styles.likeCardBody}>
                        <CustomText
                          style={[
                            styles.likeCategory,
                            { color: isDarkMode ? "#9ca3af" : "#6b7280" },
                          ]}
                        >
                          {item.category}
                        </CustomText>
                        <CustomText
                          style={[
                            styles.likeTitle,
                            { color: isDarkMode ? "white" : "black" },
                          ]}
                        >
                          {item.title}
                        </CustomText>
                        <View style={styles.likeFooter}>
                          <CustomText
                            style={{
                              color: isDarkMode ? "#4ade80" : "#16a34a",
                            }}
                          >
                            ${item.price}
                          </CustomText>
                          <View style={styles.likeStars}>
                            <Ionicons
                              name="star"
                              size={12}
                              color={isDarkMode ? "#f5dd4b" : "#6b7280"}
                            />
                            <Text
                              style={[
                                styles.likeStarText,
                                { color: isDarkMode ? "#9ca3af" : "#6b7280" },
                              ]}
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
              style={[
                styles.gridCard,
                { borderColor: isDarkMode ? "#3d3d3d" : "#e5e7eb" },
              ]}
            >
              <View style={styles.gridImageWrapper}>
                <ImageBackground
                  source={item.image}
                  resizeMode="contain"
                  style={styles.gridImage}
                >
                  <TouchableOpacity
                    onPress={() => handleToggleFavorite(item)}
                    style={styles.favIcon}
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
              <View style={styles.gridBody}>
                <View style={styles.gridTopRow}>
                  <CustomText
                    style={[
                      styles.gridCategory,
                      { color: isDarkMode ? "#9ca3af" : "#6b7280" },
                    ]}
                  >
                    {item.category}
                  </CustomText>
                  <View style={styles.gridStars}>
                    <Ionicons
                      name="star"
                      size={12}
                      color={isDarkMode ? "#f5dd4b" : "#6b7280"}
                    />
                    <Text
                      style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
                    >
                      {item.stars}
                    </Text>
                  </View>
                </View>
                <CustomText
                  style={[
                    styles.gridTitle,
                    { color: isDarkMode ? "white" : "black" },
                  ]}
                >
                  {item.title}
                </CustomText>
                <CustomText
                  style={{ color: isDarkMode ? "white" : "black" }}
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
  );
}

const styles = StyleSheet.create({
  screenPadding: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "column",
    rowGap: 16,
    paddingVertical: 16,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  topPicks: {
    fontSize: 36,
    fontFamily: "PoppinsSemiBold",
  },
  searchBar: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    justifyContent: "space-between",
  },
  searchInput: {
    fontFamily: "Poppins",
    fontSize: 16,
    paddingVertical: 8,
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 12,
  },
  categoryList: {
    overflow: "visible",
  },
  categoryPill: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 9999,
    marginRight: 8,
  },
  categoryText: {
    fontFamily: "PoppinsSemiBold",
  },
  recommendedWrapper: {
    paddingTop: 16,
  },
  recommendedText: {
    fontSize: 20,
  },
  recommendedCard: {
    borderRadius: 24,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
  },
  recommendedImage: {
    borderRadius: 16,
    width: 112,
    height: 112,
  },
  recommendedTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recommendedName: {
    fontSize: 24,
    fontFamily: "PoppinsSemiBold",
  },
  recommendedPrice: {
    fontSize: 24,
    fontWeight: "600",
  },
  recommendedCategory: {
    marginTop: 8,
    fontFamily: "Poppins",
  },
  recommendedFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  starPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  plusButton: {
    borderWidth: 1,
    borderRadius: 9999,
    padding: 8,
  },
  footer: {
    marginTop: 32,
    marginBottom: 16,
  },
  footerTitle: {
    fontSize: 24,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 16,
  },
  likeCard: {
    marginRight: 16,
    width: 160,
  },
  likeCardInner: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  likeCardImage: {
    height: 128,
    width: "100%",
    borderRadius: 16,
    backgroundColor: "white",
  },
  favIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  likeCardBody: {
    padding: 8,
  },
  likeCategory: {
    fontSize: 14,
  },
  likeTitle: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  likeFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  likeStars: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeStarText: {
    fontSize: 12,
    marginLeft: 4,
  },
  gridCard: {
    borderRadius: 16,
    overflow: "hidden",
    width: "48%",
    marginBottom: 16,
    borderWidth: 1,
  },
  gridImageWrapper: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
  },
  gridImage: {
    width: "100%",
    height: 176,
    borderRadius: 16,
  },
  gridBody: {
    padding: 8,
    width: "100%",
  },
  gridTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gridCategory: {
    borderRadius: 9999,
    fontSize: 14,
  },
  gridStars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 9999,
    padding: 8,
  },
  gridTitle: {
    fontFamily: "PoppinsSemiBold",
  },
});
