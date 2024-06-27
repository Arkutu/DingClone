// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import {
//   createStackNavigator,
//   TransitionPresets,
// } from "@react-navigation/stack";

// import Welcome from "./Screen/Welcome";
// import LoginScreen from "./Screen/LoginScreen";
// import CreateNewAccount from "./Screen/CreateNewAccount";
// import VerifyScreen from "./Screen/VerifyScreen";
// import SetPassword from "./Screen/SetPassword";
// import GetStarted from "./Screen/GetStarted";
// import ForgetPassword from "./Screen/ForgetPassword";
// import HomeScreen from "./Screen/HomeScreen";
// import Startchart from "./Screen/Startchart";

// const Stack = createStackNavigator();

// const screens = [
//   { name: "Welcome", component: Welcome },
//   { name: "Login", component: LoginScreen },
//   { name: "CreateNewAccount", component: CreateNewAccount },
//   { name: "VerifyScreen", component: VerifyScreen },
//   { name: "SetPassword", component: SetPassword },
//   { name: "GetStarted", component: GetStarted },
//   { name: "ForgetPassword", component: ForgetPassword },
//   { name: "Home", component: HomeScreen },
//   { name: "Startchart", component: Startchart },
// ];

// function App() {
//   return (
//     <>
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Welcome"
//           screenOptions={{
//             headerShown: false,
//             cardStyle: { backgroundColor: "#101223" },
//             ...TransitionPresets.SlideFromRightIOS, // Use a smoother transition preset
//           }}
//         >
//           {screens.map((screen, index) => (
//             <Stack.Screen
//               key={index}
//               name={screen.name}
//               component={screen.component}
//             />
//           ))}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// }

// export default App;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "react-native-vector-icons";
import { Ionicons, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "./Screen/HomeScreen";
import ChatScreen from "./Screen/ChatScreen";
import NotifsScreen from "./Screen/NotifsScreen";
import ProfileScreen from "./Screen/ProfileScreen";
import CreateNewAccount from "./Screen/CreateNewAccount";
import ForgetPassword from "./Screen/ForgetPassword";
import GetStarted from "./Screen/GetStarted";
import LoginScreen from "./Screen/LoginScreen";
import SetPassword from "./Screen/SetPassword";
import Startchart from "./Screen/Startchart";
import VerifyScreen from "./Screen/VerifyScreen";
import Welcome from "./Screen/Welcome";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent;

          if (route.name === "Home") {
            IconComponent = Octicons;
            iconName = "home";
          } else if (route.name === "Chat") {
            IconComponent = Ionicons;
            iconName = "chatbubble-ellipses-outline";
          } else if (route.name === "Notifications") {
            IconComponent = Octicons;
            iconName = "bell";
          } else if (route.name === "Profile") {
            IconComponent = MaterialCommunityIcons;
            iconName = "account-multiple-outline";
          }

          // You can return any component that you like here!
          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#101223",
          height: 55,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotifsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateNewAccount"
          component={CreateNewAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SetPassword"
          component={SetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Startchart"
          component={Startchart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyScreen"
          component={VerifyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
