import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Navbar from "../components/Navbar";
import MenuComponent from "../components/MenuComponent";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { UserContext } from "../context/UserContext";
import { useAppContext } from "../context/AppContext";
import { auth, db } from "../firebaseConfig";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { color } from "react-native-elements/dist/helpers";

const MainHomeScreen = ({ route, navigation }) => {
  const { organizationName: routeOrganizationName } = route.params || {};
  const { user, loading } = useContext(UserContext);
  const {
    organizationName: contextOrganizationName,
    setOrganizationName,
    selectedMembers,
    setSelectedMembers,
  } = useAppContext();
  // const route = useRoute();
  // const routeActive = useRoute();

  const organizationName = routeOrganizationName || contextOrganizationName;
  const [organizationMembers, setOrganizationMembers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [channels, setChannels] = useState([
    {
      name: "general",
      description:
        "General is a messaging app for groups of people who work together. You can send updates, share files, and organize conversations so that everyone is in the loop.",
    },
    {
      name: "meeting",
      description:
        "Meeting channel for discussing various topics and holding meetings.",
    },
    {
      name: "random",
      description: "Random channel for off-topic discussions and fun.",
    },
  ]);

  //? Pop menu function
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: { color: "#fff" },
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Profile")}
          style={styles.userInfoContainer}
        >
          {user && user.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={styles.profileImage}
            />
          ) : (
            <Ionicons name="person-circle" size={50} color="#333" />
          )}

          <View style={styles.userInfo}>
            <Text style={styles.userName}>Name</Text>
            <Text style={styles.userEmail}>Email</Text>
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.iconTop}
            onPress={toggleMenu}
          >
            <AntDesign name="plus" size={30} color="black" />
          </TouchableOpacity>

          <MenuComponent
            isVisible={isMenuVisible}
            onClose={toggleMenu}
            navigation={navigation}
          />
        </View>
      ),
    });
  }, [navigation, isMenuVisible]);

  useEffect(() => {
    if (
      routeOrganizationName &&
      routeOrganizationName !== contextOrganizationName
    ) {
      setOrganizationName(routeOrganizationName);
    }
  }, [routeOrganizationName, contextOrganizationName, setOrganizationName]);

  useEffect(() => {
    const fetchMembers = async () => {
      if (organizationName) {
        try {
          const orgDoc = await getDoc(
            doc(db, "organizations", organizationName)
          );
          if (orgDoc.exists()) {
            const membersData = orgDoc.data().members || [];
            if (membersData.length > 0) {
              const userPromises = membersData.map((memberId) =>
                getDoc(doc(db, "users", memberId))
              );
              const users = await Promise.all(userPromises);
              const members = users.map((user) => ({
                uid: user.id,
                displayName: user.data().displayName,
                photoURL: user.data().photoURL,
              }));
              setOrganizationMembers(members);
            } else {
              setOrganizationMembers([]);
            }
          } else {
            setOrganizationMembers([]);
          }
        } catch (error) {
          console.error("Error fetching members:", error);
          setOrganizationMembers([]);
        }
      }
    };

    const fetchDirectMessages = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const directMessages = userDoc.data().directMessages || [];
            setSelectedMembers(directMessages);
          }
        } catch (error) {
          console.error("Error fetching direct messages:", error);
        }
      }
    };

    fetchMembers();
    fetchDirectMessages();
  }, [organizationName, user, setSelectedMembers]);

  const firstLetter = organizationName
    ? organizationName.charAt(0).toUpperCase()
    : "";

  const getActiveRoute = () =>
    navigation.getState().routes[navigation.getState().index].name;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0d6efd" />
      </View>
    );
  }

  const filteredChannels = channels.filter(
    (channel) =>
      !searchText ||
      (channel.name &&
        channel.name.toLowerCase().includes(searchText.toLowerCase()))
  );

  const startChat = async (member) => {
    // Save direct message member to Firestore
    try {
      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        directMessages: [...selectedMembers, member.uid],
      });
      setSelectedMembers([...selectedMembers, member.uid]);
    } catch (error) {
      console.error("Error saving direct message member:", error);
    }

    navigation.navigate("Chat", {
      recipientId: member.uid,
      recipientName: member.displayName,
      isDirectMessage: true,
    });
  };

  const openChannel = (channel) => {
    navigation.navigate("Chat", {
      channelName: channel.name,
      channelDescription: channel.description,
      isDirectMessage: false,
    });
  };

  const selectedOrganizationMembers = organizationMembers.filter((member) =>
    selectedMembers.includes(member.uid)
  );

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBar barStyle="light-content" />
          <View style={styles.container}>
            <View style={{ marginBottom: 40 }} />
            <View style={styles.headerContainer}>
              <View style={styles.header}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconText}>{firstLetter}</Text>
                </View>
                <Text style={styles.headerTitle}>{organizationName}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Profile")}
                >
                  {user && user.photoURL ? (
                    <Image
                      source={{ uri: user.photoURL }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <Ionicons name="person-circle" size={40} color="#FFF" />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#888" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Jump to or search..."
                  placeholderTextColor="#888"
                  value={searchText}
                  onChangeText={setSearchText}
                />
              </View>
            </View>

            <ScrollView style={styles.content}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Workspace</Text>
                {filteredChannels.map((channel, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.channelItem}
                    onPress={() => openChannel(channel)}
                  >
                    <Text style={styles.channelText}># {channel.name}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.addChannel}
                  onPress={() => navigation.navigate("ChannelBrowser")}
                >
                  <Text style={styles.addChannelText}>+ Add channel</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Direct messages</Text>
                {selectedOrganizationMembers.length > 0 ? (
                  selectedOrganizationMembers.map((member, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.channelItem}
                      onPress={() => startChat(member)}
                    >
                      {member.photoURL ? (
                        <Image
                          source={{ uri: member.photoURL }}
                          style={styles.profileImage}
                        />
                      ) : (
                        <Ionicons name="person-circle" size={40} color="#FFF" />
                      )}
                      <Text style={styles.channelText}>
                        {member.displayName}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.noMembersText}>
                    No members available for direct messages.
                  </Text>
                )}
              </View>

              <View style={styles.suggestion}>
                <Text style={styles.suggestionText}>Next, you could...</Text>
                <TouchableOpacity
                  style={styles.suggestionButton}
                  onPress={() => navigation.navigate("MembersScreen")}
                >
                  <Text style={styles.suggestionButtonText}>Add teammates</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>

      {/* <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("MainHome")}
        >
          <Ionicons
            name="home"
            size={28}
            color={getActiveRoute() === "MainHome" ? "#0d6efd" : "#FFF"}
          />
          <Text
            style={
              getActiveRoute() === "MainHome"
                ? styles.navTextActive
                : styles.navTextInactive
            }
          >
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigation.navigate("OfficeScreen", { organizationName })
          }
        >
          <MaterialCommunityIcons
            name="office-building"
            size={28}
            color={getActiveRoute() === "OfficeScreen" ? "#0d6efd" : "#FFF"}
          />
          <Text
            style={
              getActiveRoute() === "OfficeScreen"
                ? styles.navTextActive
                : styles.navTextInactive
            }
          >
            Office
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Activity")}
        >
          <Ionicons
            name="notifications"
            size={28}
            color={getActiveRoute() === "Activity" ? "#0d6efd" : "#FFF"}
          />
          <Text
            style={
              getActiveRoute() === "Activity"
                ? styles.navTextActive
                : styles.navTextInactive
            }
          >
            Activity
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* Navigation bar */}
      <Navbar
        navigation={navigation}
        // currentRoute={routeActive.name}
        currentRoute={route.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00072d",
  },

  //? Header Styling
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  userInfo: {
    alignItems: "center",
    marginLeft: 5,
  },
  userName: {
    fontSize: 15,
    color: "#555",
  },
  userEmail: {
    fontSize: 13,
    color: "#666",
  },
  iconTop: {
    marginRight: 12,
  },

  //?

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00072d",
  },
  headerContainer: {
    backgroundColor: "#1a1a2e",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: "#0d6efd",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2b2b40",
    borderRadius: 30,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: "#FFF",
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  channelItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#0d6efd",
  },
  channelText: {
    color: "#FFF",
    fontSize: 14,
    marginLeft: 10,
  },
  addChannel: {
    paddingVertical: 10,
  },
  addChannelText: {
    color: "#0d6efd",
    fontSize: 14,
    fontWeight: "bold",
  },
  noMembersText: {
    color: "#888",
    fontSize: 14,
    marginBottom: 10,
  },
  suggestion: {
    backgroundColor: "#1a1a2e",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  suggestionText: {
    color: "#888",
    fontSize: 14,
    marginBottom: 10,
  },
  suggestionButton: {
    backgroundColor: "#0d6efd",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  suggestionButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1a1a2e",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navTextActive: {
    color: "#0d6efd",
    fontSize: 12,
    marginTop: 2,
  },
  navTextInactive: {
    color: "#FFF",
    fontSize: 12,
    marginTop: 2,
  },
});

export default MainHomeScreen;

//??????????????????? CODE WORKING ON NOW ??????????????????????????????????????
// import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   ScrollView,
//   SafeAreaView,
//   StyleSheet,
// } from "react-native";
// import { UserContext } from "../context/UserContext";
// import { useAppContext } from "../context/AppContext";
// import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import { Ionicons, AntDesign, FontAwesome6 } from "@expo/vector-icons";
// import { useRoute } from "@react-navigation/native";
// import MenuComponent from "../components/MenuComponent";
// import { StatusBar } from "expo-status-bar";

// const MainHome = ({ navigation }) => {
//   // const { user } = useContext(UserContext);
//   // const { selectedMembers, setSelectedMembers } = useAppContext();
//   // const [directMessages, setDirectMessages] = useState([]);
//   // const [searchText, setSearchText] = useState("");
//   // const [isMenuVisible, setMenuVisible] = useState(false);

//   // const [user, setUser] = useState(null);
//   const { user } = useContext(UserContext);
//   const { selectedMembers, setSelectedMembers, organizationName } =
//     useAppContext();
//   const [directMessages, setDirectMessages] = useState([]);
//   // const [channels, setChannels] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [isMenuVisible, setMenuVisible] = useState(false);

//   const route = useRoute();
//   const [channels, setChannels] = useState([
//     {
//       name: "general",
//       description:
//         "General is a messaging app for groups of people who work together. You can send updates, share files, and organize conversations so that everyone is in the loop.",
//     },
//     {
//       name: "meeting",
//       description:
//         "Meeting channel for discussing various topics and holding meetings.",
//     },
//     {
//       name: "random",
//       description: "Random channel for off-topic discussions and fun.",
//     },
//   ]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerTitleStyle: { color: "#fff" },
//       headerLeft: () => (
//         <TouchableOpacity
//           activeOpacity={0.5}
//           onPress={() => navigation.navigate("Profile")}
//           style={styles.userInfoContainer}
//         >
//           <View style={styles.imgTop}>
//             <Image
//               source={
//                 user?.photoURL
//                   ? { uri: user.photoURL }
//                   : require("../assets/avart.png")
//               }
//               style={styles.avatar}
//             />
//           </View>

//           <View style={styles.userInfo}>
//             <Text style={styles.userName}>
//               {user?.displayName || "User Name"}
//             </Text>
//           </View>
//         </TouchableOpacity>
//       ),
//       headerRight: () => (
//         <View>
//           <TouchableOpacity
//             activeOpacity={0.5}
//             style={styles.iconTop}
//             onPress={toggleMenu}
//           >
//             <AntDesign name="plus" size={30} color="black" />
//           </TouchableOpacity>

//           <MenuComponent
//             isVisible={isMenuVisible}
//             onClose={toggleMenu}
//             navigation={navigation}
//           />
//         </View>
//       ),
//     });
//   }, [navigation, isMenuVisible]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const auth = getAuth();
//       const currentUser = auth.currentUser;

//       if (currentUser) {
//         try {
//           const userDoc = await getDoc(doc(db, "users", currentUser.uid));
//           if (userDoc.exists()) {
//             const userData = userDoc.data();
//             setUser({
//               email: currentUser.email,
//               displayName: userData.displayName || currentUser.displayName,
//               photoURL: userData.photoURL || currentUser.photoURL,
//             });
//           } else {
//             setUser({
//               email: currentUser.email,
//               displayName: currentUser.displayName,
//               photoURL: currentUser.photoURL,
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         console.error("No user is signed in.");
//       }
//     };

//     fetchUser();
//   }, []);

//   // useEffect(() => {
//   //   const fetchDirectMessages = async () => {
//   //     try {
//   //       const dmsSnapshot = await getDocs(
//   //         collection(db, "users", user.uid, "directMessages")
//   //       );
//   //       const fetchedDMs = dmsSnapshot.docs.map((doc) => ({
//   //         id: doc.id,
//   //         ...doc.data(),
//   //       }));
//   //       setDirectMessages(fetchedDMs);
//   //     } catch (error) {
//   //       console.error("Error fetching direct messages:", error);
//   //     }
//   //   };

//   //   fetchDirectMessages();
//   // }, [user]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch direct messages
//         const dmsSnapshot = await getDocs(
//           collection(db, "users", user.uid, "directMessages")
//         );
//         const fetchedDMs = dmsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setDirectMessages(fetchedDMs);

//         // Fetch channels
//         const channelsSnapshot = await getDocs(
//           collection(db, "organizations", organizationName, "channels")
//         );
//         const fetchedChannels = channelsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setChannels(fetchedChannels);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [user, organizationName]);

//   const toggleMenu = () => {
//     setMenuVisible(!isMenuVisible);
//   };

//   const startChat = async (member) => {
//     try {
//       const userDoc = doc(db, "users", user.uid);
//       await updateDoc(userDoc, {
//         directMessages: [...selectedMembers, member.uid],
//       });
//       setSelectedMembers([...selectedMembers, member.uid]);
//       navigation.navigate("Chat", {
//         recipientId: member.uid,
//         recipientName: member.displayName,
//         isDirectMessage: true,
//       });
//     } catch (error) {
//       console.error("Error saving direct message member:", error);
//     }
//   };

//   const filteredDirectMessages = directMessages.filter((dm) =>
//     dm.recipientName.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const openChannel = (channel) => {
//     navigation.navigate("Chat", {
//       channelName: channel.name,
//       channelDescription: channel.description,
//       isDirectMessage: false,
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar />
//       <View style={styles.innerContainer}>
//         {/* <View style={styles.searchContainer}>
//           <View style={styles.icon}>
//             <AntDesign name="search1" size={20} color="gray" />
//           </View>
//           <TextInput
//             placeholder="Search..."
//             placeholderTextColor={"gray"}
//             value={searchText}
//             onChangeText={setSearchText}
//             style={styles.search}
//           />
//         </View> */}

//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.searchContainer}
//           onPress={() => navigation.navigate("Search")}
//         >
//           <View style={styles.search}>
//             <View>
//               <AntDesign name="search1" size={20} color="gray" />
//             </View>
//             <Text style={styles.searchText}>Search...</Text>
//           </View>
//         </TouchableOpacity>

//         <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
//           <View style={styles.channelContainer}>
//             {/* Channel */}
//             <View style={styles.containerChannel}>
//               <Text
//                 style={styles.actions}
//                 onPress={() => navigation.navigate("CalendarScreen")}
//               >
//                 Calendar
//               </Text>
//               <Text
//                 style={styles.actions}
//                 onPress={() => navigation.navigate("ToDo")}
//               >
//                 To-do
//               </Text>
//               <Text
//                 style={styles.actionsLast}
//                 onPress={() => navigation.navigate("Docs")}
//               >
//                 Docs
//               </Text>
//               <FlatList
//                 data={channels}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     onPress={() => openChannel(item)}
//                     style={styles.channelItem}
//                   >
//                     <Text style={styles.channelName}>{item.name}</Text>
//                   </TouchableOpacity>
//                 )}
//                 horizontal
//                 contentContainerStyle={styles.flatListContent}
//               />
//             </View>
//           </View>
//         </ScrollView>

//         {/* Other navigation screen */}
//         <ScrollView horizontal contentContainerStyle={styles.othersContent}>
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => navigation.navigate()}
//           >
//             <Text style={styles.addButtonText}>Walker 3.0</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => navigation.navigate()}
//           >
//             <Text style={styles.addButtonText}>Arkutu</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => navigation.navigate()}
//           >
//             <Text style={styles.addButtonText}>Kelvin</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => navigation.navigate()}
//           >
//             <Text style={styles.addButtonText}>@PM</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => navigation.navigate()}
//           >
//             <Text style={styles.addButtonText}>OfficComms</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => navigation.navigate()}
//           >
//             <Text style={styles.addButtonText}>UiUX</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => navigation.navigate()}
//           >
//             <Text style={styles.addButtonText}>Rest</Text>
//           </TouchableOpacity>
//         </ScrollView>

//         {/* AI */}
//         <View>
//           <TouchableOpacity
//             activeOpacity={0.5}
//             style={styles.imgContainer}
//             onPress={() => navigation.navigate()}
//           >
//             <Image
//               source={require("../assets/ocicon.png")}
//               style={styles.img}
//             />

//             <View style={styles.aitext}>
//               <Text style={styles.ai}>OfficeComms Assisstant AI</Text>
//               <Text style={styles.AI}>The Experience</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Main Content */}
//         <View style={styles.directMessages}>
//           <ScrollView contentContainerStyle={styles.mainContent}>
//             <Text style={styles.sectionTitle}>Direct Messages</Text>
//             <FlatList
//               data={directMessages}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => startChat(item)}
//                   style={styles.dmItem}
//                 >
//                   <Text style={styles.dmName}>{item.recipientName}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//           </ScrollView>
//         </View>

//         {/* AOfficeCommsd channel button */}
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.floatingButton}
//           onPress={() => navigation.navigate("ChannelBrowser")}
//         >
//           <FontAwesome6 name="add" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   innerContainer: {
//     backgroundColor: "#fff",
//   },

//   //? Header Styling
//   userInfoContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: 10,
//   },
//   imgTop: {
//     marginLeft: 10,
//   },
//   avatar: {
//     width: 45,
//     height: 45,
//     borderRadius: 18,
//   },
//   userInfo: {
//     marginLeft: 10,
//   },
//   userName: {
//     // marginTop: 15,
//     fontSize: 16,
//     color: "#555",
//     textAlign: "center",
//   },
//   iconTop: {
//     marginRight: 12,
//   },

//   //? Search
//   // searchContainer: {
//   //   width: "100%",
//   //   flexDirection: "row",
//   //   alignItems: "center",
//   //   marginTop: 10,
//   //   marginBottom: 30,
//   // },
//   // search: {
//   //   position: "absolute",
//   //   width: "94%",
//   //   borderWidth: 1,
//   //   borderColor: "#f0f0f0",
//   //   borderRadius: 5,
//   //   backgroundColor: "#f0f0f0",
//   //   padding: 4,
//   //   fontSize: 16,
//   //   paddingHorizontal: 40,
//   //   color: "#333",
//   //   marginLeft: 10,
//   //   zIndex: 0,
//   // },
//   // icon: {
//   //   marginLeft: 20,
//   //   zIndex: 1,
//   // },

//   searchContainer: {
//     backgroundColor: "white",
//     marginTop: 8,
//     marginBottom: 15,
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   search: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 8,
//     borderWidth: 1,
//     borderColor: "#f0f0f0",
//     borderRadius: 5,
//     backgroundColor: "#f0f0f0",
//   },
//   searchText: {
//     marginLeft: 5,
//     color: "gray",
//     fontSize: 16,
//     fontWeight: "400",
//   },

//   //? channel Container
//   scrollViewContent: {
//     paddingHorizontal: 5,
//   },
//   channelContainer: {
//     width: "100%",
//     marginTop: 10,
//     height: 40,
//     paddingHorizontal: 5,
//     alignItems: "center",
//   },
//   containerChannel: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: 5,
//     alignItems: "center",
//   },
//   actions: {
//     marginHorizontal: 10,
//     fontSize: 16,
//     color: "#555",
//   },
//   actionsLast: {
//     marginHorizontal: 10,
//     fontSize: 16,
//     color: "#555",
//   },
//   channelItem: {
//     marginHorizontal: 10,
//   },
//   flatListContent: {
//     paddingLeft: 5,
//     paddingRight: 5,
//   },
//   channelName: {
//     fontSize: 16,
//     color: "#555",
//   },

//   //? Add cahnnel and the rest
//   othersContent: {
//     // paddingHorizontal: 5,
//     padding: 6,
//     marginBottom: 5,
//   },
//   addButton: {
//     paddingHorizontal: 5,
//     backgroundColor: "#f0f0f0",
//     borderWidth: 1,
//     borderColor: "#f0f0f0",
//     borderRadius: 50,
//     marginLeft: 10,
//   },
//   addButtonText: {
//     padding: 10,
//     color: "#555",
//   },

//   //? AI
//   imgContainer: {
//     borderTopWidth: 1,
//     // borderBottomWidth: 1,
//     borderColor: "#ddd",
//     padding: 10,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   img: {
//     width: 70,
//     height: 70,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     color: "#ddd",
//   },
//   aitext: {
//     marginLeft: 10,
//   },
//   ai: {
//     fontSize: 16,
//     color: "#444",
//   },
//   AI: {
//     fontSize: 14,
//     color: "#555",
//   },

//   //? Direct Messages
//   directMessages: {
//     height: "57.5%",
//     // backgroundColor: "red",
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     paddingHorizontal: 10,
//     marginBottom: 8,
//   },
//   dmItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   dmName: {
//     fontSize: 16,
//   },

//   //? Floating Button Styling
//   floatingButton: {
//     position: "absolute",
//     top: 580,
//     right: 20,
//     backgroundColor: "#2b68e6",
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
// });

// export default MainHome;
