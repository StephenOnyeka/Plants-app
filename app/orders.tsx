import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Receipt } from "lucide-react-native";
import CustomText from "@/components/CustomText";
import { OrdersContext, ThemeContext } from "./_layout";
import { Order } from "@/hooks/useOrders";

function formatDate(ts: number): string {
  try {
    return new Date(ts).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function Orders() {
  const { isDarkMode } = useContext(ThemeContext);
  const { orders } = useContext(OrdersContext);

  if (orders.length === 0) {
    return (
      <View
        style={[
          styles.empty,
          { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
        ]}
      >
        <Receipt
          size={64}
          color={isDarkMode ? "#4b5563" : "#d1d5db"}
        />
        <Text
          style={[
            styles.emptyText,
            { color: isDarkMode ? "#9ca3af" : "#6b7280" },
          ]}
        >
          You haven't placed any orders yet.
        </Text>
      </View>
    );
  }

  const renderOrder = ({ item }: { item: Order }) => (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDarkMode ? "#2d2d2d" : "#f3f4f6",
          borderColor: isDarkMode ? "#3d3d3d" : "#e5e7eb",
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <CustomText
          style={[styles.orderId, { color: isDarkMode ? "white" : "black" }]}
        >
          {item.id}
        </CustomText>
        <Text style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}>
          {formatDate(item.date)}
        </Text>
      </View>

      {item.items.map((line) => (
        <View key={line.id} style={styles.line}>
          <Text
            style={[
              styles.lineName,
              { color: isDarkMode ? "#d1d5db" : "#374151" },
            ]}
            numberOfLines={1}
          >
            {line.title} × {line.quantity}
          </Text>
          <Text style={{ color: isDarkMode ? "#d1d5db" : "#374151" }}>
            ${(line.price * line.quantity).toFixed(2)}
          </Text>
        </View>
      ))}

      <View
        style={[
          styles.totalRow,
          { borderTopColor: isDarkMode ? "#4b5563" : "#d1d5db" },
        ]}
      >
        <Text style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}>
          {item.bank}
        </Text>
        <CustomText
          style={[styles.total, { color: isDarkMode ? "white" : "black" }]}
        >
          ${item.total.toFixed(2)}
        </CustomText>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
      ]}
    >
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontFamily: "PoppinsSemiBold",
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  lineName: {
    flex: 1,
    marginRight: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 8,
  },
  total: {
    fontSize: 16,
    fontWeight: "700",
  },
});
