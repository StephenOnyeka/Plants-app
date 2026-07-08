import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import plantData, { Plant } from "@/constants/plantData";
import { CartContext, FavoritesContext } from "@/app/_layout";
import { ThemeContext } from "@/app/_layout";

type CareCellProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  isDarkMode: boolean;
};

const CareCell = ({ icon, label, value, isDarkMode }: CareCellProps) => (
  <View
    style={[
      styles.careCell,
      { backgroundColor: isDarkMode ? "#2d2d2d" : "#f3f4f6" },
    ]}
  >
    <Ionicons name={icon} size={20} color={isDarkMode ? "#4ade80" : "#15803d"} />
    <View style={styles.careCellText}>
      <CustomText
        style={[styles.careLabel, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}
      >
        {label}
      </CustomText>
      <CustomText
        style={[styles.careValue, { color: isDarkMode ? "white" : "black" }]}
      >
        {value}
      </CustomText>
    </View>
  </View>
);

export default function ProductDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addToCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { isDarkMode } = useContext(ThemeContext);

  const matchedPlant = plantData.find(
    (plant) => plant.id === Number(params.id)
  );

  if (!matchedPlant) {
    return (
      <View
        style={[
          styles.root,
          styles.notFound,
          { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
        ]}
      >
        <CustomText
          style={{ color: isDarkMode ? "white" : "black", fontSize: 18 }}
        >
          Product not found.
        </CustomText>
      </View>
    );
  }

  const plant = matchedPlant;
  const outOfStock = plant.stock <= 0;
  const isFavorite = favorites.some((fav) => fav.id === plant.id);

  const relatedPlants = plantData
    .filter((p) => p.category === plant.category && p.id !== plant.id)
    .slice(0, 6);

  const goToPlant = (id: number) => {
    router.push({ pathname: "/productDetails", params: { id } });
  };

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={plant.image}
          style={styles.heroImage}
          resizeMode="contain"
        />
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <CustomText
              style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
            >
              {plant.title}
            </CustomText>
            <TouchableOpacity
              onPress={() => toggleFavorite(plant)}
              style={[
                styles.favButton,
                { borderColor: isDarkMode ? "#4b5563" : "#166534" },
              ]}
            >
              <Ionicons
                name={isFavorite ? "heart-sharp" : "heart-outline"}
                size={25}
                color={isDarkMode ? "white" : "green"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.metaRow}>
            <CustomText
              style={[
                styles.category,
                { color: isDarkMode ? "#d1d5db" : "#6b7280" },
              ]}
            >
              {plant.category}
            </CustomText>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color="#f5b301" />
              <Text
                style={[
                  styles.ratingText,
                  { color: isDarkMode ? "#d1d5db" : "#374151" },
                ]}
              >
                {plant.stars.toFixed(1)}
              </Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <CustomText
              style={[styles.price, { color: isDarkMode ? "white" : "black" }]}
            >
              ${plant.price.toFixed(2)}
            </CustomText>
            <View
              style={[
                styles.stockBadge,
                {
                  backgroundColor: outOfStock
                    ? isDarkMode
                      ? "#7f1d1d"
                      : "#fee2e2"
                    : isDarkMode
                    ? "#14532d"
                    : "#dcfce7",
                },
              ]}
            >
              <Text
                style={[
                  styles.stockText,
                  {
                    color: outOfStock
                      ? isDarkMode
                        ? "#fca5a5"
                        : "#b91c1c"
                      : isDarkMode
                      ? "#86efac"
                      : "#15803d",
                  },
                ]}
              >
                {outOfStock ? "Out of stock" : `In stock (${plant.stock})`}
              </Text>
            </View>
          </View>

          <View style={styles.careGrid}>
            <CareCell
              icon="leaf-outline"
              label="Care Level"
              value={plant.careLevel}
              isDarkMode={isDarkMode}
            />
            <CareCell
              icon="sunny-outline"
              label="Light"
              value={plant.light}
              isDarkMode={isDarkMode}
            />
            <CareCell
              icon="water-outline"
              label="Water"
              value={plant.water}
              isDarkMode={isDarkMode}
            />
            <CareCell
              icon="resize-outline"
              label="Size"
              value={plant.size}
              isDarkMode={isDarkMode}
            />
            <CareCell
              icon="paw-outline"
              label="Pet-friendly"
              value={plant.petFriendly ? "Yes" : "No"}
              isDarkMode={isDarkMode}
            />
          </View>

          <CustomText
            style={[
              styles.sectionHeading,
              { color: isDarkMode ? "white" : "black" },
            ]}
          >
            About this plant
          </CustomText>
          <CustomText
            style={[
              styles.description,
              { color: isDarkMode ? "#d1d5db" : "#374151" },
            ]}
          >
            {plant.description}
          </CustomText>

          {relatedPlants.length > 0 && (
            <View style={styles.relatedSection}>
              <CustomText
                style={[
                  styles.sectionHeading,
                  { color: isDarkMode ? "white" : "black" },
                ]}
              >
                You might also like
              </CustomText>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={relatedPlants}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }: { item: Plant }) => (
                  <TouchableOpacity
                    onPress={() => goToPlant(item.id)}
                    style={styles.relatedCard}
                  >
                    <View
                      style={[
                        styles.relatedCardInner,
                        {
                          backgroundColor: isDarkMode ? "#2d2d2d" : "white",
                          borderColor: isDarkMode ? "#3d3d3d" : "#e5e7eb",
                        },
                      ]}
                    >
                      <Image
                        source={item.image}
                        resizeMode="contain"
                        style={styles.relatedImage}
                      />
                      <View style={styles.relatedBody}>
                        <CustomText
                          style={[
                            styles.relatedTitle,
                            { color: isDarkMode ? "white" : "black" },
                          ]}
                          numberOfLines={1}
                        >
                          {item.title}
                        </CustomText>
                        <CustomText
                          style={{ color: isDarkMode ? "#4ade80" : "#16a34a" }}
                        >
                          ${item.price.toFixed(2)}
                        </CustomText>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          disabled={outOfStock}
          style={[
            styles.addButton,
            {
              backgroundColor: outOfStock
                ? isDarkMode
                  ? "#374151"
                  : "#d1d5db"
                : isDarkMode
                ? "#15803d"
                : "#22c55e",
            },
          ]}
          onPress={() => addToCart(plant)}
        >
          <Ionicons
            name={outOfStock ? "close-circle-outline" : "cart-outline"}
            size={20}
            color="white"
          />
          <Text style={styles.addButtonText}>
            {outOfStock ? "Out of stock" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  notFound: {
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 256,
    borderRadius: 16,
    marginVertical: 16,
    backgroundColor: "white",
  },
  body: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    flex: 1,
    marginRight: 12,
  },
  favButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 9999,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  category: {
    fontSize: 18,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
  },
  stockBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 9999,
  },
  stockText: {
    fontSize: 14,
    fontWeight: "600",
  },
  careGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  careCell: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    width: "47%",
  },
  careCellText: {
    flex: 1,
  },
  careLabel: {
    fontSize: 12,
  },
  careValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  sectionHeading: {
    fontSize: 20,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 8,
  },
  description: {
    lineHeight: 26,
    marginBottom: 8,
  },
  relatedSection: {
    marginTop: 24,
  },
  relatedCard: {
    marginRight: 12,
    width: 140,
  },
  relatedCardInner: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
  },
  relatedImage: {
    height: 110,
    width: "100%",
    backgroundColor: "white",
  },
  relatedBody: {
    padding: 8,
  },
  relatedTitle: {
    fontSize: 15,
    fontFamily: "PoppinsSemiBold",
  },
  footer: {
    padding: 16,
  },
  addButton: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 8,
  },
});
