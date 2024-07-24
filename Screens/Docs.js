import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Ionicons, AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { ScrollView } from "react-native";

const Docs = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Docs",
      headerTitleStyle: {
        color: "#555",
        marginLeft: 80,
        alignSelf: "center",
        justifyContent: "center",
      },
      headerStyle: { backgroundColor: "#fff" },
      headerLeft: () => {
        return (
          <View style={{ marginLeft: 13 }}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.leftIconContainer}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back-sharp" size={28} color="#333" />
            </TouchableOpacity>
          </View>
        );
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <View style={styles.icon}>
            <AntDesign name="search1" size={20} color="gray" />
          </View>
          <TextInput
            placeholder="Search..."
            placeholderTextColor={"gray"}
            value={searchText}
            onChangeText={setSearchText}
            style={styles.search}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.floatingButton}
        onPress={() => navigation.navigate()}
      >
        <FontAwesome6 name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Docs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  search: {
    position: "absolute",
    width: "94%",
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    padding: 4,
    fontSize: 16,
    paddingHorizontal: 40,
    color: "#333",
    marginLeft: 10,
    zIndex: 0,
  },
  icon: {
    marginLeft: 20,
    zIndex: 1,
  },

  floatingButton: {
    position: "absolute",
    top: 640,
    right: 20,
    backgroundColor: "#2b68e6",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
