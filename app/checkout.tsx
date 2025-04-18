import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
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

  return (
    <>
      <View className={`flex-1 p-4 ${isDarkMode ? 'bg-dark-primary' : 'bg-white'}`}>
        {/* <CustomText className="text-3xl font-bold mb-4">Checkout</CustomText> */}
        <CustomText className={`text-3xl mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Checkout</CustomText>

        <CustomText className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
          Card Number
        </CustomText>
        <TextInput
          className={`border ${isDarkMode ? 'border-gray-600 bg-dark-secondary text-white' : 'border-gray-300 bg-white text-black'} rounded-lg p-2 mb-4`}
          placeholder="Enter your card number"
          placeholderTextColor={isDarkMode ? '#a0a0a0' : '#9ca3af'}
          keyboardType="numeric"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <CustomText className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
          Expiry Date
        </CustomText>
        <TextInput
          className={`border ${isDarkMode ? 'border-gray-600 bg-dark-secondary text-white' : 'border-gray-300 bg-white text-black'} rounded-lg p-2 mb-4`}
          placeholder="MM/YY"
          placeholderTextColor={isDarkMode ? '#a0a0a0' : '#9ca3af'}
          keyboardType="numeric"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />

        <CustomText className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>CVV</CustomText>
        <TextInput
          className={`border ${isDarkMode ? 'border-gray-600 bg-dark-secondary text-white' : 'border-gray-300 bg-white text-black'} rounded-lg p-2 mb-4`}
          placeholder="Enter CVV"
          placeholderTextColor={isDarkMode ? '#a0a0a0' : '#9ca3af'}
          keyboardType="numeric"
          secureTextEntry
          value={cvv}
          onChangeText={setCvv}
        />

        <CustomText className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>
          Select Bank
        </CustomText>
        <View className={`border ${isDarkMode ? 'border-gray-600 bg-dark-secondary' : 'border-gray-300 bg-white'} rounded-lg mb-4`}>
          <Picker
            selectedValue={selectedBank}
            onValueChange={(itemValue: string) => setSelectedBank(itemValue)}
            style={{ color: isDarkMode ? 'white' : 'black' }}
          >
            <Picker.Item label="Select your bank" value="" color={isDarkMode ? '#a0a0a0' : '#9ca3af'} />
            <Picker.Item label="Access Bank" value="bankA" color={isDarkMode ? 'white' : 'black'} />
            <Picker.Item label="First Bank" value="bankB" color={isDarkMode ? 'white' : 'black'} />
            <Picker.Item label="Zenith Bank" value="bankC" color={isDarkMode ? 'white' : 'black'} />
          </Picker>
        </View>

        <CustomText className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-black'}`}>PIN</CustomText>
        <TextInput
          className={`border ${isDarkMode ? 'border-gray-600 bg-dark-secondary text-white' : 'border-gray-300 bg-white text-black'} rounded-lg p-2 mb-4`}
          placeholder="Enter your PIN"
          placeholderTextColor={isDarkMode ? '#a0a0a0' : '#9ca3af'}
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
      <View className={`p-4 ${isDarkMode ? 'bg-dark-secondary' : 'bg-white'}`}>
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
