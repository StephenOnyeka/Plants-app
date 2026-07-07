import React, { createContext, useEffect, useRef, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { CartItem, Plant } from "@/constants/plantData";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { getJSON, setJSON } from "@/utils/storage";

SplashScreen.preventAutoHideAsync();

export const ThemeContext = createContext<{
  isDarkMode: boolean;
  toggleTheme: () => void;
}>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const FavoritesContext = createContext<{
  favorites: Plant[];
  toggleFavorite: (item: Plant) => void;
}>({
  favorites: [],
  toggleFavorite: () => {},
});

export const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (item: Plant) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}>({
  cart: [],
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
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
    ...Ionicons.font,
    ...Fontisto.font,
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const themeHydrated = useRef(false);
  const { favorites, toggleFavorite } = useFavorites();
  const {
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  // Load persisted theme on mount.
  useEffect(() => {
    (async () => {
      setIsDarkMode(await getJSON<boolean>("@theme", false));
      themeHydrated.current = true;
    })();
  }, []);

  // Persist theme after hydration.
  useEffect(() => {
    if (!themeHydrated.current) return;
    setJSON("@theme", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
        <CartContext.Provider
          value={{
            cart,
            addToCart,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
          }}
        >
          <Stack
            initialRouteName="index"
            screenOptions={{
              headerStyle: {
                backgroundColor: isDarkMode ? "#1a1a1a" : "white",
              },
              headerTintColor: isDarkMode ? "white" : "black",

            }}
          >
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
          <StatusBar style={isDarkMode ? "light" : "dark"} />
        </CartContext.Provider>
      </FavoritesContext.Provider>
    </ThemeContext.Provider>
  );
}
