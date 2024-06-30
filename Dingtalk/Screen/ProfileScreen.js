// import React from "react";
// import { View, Text } from "react-native";

// const ProfileScreen = () => {
//   return (
//     <View>
//       <Text>Profile Screen</Text>
//     </View>
//   );
// };

// export default ProfileScreen;

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      {/* Home icon and search bar*/}
      <View style={styles.headerContainer}>
        <View style={styles.boxHome}>
          <View style={styles.box}>
            <Text>KK</Text>
          </View>
          <Text style={styles.boxText}>MR. 3.0</Text>
        </View>
      </View>

      {/* Body of chat screen*/}
      <View style={styles.navigate}>{/* Chat code */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101223",
  },

  //Home icon and search bar styling
  headerContainer: {
    marginLeft: 16,
    marginRight: 16,
  },
  boxHome: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#d3a375",
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: {
    fontSize: 16,
    marginLeft: 5,
    color: "white",
    fontWeight: "bold",
  },
  searchBar: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    backgroundColor: "#212529",
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "white",
  },
  iconContainerOne: {
    marginRight: 5,
  },

  // Body of chat screen styling
  //   navigate: {
  //     marginTop: 10,
  //     backgroundColor: "#101223",
  //     borderWidth: 1,
  //     borderTopLeftRadius: 15,
  //     borderTopRightRadius: 15,
  //     overflow: "hidden",
  //     height: "100%",
  //     paddingBottom: 0,
  //   },
});
export default ProfileScreen;
