import { View, Text, StyleSheet } from "react-native";
import { useContext, useMemo } from "react"; // Import useMemo
import { CartContext, ThemeContext } from "@/app/_layout";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "@/components/CustomText";
import { useRouter } from "expo-router"; // Corrected import for useRouter

export const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);
  const { isDarkMode } = useContext(ThemeContext);
  const router = useRouter(); // Initialize router

  // Calculate total price using useMemo for performance optimization
  const totalPrice = useMemo(() => {
    return cart
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);
  }, [cart]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
      ]}
    >
      {cart.length === 0 ? (
        <View style={styles.emptyWrapper}>
          <Text
            style={[
              styles.emptyText,
              { color: isDarkMode ? "#9ca3af" : "#6b7280" },
            ]}
          >
            Your cart is empty.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={[...cart].reverse()} // Reverse the array to show new items at the top
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.row,
                  { borderBottomColor: isDarkMode ? "#374151" : "#e5e7eb" },
                ]}
              >
                <Image
                  source={item.image}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <View style={styles.itemInfo}>
                  <CustomText
                    style={[
                      styles.itemTitle,
                      { color: isDarkMode ? "white" : "black" },
                    ]}
                  >
                    {item.title}
                  </CustomText>
                  <CustomText
                    style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </CustomText>
                  <View style={styles.stepper}>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(item.id)}
                      style={[
                        styles.stepperButton,
                        {
                          borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
                        },
                      ]}
                    >
                      <Ionicons
                        name="remove"
                        size={16}
                        color={isDarkMode ? "white" : "black"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.quantityText,
                        { color: isDarkMode ? "white" : "black" },
                      ]}
                    >
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => increaseQuantity(item.id)}
                      style={[
                        styles.stepperButton,
                        {
                          borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
                        },
                      ]}
                    >
                      <Ionicons
                        name="add"
                        size={16}
                        color={isDarkMode ? "white" : "black"}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(Number(item.id))}>
                  <Ionicons
                    name="trash-outline"
                    size={24}
                    color={isDarkMode ? "#ff4444" : "red"}
                  />
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={{ paddingRight: 0 }}
          />
          <View
            style={[
              styles.footer,
              { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
            ]}
          >
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                router.push("/checkout"); // Navigate to the checkout page
              }}
            >
              <Text style={styles.checkoutText}>Checkout: ${totalPrice}</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    paddingRight: 0,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  stepperButton: {
    borderWidth: 1,
    borderRadius: 9999,
    padding: 4,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },
  footer: {
    padding: 16,
  },
  checkoutButton: {
    backgroundColor: "#22c55e",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutText: {
    color: "white",
    fontSize: 18,
    marginLeft: 8,
  },
});
