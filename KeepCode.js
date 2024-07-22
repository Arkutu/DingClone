// import React, { useState, useEffect, useContext } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import { useAppContext } from "../context/AppContext";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import { useRoute } from "@react-navigation/native";
// import Navbar from "../components/Navbar";

// const Work = ({ navigation }) => {
//   const [channels, setChannels] = useState([]);
//   const [organizationMembers, setOrganizationMembers] = useState([]);
//   const { organizationName, setOrganizationName } = useAppContext();
//   const route = useRoute();

//   // Fetch channels and organization members
//   useEffect(() => {
//     const fetchChannelsAndMembers = async () => {
//       try {
//         // Fetch channels
//         const channelsSnapshot = await getDocs(
//           collection(db, "organizations", organizationName, "channels")
//         );
//         const fetchedChannels = channelsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setChannels(fetchedChannels);

//         // Fetch organization members (simplified for this example)
//         const membersSnapshot = await getDocs(
//           collection(db, "organizations", organizationName, "members")
//         );
//         const fetchedMembers = membersSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setOrganizationMembers(fetchedMembers);
//       } catch (error) {
//         console.error("Error fetching channels and members:", error);
//       }
//     };

//     fetchChannelsAndMembers();
//   }, [organizationName]);

//   const openChannel = (channel) => {
//     navigation.navigate("Chat", {
//       channelName: channel.name,
//       channelDescription: channel.description,
//       isDirectMessage: false,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.organizationName}>{organizationName}</Text>

//       <Text style={styles.sectionTitle}>Channels</Text>
//       <FlatList
//         data={channels}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => openChannel(item)}
//             style={styles.channelItem}
//           >
//             <Text style={styles.channelName}>#{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />

//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate("ChannelBrowser")}
//       >
//         <Text style={styles.addButtonText}>Add Channel</Text>
//       </TouchableOpacity>

//       <Text style={styles.sectionTitle}>Organization Members</Text>
//       <FlatList
//         data={organizationMembers}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.memberItem}>
//             <Text style={styles.memberName}>{item.name}</Text>
//           </View>
//         )}
//       />

//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate("MembersScreen")}
//       >
//         <Text style={styles.addButtonText}>Add Teammates</Text>
//       </TouchableOpacity>

//       {/* Navigation bar */}
//       <Navbar
//         navigation={navigation}
//         // currentRoute={routeActive.name}
//         currentRoute={route.name}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#f0f0f0",
//   },
//   organizationName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   channelItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   channelName: {
//     fontSize: 16,
//   },
//   memberItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   memberName: {
//     fontSize: 16,
//   },
//   addButton: {
//     backgroundColor: "#007bff",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 16,
//   },
//   addButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default Work;

//??????????????????????????????
// import React, { useState, useRef } from "react";
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   Modal,
//   Animated,
//   Dimensions,
//   Platform,
// } from "react-native";
// import {
//   Ionicons,
//   AntDesign,
//   Feather,
//   SimpleLineIcons,
//   MaterialCommunityIcons,
//   MaterialIcons,
//   Entypo,
// } from "@expo/vector-icons";

// const screenHeight = Dimensions.get("window").height;

// const MenuButton = ({ title, icon: Icon, iconName, onPress }) => (
//   <TouchableOpacity style={styles.menuButton} onPress={onPress}>
//     <Icon name={iconName} size={24} color="black" />
//     <Text style={styles.menuButtonText}>{title}</Text>
//   </TouchableOpacity>
// );

// const DropdownMenu = ({ navigation }) => {
//   const [visible, setVisible] = useState(false);
//   const slideAnim = useRef(new Animated.Value(-screenHeight / 2 + 50)).current;

//   const toggleMenu = () => {
//     if (visible) {
//       // Slide up to hide
//       Animated.timing(slideAnim, {
//         toValue: -screenHeight / 2 + 50,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => setVisible(false));
//     } else {
//       setVisible(true);
//       // Slide down to show
//       Animated.timing(slideAnim, {
//         toValue: 50,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   };

//   // Close the menu when navigating to a new screen
//   React.useEffect(() => {
//     const unsubscribe = navigation.addListener("focus", () => {
//       if (visible) {
//         toggleMenu();
//       }
//     });

//     return unsubscribe;
//   }, [navigation, visible]);

//   const handleOptionSelect = (option) => {
//     console.log("Selected option:", option);
//     toggleMenu();
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
//         <Ionicons name="md-menu" size={24} color="black" />
//       </TouchableOpacity>

//       {visible && (
//         <Modal
//           transparent={true}
//           animationType="none"
//           visible={visible}
//           onRequestClose={toggleMenu}
//         >
//           <TouchableOpacity style={styles.overlay} onPress={toggleMenu}>
//             <Animated.View
//               style={[
//                 styles.dropdown,
//                 { transform: [{ translateY: slideAnim }] },
//               ]}
//             >
//               <Text style={styles.dropdownTitle}>Menu</Text>

