import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomText from "@/components/CustomText";
import { useRouter } from "expo-router";
import { ThemeContext } from "./_layout";

export default function Checkout() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [pin, setPin] = useState("");
  const router = useRouter();
  const { isDarkMode } = useContext(ThemeContext);

  const handlePayment = () => {
    if (cardNumber && expiryDate && cvv && selectedBank && pin) {
      // Handle payment logic here
      alert("Payment Successful!");
      router.push("/"); // Redirect to home or confirmation page
    } else {
      alert("Please fill in all fields.");
    }
  };

  const labelStyle = [
    styles.label,
    { color: isDarkMode ? "#d1d5db" : "black" },
  ];
  const inputStyle = [
    styles.input,
    {
      borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
      backgroundColor: isDarkMode ? "#2d2d2d" : "white",
      color: isDarkMode ? "white" : "black",
    },
  ];

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#1a1a1a" : "white" },
        ]}
      >
        <CustomText
          style={[styles.heading, { color: isDarkMode ? "white" : "black" }]}
        >
          Checkout
        </CustomText>

        <CustomText style={labelStyle}>Card Number</CustomText>
        <TextInput
          style={inputStyle}
          placeholder="Enter your card number"
          placeholderTextColor={isDarkMode ? "#a0a0a0" : "#9ca3af"}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <CustomText style={labelStyle}>Expiry Date</CustomText>
        <TextInput
          style={inputStyle}
          placeholder="MM/YY"
          placeholderTextColor={isDarkMode ? "#a0a0a0" : "#9ca3af"}
          keyboardType="numeric"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />

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

        <CustomText style={labelStyle}>PIN</CustomText>
        <TextInput
          style={inputStyle}
          placeholder="Enter your PIN"
          placeholderTextColor={isDarkMode ? "#a0a0a0" : "#9ca3af"}
          keyboardType="numeric"
          secureTextEntry
          value={pin}
          onChangeText={setPin}
        />
      </View>
      <View
        style={[
          styles.footer,
          { backgroundColor: isDarkMode ? "#2d2d2d" : "white" },
        ]}
      >
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Confirm and Pay</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 30,
    marginBottom: 16,
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
    marginBottom: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  footer: {
    padding: 16,
  },
  payButton: {
    backgroundColor: "#22c55e",
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
