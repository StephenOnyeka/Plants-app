import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import CustomText from "@/components/CustomText";

export default function TabsLayout() {
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
          }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
