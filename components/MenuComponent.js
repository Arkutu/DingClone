// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import {
//   Ionicons,
//   AntDesign,
//   MaterialCommunityIcons,
//   Feather,
// } from "@expo/vector-icons";

// const MenuComponent = ({ isVisible, onClose, navigation }) => {
//   if (!isVisible) return null;

//   return (
//     <View style={styles.popupContainer}>
//       <View>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.topContainer}
//           onPress={() => navigation.navigate()}
//         >
//           <View style={styles.icon}>
//             <Ionicons name="chatbox-outline" size={24} color="#555" />
//           </View>
//           <Text style={styles.text}>New Chat</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.upContainer}
//           onPress={() => navigation.navigate()}
//         >
//           <View style={styles.icon}>
//             <AntDesign name="addusergroup" size={24} color="#555" />
//           </View>
//           <Text style={styles.text}>Create/Join organization</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.upContainer}
//           onPress={() => navigation.navigate()}
//         >
//           <View style={styles.icon}>
//             <MaterialCommunityIcons
//               name="account-switch-outline"
//               size={24}
//               color="#555"
//             />
//           </View>
//           <Text style={styles.text}>Switch account</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.upContainer}
//           onPress={() => navigation.navigate()}
//         >
//           <View style={styles.icon}>
//             <AntDesign name="profile" size={24} color="#555" />
//           </View>
//           <Text style={styles.text}>Profile</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.upContainer}
//           onPress={() => navigation.navigate()}
//         >
//           <View style={styles.icon}>
//             <Feather name="settings" size={24} color="#555" />
//           </View>
//           <Text style={styles.text}>Settings & Pravicy</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.upClose}
//           onPress={onClose}
//         >
//           <View style={styles.icon}>
//             <AntDesign name="close" size={24} color="#555" />
//           </View>
//           <Text style={styles.text}>Close</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   popupContainer: {
//     width: 240,
//     height: 325,
//     position: "absolute",
//     top: 38,
//     right: 10,
//     backgroundColor: "white",
//     padding: 15,
//     borderRadius: 5,
//     elevation: 3,
//   },
//   upContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//     paddingVertical: 14,
//   },
//   topContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderColor: "#ddd",
//     paddingVertical: 8,
//   },
//   upClose: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 14,
//   },
//   text: {
//     color: "#555",
//   },
//   icon: {
//     marginRight: 10,
//   },
// });

// export default MenuComponent;

//?????????????????????????????????????????????????????????
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

const MenuComponent = ({ isVisible, onClose, navigation }) => {
  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <>
              <View style={styles.popupContainer}>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.topContainer}
                    onPress={() => {
                      navigation.navigate("NewChatsScreen");
                      onClose();
                    }}
                  >
                    <View style={styles.icon}>
                      <Ionicons name="chatbox-outline" size={24} color="#555" />
                    </View>
                    <Text style={styles.text}>New Chat</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.upContainer}
                    onPress={() => {
                      navigation.navigate("CreateOrganization");
                      onClose();
                    }}
                  >
                    <View style={styles.icon}>
                      <AntDesign name="addusergroup" size={24} color="#555" />
                    </View>
                    <Text style={styles.text}>Create/Join organization</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.upContainer}
                    onPress={() => {
                      navigation.navigate("SwitchAccount");
                      onClose();
                    }}
                  >
                    <View style={styles.icon}>
                      <MaterialCommunityIcons
                        name="account-switch-outline"
                        size={24}
                        color="#555"
                      />
                    </View>
                    <Text style={styles.text}>Switch account</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.upContainer}
                    onPress={() => {
                      navigation.navigate("Profile");
                      onClose();
                    }}
                  >
                    <View style={styles.icon}>
                      <AntDesign name="profile" size={24} color="#555" />
                    </View>
                    <Text style={styles.text}>Profile</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.upContainer}
                    onPress={() => {
                      navigation.navigate("Settings");
                      onClose();
                    }}
                  >
                    <View style={styles.icon}>
                      <Feather name="settings" size={24} color="#555" />
                    </View>
                    <Text style={styles.text}>Settings & Privacy</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.upClose}
                    onPress={onClose}
                  >
                    <View style={styles.icon}>
                      <AntDesign name="close" size={24} color="#555" />
                    </View>
                    <Text style={styles.text}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 45,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popupContainer: {
    width: 240,
    height: 325,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    elevation: 3,
  },
  upContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 14,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
  },
  upClose: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  text: {
    color: "#555",
  },
  icon: {
    marginRight: 10,
  },
});

export default MenuComponent;
