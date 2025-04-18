import { View, Text } from "react-native";
import { useContext, useMemo } from "react"; // Import useMemo
import { CartContext, ThemeContext } from "@/app/_layout";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/CustomText";
import { useRouter } from "expo-router"; // Corrected import for useRouter

export const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter(); // Initialize router

  // Calculate total price using useMemo for performance optimization
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  }, [cart]);

  return (
    <View className={`mt-2 flex-1 ${isDarkMode ? 'bg-dark-primary' : 'bg-white'}`} style={{ paddingRight: 0 }}>
      {cart.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={[...cart].reverse()} // Reverse the array to show new items at the top
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <View className={`flex flex-row items-center py-4 px-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
                <Image
                  source={item.image}
                  className="w-16 h-16 rounded-lg mr-4"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <CustomText className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {item.title}
                  </CustomText>
                  <CustomText className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    ${item.price}
                  </CustomText>
                </View>
                <TouchableOpacity
                  onPress={() => removeFromCart(Number(item.id))}
                >
                  <Ionicons name="trash-outline" size={24} color={isDarkMode ? '#ff4444' : 'red'} />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingRight: 0 }}
          />
          <View className={`p-4 ${isDarkMode ? 'bg-dark-secondary' : 'bg-white'}`}>
            <TouchableOpacity
              className="bg-green-500 rounded-2xl p-4 flex flex-row items-center justify-center"
              onPress={() => {
                router.push("/checkout"); // Navigate to the checkout page
              }}
            >
              <Text className="text-white text-lg ml-2">
                Checkout: ${totalPrice}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;
