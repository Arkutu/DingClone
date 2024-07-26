import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

const Settings = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: "#ccc" },
      headerTitleStyle: { color: "#ccc" },
      headerTintColor: "black",
      headerLeft: () => {
        return (
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back-sharp" size={28} color="black" />
            </TouchableOpacity>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View>
            <Text style={styles.textTop}>Settings & Privacy</Text>
          </View>
        );
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.textHeader}>Available</Text>

          <View style={{ marginTop: 10 }} />

          <View style={styles.profile}>
            <View style={styles.settingsContainer}>
              <View style={styles.items}>
                <Text style={styles.text}>General</Text>
              </View>
            </View>
            <View style={styles.space}>
              <View style={styles.line} />
            </View>

            <View style={styles.settingsContainer}>
              <View style={styles.items}>
                <Text style={styles.text}>New Message Notification</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 10 }} />
          <Text style={styles.textHeader}>Privacy</Text>

          <View style={styles.profile}>
            <View style={styles.settingsContainer}>
              <View style={styles.items}>
                <Text style={styles.text}>Permission</Text>
              </View>
            </View>

            <View style={styles.space}>
              <View style={styles.line} />
            </View>

            <View style={styles.settingsContainer}>
              <View style={styles.items}>
                <Text style={styles.text}>Display of External Info...</Text>
              </View>
            </View>

            <View style={styles.space}>
              <View style={styles.line} />
            </View>

            <View style={styles.settingsContainer}>
              <View style={styles.items}>
                <Text style={styles.text}>Persional Information inqu...</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 10 }} />
          <Text style={styles.textHeader}>Help</Text>

          <View style={styles.profile}>
            <View style={styles.settingsContainer}>
              <View style={styles.items}>
                <Text style={styles.text}>Help and Feedback</Text>
              </View>
            </View>

            <View style={styles.space}>
              <View style={styles.line} />
            </View>

            <View style={styles.settingsContainer}>
              <View style={styles.items}>
                <Text style={styles.text}>About OfficeComms</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 10 }} />
          <View style={styles.profile}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.settingsContainerLogout}
              onPress={() => navigation.navigate("AddNewAccount")}
            >
              <View style={styles.items}>
                <Text style={styles.text}>Add new account</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.space}>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.settingsContainerLogout}
              onPress={() => navigation.navigate("Logout")}
            >
              <View style={styles.items}>
                <Text style={styles.text}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 50 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  textTop: {
    fontSize: 24,
    fontWeight: "600",
    color: "#555",
    marginRight: 10,
  },
  profile: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  profileMe: {
    position: "relative",
  },
  profContainer: {
    position: "absolute",
    width: "94%",
    height: 130,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 6,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 70,
  },
  img: {
    marginTop: 40,
    marginLeft: 20,
  },
  name: {
    color: "#333",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 10,
    marginLeft: 110,
  },
  iconHeader: {
    display: "none",
  },
  textHeader: {
    color: "#bbb",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
  },
  settingsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: 14,
    borderColor: "#ddd",
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  settingsContainerLogout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 14,
    borderColor: "#ddd",
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
    marginLeft: 8,
  },
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#f1f2f6",
    alignItems: "center",
  },
  space: {
    marginLeft: 10,
    marginRight: 10,
  },
});
