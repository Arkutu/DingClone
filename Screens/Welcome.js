// import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import Loading from '../components/Loading'; // Adjust the import path as needed
// import { SafeAreaView} from 'react-native-safe-area-context';

// const Welcome = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(false);

//   const handleSignIn = () => {
//     setLoading(true);
//     setTimeout(() => {
//       navigation.navigate('Login', { from: 'Welcome' });
//       setLoading(false);
//     }, 500); // Simulate loading time for smooth transition
//   };

//   const handleSignUp = () => {
//     setLoading(true);
//     setTimeout(() => {
//       navigation.navigate('CreateNewAccount', { from: 'Welcome' });
//       setLoading(false);
//     }, 500); // Simulate loading time for smooth transition
//   };

//   return (
//     <SafeAreaView style={styles.root}>
//       <View style={styles.container}>
//         {loading && <Loading />}
//         <Text style={styles.headerText}>OfficeComms</Text>
//         <View style={styles.mainContainer}>
//           <View style={styles.topContainer}>
//             <Text style={styles.welcomeText}>Welcome</Text>
//             <Text style={styles.nextText}>Get started with your account</Text>
//           </View>
//           <View style={styles.btnTwoContainer}>
//             <Pressable style={styles.btnTwo} onPress={handleSignUp}>
//               <Text style={styles.btnText}>Sign up</Text>
//             </Pressable>
//             <Pressable style={styles.btnThree} onPress={handleSignIn}>
//               <Text style={styles.btnText}>Sign in</Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     height: '100%',
//     backgroundColor: '#007bff',
//   },
//   container: {
//     flex: 1,
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerText: {
//     color: '#FFFFFF',
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginBottom: 50,
//   },
//   mainContainer: {
//     width: '100%',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     backgroundColor: '#101223',
//     position:'absolute',
//     bottom: -40,
//   },
//   topContainer: {
//     alignItems: 'center',
//     color: '#FFFFFF',
//   },
//   welcomeText: {
//     fontSize: 30,
//     marginTop: 30,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
//   nextText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     margin: 10,
//   },
//   btn: {
//     marginHorizontal: 30,
//     padding: 12,
//     borderRadius: 12,
//     backgroundColor: '#007bff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   btnTwoContainer: {
//     marginHorizontal: 20,
//     marginTop: 20,
//   },
//   btnTwo: {
//     padding: 12,
//     borderRadius: 12,
//     backgroundColor: '#333',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   btnThree: {
//     padding: 12,
//     borderRadius: 12,
//     backgroundColor: '#333',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 80,
//   },
//   btnText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//   },
// });

// export default Welcome;

//??????????? My Final Code ???????????????
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { Button } from "react-native-elements";
import { StatusBar } from "expo-status-bar";

const Welcome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.headerText}>
        <Image source={require("../assets/octext.png")} style={styles.img} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTextBlack}>ffice</Text>
          <Text style={styles.headerTextBlue}>Comms</Text>
        </View>
      </View>

      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.nextText}>Get started with your account</Text>
      </View>

      <View style={styles.buttomBottomContainer}>
        <Button
          title="Sign Up"
          onPress={() =>
            navigation.navigate("CreateNewAccount", { from: "Welcome" })
          }
          containerStyle={styles.buttonOne}
          buttonStyle={styles.customizeButtonOne}
          titleStyle={styles.buttonTextOne}
        />
        <Button
          title="Sign In"
          onPress={() => navigation.navigate("Login", { from: "Welcome" })}
          containerStyle={styles.buttonTwo}
          buttonStyle={styles.customizeButtonTwo}
          titleStyle={styles.buttonTextTwo}
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffff",
  },
  headerText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 280,
    marginBottom: 140,
  },
  img: {
    width: 100,
    height: 100,
    top: 5,
    right: 10,
  },
  headerTextContainer: {
    flexDirection: "row",
    right: 20,
    marginRight: 20,
  },
  headerTextBlack: {
    color: "#444",
    fontSize: 35,
    fontWeight: "800",
  },
  headerTextBlue: {
    color: "#007bff",
    fontSize: 35,
    fontWeight: "800",
  },
  topContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 30,
    marginTop: 30,
    fontWeight: "bold",
    color: "#333",
  },
  nextText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
  buttomBottomContainer: {
    width: "95%",
    marginTop: 20,
  },
  button: {
    borderRadius: 5,
  },
  customizeButton: {
    backgroundColor: "#007bff",
    padding: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  buttonOne: {
    borderRadius: 5,
  },
  customizeButtonOne: {
    backgroundColor: "#555",
    padding: 10,
  },
  buttonTextOne: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  buttonTwo: {
    marginTop: 20,
    borderRadius: 5,
  },
  customizeButtonTwo: {
    backgroundColor: "#555",
    padding: 10,
  },
  buttonTextTwo: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
