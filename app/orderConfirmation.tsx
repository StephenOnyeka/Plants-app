import React, { useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CircleCheckBig } from "lucide-react-native";
import CustomText from "@/components/CustomText";
import { OrdersContext, ThemeContext } from "./_layout";

export default function OrderConfirmation() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { isDarkMode } = useContext(ThemeContext);
  const { orders } = useContext(OrdersContext);

  const order = orders.find((o) => o.id === params.id);

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
      ]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconWrapper}>
          <CircleCheckBig size={96} color="#22c55e" />
        </View>
        <CustomText
          style={[styles.title, { color: isDarkMode ? "white" : "black" }]}
        >
          Order Confirmed!
        </CustomText>
        <CustomText
          style={[styles.subtitle, { color: isDarkMode ? "#9ca3af" : "#6b7280" }]}
        >
          Thank you for your purchase. Your plants are on their way.
        </CustomText>

        {order && (
          <View
            style={[
              styles.card,
              { backgroundColor: isDarkMode ? "#2d2d2d" : "#f3f4f6" },
            ]}
          >
            <View style={styles.cardRow}>
              <Text style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}>
                Order ID
              </Text>
              <Text
                style={[
                  styles.cardValue,
                  { color: isDarkMode ? "white" : "black" },
                ]}
              >
                {order.id}
              </Text>
            </View>
            <View style={styles.cardRow}>
              <Text style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}>
                Payment
              </Text>
              <Text
                style={[
                  styles.cardValue,
                  { color: isDarkMode ? "white" : "black" },
                ]}
              >
                {order.bank}
              </Text>
            </View>

            <View
              style={[
                styles.divider,
                { borderTopColor: isDarkMode ? "#4b5563" : "#d1d5db" },
              ]}
            />

            {order.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Text
                  style={[
                    styles.itemName,
                    { color: isDarkMode ? "#d1d5db" : "#374151" },
                  ]}
                  numberOfLines={1}
                >
                  {item.title} × {item.quantity}
                </Text>
                <Text style={{ color: isDarkMode ? "#d1d5db" : "#374151" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}

            <View
              style={[
                styles.totalRow,
                { borderTopColor: isDarkMode ? "#4b5563" : "#d1d5db" },
              ]}
            >
              <CustomText
                style={[
                  styles.totalLabel,
                  { color: isDarkMode ? "white" : "black" },
                ]}
              >
                Total
              </CustomText>
              <CustomText
                style={[
                  styles.totalValue,
                  { color: isDarkMode ? "white" : "black" },
                ]}
              >
                ${order.total.toFixed(2)}
              </CustomText>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: "#22c55e" }]}
          onPress={() => router.replace("/orders")}
        >
          <Text style={styles.primaryButtonText}>View My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text
            style={[
              styles.secondaryButtonText,
              { color: isDarkMode ? "#4ade80" : "#15803d" },
            ]}
          >
            Continue Shopping
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    padding: 24,
    alignItems: "center",
    paddingTop: 64,
  },
  iconWrapper: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 22,
  },
  card: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardValue: {
    fontWeight: "600",
  },
  divider: {
    borderTopWidth: 1,
    marginVertical: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  itemName: {
    flex: 1,
    marginRight: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    padding: 16,
  },
  primaryButton: {
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
  },
  secondaryButton: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
