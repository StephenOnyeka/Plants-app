import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import CustomText from "@/components/CustomText";
import { useContext, useMemo } from "react";
import { CartContext } from "@/app/_layout"; // Import CartContext

export default function TabsLayout() {
  const { cart } = useContext(CartContext);

  // Calculate total price using useMemo for performance optimization
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }, [cart]);

  return (
    <>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarActiveTintColor: "green",
          // tabBarInactiveTintColor:"black",
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerTintColor: "white",
          tabBarStyle: {
            backgroundColor: "white",
          },
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
              <CustomText className="text-2xl">Connections</CustomText>
            ),
          }}
        />

        <Tabs.Screen
          name="favourite"
          options={{
            title: "",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "heart-sharp" : "heart-outline"}
                size={24}
                color={color}
              />
            ),
            headerTitle: () => (
              <CustomText className="text-2xl">Favourites</CustomText>
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "cart-sharp" : "cart-outline"}
                size={24}
                color={color}
              />
            ),
            headerTitle: () => (
              <View className="flex flex-row justify-between items-center w-full">
                <CustomText className="text-2xl">Your Cart</CustomText>
                <CustomText className="text-lg font-semibold text-gray-700">
                  Total: ${totalPrice}
                </CustomText>
                {/* <Text className="text-lg  text-gray-700">
                  Total: ${totalPrice}
                </Text> */}
              </View>
            ),
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
              <CustomText className="text-2xl">Messages</CustomText>
            ),
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
