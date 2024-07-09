import 'react-native-url-polyfill/auto';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./Screens/Welcome";
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";
import CreateAccountScreen from "./Screens/CreateAccountScreen";
import VerifyScreen from "./Screens/VerifyScreen";
import SetPassword from "./Screens/SetPassword";
import GetStarted from "./Screens/GetStarted";
import ForgetPassword from "./Screens/ForgetPassword";
import MainHomeScreen from "./Screens/MainHomeScreen";
import Startchart from "./Screens/Startchart";
import CreateOrganization from "./Screens/CreateOrganization";
import OrganizationScreen from "./Screens/OrganizationScreen";
import ChatScreen from "./Screens/ChatScreen";
import CreateChannelScreen from "./Screens/CreateChannelScreen";
import ChannelBrowser from './Screens/ChannelBrowser';
import CreateChannel from './Screens/CreateChannel';
import ChannelVisibility from './Screens/ChannelVisibility';
import ChannelDetails from './Screens/ChannelDetails';
import OfficeScreen from './Screens/OfficeScreen';
import ToDoScreen from "./Screens/ToDoScreen";
import Profile from "./Screens/Profile";
import ExistingOrganizations from './Screens/ExistingOrganizations';
import EditProfile from './Screens/EditProfile';

import { OrganizationProvider } from './OrganizationContext'; // Make sure the path is correct

const Stack = createStackNavigator();

const screens = [
  { name: "Welcome", component: Welcome },
  { name: "Login", component: LoginScreen },
  { name: "CreateNewAccount", component: CreateAccountScreen },
  { name: "VerifyScreen", component: VerifyScreen },
  { name: "SetPassword", component: SetPassword },
  { name: "GetStarted", component: GetStarted },
  { name: "Home", component: HomeScreen },
  { name: "Startchart", component: Startchart },
  { name: "MainHome", component: MainHomeScreen },
  { name: "ForgetPassword", component: ForgetPassword },
  { name: "CreateOrganization", component: CreateOrganization },
  { name: "OrganizationScreen", component: OrganizationScreen },
  { name: "Chat", component: ChatScreen },
  { name: "CreateChannelScreen", component: CreateChannelScreen },
  { name: "ChannelBrowser", component: ChannelBrowser },
  { name: "CreateChannel", component: CreateChannel },
  { name: "ChannelVisibility", component: ChannelVisibility },
  { name: "ChannelDetails", component: ChannelDetails },
  { name: "OfficeScreen", component: OfficeScreen },
  { name: "ToDo", component: ToDoScreen },
  { name: "Profile", component: Profile },
  { name: "ExistingOrganizations", component: ExistingOrganizations },
  { name: "EditProfile", component: EditProfile },

];

export default function App() {
  return (
    <OrganizationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          {screens.map((screen, index) => (
            <Stack.Screen key={index} name={screen.name} component={screen.component} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </OrganizationProvider>
  );
}
