import { View, Text } from "react-native";
import { useContext } from "react";
import { CartContext } from "@/app/_layout";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <View className="p-4 flex-1">
      {cart.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-500">Your cart is empty.</Text>
        </View>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <View className="flex flex-row items-center mb-2">
              <Image
                source={item.image}
                className="w-16 h-16 rounded-lg mr-4"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-lg font-semibold">{item.title}</Text>
                <Text className="text-gray-500">${item.price}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Cart;
