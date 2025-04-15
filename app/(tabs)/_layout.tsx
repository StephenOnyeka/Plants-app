import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarActiveTintColor: "green",
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
                size={30}
                color={color}
              />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={
                  focused ? "information-circle" : "information-circle-outline"
                }
                size={30}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favourite"
          options={{
            title: "Favourite",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={
                  focused ? "person-circle" : "person-circle"
                }
                size={30}
                color={color}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="favourite"
          options={{
            title: "Favourite",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={
                  focused ? "heart-sharp" : "heart-outline"
                }
                size={30}
                color={color}
              />
            ),
          }}
        /> */}
        {/* <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={
                  focused ? "cart-sharp" : "cart-outline"
                }
                size={30}
                color={color}
              />
            ),
          }}
        /> */}
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
