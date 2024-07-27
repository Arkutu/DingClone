// //??????????????????? CODE WORKING ON NOW ??????????????????????????????????????
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
//   Platform,
//   Dimensions,
// } from "react-native";
// import { UserContext } from "../context/UserContext";
// import { useAppContext } from "../context/AppContext";
// import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
// import { useRoute } from "@react-navigation/native";
// import MenuComponent from "../components/MenuComponent";
// import BrowseChannel from "../components/BrowseChannel";
// import { StatusBar } from "expo-status-bar";

// const screenWidth = Dimensions.get("window").width;

// const MainHome = ({ navigation }) => {
//   const { user } = useContext(UserContext);
//   const { selectedMembers, setSelectedMembers, organizationName } =
//     useAppContext();
//   const [directMessages, setDirectMessages] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [isMenuVisible, setMenuVisible] = useState(false);
//   //? Scrolling slider
//   const [activeSection, setActiveSection] = useState(0);
//   const scrollViewRef = React.createRef();
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

//   useEffect(() => {
//     const fetchDirectMessages = async () => {
//       try {
//         const dmsSnapshot = await getDocs(
//           collection(db, "users", user.uid, "directMessages")
//         );
//         const fetchedDMs = dmsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setDirectMessages(fetchedDMs);
//       } catch (error) {
//         console.error("Error fetching direct messages:", error);
//       }
//     };

//     fetchDirectMessages();
//   }, [user]);

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

//   //? Scrolling function
//   const handleSectionChange = (index) => {
//     scrollViewRef.current.scrollTo({ x: index * screenWidth, animated: true });
//     setActiveSection(index);
//   };

//   return (
//     <SafeAreaView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <StatusBar />
//       <View style={styles.innerContainer}>
//         {/* <View style={styles.searchContainer}>
//         <View style={styles.icon}>
//           <AntDesign name="search1" size={20} color="gray" />
//         </View>
//         <TextInput
//           placeholder="Search..."
//           placeholderTextColor={"gray"}
//           value={searchText}
//           onChangeText={setSearchText}
//           style={styles.search}
//         />
//       </View> */}

//         {/* SEARCH BAR */}
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

//         <View>
//           {/* HEADER BUTTONS */}
//           <ScrollView
//             horizontal
//             contentContainerStyle={styles.scrollViewContent}
//             showsHorizontalScrollIndicator={false}
//           >
//             <View style={styles.actionContainer}>
//               {/* Channel */}
//               <View style={styles.actionInner}>
//                 <Text
//                   style={styles.actions}
//                   onPress={() => navigation.navigate("CalendarScreen")}
//                 >
//                   Calendar
//                 </Text>
//                 <Text
//                   style={styles.actions}
//                   onPress={() => navigation.navigate("ToDo")}
//                 >
//                   To-do
//                 </Text>
//                 <Text
//                   style={styles.actions}
//                   onPress={() => navigation.navigate("Docs")}
//                 >
//                   Docs
//                 </Text>
//                 <Text
//                   style={styles.actionsLast}
//                   onPress={() => navigation.navigate("ExistingOrganizations")}
//                 >
//                   Organizations
//                 </Text>
//               </View>
//             </View>
//           </ScrollView>

//           {/* SCROLLABLE BUTTON WINDOW */}
//           <ScrollView showsHorizontalScrollIndicator={false} horizontal>
//             <View style={styles.navBar}>
//               <TouchableOpacity
//                 onPress={() => handleSectionChange(0)}
//                 style={[
//                   styles.navItem,
//                   activeSection === 0
//                     ? styles.activeNavItem
//                     : styles.inactiveNavItem,
//                 ]}
//               >
//                 <Text
//                   style={
//                     activeSection === 0
//                       ? styles.activeNavText
//                       : styles.inactiveNavText
//                   }
//                 >
//                   All
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => handleSectionChange(1)}
//                 style={[
//                   styles.navItem,
//                   activeSection === 1
//                     ? styles.activeNavItem
//                     : styles.inactiveNavItem,
//                 ]}
//               >
//                 <Text
//                   style={
//                     activeSection === 1
//                       ? styles.activeNavText
//                       : styles.inactiveNavText
//                   }
//                 >
//                   Messages
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => handleSectionChange(2)}
//                 style={[
//                   styles.navItem,
//                   activeSection === 2
//                     ? styles.activeNavItem
//                     : styles.inactiveNavItem,
//                 ]}
//               >
//                 <Text
//                   style={
//                     activeSection === 2
//                       ? styles.activeNavText
//                       : styles.inactiveNavText
//                   }
//                 >
//                   Channels
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => handleSectionChange(3)}
//                 style={[
//                   styles.navItem,
//                   activeSection === 3
//                     ? styles.activeNavItem
//                     : styles.inactiveNavItem,
//                 ]}
//               >
//                 <Text
//                   style={
//                     activeSection === 3
//                       ? styles.activeNavText
//                       : styles.inactiveNavText
//                   }
//                 >
//                   Chats
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={() => handleSectionChange(4)}
//                 style={[
//                   styles.navItem,
//                   activeSection === 4
//                     ? styles.activeNavItem
//                     : styles.inactiveNavItem,
//                 ]}
//               >
//                 <Text
//                   style={
//                     activeSection === 4
//                       ? styles.activeNavText
//                       : styles.inactiveNavText
//                   }
//                 >
//                   Users
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>

