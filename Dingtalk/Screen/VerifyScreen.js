import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const VerifyScreen = ({ navigation }) => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(240); // 4 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  useEffect(() => {
    if (isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Call function to request new code
          // requestNewCode();
          setIsExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired]);

  const handleChangeText = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const requestNewCode = () => {
    // Logic to request a new code
    // console.log("Requesting a new code...");
    // Reset the timer and code
    setTimeLeft(240);
    setIsExpired(false);
    setCode(["", "", "", ""]);
    inputRefs[0].current.focus();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  const goBack = () => {
    navigation.navigate("CreateNewAccount");
  };

  const handleVerify = () => {
    navigation.navigate("SetPassword");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inneContainer}>
        <View style={styles.icon}>
          <Ionicons
            name="chevron-back"
            size={24}
            color="white"
            onPress={goBack}
          />
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.headerText}>Check Your Phone</Text>
            <Text style={styles.nextText}>
              We've sent the code to your Email
            </Text>
          </View>

          <View style={styles.inputContainer}>
            {code.map((value, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.input}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                value={value}
                editable={!isExpired}
              />
            ))}
          </View>

          <View style={styles.expireContainer}>
            {isExpired ? (
              <Text style={styles.requestCodeText}>Request New Code</Text>
            ) : (
              <View style={styles.codeTimerContainer}>
                <Text style={styles.codeText}>Code expires in</Text>
                <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
              </View>
            )}
          </View>

          <View style={styles.btnContainer}>
            <View style={styles.btnOneContainer}>
              <Pressable style={styles.btnOne} onPress={handleVerify}>
                <Text style={styles.verifyText}>Verify</Text>
              </Pressable>
            </View>

            <View style={styles.btnTwoContainer}>
              <TouchableOpacity style={styles.btnTwo} onPress={requestNewCode}>
                <Text style={styles.sendText}>Send again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#101223",
  },
  inneContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
  },
  icon: {
    marginBottom: 50,
  },
  mainContainer: {
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 80,
  },
  nextText: {
    fontSize: 15,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
  },
  expireContainer: {
    marginBottom: 50,
    alignItems: "center",
  },
  requestCodeText: {
    color: "#007bff",
    fontSize: 15,
    fontWeight: "bold",
  },
  codeTimerContainer: {
    flexDirection: "row",
  },
  codeText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 10,
  },
  timer: {
    color: "#007bff",
    fontSize: 15,
    fontWeight: "bold",
  },
  btnContainer: {
    width: "100%",
  },
  btnOneContainer: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 20,
  },
  btnTwoContainer: {
    marginLeft: 25,
    marginRight: 25,
  },
  btnOne: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 12,
    borderRadius: 50,
  },
  btnTwo: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 50,
  },
  verifyText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  sendText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VerifyScreen;
