import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust import path if needed

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        color: "#fff",
        marginLeft: 30,
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
      headerRight: () => {
        return (
          <View>
            <Text></Text>
          </View>
        );
      },
    });
  }, [navigation]);

  useEffect(() => {
    if (searchText.length === 0) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const q = query(
          collection(db, "items"), // Change 'items' to your collection name
          where("name", ">=", searchText),
          where("name", "<=", searchText + "\uf8ff") // Ensures that the query matches all strings starting with the searchText
        );

        console.log("Executing query:", q); // Debugging

        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Query results:", items); // Debugging
        setResults(items);
      } catch (error) {
        console.error("Error fetching results:", error);
        Alert.alert("Error", "Unable to fetch search results");
      }
    };

    fetchResults();
  }, [searchText]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("Details", { itemId: item.id })} // Adjust 'Details' and 'itemId' as needed
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.leftIconContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back-sharp" size={28} color="#333" />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <View style={styles.icon}>
            <AntDesign name="search1" size={20} color="gray" />
          </View>
          <TextInput
            placeholder="Search..."
            placeholderTextColor={"gray"}
            autoFocus
            value={searchText}
            onChangeText={setSearchText}
            style={styles.search}
          />
        </View>
      </View>

      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.noResults}>No results found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginRight: 40,
  },
  leftIconContainer: {
    marginTop: 5,
    marginRight: 2,
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  search: {
    position: "absolute",
    width: "100%",
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

  item: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  noResults: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
});

export default Search;
