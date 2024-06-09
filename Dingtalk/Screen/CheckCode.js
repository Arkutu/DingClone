// import React, { useState } from "react";
// import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";

// const HomeScreen = ({ navigation }) => {
//   const [showDropdown, setShowDropdown] = useState(false);

//   const toggleDropdown = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleHome = () => {
//     navigation.navigate("Home");
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
//         <Text style={styles.buttonText}>
//           {showDropdown ? "Show Less" : "Show More"}
//         </Text>
//         <Ionicons
//           name={showDropdown ? "chevron-up" : "chevron-down"}
//           size={24}
//           color="black"
//         />
//       </TouchableOpacity>
//       {showDropdown && (
//         <View>
//           <View style={styles.msgContainer}>
//             <View style={styles.msgPic}></View>
//             <Text style={styles.msgText} onPress={handleHome}>
//               Mensah Raphael T.
//             </Text>
//           </View>
//           <View style={styles.msgContainer}>
//             <View style={styles.msgPic}></View>
//             <Text style={styles.msgText}>Michael Anim</Text>
//           </View>
//           <View style={styles.msgContainer}>
//             <View style={styles.msgPic}></View>
//             <Text style={styles.msgText}>Dennis Opoku Amponsah</Text>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#ccc",
//     borderRadius: 5,
//   },
//   buttonText: {
//     marginRight: 10,
//     fontSize: 16,
//   },
//   msgContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   msgPic: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#bbb",
//     marginRight: 10,
//   },
//   msgText: {
//     fontSize: 16,
//   },
// });

// export default HomeScreen;
