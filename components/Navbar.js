import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

const Navbar = ({ navigation, currentRoute }) => {
  const isFocused = (routeName) => currentRoute === routeName;

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate("MainHome")}>
          <View style={styles.navContain}>
            <Octicons
              name="home"
              size={24}
              color={isFocused("MainHome") ? "#2b68e6" : "#333"}
            />
            <Text
              style={[
                styles.tabBarLabel,
                isFocused("MainHome") && styles.focusedLabel,
              ]}
            >
              Home
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Work")}>
          <View style={styles.navContain}>
            <AntDesign
              name="appstore-o"
              size={24}
              color={isFocused("Work") ? "#2b68e6" : "#333"}
            />
            <Text
              style={[
                styles.tabBarLabel,
                isFocused("Work") && styles.focusedLabel,
              ]}
            >
              Work
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("OfficeScreen")}>
          <View style={styles.navContain}>
            <MaterialIcons
              name="work-outline"
              size={27}
              color={isFocused("OfficeScreen") ? "#2b68e6" : "#333"}
            />
            <Text
              style={[
                styles.tabBarLabel,
                isFocused("OfficeScreen") && styles.focusedLabel,
              ]}
            >
              Office
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View style={styles.navContain}>
            <MaterialCommunityIcons
              name="account-multiple-outline"
              size={24}
              color={isFocused("Profile") ? "#2b68e6" : "#333"}
            />
            <Text
              style={[
                styles.tabBarLabel,
                isFocused("Profile") && styles.focusedLabel,
              ]}
            >
              Profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    // Style for the container
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 7,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navContain: {
    alignItems: "center",
  },
  tabBarLabel: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },
  focusedLabel: {
    color: "#2b68e6",
  },
});
