import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import ForgetPassword from "./Screens/ForgetPassword";
import CountryCodeInput from "./Screens/CountryCodeInput";
import CreateNewAccount from "./Screens/CreateNewAccount";
import HomeScreen from "./Screens/HomeScreen";
// import ChatScreen from "./Screens/ChatScreen";
// import TasksScreen from "./Screens/TasksScreen";
// import CalendarScreen from "./Screens/CalendarScreen";
// import CreateAccountScreen from './Screens/CreateAccountScreen';

const Stack = createStackNavigator();

const screens = [
  { name: "Login", component: LoginScreen },
  { name: "ForgetPassword", component: ForgetPassword },
  { name: "CountryCodeInput", component: CountryCodeInput },
  { name: "CreateAccount", component: CreateNewAccount },
  { name: "Home", component: HomeScreen },
  // { name: "Chat", component: ChatScreen },
  // { name: "Tasks", component: TasksScreen },
  // { name: "Calendar", component: CalendarScreen },
];

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {screens.map((screen, index) => (
          <Stack.Screen
            key={index}
            name={screen.name}
            component={screen.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