//               <View style={styles.row}>
//                 <MenuButton
//                   title="New Chat"
//                   icon={Ionicons}
//                   iconName="chatbox-outline"
//                   onPress={() => {
//                     navigation.navigate("NewChatsScreen");
//                     toggleMenu();
//                   }}
//                 />
//                 {/* <MenuButton
//                   title="Add Contact"
//                   icon={AntDesign}
//                   iconName="contacts"
//                 /> */}
//                 <MenuButton
//                   title="Clock In/Out"
//                   icon={Feather}
//                   iconName="clock"
//                   onPress={() => {
//                     navigation.navigate("ClockInOutScreen");
//                     toggleMenu();
//                   }}
//                 />
//                 <MenuButton
//                   title="Scan QR Code"
//                   icon={AntDesign}
//                   iconName="qrcode"
//                   onPress={() => {
//                     navigation.navigate("ScanQRCodeScreen");
//                     toggleMenu();
//                   }}
//                 />
//               </View>
//               <View style={styles.row}>
//                 <MenuButton
//                   title="Create/Join organization"
//                   icon={SimpleLineIcons}
//                   iconName="organization"
//                   onPress={() => {
//                     navigation.navigate("CreateOrganization");
//                     toggleMenu();
//                   }}
//                 />
//                 <MenuButton
//                   title="Join"
//                   icon={MaterialCommunityIcons}
//                   iconName="vector-combine"
//                   onPress={() => {
//                     navigation.navigate("JoinScreen");
//                     toggleMenu();
//                   }}
//                 />
//                 <MenuButton
//                   title="Watermark"
//                   icon={MaterialCommunityIcons}
//                   iconName="watermark"
//                   onPress={() => {
//                     navigation.navigate("WatermarkScreen");
//                     toggleMenu();
//                   }}
//                 />
//               </View>
//               <View style={styles.row}>
//                 <MenuButton
//                   title="Start Meeting"
//                   icon={MaterialIcons}
//                   iconName="meeting-room"
//                   onPress={() => {
//                     navigation.navigate("VideoCall");
//                     toggleMenu();
//                   }}
//                 />
//                 <MenuButton
//                   title="Start Live"
//                   icon={MaterialIcons}
//                   iconName="live-tv"
//                   onPress={() => {
//                     navigation.navigate("StartLiveScreen");
//                     toggleMenu();
//                   }}
//                 />
//                 <MenuButton
//                   title="Projects"
//                   icon={MaterialIcons}
//                   iconName="event"
//                   onPress={() => {
//                     navigation.navigate("ProjectListScreen");
//                     toggleMenu();
//                   }}
//                 />
//                 <MenuButton
//                   title="Create Project"
//                   icon={Entypo}
//                   iconName="add-to-list"
//                   onPress={() => {
//                     navigation.navigate("ProjectScreen");
//                     toggleMenu();
//                   }}
//                 />
//               </View>
//             </Animated.View>
//           </TouchableOpacity>
//         </Modal>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   menuButton: {
//     padding: 10,
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: "flex-start",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   dropdown: {
//     position: "absolute",
//     top: 50, // Adjust this value to move the dropdown up or down
//     width: "100%",
//     height: screenHeight / 2,
//     backgroundColor: "white",
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   dropdownTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginVertical: 10,
//   },
//   menuButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//   },
//   menuButtonText: {
//     marginLeft: 10,
//     fontSize: 16,
//   },
// });

// export default DropdownMenu;

//? Slider code
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   StyleSheet,
// } from "react-native";

// const screenWidth = Dimensions.get("window").width;

// const SliderExample = () => {
//   const [activeSection, setActiveSection] = useState(0);
//   const scrollViewRef = React.createRef();

//   const handleSectionChange = (index) => {
//     scrollViewRef.current.scrollTo({ x: index * screenWidth, animated: true });
//     setActiveSection(index);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Navigation Bar */}
//       <View style={styles.navBar}>
//         <TouchableOpacity
//           onPress={() => handleSectionChange(0)}
//           style={styles.navItem}
//         >
//           <Text
//             style={activeSection === 0 ? styles.activeNavText : styles.navText}
//           >
//             Section 1
//           </Text>
//           {activeSection === 0 && <View style={styles.activeBorder} />}
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => handleSectionChange(1)}
//           style={styles.navItem}
//         >
//           <Text
//             style={activeSection === 1 ? styles.activeNavText : styles.navText}
//           >
//             Section 2
//           </Text>
//           {activeSection === 1 && <View style={styles.activeBorder} />}
//         </TouchableOpacity>
//       </View>

//       {/* Scrollable Sections */}
//       <ScrollView
//         ref={scrollViewRef}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={(event) => {
//           const contentOffsetX = event.nativeEvent.contentOffset.x;
//           const sectionIndex = Math.floor(contentOffsetX / screenWidth);
//           setActiveSection(sectionIndex);
//         }}
//         scrollEventThrottle={16}
//       >
//         <View style={styles.section}>
//           <Text style={styles.sectionText}>Content for Section 1</Text>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.sectionText}>Content for Section 2</Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   navBar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   navItem: {
//     alignItems: "center",
//   },
//   navText: {
//     fontSize: 16,
//     color: "#555",
//   },
//   activeNavText: {
//     fontSize: 16,
//     color: "#007bff",
//     fontWeight: "bold",
//   },
//   activeBorder: {
//     marginTop: 5,
//     height: 2,
//     width: "100%",
//     backgroundColor: "#007bff",
//   },
//   section: {
//     width: screenWidth,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   sectionText: {
//     fontSize: 18,
//     color: "#333",
//   },
// });

// export default SliderExample;

//???????????????????????????????????????????????????????????????????????
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              email: currentUser.email,
              displayName: userData.displayName || currentUser.displayName,
              photoURL: userData.photoURL || currentUser.photoURL,
            });
          } else {
            setUser({
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("No user is signed in.");
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }} />
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: user.photoURL || "https://via.placeholder.com/150" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.displayName || "User Name"}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>{user.email}</Text>
      </View>
      <View style={{ marginBottom: 380 }} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101223",
    padding: 16,
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },
  infoContainer: {
    width: "100%",
    backgroundColor: "#1a1a2e",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
  infoLabel: {
    fontSize: 18,
    color: "#888",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 18,
    color: "#FFF",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "#0d6efd",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
});

export default Profile;
