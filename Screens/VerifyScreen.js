import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { supabase } from "../lib/supabase"; // Import your Supabase client
import { useRoute } from "@react-navigation/native";

const VerifyScreen = ({ navigation }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const route = useRoute();
  const { pinCode: correctPinCode } = route.params;

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  useEffect(() => {
    if (isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleResendCode = async () => {
    const newPinCode = Math.floor(1000 + Math.random() * 9000).toString();
    const { data, error } = await supabase.auth.updateUser({ data: { pinCode: newPinCode } });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Success", `New code sent: ${newPinCode}`);
      setTimeLeft(240);
      setIsExpired(false);
    }
  };

  const handleVerifyCode = async () => {
    const fullCode = code.join("");
    if (fullCode === correctPinCode) {
      Alert.alert("Success", "Verification successful!");
      navigation.navigate("MainHome"); // Navigate to MainHome
    } else {
      Alert.alert("Error", "Incorrect PIN code");
    }
  };

  const goBack = () => {
    navigation.navigate("CreateNewAccount");
  };

  return (
    <View style={styles.container}>
      <Ionicons name="chevron-back" size={24} color="white" onPress={goBack} style={styles.icon} />
      <Text style={styles.headerText}>Verify your account</Text>
      <Text style={styles.descriptionText}>Enter the code sent to your email address</Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            style={styles.codeInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
          />
        ))}
      </View>
      <Text style={styles.timerText}>
        {isExpired ? "Code expired" : `Time left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60}`}
      </Text>
      {isExpired && (
        <Pressable style={styles.button} onPress={handleResendCode}>
          <Text style={styles.buttonText}>Resend Code</Text>
        </Pressable>
      )}
      <Pressable style={styles.button} onPress={handleVerifyCode}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#101223",
  },
  icon: {
    marginTop: 40,
    marginBottom: 50,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 18,
    color: "white",
    marginBottom: 30,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  codeInput: {
    height: 50,
    width: 50,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#fff",
    color: "#000",
  },
  timerText: {
    color: "white",
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VerifyScreen;
