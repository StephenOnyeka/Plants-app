import React from "react";
import { useContext } from "react";
import {
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
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
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
      ]}
    >
      {favorites.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <Text
            style={[
              styles.emptyText,
              { color: isDarkMode ? "#9ca3af" : "#6b7280" },
            ]}
          >
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
              style={[
                styles.card,
                { backgroundColor: isDarkMode ? "#2d2d2d" : "#d1d5db" },
              ]}
            >
              <View style={styles.imageWrapper}>
                <ImageBackground
                  source={item.image}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.info}>
                <View style={styles.titleRow}>
                  <CustomText
                    style={[
                      styles.title,
                      { color: isDarkMode ? "white" : "black" },
                    ]}
                  >
                    {item.title}
                  </CustomText>
                  <CustomText
                    style={[
                      styles.price,
                      { color: isDarkMode ? "white" : "black" },
                    ]}
                  >
                    ${item.price}
                  </CustomText>
                </View>
                <CustomText
                  style={[
                    styles.category,
                    { color: isDarkMode ? "#9ca3af" : "#4b5563" },
                  ]}
                >
                  Category: {item.category}
                </CustomText>
                <View style={styles.footer}>
                  <View
                    style={[
                      styles.starPill,
                      { backgroundColor: isDarkMode ? "#1a1a1a" : "#e5e7eb" },
                    ]}
                  >
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
                  <TouchableOpacity
                    onPress={() => toggleFavorite(item)}
                    style={[
                      styles.heartButton,
                      { borderColor: isDarkMode ? "#4b5563" : "#d1d5db" },
                    ]}
                  >
                    <Ionicons
                      name="heart-sharp"
                      size={20}
                      color={isDarkMode ? "white" : "black"}
                    />
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

const styles = StyleSheet.create({
  container: {
    paddingRight: 0,
    flex: 1,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 18,
  },
  card: {
    borderRadius: 24,
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 16,
    marginTop: 16,
  },
  imageWrapper: {
    backgroundColor: "white",
    borderRadius: 16,
  },
  image: {
    borderRadius: 16,
    width: 128,
    height: 128,
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    width: "70%",
  },
  price: {
    fontSize: 24,
    fontWeight: "600",
  },
  category: {
    marginTop: 8,
    fontFamily: "Poppins",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  starPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 9999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  heartButton: {
    borderWidth: 1,
    borderRadius: 9999,
    padding: 8,
  },
});
