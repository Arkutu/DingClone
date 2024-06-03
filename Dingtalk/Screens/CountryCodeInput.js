import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CountryCodeInput = ({
  loginByEmail,
  value,
  onChangeText,
  onCountryCodeSelect,
}) => {
  const [countryCode, setCountryCode] = useState("+1"); // Default to +1 (USA)

  const handleCountryCodeSelect = () => {
    // Navigate to the country code selection screen
    onCountryCodeSelect();
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {!loginByEmail && (
          <Pressable
            style={styles.countryCodeButton}
            onPress={handleCountryCodeSelect}
          >
            <Text style={styles.countryCodeText}>{countryCode}</Text>
            <Ionicons name="chevron-down" size={16} color="black" />
          </Pressable>
        )}
        <TextInput
          style={[styles.input, !loginByEmail && styles.inputWithCountryCode]}
          placeholder={
            loginByEmail
              ? "Enter your email address"
              : "Enter your phone number"
          }
          value={loginByEmail ? value : `${countryCode}${value}`}
          onChangeText={onChangeText}
          keyboardType={loginByEmail ? "email-address" : "numeric"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  top: {
    marginTop: 200,
  },
  countryCodeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 16,
    marginRight: 4,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  inputWithCountryCode: {
    paddingLeft: 0,
  },
});

export default CountryCodeInput;
