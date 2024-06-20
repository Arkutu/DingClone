import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState("home");
  const [searchText, setSearchText] = useState("");
  const [showDropdownDM, setShowDropdownDM] = useState(false);
  const [showDropdownChannel, setShowDropdownChannel] = useState(false);

  const toggleDropdown = () => setShowDropdownDM(!showDropdownDM);
  const toggleDropdownChannel = () =>
    setShowDropdownChannel(!showDropdownChannel);

  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.navigate}>
              <View style={styles.btns}>
                <View style={styles.btn_One}></View>
                <View style={styles.btn_One}></View>
                <View style={styles.btn_One}></View>
                <View style={styles.btn_One}></View>
              </View>

              <View>
                <View style={styles.BodyMainContainer}>
                  <View style={styles.innerBodyMainContainer}>
                    <View style={styles.wrapper}>
                      <View>
                        <Text style={styles.wapText}>New DMs</Text>
                      </View>

                      <View>
                        <Pressable
                          onPress={toggleDropdown}
                          style={styles.pressable}
                        >
                          <View>
                            <Text style={styles.textBlue}>
                              {showDropdownDM ? "show less" : ""}
                            </Text>
                          </View>

                          <View style={styles.wapIcon}>
                            <Ionicons
                              name={showDropdownDM ? "" : "chevron-forward"}
                              size={24}
                              color="white"
                            />
                          </View>
                        </Pressable>
                      </View>
                    </View>

                    {showDropdownDM && (
                      <View>
                        <View style={styles.msgContainer}>
                          <Ionicons
                            name="person"
                            size={24}
                            color="white"
                            style={styles.msgIcon}
                          />
                          <Text style={styles.msgText}>Mensah Raphael T.</Text>
                        </View>
                        <View style={styles.msgContainer}>
                          <Ionicons
                            name="person"
                            size={24}
                            color="white"
                            style={styles.msgIcon}
                          />
                          <Text style={styles.msgText}>Michael Anim</Text>
                        </View>
                        <View style={styles.msgContainer}>
                          <Ionicons
                            name="person"
                            size={24}
                            color="white"
                            style={styles.msgIcon}
                          />
                          <Text style={styles.msgText}>
                            Dennis Opoku Amponsah
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.inner}>
                  <View style={styles.innerChannel}>
                    <View style={styles.coverChannel}>
                      <View>
                        <Text style={styles.innerTextOne}>Channels</Text>
                      </View>
                      <View style={styles.icon}>
                        <Pressable
                          onPress={toggleDropdownChannel}
                          style={styles.pressable}
                        >
                          <View>
                            <Text style={styles.textBlue}>
                              {showDropdownChannel ? "show less" : ""}
                            </Text>
                          </View>

                          <Ionicons
                            name={showDropdownChannel ? "" : "chevron-forward"}
                            size={24}
                            color="white"
                          />
                        </Pressable>
                      </View>
                    </View>

                    {showDropdownChannel && (
                      <View>
                        <View style={styles.channelContainer}>
                          <View style={styles.subContainer}>
                            <Text style={styles.hash}>#</Text>
                            <Text style={styles.channelText}>general</Text>
                          </View>

                          <View style={styles.subContainer}>
                            <Text style={styles.hash}>#</Text>
                            <Text style={styles.channelText}>meeting</Text>
                          </View>

                          <View style={styles.subContainer}>
                            <Text style={styles.hash}>#</Text>
                            <Text style={styles.channelText}>random</Text>
                          </View>

                          <View style={styles.addChannelContainer}>
                            <Pressable style={styles.btnChannel}>
                              <Text style={styles.btnChannelPlus}>+</Text>

                              <Text style={styles.btnChannelText}>
                                Create channel
                              </Text>
                            </Pressable>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.innerTwo}>
                  <Text style={styles.innerTextTwo}>Direct message</Text>
                  <View style={styles.icon}>
                    <Ionicons name="chevron-forward" size={24} color="white" />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        );
      case "chat":
        return (
          <View style={styles.container}>
            <Text>Chat Content</Text>
          </View>
        );
      case "bell":
        return (
          <View style={styles.container}>
            <Text>Bell Content</Text>
          </View>
        );
      case "profile":
        return (
          <View style={styles.container}>
            <Text>Profile Content</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.boxHome}>
          <View style={styles.box}>
            <Text>KK</Text>
          </View>
          <Text style={styles.boxText}>Home</Text>
        </View>

        <View style={styles.searchBar}>
          <View style={styles.iconContainerOne}>
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
      {renderContent()}

      <View style={styles.iconContainer}>
        <Pressable
          style={[
            styles.iconItem,
            currentTab === "home" && styles.iconItemSelected,
          ]}
          onPress={() => setCurrentTab("home")}
        >
          <Octicons
            name="home"
            size={22}
            color={currentTab === "home" ? "#007bff" : "white"}
          />
          <Text
            style={[
              styles.iconText,
              currentTab === "home" && styles.iconItemSelected,
            ]}
          >
            Home
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.iconItem,
            currentTab === "chat" && styles.iconItemSelected,
          ]}
          onPress={() => setCurrentTab("chat")}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={24}
            color={currentTab === "chat" ? "#007bff" : "white"}
          />
          <Text
            style={[
              styles.iconText,
              currentTab === "chat" && styles.iconItemSelected,
            ]}
          >
            Chats
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.iconItem,
            currentTab === "bell" && styles.iconItemSelected,
          ]}
          onPress={() => setCurrentTab("bell")}
        >
          <Octicons
            name="bell"
            size={22}
            color={currentTab === "bell" ? "#007bff" : "white"}
          />
          <Text
            style={[
              styles.iconText,
              currentTab === "bell" && styles.iconItemSelected,
            ]}
          >
            Notifs
          </Text>
        </Pressable>

        {/* <Pressable style={styles.iconItem} > */}
        <Pressable
          style={[
            styles.iconItem,
            currentTab === "profile" && styles.iconItemSelected,
          ]}
          onPress={() => setCurrentTab("profile")}
        >
          <MaterialCommunityIcons
            name="account-multiple-outline"
            size={27}
            color={currentTab === "profile" ? "#007bff" : "white"}
          />
          <Text
            style={[
              styles.iconText,
              currentTab === "profile" && styles.iconItemSelected,
            ]}
          >
            Profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282A3A",
  },
  headerContainer: {
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
    backgroundColor: "#d3a375",
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
  iconContainerOne: {
    marginRight: 5,
  },
  scrollView: {
    backgroundColor: "#101223",
    borderWidth: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  scrollContainer: {
    paddingBottom: 100,
    paddingTop: 0,
  },
  navigate: {
    // paddingBottom: 100,
  },
  btns: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  btn_One: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#d3a375",
    margin: 8,
    marginBottom: 20,
  },
  BodyMainContainer: {
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  innerBodyMainContainer: {
    marginTop: 15,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 15,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  wapText: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  textBlue: {
    color: "#007bff",
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  msgIcon: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    backgroundColor: "#868e96",
  },
  msgText: {
    fontSize: 14,
    marginLeft: 10,
    color: "white",
  },

  //? Channels
  inner: {
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  innerChannel: {
    marginTop: 15,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 15,
  },
  coverChannel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  innerTextOne: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
  },
  channelContainer: {
    // backgroundColor: "#fff",
    // marginBottom: 10,
    marginLeft: 10,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  hash: {
    color: "gray",
  },
  channelText: {
    color: "gray",
    marginLeft: 10,
  },
  btnChannel: {
    marginTop: 17,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  btnChannelPlus: {
    color: "gray",
    fontSize: 18,
  },
  btnChannelText: {
    color: "gray",
    marginLeft: 8,
  },

  //? Direct Message
  innerTwo: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 0,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  innerTextTwo: {
    fontSize: 14,
    color: "white",
  },

  //? icon Container
  iconContainer: {
    backgroundColor: "#101223",
    // borderWidth: 1,
    // borderColor: "#101223",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  iconItem: {
    alignItems: "center",
    // marginBottom: 5,
  },
  iconText: {
    color: "#fff",
    fontSize: 10,
    marginTop: 5,
  },

  //! Select icons style
  iconItemSelected: {
    // color: "#007bff",
  },
});

export default HomeScreen;
