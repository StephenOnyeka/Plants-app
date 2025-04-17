import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Use Picker from the correct package
import CustomText from "@/components/CustomText";
import { useRouter } from "expo-router";

export default function Checkout() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [pin, setPin] = useState("");
  const router = useRouter();

  const handlePayment = () => {
    if (cardNumber && expiryDate && cvv && selectedBank && pin) {
      // Handle payment logic here
      alert("Payment Successful!");
      router.push("/"); // Redirect to home or confirmation page
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <>
      <View className="flex-1 bg-white p-4">
        {/* <CustomText className="text-3xl font-bold mb-4">Checkout</CustomText> */}
        <CustomText className="text-3xl mb-4">Checkout</CustomText>

        <CustomText className="text-lg font-semibold mb-2">
          Card Number
        </CustomText>
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Enter your card number"
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <CustomText className="text-lg font-semibold mb-2">
          Expiry Date
        </CustomText>
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="MM/YY"
          keyboardType="numeric"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />

        <CustomText className="text-lg font-semibold mb-2">CVV</CustomText>
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Enter CVV"
          keyboardType="numeric"
          secureTextEntry
          value={cvv}
          onChangeText={setCvv}
        />

        <CustomText className="text-lg font-semibold mb-2">
          Select Bank
        </CustomText>
        <Picker
          selectedValue={selectedBank}
          onValueChange={(itemValue: string) => setSelectedBank(itemValue)} // Explicitly type itemValue as string
          className="border border-gray-300 rounded-lg mb-4"
        >
          <Picker.Item label="Select your bank" value="" />
          <Picker.Item label="Access Bank" value="bankA" />
          <Picker.Item label="First Bank" value="bankB" />
          <Picker.Item label="Zenith Bank" value="bankC" />
        </Picker>

        <CustomText className="text-lg font-semibold mb-2">PIN</CustomText>
        <TextInput
          className="border border-gray-300 rounded-lg p-2 mb-4"
          placeholder="Enter your PIN"
          keyboardType="numeric"
          secureTextEntry
          value={pin}
          onChangeText={setPin}
        />

        {/* <TouchableOpacity
          className="bg-green-500 rounded-full p-4 flex items-center justify-center"
          onPress={handlePayment}
        >
          <Text className="text-white text-lg">Confirm and Pay</Text>
        </TouchableOpacity> */}
      </View>
      <View className="p-4 bg-white">
        <TouchableOpacity
          className="bg-green-500 rounded-2xl p-4 flex items-center justify-center"
          onPress={handlePayment}
        >
          <Text className="text-white text-lg">Confirm and Pay</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
