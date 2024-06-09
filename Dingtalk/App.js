import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import CheckCode from "./Screen/CheckCode";
import LoginScreen from "./Screen/LoginScreen";
import CreateNewAccount from "./Screen/CreateNewAccount";
import ForgetPassword from "./Screen/ForgetPassword";
import HomeScreen from "./Screen/HomeScreen";
import Startchart from "./Screen/Startchart";

const Stack = createStackNavigator();

const screens = [
  // { name: "CheckCode", component: CheckCode },
  { name: "Login", component: LoginScreen },
  { name: "CreateNewAccount", component: CreateNewAccount },
  { name: "ForgetPassword", component: ForgetPassword },
  { name: "Home", component: HomeScreen },
  { name: "Startchart", component: Startchart },
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
