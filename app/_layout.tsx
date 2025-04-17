import React, { createContext, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import "../global.css";
import { Plant } from "@/constants/plantData";

export const FavoritesContext = createContext<{
  favorites: Plant[];
  toggleFavorite: (item: Plant) => void;
}>({
  favorites: [],
  toggleFavorite: () => {},
});

export const CartContext = createContext<{
  cart: Plant[];
  addToCart: (item: Plant) => void;
  removeFromCart: (id: number) => void;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsItalic: require("../assets/fonts/Poppins-Italic.ttf"),
    PoppinsBoldItalic: require("../assets/fonts/Poppins-BoldItalic.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsLightItalic: require("../assets/fonts/Poppins-LightItalic.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsMediumItalic: require("../assets/fonts/Poppins-MediumItalic.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
    PoppinsThinItalic: require("../assets/fonts/Poppins-ThinItalic.ttf"),
    PoppinsExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    PoppinsExtraLightItalic: require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsExtraBoldItalic: require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
    PoppinsBlackItalic: require("../assets/fonts/Poppins-BlackItalic.ttf"),
    PoppinsSemiBoldItalic: require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
  });

  const [favorites, setFavorites] = useState<Plant[]>([]);
  const [cart, setCart] = useState<Plant[]>([]);

  const toggleFavorite = (item: Plant) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === item.id)) {
        return prev.filter((fav) => fav.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const addToCart = (item: Plant) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === id);
      if (index !== -1) {
        const newCart = [...prevCart];
        newCart.splice(index, 1); // Remove only the first occurrence
        return newCart;
      }
      return prevCart;
    });
  };

  if (!fontsLoaded) {
    return null; // Show a loading screen or return null while fonts are loading
  }

  // Set default font for all Text components
  (Text as any).defaultProps = (Text as any).defaultProps || {};
  (Text as any).defaultProps.style = { fontFamily: "Poppins" };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen
            name="productDetails"
            options={{ presentation: "modal", headerTitle: "" }}
          />
          <Stack.Screen
            name="checkout"
            options={{ presentation: "modal", headerTitle: "" }}
          />
        </Stack>
        <StatusBar style="light" />
      </CartContext.Provider>
    </FavoritesContext.Provider>
  );
}
