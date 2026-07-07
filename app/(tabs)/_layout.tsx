import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
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
              <CustomText style={[styles.headerTitle, { color: isDarkMode ? 'white' : 'black' }]}>Connections</CustomText>
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
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{favoriteNotification}</Text>
                  </View>
                )}
              </View>
            ),
            headerTitle: () => (
              <CustomText style={[styles.headerTitle, { color: isDarkMode ? 'white' : 'black' }]}>Favourites</CustomText>
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
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartNotification}</Text>
                  </View>
                )}
              </View>
            ),
            headerTitle: () => (
              <View style={styles.cartHeader}>
                <CustomText style={[styles.headerTitle, { color: isDarkMode ? 'white' : 'black' }]}>Your Cart</CustomText>
                <CustomText style={[styles.cartTotal, { color: isDarkMode ? '#d1d5db' : '#374151' }]}>
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
              <CustomText style={[styles.headerTitle, { color: isDarkMode ? 'white' : 'black' }]}>Messages</CustomText>
            ),
          }}
        />
      </Tabs>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 24,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#ef4444",
    borderRadius: 9999,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  cartTotal: {
    fontSize: 18,
    fontWeight: "600",
  },
});
