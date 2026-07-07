import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomText from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";
import plantData from "@/constants/plantData";
import { CartContext, FavoritesContext } from "@/app/_layout"; // Import FavoritesContext
import { ThemeContext } from "@/app/_layout"; // Import ThemeContext

export default function ProductDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addToCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext); // Access favorites and toggleFavorite from FavoritesContext
  const { isDarkMode } = useContext(ThemeContext); // Access isDarkMode from ThemeContext

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
    <View
      style={[
        styles.root,
        { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
      ]}
    >
      <Image
        source={imageSource}
        style={styles.heroImage}
        resizeMode="contain"
      />
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <CustomText
              style={[
                styles.title,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              {params.title}
            </CustomText>
            {matchedPlant && (
              <TouchableOpacity
                onPress={() => toggleFavorite(matchedPlant)}
                style={[
                  styles.favButton,
                  { borderColor: isDarkMode ? "#4b5563" : "#166534" },
                ]}
              >
                <Ionicons
                  name={
                    favorites.some((fav) => fav.id === matchedPlant.id)
                      ? "heart-sharp"
                      : "heart-outline"
                  }
                  size={25}
                  color={isDarkMode ? "white" : "green"}
                />
              </TouchableOpacity>
            )}
          </View>
          <CustomText
            style={[
              styles.category,
              { color: isDarkMode ? "#d1d5db" : "#6b7280" },
            ]}
          >
            {params.category}
          </CustomText>
          <CustomText
            style={[
              styles.price,
              { color: isDarkMode ? "white" : "black" },
            ]}
          >
            ${params.price}
            {"\n"}
          </CustomText>
          <CustomText
            style={[
              styles.description,
              { color: isDarkMode ? "#d1d5db" : "black" },
            ]}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum at
            quidem et dolor placeat laudantium vitae impedit distinctio delectus
            fuga corporis,
            {"\n"}
            {"\n"}
            Omnis ipsum nobis consequatur pariatur harum id ut totam? Deleniti
            omnis iusto cumque temporibus consequuntur? Nesciunt modi enim
            tempore necessitatibus sunt maiores impedit, natus laborum,
            {"\n"}
            {"\n"}
            Omnis ipsum nobis consequatur pariatur harum id ut totam? Deleniti
            omnis iusto cumque temporibus consequuntur? Nesciunt modi enim
            tempore necessitatibus sunt maiores impedit, natus laborum,
            {"\n"}
            {"\n"}
            Omnis ipsum nobis consequatur pariatur harum id ut totam? Deleniti
            omnis iusto cumque temporibus consequuntur? Nesciunt modi enim
            tempore necessitatibus sunt maiores impedit, natus laborum,
          </CustomText>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: isDarkMode ? "#15803d" : "#22c55e" },
          ]}
          onPress={() => {
            if (matchedPlant) {
              addToCart(matchedPlant);
            }
          }}
        >
          <Ionicons name="cart-outline" size={20} color="white" />
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
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
  },
  favButton: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 9999,
  },
  category: {
    fontSize: 20,
    marginBottom: 16,
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
    lineHeight: 32,
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
