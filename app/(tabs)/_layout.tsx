import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import CustomText from "@/components/CustomText";
import { useContext, useMemo, useState, useEffect } from "react";
import { CartContext, FavoritesContext, ThemeContext } from "@/app/_layout";

export default function TabsLayout() {
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const { isDarkMode } = useContext(ThemeContext);
  const [cartNotification, setCartNotification] = useState(0);
  const [favoriteNotification, setFavoriteNotification] = useState(0);

  // Calculate total price using useMemo for performance optimization
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }, [cart]);

  // Update notifications when cart or favorites change
  useEffect(() => {
    if (cart.length > 0) {
      setCartNotification(prev => prev + 1);
    }
  }, [cart.length]);

  useEffect(() => {
    if (favorites.length > 0) {
      setFavoriteNotification(prev => prev + 1);
    }
  }, [favorites.length]);

  return (
    <>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarActiveTintColor: "green",
          headerStyle: {
            backgroundColor: isDarkMode ? '#1a1a1a' : 'white',
          },
          headerShadowVisible: false,
          headerTintColor: isDarkMode ? 'white' : 'black',
          tabBarStyle: {
            backgroundColor: isDarkMode ? '#1a1a1a' : 'white',
            borderTopColor: isDarkMode ? '#3d3d3d' : '#e5e5e5',
          },
          tabBarInactiveTintColor: isDarkMode ? '#a0a0a0' : '#666666',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                size={24}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="people"
          options={{
            title: "",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "people-sharp" : "people-outline"}
                size={24}
                color={color}
              />
            ),
            headerTitle: () => (
              <CustomText className={`text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Connections</CustomText>
            ),
          }}
        />

        <Tabs.Screen
          name="favourite"
          options={{
            title: "",
            tabBarIcon: ({ focused, color }) => (
              <View>
                <Ionicons
                  name={focused ? "heart-sharp" : "heart-outline"}
                  size={24}
                  color={color}
                />
                {favoriteNotification > 0 && (
                  <View className={`absolute -top-1 -right-1 ${isDarkMode ? 'bg-red-500' : 'bg-red-500'} rounded-full w-4 h-4 items-center justify-center`}>
                    <Text className="text-white text-xs">{favoriteNotification}</Text>
                  </View>
                )}
              </View>
            ),
            headerTitle: () => (
              <CustomText className={`text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Favourites</CustomText>
            ),
          }}
          listeners={{
            focus: () => setFavoriteNotification(0),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "",
            tabBarIcon: ({ focused, color }) => (
              <View>
                <Ionicons
                  name={focused ? "cart-sharp" : "cart-outline"}
                  size={24}
                  color={color}
                />
                {cartNotification > 0 && (
                  <View className={`absolute -top-1 -right-1 ${isDarkMode ? 'bg-red-500' : 'bg-red-500'} rounded-full w-4 h-4 items-center justify-center`}>
                    <Text className="text-white text-xs">{cartNotification}</Text>
                  </View>
                )}
              </View>
            ),
            headerTitle: () => (
              <View className="flex flex-row justify-between items-center w-full">
                <CustomText className={`text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Your Cart</CustomText>
                <CustomText className={`text-lg font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Total: ${totalPrice}
                </CustomText>
              </View>
            ),
          }}
          listeners={{
            focus: () => setCartNotification(0),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "mail-sharp" : "mail-outline"}
                size={24}
                color={color}
              />
            ),
            headerTitle: () => (
              <CustomText className={`text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>Messages</CustomText>
            ),
          }}
        />
      </Tabs>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </>
  );
}
