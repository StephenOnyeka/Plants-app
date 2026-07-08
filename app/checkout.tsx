import React, { useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomText from "@/components/CustomText";
import { useRouter } from "expo-router";
import { CartContext, OrdersContext, ThemeContext } from "./_layout";

type Errors = {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  selectedBank?: string;
  pin?: string;
};

const BANK_LABELS: Record<string, string> = {
  bankA: "Access Bank",
  bankB: "First Bank",
  bankC: "Zenith Bank",
};

export default function Checkout() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [pin, setPin] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();
  const { isDarkMode } = useContext(ThemeContext);
  const { cart, clearCart } = useContext(CartContext);
  const { placeOrder } = useContext(OrdersContext);

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const validate = (): boolean => {
    const next: Errors = {};

    // 13-19 digits covers common card lengths.
    const digitsOnly = cardNumber.replace(/\s/g, "");
    if (!/^\d{13,19}$/.test(digitsOnly)) {
      next.cardNumber = "Enter a valid card number (13-19 digits).";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      next.expiryDate = "Use MM/YY format.";
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      next.cvv = "CVV must be 3-4 digits.";
    }
    if (!selectedBank) {
      next.selectedBank = "Please select a bank.";
    }
    if (!/^\d{4}$/.test(pin)) {
      next.pin = "PIN must be 4 digits.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePayment = () => {
    if (cart.length === 0) return;
    if (!validate()) return;

    const order = placeOrder(cart, BANK_LABELS[selectedBank] ?? selectedBank);
    clearCart();
    router.replace({
      pathname: "/orderConfirmation",
      params: { id: order.id },
    });
  };

  const labelStyle = [styles.label, { color: isDarkMode ? "#d1d5db" : "black" }];
  const inputStyle = [
    styles.input,
    {
      borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
      backgroundColor: isDarkMode ? "#2d2d2d" : "white",
      color: isDarkMode ? "white" : "black",
    },
  ];

  const isEmpty = cart.length === 0;

  return (
    <>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
        ]}
        contentContainerStyle={styles.content}
      >
        <CustomText
          style={[styles.heading, { color: isDarkMode ? "white" : "black" }]}
        >
          Checkout
        </CustomText>

        {/* Order summary */}
        <View
          style={[
            styles.summary,
            {
              backgroundColor: isDarkMode ? "#2d2d2d" : "#f3f4f6",
            },
          ]}
        >
          <CustomText
            style={[
              styles.summaryHeading,
              { color: isDarkMode ? "white" : "black" },
            ]}
          >
            Order Summary
          </CustomText>
          {isEmpty ? (
            <Text style={{ color: isDarkMode ? "#9ca3af" : "#6b7280" }}>
              Your cart is empty.
            </Text>
          ) : (
            <>
              {cart.map((item) => (
                <View key={item.id} style={styles.summaryRow}>
                  <Text
                    style={[
                      styles.summaryItem,
                      { color: isDarkMode ? "#d1d5db" : "#374151" },
                    ]}
                    numberOfLines={1}
                  >
                    {item.title} × {item.quantity}
                  </Text>
                  <Text
                    style={{ color: isDarkMode ? "#d1d5db" : "#374151" }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
              <View
                style={[
                  styles.summaryTotalRow,
                  { borderTopColor: isDarkMode ? "#4b5563" : "#d1d5db" },
                ]}
              >
                <CustomText
                  style={[
                    styles.summaryTotalLabel,
                    { color: isDarkMode ? "white" : "black" },
                  ]}
                >
                  Total
                </CustomText>
                <CustomText
                  style={[
                    styles.summaryTotalValue,
                    { color: isDarkMode ? "white" : "black" },
                  ]}
                >
                  ${total.toFixed(2)}
                </CustomText>
              </View>
            </>
          )}
        </View>

        <CustomText style={labelStyle}>Card Number</CustomText>
        <TextInput
          style={inputStyle}
          placeholder="Enter your card number"
          placeholderTextColor={isDarkMode ? "#a0a0a0" : "#9ca3af"}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />
        {errors.cardNumber && (
          <Text style={styles.errorText}>{errors.cardNumber}</Text>
        )}

        <CustomText style={labelStyle}>Expiry Date</CustomText>
        <TextInput
          style={inputStyle}
          placeholder="MM/YY"
          placeholderTextColor={isDarkMode ? "#a0a0a0" : "#9ca3af"}
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
        {errors.expiryDate && (
          <Text style={styles.errorText}>{errors.expiryDate}</Text>
        )}

        <CustomText style={labelStyle}>CVV</CustomText>
        <TextInput
          style={inputStyle}
          placeholder="Enter CVV"
          placeholderTextColor={isDarkMode ? "#a0a0a0" : "#9ca3af"}
          keyboardType="numeric"
          secureTextEntry
          value={cvv}
          onChangeText={setCvv}
        />
        {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}

        <CustomText style={labelStyle}>Select Bank</CustomText>
        <View
          style={[
            styles.pickerWrapper,
            {
              borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
              backgroundColor: isDarkMode ? "#2d2d2d" : "white",
            },
          ]}
        >
          <Picker
            selectedValue={selectedBank}
            onValueChange={(itemValue: string) => setSelectedBank(itemValue)}
            style={{ color: isDarkMode ? "white" : "black" }}
          >
            <Picker.Item label="Select your bank" value="" color={isDarkMode ? "#a0a0a0" : "#9ca3af"} />
            <Picker.Item label="Access Bank" value="bankA" color={isDarkMode ? "white" : "black"} />
            <Picker.Item label="First Bank" value="bankB" color={isDarkMode ? "white" : "black"} />
            <Picker.Item label="Zenith Bank" value="bankC" color={isDarkMode ? "white" : "black"} />
          </Picker>
        </View>
        {errors.selectedBank && (
          <Text style={styles.errorText}>{errors.selectedBank}</Text>
        )}

        <CustomText style={labelStyle}>PIN</CustomText>
        <TextInput
          style={inputStyle}
          placeholder="Enter your 4-digit PIN"
          placeholderTextColor={isDarkMode ? "#a0a0a0" : "#9ca3af"}
          keyboardType="numeric"
          secureTextEntry
          maxLength={4}
          value={pin}
          onChangeText={setPin}
        />
        {errors.pin && <Text style={styles.errorText}>{errors.pin}</Text>}
      </ScrollView>

      <View
        style={[
          styles.footer,
          { backgroundColor: isDarkMode ? "#2d2d2d" : "white" },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.payButton,
            { backgroundColor: isEmpty ? "#9ca3af" : "#22c55e" },
          ]}
          onPress={handlePayment}
          disabled={isEmpty}
        >
          <Text style={styles.payButtonText}>
            {isEmpty ? "Cart is empty" : `Pay $${total.toFixed(2)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  heading: {
    fontSize: 30,
    marginBottom: 16,
  },
  summary: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryHeading: {
    fontSize: 18,
    fontFamily: "PoppinsSemiBold",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  summaryItem: {
    flex: 1,
    marginRight: 12,
  },
  summaryTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    marginTop: 8,
    paddingTop: 8,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  errorText: {
    color: "#ef4444",
    marginBottom: 12,
    fontSize: 13,
  },
  footer: {
    padding: 16,
  },
  payButton: {
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  payButtonText: {
    color: "white",
    fontSize: 18,
  },
});