//           {/* Main Screen */}
//           <ScrollView
//             ref={scrollViewRef}
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onScroll={(event) => {
//               const contentOffsetX = event.nativeEvent.contentOffset.x;
//               const sectionIndex = Math.floor(contentOffsetX / screenWidth);
//               setActiveSection(sectionIndex);
//             }}
//             scrollEventThrottle={16}
//           >
//             {/* All */}
//             <View style={styles.section}>
//               {/* AI */}
//               <View>
//                 <TouchableOpacity
//                   activeOpacity={0.5}
//                   style={styles.imgContainer}
//                   onPress={() => navigation.navigate()}
//                 >
//                   <Image
//                     source={require("../assets/ocicon.png")}
//                     style={styles.img}
//                   />

//                   <View style={styles.aitext}>
//                     <Text style={styles.ai}>OfficeComms Assisstant AI</Text>
//                     <Text style={styles.AI}>The Experience</Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>

//               {/* General, meetings, Random */}
//               <View style={styles.channelContainer}>
//                 <FlatList
//                   data={channels}
//                   keyExtractor={(item) => item.id}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity
//                       onPress={() => openChannel(item)}
//                       style={styles.channelItem}
//                       activeOpacity={0.3}
//                     >
//                       <Text style={styles.channelName}># {item.name}</Text>
//                     </TouchableOpacity>
//                   )}
//                   // horizontal
//                   contentContainerStyle={styles.flatListContent}
//                 />
//               </View>

//               {/* AOfficeCommsd channel button */}
//               <TouchableOpacity
//                 activeOpacity={0.5}
//                 style={styles.floatingButton}
//                 onPress={() => navigation.navigate("NewChatsScreen")}
//               >
//                 <FontAwesome6 name="add" size={24} color="#fff" />
//               </TouchableOpacity>

//               <View style={{ marginTop: 1000 }} />
//             </View>

//             {/* Messages */}
//             <View style={styles.section}>
//               <View style={styles.directMessages}>
//                 <ScrollView contentContainerStyle={styles.mainContent}>
//                   <Text style={styles.sectionTitle}>Direct Messages</Text>
//                   <FlatList
//                     data={directMessages}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => (
//                       <TouchableOpacity
//                         onPress={() => startChat(item)}
//                         style={styles.dmItem}
//                       >
//                         <Text style={styles.dmName}>{item.recipientName}</Text>
//                       </TouchableOpacity>
//                     )}
//                   />
//                 </ScrollView>
//               </View>
//             </View>

//             {/* Channels */}
//             <View style={styles.section}>
//               {/* <ScrollView> */}
//               <BrowseChannel navigation={navigation} />
//               {/* </ScrollView> */}
//             </View>

//             {/* Chat */}
//             <View style={styles.section}>
//               <Text>Chat</Text>
//             </View>

//             {/* System Users */}
//             <View style={styles.section}>
//               <Text>System Users</Text>
//             </View>

//             {/* Add screens here */}
//           </ScrollView>
//         </View>
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
//     // flex: 1,
//     backgroundColor: "#fff",
//     // height: "100%",
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
//   actionContainer: {
//     width: "100%",
//     marginTop: 6,
//     height: 35,
//     paddingHorizontal: 5,
//     alignItems: "center",
//   },
//   actionInner: {
//     flexDirection: "row",
//     alignItems: "center",
//     // marginLeft: 5,
//   },
//   actions: {
//     marginHorizontal: 10,
//     fontSize: 18,
//     color: "#555",
//   },
//   actionsLast: {
//     marginHorizontal: 10,
//     fontSize: 18,
//     color: "#555",
//   },
//   channelContainer: {
//     marginTop: 10,
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   channelItem: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     marginBottom: 10,
//     padding: 6,
//     alignItems: "center",
//   },
//   flatListContent: {
//     // paddingLeft: 5,
//     // paddingRight: 5,
//     // borderWidth: 1,
//   },
//   channelName: {
//     fontSize: 18,
//     color: "#555",
//     marginVertical: 10,
//   },

//   //? Scrolling stying
//   navBar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 6,
//     // marginTop: 10,
//     // marginBottom: 10,
//   },
//   navItem: {
//     alignItems: "center",
//     paddingVertical: 7,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//     marginLeft: 10,
//     marginRight: 5,
//     marginTop: 10,
//   },
//   inactiveNavItem: {
//     borderColor: "#ddd",
//     borderWidth: 1,
//     backgroundColor: "#fff",
//   },
//   activeNavItem: {
//     borderColor: "#007bff",
//     borderWidth: 1,
//     backgroundColor: "#007bff",
//   },
//   inactiveNavText: {
//     fontSize: 16,
//     color: "#555",
//   },
//   activeNavText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   section: {
//     width: screenWidth,
//     // height: 600,
//     // marginTop: 10,
//   },
//   sectionText: {
//     fontSize: 18,
//     color: "#333",
//   },

//   //? Add cahnnel and the rest
//   othersContent: {
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
//     top: 430,
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

//???????????????????????????????????????
import React, { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { isSpeakingAsync, speak, stop } from "expo-speech";
import ChatBubble from "../components/ChatBubble";
import { Entypo, Ionicons } from "@expo/vector-icons";

export default function Aichat() {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = "AIzaSyAKO5xm26DgKh0N_r74_12T4qhjB0VVDX8";

  const handleUserInput = async ({ navigation }) => {
    //     useLayoutEffect(() => {
    //       navigation.setOptions({
    //         title: "AI",
    //       });
    //     }, [navigation]);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitleStyle: { color: "#ccc" },
        headerStyle: {
          backgroundColor: "#ccc",
        },
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
              <Text style={styles.textTop}>Organization</Text>
            </View>
          );
        },
      });
    }, [navigation]);

    //Add user input
    let updatedChat = [
      ...chat,
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];

    setLoading(true);

    try {
      const response = await axios.post(
        ` https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updatedChat,
        }
      );
      console.log("Gemini Pro API Response:", response.data);

      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      if (modelResponse) {
        //Add model response
        const updatedChatWithModel = [
          ...updatedChat,
          {
            role: "model",
            parts: [{ text: modelResponse }],
          },
        ];
        setChat(updatedChatWithModel);
        setUserInput("");
      }
    } catch (error) {
      console.error("Error calling Gemini Pro API:", error);
      console.error("Error response:", error.response);
      setError("An error ocurred. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async (text) => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      if (!(await isSpeakingAsync())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
  };

  const renderChatItem = ({ item }) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handleSpeech(item.parts[0].text)}
    />
  );

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          style={styles.InnerContainer}
          source={require("../assets/ocicon.png")}
          resizeMode="contain"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboard}
          >
            <View style={styles.messageRap}>
              <View>
                <View>
                  <View>
                    <Entypo name="chevron-left" size={38} color="black" />
                  </View>
                  <Text>My AI</Text>
                </View>
              </View>
              <FlatList
                data={chat}
                renderItem={renderChatItem}
                keyExtractor={(itemm, index) => index.toString()}
                contentContainerStyle={styles.chatContainer}
              />
              {loading && (
                <ActivityIndicator style={styles.loading} color="#333" />
              )}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Chat"
                  placeholderTextColor="#aaa"
                  value={userInput}
                  onChangeText={setUserInput}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleUserInput}
                >
                  <Ionicons name="send" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "transparent",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    marginTop: 40,
    // textAlign: "center",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: "50",
    // marginRight: 10,
    // padding: 10,
    borderRadius: 25,
    color: "#333",
  },
  button: {
    padding: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  loading: {
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  cardImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    // alignItems: "center",
    filter: "grayscale(50%)",
    // filter: "drop-shadow(8px 8px 10px gray)",
    // opacity: 0.5,
  },
});
