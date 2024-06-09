import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import DropDownPicker from "react-native-dropdown-picker";

const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleNext = () => {
    navigation.navigate("CreateNewAccount");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.boxHome}>
            <View style={styles.box}>
              <Text>KK</Text>
            </View>
            <Text style={styles.boxText}>Home</Text>
          </View>

          <View style={styles.searchBar}>
            <View style={styles.iconContainer}>
              <Ionicons name="search" size={20} color="gray" />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="search anything..."
              placeholderTextColor={"gray"}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        <View style={styles.navigate}>
          <View style={styles.btn}>
            <View style={styles.btn_One}></View>
            <View style={styles.btn_One}></View>
            <View style={styles.btn_One}></View>
            <View style={styles.btn_One}></View>
          </View>
        </View>
      </View>

      <View style={styles.bodyMainContainer}>
        <View style={styles.innerBodyMainContainer}>
          <View style={styles.wrapper}>
            <View style={styles.wrapperOne}>
              <Text style={styles.wapText}>New DMs</Text>
            </View>

            <View style={styles.wrapperTwo}>
              <Pressable onPress={toggleDropdown} style={styles.pressable}>
                <View>
                  <Text style={styles.textBlue}>
                    {showDropdown ? "show less" : ""}
                  </Text>
                </View>

                <View style={styles.wapIcon}>
                  <Ionicons
                    name={showDropdown ? "" : "chevron-forward"}
                    size={24}
                    color="white"
                  />
                </View>
              </Pressable>
            </View>
          </View>

          {showDropdown && (
            <View>
              <View style={styles.msgMainContainer}>
                <View style={styles.msgContainer}>
                  <View style={styles.msgPic}></View>
                  <Text style={styles.msgText}>Mensah Raphael T.</Text>
                </View>
                <View style={styles.msgContainer}>
                  <View style={styles.msgPic}></View>
                  <Text style={styles.msgText}>Michael Anim</Text>
                </View>
                <View style={styles.msgContainer}>
                  <View style={styles.msgPic}></View>
                  <Text style={styles.msgText}>Dennis Opoku Amponsah</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <View>
          <View style={styles.inner}>
            <Text style={styles.innerTextOne}>Channels</Text>
            <View style={styles.icon}>
              <Pressable>
                <Ionicons name="chevron-forward" size={24} color="white" />
              </Pressable>
            </View>
          </View>

          <View style={styles.innerTwo}>
            <Text style={styles.innerTextTwo}>Direct message</Text>
            <View style={styles.icon}>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="white"
                onPress={handleNext}
              />
            </View>
          </View>

          <View style={styles.push}></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#282A3A",
  },
  innerContainer: {
    padding: 16,
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
    backgroundColor: "orangered",
    justifyContent: "center",
    alignItems: "center",
  },
  boxText: {
    fontSize: 16,
    marginLeft: 5,
    color: "white",
  },
  searchBar: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    // backgroundColor: "#333", I don't have the color yet
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "white",
  },
  iconContainer: {
    marginRight: 5,
  },
  navigate: {
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#101223",
    borderBottomColor: "#101223",
  },
  bodyMainContainer: {
    backgroundColor: "#101223",
  },
  btn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  btn_One: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "orangered",
    margin: 8,
  },
  innerBodyMainContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  wrapperOne: {
    flex: 1,
  },
  wrapperTwo: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  wapText: {
    fontSize: 14,
    color: "white",
  },
  textBlue: {
    color: "blue",
    marginRight: 10,
  },
  msgMainContainer: {
    marginTop: 4,
  },
  msgContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  msgPic: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  msgText: {
    fontSize: 14,
    marginLeft: 5,
    marginTop: 5,
    color: "white",
  },
  inner: {
    flexDirection: "row",
    padding: 15,
    borderWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  innerTwo: {
    flexDirection: "row",
    padding: 15,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  innerTextOne: {
    fontSize: 14,
    color: "white",
    marginLeft: 4,
    marginRight: 238,
  },
  innerTextTwo: {
    fontSize: 14,
    color: "white",
    marginLeft: 4,
    marginRight: 198,
  },
  push: {
    marginTop: 500,
  },
});

export default HomeScreen;
