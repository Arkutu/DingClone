// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import * as Linking from 'expo-linking';
// import { OrganizationProvider } from './context/OrganizationContext';
// import { ProjectProvider } from './context/ProjectContext';
// import { LoadingProvider } from './context/LoadingContext'; // Adjust the import path as needed
// import { UserProvider } from './context/UserContext';
// import { AppProvider } from './context/AppContext';
// import { handleInvitationLink } from './invitationUtils';
// import Welcome from './Screens/Welcome';
// import LoginScreen from './Screens/LoginScreen';
// import HomeScreen from './Screens/HomeScreen';
// import CreateAccountScreen from './Screens/CreateAccountScreen';
// import VerifyScreen from './Screens/VerifyScreen';
// import SetPassword from './Screens/SetPassword';
// import GetStarted from './Screens/GetStarted';
// import ForgetPassword from './Screens/ForgetPassword';
// import MainHomeScreen from './Screens/MainHomeScreen';
// import Startchart from './Screens/Startchart';
// import CreateOrganization from './Screens/CreateOrganization';
// import OrganizationScreen from './Screens/OrganizationScreen';
// import ChatScreen from './Screens/ChatScreen';
// import CreateChannelScreen from './Screens/CreateChannelScreen';
// import ChannelBrowser from './Screens/ChannelBrowser';
// import CreateChannel from './Screens/CreateChannel';
// import ChannelVisibility from './Screens/ChannelVisibility';
// import ChannelDetails from './Screens/ChannelDetails';
// import OfficeScreen from './Screens/OfficeScreen';
// import ToDoScreen from './Screens/ToDoScreen';
// import Profile from './Screens/Profile';
// import ExistingOrganizations from './Screens/ExistingOrganizations';
// import EditProfile from './Screens/EditProfile';
// import InviteLinkScreen from './Screens/InviteLinkScreen';
// import CalendarScreen from './Screens/CalendarScreen';
// import TodoListScreen from './Screens/TodoListScreen';
// import AddNewTaskScreen from './Screens/AddNewTaskScreen';
// import ProjectListScreen from './Screens/ProjectListScreen';
// import ProjectScreen from './Screens/ProjectScreen';
// import TaskListScreen from './Screens/TaskListScreen';
// import TaskDetailScreen from './Screens/TaskDetailScreen';
// import CreateTaskScreen from './Screens/CreateTaskScreen';
// import ClockInOutScreen from './Screens/ClockInOutScreen';
// import LeaveRequestScreen from './Screens/LeaveRequestScreen';
// import ActivityScreen from './Screens/ActivityScreen';
// import MembersScreen from './Screens/MembersScreen';
// import NewChatsScreen from './Screens/NewChatsScreen';

// const Stack = createStackNavigator();

// const screens = [
//   { name: 'Welcome', component: Welcome },
//   { name: 'Login', component: LoginScreen },
//   { name: 'CreateNewAccount', component: CreateAccountScreen },
//   { name: 'VerifyScreen', component: VerifyScreen },
//   { name: 'SetPassword', component: SetPassword },
//   { name: 'GetStarted', component: GetStarted },
//   { name: 'Home', component: HomeScreen },
//   { name: 'Startchart', component: Startchart },
//   { name: 'MainHome', component: MainHomeScreen },
//   { name: 'ForgetPassword', component: ForgetPassword },
//   { name: 'CreateOrganization', component: CreateOrganization },
//   { name: 'OrganizationScreen', component: OrganizationScreen },
//   { name: 'Chat', component: ChatScreen },
//   { name: 'CreateChannelScreen', component: CreateChannelScreen },
//   { name: 'ChannelBrowser', component: ChannelBrowser },
//   { name: 'CreateChannel', component: CreateChannel },
//   { name: 'ChannelVisibility', component: ChannelVisibility },
//   { name: 'ChannelDetails', component: ChannelDetails },
//   { name: 'OfficeScreen', component: OfficeScreen },
//   { name: 'ToDo', component: ToDoScreen },
//   { name: 'Profile', component: Profile },
//   { name: 'ExistingOrganizations', component: ExistingOrganizations },
//   { name: 'EditProfile', component: EditProfile },
//   { name: 'InviteLinkScreen', component: InviteLinkScreen },
//   { name: 'CalendarScreen', component: CalendarScreen },
//   { name: 'TodoListScreen', component: TodoListScreen },
//   { name: 'AddNewTask', component: AddNewTaskScreen },
//   { name: 'ProjectListScreen', component: ProjectListScreen },
//   { name: 'ProjectScreen', component: ProjectScreen },
//   { name: 'TaskListScreen', component: TaskListScreen },
//   { name: 'TaskDetailScreen', component: TaskDetailScreen },
//   { name: 'CreateTaskScreen', component: CreateTaskScreen },
//   { name: 'ClockInOutScreen', component: ClockInOutScreen},
//   { name: 'LeaveRequestScreen', component: LeaveRequestScreen },
//   { name: 'Activity', component: ActivityScreen },
//   { name: 'MembersScreen', component: MembersScreen },
//   { name: 'NewChatsScreen', component: NewChatsScreen },
// ];

// const prefix = Linking.createURL('/');

// export default function App() {
//   const linking = {
//     prefixes: [prefix],
//     config: {
//       screens: {
//         JoinOrganization: {
//           path: 'join/:linkId',
//           parse: {
//             linkId: (linkId) => `${linkId}`,
//           },
//         },
//       },
//     },
//   };

//   const handleDeepLink = async (event) => {
//     const { path, queryParams } = Linking.parse(event.url);
//     if (path && path.includes('join')) {
//       const linkId = queryParams.linkId;
//       // Assuming userId is available in some way, for example from a context or storage
//       const userId = 'currentUserId';
//       try {
//         await handleInvitationLink(linkId, userId);
//         console.log('User successfully joined the organization');
//       } catch (error) {
//         console.error('Failed to join organization:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     const subscription = Linking.addEventListener('url', handleDeepLink);
//     console.log('Linking subscription added', subscription);

//     return () => {
//       if (subscription && subscription.remove) {
//         subscription.remove();
//         console.log('Linking subscription removed');
//       } else {
//         console.error('Linking subscription removal failed', subscription);
//       }
//     };
//   }, []);

//   return (
//   <AppProvider>
//     <UserProvider>
//       <OrganizationProvider>
//         <ProjectProvider>
//           <LoadingProvider>
//             <NavigationContainer linking={linking}>
//                 <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
//                   {screens.map((screen, index) => (
//                   <Stack.Screen key={index} name={screen.name} component={screen.component} />
//                    ))}
//                 </Stack.Navigator>
//             </NavigationContainer>
//           </LoadingProvider>
//         </ProjectProvider>
//       </OrganizationProvider>
//     </UserProvider>
//   </AppProvider>
//   );
// }

//?????????????????????????????????????????? Using this code i can't open the app from the link ????????????
// import React, { useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import {
//   createStackNavigator,
//   TransitionPresets,
// } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import * as Linking from "expo-linking";
// import { OrganizationProvider } from "./context/OrganizationContext";
// import { ProjectProvider } from "./context/ProjectContext";
// import { LoadingProvider } from "./context/LoadingContext";
// import { UserProvider } from "./context/UserContext";
// import { AppProvider } from "./context/AppContext";
// import { handleInvitationLink } from "./invitationUtils";
// import { Provider } from "react-redux";
// import { store } from "./store";
// import Toast from "react-native-toast-message";
// import { BlurView } from "@react-native-community/blur";

// // Import your screens
// import Welcome from "./Screens/Welcome";
// import LoginScreen from "./Screens/LoginScreen";
// import CreateAccountScreen from "./Screens/CreateAccountScreen";
// import VerifyScreen from "./Screens/VerifyScreen";
// import SetPassword from "./Screens/SetPassword";
// import GetStarted from "./Screens/GetStarted";
// import ForgetPassword from "./Screens/ForgetPassword";
// import HomeScreen from "./Screens/HomeScreen";
// import MainHomeScreen from "./Screens/MainHomeScreen";
// import Startchart from "./Screens/Startchart";
// import CreateOrganization from "./Screens/CreateOrganization";
// import OrganizationScreen from "./Screens/OrganizationScreen";
// import ChatScreen from "./Screens/ChatScreen";
// import CreateChannelScreen from "./Screens/CreateChannelScreen";
// import ChannelBrowser from "./Screens/ChannelBrowser";
// import CreateChannel from "./Screens/CreateChannel";
// import ChannelVisibility from "./Screens/ChannelVisibility";
// import ChannelDetails from "./Screens/ChannelDetails";
// import OfficeScreen from "./Screens/OfficeScreen";
// import ToDoScreen from "./Screens/ToDoScreen";
// import Profile from "./Screens/Profile";
// import ExistingOrganizations from "./Screens/ExistingOrganizations";
// import EditProfile from "./Screens/EditProfile";
// import InviteLinkScreen from "./Screens/InviteLinkScreen";
// import CalendarScreen from "./Screens/CalendarScreen";
// import TodoListScreen from "./Screens/TodoListScreen";
// import AddNewTaskScreen from "./Screens/AddNewTaskScreen";
// import ProjectListScreen from "./Screens/ProjectListScreen";
// import ProjectScreen from "./Screens/ProjectScreen";
// import TaskListScreen from "./Screens/TaskListScreen";
// import TaskDetailScreen from "./Screens/TaskDetailScreen";
// import CreateTaskScreen from "./Screens/CreateTaskScreen";
// import ClockInOutScreen from "./Screens/ClockInOutScreen";
// import LeaveRequestScreen from "./Screens/LeaveRequestScreen";
// import ActivityScreen from "./Screens/ActivityScreen";
// import MembersScreen from "./Screens/MembersScreen";
// import NewChatsScreen from "./Screens/NewChatsScreen";

// // Create stack navigator
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Define linking configuration
// const prefix = Linking.createURL("/");

// const linking = {
//   prefixes: [prefix],
//   config: {
//     screens: {
//       JoinOrganization: {
//         path: "join/:linkId",
//         parse: {
//           linkId: (linkId) => `${linkId}`,
//         },
//       },
//     },
//   },
// };

// // Define deep link handler
// const handleDeepLink = async (event) => {
//   const { path, queryParams } = Linking.parse(event.url);
//   if (path && path.includes("join")) {
//     const linkId = queryParams.linkId;
//     const userId = "currentUserId"; // Replace with actual user ID retrieval logic
//     try {
//       await handleInvitationLink(linkId, userId);
//       console.log("User successfully joined the organization");
//     } catch (error) {
//       console.error("Failed to join organization:", error);
//     }
//   }
// };

// function MainTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           let IconComponent;

//           if (route.name === "MainHome") {
//             IconComponent = Octicons;
//             iconName = "home";
//           } else if (route.name === "Activity") {
//             IconComponent = Ionicons;
//             iconName = "chatbubble-ellipses-outline";
//           } else if (route.name === "OfficeScreen") {
//             IconComponent = Octicons;
//             iconName = "bell";
//           } else if (route.name === "Profile") {
//             IconComponent = MaterialCommunityIcons;
//             iconName = "account-multiple-outline";
//           }

//           // You can return any component that you like here!
//           return <IconComponent name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "#2b68e6",
//         tabBarInactiveTintColor: "#555",
//         tabBarStyle: {
//           // backgroundColor: "#101223",
//         },

//         gestureEnabled: false,
//       })}
//     >
//       <Tab.Screen
//         name="MainHome"
//         component={MainHomeScreen}
//         options={{
//           // headerShown: false,
//           presentation: "card",
//           gestureEnabled: false,
//         }}
//       />
//       <Tab.Screen
//         name="Activity"
//         component={ActivityScreen}
//         options={{ presentation: "card" }}
//         // options={{ headerShown: false, presentation: "card" }}
//       />
//       <Tab.Screen
//         name="OfficeScreen"
//         component={OfficeScreen}
//         options={{ presentation: "card" }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{ headerShown: false, presentation: "card" }}
//       />
//     </Tab.Navigator>
//   );
// }

// // Define App component
// export default function App() {
//   useEffect(() => {
//     const subscription = Linking.addEventListener("url", handleDeepLink);
//     console.log("Linking subscription added", subscription);

//     return () => {
//       if (subscription && subscription.remove) {
//         subscription.remove();
//         console.log("Linking subscription removed");
//       } else {
//         console.error("Linking subscription removal failed", subscription);
//       }
//     };
//   }, []);

//   return (
//     <>
//       <Provider store={store}>
//         <AppProvider>
//           <UserProvider>
//             <OrganizationProvider>
//               <ProjectProvider>
//                 <LoadingProvider>
//                   <NavigationContainer linking={linking}>
//                     <Stack.Navigator initialRouteName="Welcome">
//                       <Stack.Screen
//                         name="Welcome"
//                         component={Welcome}
//                         options={{
//                           headerShown: false,
//                           ...TransitionPresets.SlideFromRightIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="Login"
//                         component={LoginScreen}
//                         options={{
//                           ...TransitionPresets.SlideFromRightIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="CreateNewAccount"
//                         component={CreateAccountScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="VerifyScreen"
//                         component={VerifyScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="SetPassword"
//                         component={SetPassword}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       <Stack.Screen
//                         name="GetStarted"
//                         component={GetStarted}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="Home"
//                         component={HomeScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="Startchart"
//                         component={Startchart}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       {/* <Stack.Screen
//                         name="MainHome"
//                         component={MainHomeScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       /> */}
//                       <Stack.Screen
//                         name="ForgetPassword"
//                         component={ForgetPassword}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="CreateOrganization"
//                         component={CreateOrganization}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       <Stack.Screen
//                         name="OrganizationScreen"
//                         component={OrganizationScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="Chat"
//                         component={ChatScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="CreateChannelScreen"
//                         component={CreateChannelScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="ChannelBrowser"
//                         component={ChannelBrowser}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="CreateChannel"
//                         component={CreateChannel}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="ChannelVisibility"
//                         component={ChannelVisibility}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       <Stack.Screen
//                         name="ChannelDetails"
//                         component={ChannelDetails}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       {/* <Stack.Screen
//                         name="OfficeScreen"
//                         component={OfficeScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       /> */}
//                       <Stack.Screen
//                         name="ToDo"
//                         component={ToDoScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       {/* <Stack.Screen
//                         name="Profile"
//                         component={Profile}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       /> */}
//                       <Stack.Screen
//                         name="ExistingOrganizations"
//                         component={ExistingOrganizations}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="EditProfile"
//                         component={EditProfile}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="InviteLinkScreen"
//                         component={InviteLinkScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="CalendarScreen"
//                         component={CalendarScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="TodoListScreen"
//                         component={TodoListScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="AddNewTask"
//                         component={AddNewTaskScreen}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       <Stack.Screen
//                         name="ProjectListScreen"
//                         component={ProjectListScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="ProjectScreen"
//                         component={ProjectScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="TaskListScreen"
//                         component={TaskListScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="TaskDetailScreen"
//                         component={TaskDetailScreen}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       <Stack.Screen
//                         name="CreateTaskScreen"
//                         component={CreateTaskScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="ClockInOutScreen"
//                         component={ClockInOutScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="LeaveRequestScreen"
//                         component={LeaveRequestScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       {/* <Stack.Screen
//                         name="Activity"
//                         component={ActivityScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       /> */}
//                       <Stack.Screen
//                         name="MembersScreen"
//                         component={MembersScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="NewChatsScreen"
//                         component={NewChatsScreen}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       <Stack.Screen
//                         name="MainTabs"
//                         component={MainTabs}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                     </Stack.Navigator>
//                   </NavigationContainer>
//                 </LoadingProvider>
//               </ProjectProvider>
//             </OrganizationProvider>
//           </UserProvider>
//         </AppProvider>

//         <>
//           <Toast
//             config={{
//               customToast: ({ text1, text2, ...rest }) => (
//                 <View style={styles.toastContainer}>
//                   <BlurView
//                     style={styles.absolute}
//                     blurType="light"
//                     blurAmount={10}
//                   />
//                   <Toast.Base
//                     {...rest}
//                     text1={text1}
//                     text2={text2}
//                     style={styles.toast}
//                     contentContainerStyle={styles.contentContainer}
//                     text1Style={styles.text1}
//                     text2Style={styles.text2}
//                   />
//                 </View>
//               ),
//             }}
//             position="top"
//             bottomOffset={90}
//           />
//         </>
//       </Provider>
//     </>
//   );
// }

//????????????????????? NOW IN USE ???????????????????
// import React, { useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import {
//   createStackNavigator,
//   TransitionPresets,
// } from "@react-navigation/stack";

// //?
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// // import { NavigationContainer } from '@react-navigation/native';
// // import { TransitionPresets } from '@react-navigation/stack';
// //?
// import * as Linking from "expo-linking";
// import { OrganizationProvider } from "./context/OrganizationContext";
// import { ProjectProvider } from "./context/ProjectContext";
// import { LoadingProvider } from "./context/LoadingContext";
// import { UserProvider } from "./context/UserContext";
// import { AppProvider } from "./context/AppContext";
// import { handleInvitationLink } from "./invitationUtils";
// import { Provider } from "react-redux";
// import { store } from "./store";
// import Toast from "react-native-toast-message";
// import { BlurView } from "@react-native-community/blur";
// import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

// // Import your screens
// import Welcome from "./Screens/Welcome";
// import LoginScreen from "./Screens/LoginScreen";
// import CreateAccountScreen from "./Screens/CreateAccountScreen";

// import MainHomeScreen from "./Screens/MainHomeScreen";
// import ActivityScreen from "./Screens/ActivityScreen";
// import OfficeScreen from "./Screens/OfficeScreen";
// import Profile from "./Screens/Profile";
// import Work from "./Screens/Work";

// import VerifyScreen from "./Screens/VerifyScreen";
// import SetPassword from "./Screens/SetPassword";
// import GetStarted from "./Screens/GetStarted";
// import ForgetPassword from "./Screens/ForgetPassword";
// import HomeScreen from "./Screens/HomeScreen";
// import Startchart from "./Screens/Startchart";
// import CreateOrganization from "./Screens/CreateOrganization";
// import OrganizationScreen from "./Screens/OrganizationScreen";
// import ChatScreen from "./Screens/ChatScreen";
// import CreateChannelScreen from "./Screens/CreateChannelScreen";
// import ChannelBrowser from "./Screens/ChannelBrowser";
// import CreateChannel from "./Screens/CreateChannel";
// import ChannelVisibility from "./Screens/ChannelVisibility";
// import ChannelDetails from "./Screens/ChannelDetails";
// import ToDoScreen from "./Screens/ToDoScreen";
// import ExistingOrganizations from "./Screens/ExistingOrganizations";
// import EditProfile from "./Screens/EditProfile";
// import InviteLinkScreen from "./Screens/InviteLinkScreen";
// import CalendarScreen from "./Screens/CalendarScreen";
// import TodoListScreen from "./Screens/TodoListScreen";
// import AddNewTaskScreen from "./Screens/AddNewTaskScreen";
// import ProjectListScreen from "./Screens/ProjectListScreen";
// import ProjectScreen from "./Screens/ProjectScreen";
// import TaskListScreen from "./Screens/TaskListScreen";
// import TaskDetailScreen from "./Screens/TaskDetailScreen";
// import CreateTaskScreen from "./Screens/CreateTaskScreen";
// import ClockInOutScreen from "./Screens/ClockInOutScreen";
// import LeaveRequestScreen from "./Screens/LeaveRequestScreen";
// import MembersScreen from "./Screens/MembersScreen";
// import NewChatsScreen from "./Screens/NewChatsScreen";
// import Search from "./Screens/Search";

// // Import icons
// import { Ionicons, Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

// // Create stack and tab navigators
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // Define linking configuration
// const prefix = Linking.createURL("/");

// const linking = {
//   prefixes: [prefix],
//   config: {
//     screens: {
//       JoinOrganization: {
//         path: "join/:linkId",
//         parse: {
//           linkId: (linkId) => `${linkId}`,
//         },
//       },
//     },
//   },
// };

// // Define deep link handler
// const handleDeepLink = async (event) => {
//   const { path, queryParams } = Linking.parse(event.url);
//   if (path && path.includes("join")) {
//     const linkId = queryParams.linkId;
//     const userId = "currentUserId"; // Replace with actual user ID retrieval logic
//     try {
//       await handleInvitationLink(linkId, userId);
//       console.log("User successfully joined the organization");
//     } catch (error) {
//       console.error("Failed to join organization:", error);
//     }
//   }
// };

// //? tab navigation
// function MainTabs() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             if (route.name === "MainHome") {
//               iconName = "home";
//             } else if (route.name === "OfficeScreen") {
//               iconName = "briefcase";
//             } else if (route.name === "Profile") {
//               iconName = "person";
//             } else if (route.name === "Work") {
//               iconName = "construct";
//             }

//             return <Ionicons name={iconName} size={size} color={color} />;
//           },
//           tabBarActiveTintColor: "tomato",
//           tabBarInactiveTintColor: "gray",
//           ...TransitionPresets.SlideFromRightIOS,
//         })}
//       >
//         <Tab.Screen
//           name="MainHome"
//           component={MainHomeScreen}
//           options={{ title: "Home" }}
//         />
//         <Tab.Screen
//           name="OfficeScreen"
//           component={OfficeScreen}
//           options={{ title: "Office" }}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={Profile}
//           options={{ title: "Profile", headerShown: false }}
//         />
//         <Tab.Screen name="Work" component={Work} options={{ title: "Work" }} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// // Define App component
// export default function App() {
//   useEffect(() => {
//     const subscription = Linking.addEventListener("url", handleDeepLink);
//     console.log("Linking subscription added", subscription);

//     return () => {
//       if (subscription && subscription.remove) {
//         subscription.remove();
//         console.log("Linking subscription removed");
//       } else {
//         console.error("Linking subscription removal failed", subscription);
//       }
//     };
//   }, []);

//   return (
//     <>
//       <Provider store={store}>
//         <AppProvider>
//           <UserProvider>
//             <OrganizationProvider>
//               <ProjectProvider>
//                 <LoadingProvider>
//                   <NavigationContainer linking={linking}>
//                     <Stack.Navigator
//                       // initialRouteName="Welcome"
//                       initialRouteName="MainHome"
//                     >
//                       <Stack.Screen
//                         name="Welcome"
//                         component={Welcome}
//                         options={{
//                           headerShown: false,
//                           ...TransitionPresets.SlideFromRightIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="Login"
//                         component={LoginScreen}
//                         options={{
//                           ...TransitionPresets.SlideFromRightIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="CreateNewAccount"
//                         component={CreateAccountScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="VerifyScreen"
//                         component={VerifyScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="SetPassword"
//                         component={SetPassword}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       <Stack.Screen
//                         name="GetStarted"
//                         component={GetStarted}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="Home"
//                         component={HomeScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="Startchart"
//                         component={Startchart}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="ForgetPassword"
//                         component={ForgetPassword}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="CreateOrganization"
//                         component={CreateOrganization}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       <Stack.Screen
//                         name="OrganizationScreen"
//                         component={OrganizationScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="Chat"
//                         component={ChatScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="CreateChannelScreen"
//                         component={CreateChannelScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="ChannelBrowser"
//                         component={ChannelBrowser}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="CreateChannel"
//                         component={CreateChannel}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="ChannelVisibility"
//                         component={ChannelVisibility}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       <Stack.Screen
//                         name="ChannelDetails"
//                         component={ChannelDetails}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="ToDo"
//                         component={ToDoScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="ExistingOrganizations"
//                         component={ExistingOrganizations}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="EditProfile"
//                         component={EditProfile}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="InviteLinkScreen"
//                         component={InviteLinkScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="CalendarScreen"
//                         component={CalendarScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="TodoListScreen"
//                         component={TodoListScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="AddNewTask"
//                         component={AddNewTaskScreen}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       <Stack.Screen
//                         name="ProjectListScreen"
//                         component={ProjectListScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="ProjectScreen"
//                         component={ProjectScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="TaskListScreen"
//                         component={TaskListScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="TaskDetailScreen"
//                         component={TaskDetailScreen}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       <Stack.Screen
//                         name="CreateTaskScreen"
//                         component={CreateTaskScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="ClockInOutScreen"
//                         component={ClockInOutScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="LeaveRequestScreen"
//                         component={LeaveRequestScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="MembersScreen"
//                         component={MembersScreen}
//                         options={{
//                           ...TransitionPresets.ModalSlideFromBottomIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="NewChatsScreen"
//                         component={NewChatsScreen}
//                         options={{ ...TransitionPresets.ModalPresentationIOS }}
//                       />
//                       {/* <Stack.Screen
//                         name="Activity"
//                         component={ActivityScreen}
//                         options={{
//                           // ...TransitionPresets.ModalPresentationIOS //Pop and come on top
//                           ...TransitionPresets.SlideFromRightIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="MainHome"
//                         component={MainHomeScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="OfficeScreen"
//                         component={OfficeScreen}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="Profile"
//                         component={Profile}
//                         options={{
//                           headerShown: false,
//                           ...TransitionPresets.SlideFromRightIOS,
//                         }}
//                       />
//                       <Stack.Screen
//                         name="Work"
//                         component={Work}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       /> */}
//                       <Stack.Screen
//                         name="Search"
//                         component={Search}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                       <Stack.Screen
//                         name="MainTabs"
//                         component={MainTabs}
//                         options={{ ...TransitionPresets.SlideFromRightIOS }}
//                       />
//                     </Stack.Navigator>
//                   </NavigationContainer>
//                 </LoadingProvider>
//               </ProjectProvider>
//             </OrganizationProvider>
//           </UserProvider>
//         </AppProvider>

//         <Toast
//           config={{
//             customToast: ({ text1, text2, ...rest }) => (
//               <View style={styles.toastContainer}>
//                 <BlurView
//                   style={styles.absolute}
//                   blurType="light"
//                   blurAmount={10}
//                 />
//                 <Toast.Base
//                   {...rest}
//                   text1={text1}
//                   text2={text2}
//                   style={styles.toast}
//                   contentContainerStyle={styles.contentContainer}
//                   text1Style={styles.text1}
//                   text2Style={styles.text2}
//                 />
//               </View>
//             ),
//           }}
//           position="top"
//           bottomOffset={90}
//         />
//       </Provider>
//     </>
//   );
// }

//?????????????????????????????????? ADDING TAB NAVIGATION ???????????????????????????????????????????
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Linking from "expo-linking";
import { OrganizationProvider } from "./context/OrganizationContext";
import { ProjectProvider } from "./context/ProjectContext";
import { LoadingProvider } from "./context/LoadingContext";
import { UserProvider } from "./context/UserContext";
import { AppProvider } from "./context/AppContext";
import { handleInvitationLink } from "./invitationUtils";
import { Provider } from "react-redux";
import { store } from "./store";
import Toast from "react-native-toast-message";
import { BlurView } from "@react-native-community/blur";
import { View, StyleSheet } from "react-native";

// Import your screens
import Welcome from "./Screens/Welcome";
import LoginScreen from "./Screens/LoginScreen";
import CreateAccountScreen from "./Screens/CreateAccountScreen";
import MainHomeScreen from "./Screens/MainHomeScreen";
import ActivityScreen from "./Screens/ActivityScreen";
import OfficeScreen from "./Screens/OfficeScreen";
import Profile from "./Screens/Profile";
import Work from "./Screens/Work";
import SetPassword from "./Screens/SetPassword";
import ForgetPassword from "./Screens/ForgetPassword";
import CreateOrganization from "./Screens/CreateOrganization";
import OrganizationScreen from "./Screens/OrganizationScreen";
import ChatScreen from "./Screens/ChatScreen";
import CreateChannelScreen from "./Screens/CreateChannelScreen";
import ChannelBrowser from "./Screens/ChannelBrowser";
import CreateChannel from "./Screens/CreateChannel";
import ChannelVisibility from "./Screens/ChannelVisibility";
import ChannelDetails from "./Screens/ChannelDetails";
import ToDoScreen from "./Screens/ToDoScreen";
import ExistingOrganizations from "./Screens/ExistingOrganizations";
import EditProfile from "./Screens/EditProfile";
import InviteLinkScreen from "./Screens/InviteLinkScreen";
import CalendarScreen from "./Screens/CalendarScreen";
import TodoListScreen from "./Screens/TodoListScreen";
import AddNewTaskScreen from "./Screens/AddNewTaskScreen";
import ProjectListScreen from "./Screens/ProjectListScreen";
import ProjectScreen from "./Screens/ProjectScreen";
import TaskListScreen from "./Screens/TaskListScreen";
import TaskDetailScreen from "./Screens/TaskDetailScreen";
import CreateTaskScreen from "./Screens/CreateTaskScreen";
import ClockInOutScreen from "./Screens/ClockInOutScreen";
import LeaveRequestScreen from "./Screens/LeaveRequestScreen";
import MembersScreen from "./Screens/MembersScreen";
import NewChatsScreen from "./Screens/NewChatsScreen";
import Search from "./Screens/Search";
import Docs from "./Screens/Docs";
import UserInfo from "./Screens/UserInfo";
import Settings from "./Screens/Settings";
import Logout from "./Screens/Logout";
import AddNewAccount from "./Screens/AddNewAccount";

// Import icons
import {
  MaterialIcons,
  Octicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

// Create stack and tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define linking configuration
const prefix = Linking.createURL("/");

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      JoinOrganization: {
        path: "join/:linkId",
        parse: {
          linkId: (linkId) => `${linkId}`,
        },
      },
    },
  },
};

// Define deep link handler
const handleDeepLink = async (event) => {
  const { path, queryParams } = Linking.parse(event.url);
  if (path && path.includes("join")) {
    const linkId = queryParams.linkId;
    const userId = "currentUserId"; // Replace with actual user ID retrieval logic
    try {
      await handleInvitationLink(linkId, userId);
      console.log("User successfully joined the organization");
    } catch (error) {
      console.error("Failed to join organization:", error);
    }
  }
};

// Tab navigation
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let IconComponent;

          if (route.name === "MainHome") {
            iconName = "home";
            IconComponent = Octicons;
          } else if (route.name === "Work") {
            iconName = "appstore-o";
            IconComponent = AntDesign;
          } else if (route.name === "OfficeScreen") {
            iconName = "work-outline";
            IconComponent = MaterialIcons;
          } else if (route.name === "Profile") {
            iconName = "account-multiple-outline";
            IconComponent = MaterialCommunityIcons;
          }

          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2b68e6",
        tabBarInactiveTintColor: "#555",
        ...TransitionPresets.SlideFromRightIOS,
      })}
    >
      <Tab.Screen
        name="MainHome"
        component={MainHomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen name="Work" component={Work} options={{ title: "Work" }} />
      <Tab.Screen
        name="OfficeScreen"
        component={OfficeScreen}
        options={{ title: "Office" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Profile", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

// Define App component
export default function App() {
  useEffect(() => {
    const subscription = Linking.addEventListener("url", handleDeepLink);
    console.log("Linking subscription added", subscription);

    return () => {
      if (subscription && subscription.remove) {
        subscription.remove();
        console.log("Linking subscription removed");
      } else {
        console.error("Linking subscription removal failed", subscription);
      }
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        <AppProvider>
          <UserProvider>
            <OrganizationProvider>
              <ProjectProvider>
                <LoadingProvider>
                  <NavigationContainer linking={linking}>
                    <Stack.Navigator
                      // initialRouteName="Welcome"
                      // initialRouteName="TodoListScreen"
                      initialRouteName="MainTabs"
                    >
                      <Stack.Screen
                        name="Welcome"
                        component={Welcome}
                        options={{
                          headerShown: false,
                          ...TransitionPresets.SlideFromRightIOS,
                        }}
                      />
                      <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                          ...TransitionPresets.SlideFromRightIOS,
                        }}
                      />
                      <Stack.Screen
                        name="CreateNewAccount"
                        component={CreateAccountScreen}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="SetPassword"
                        component={SetPassword}
                        options={{ ...TransitionPresets.ModalPresentationIOS }}
                      />
                      <Stack.Screen
                        name="ForgetPassword"
                        component={ForgetPassword}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="AddNewAccount"
                        component={AddNewAccount}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="CreateOrganization"
                        component={CreateOrganization}
                        options={{ ...TransitionPresets.ModalPresentationIOS }}
                      />
                      <Stack.Screen
                        name="OrganizationScreen"
                        component={OrganizationScreen}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="Chat"
                        component={ChatScreen}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="CreateChannelScreen"
                        component={CreateChannelScreen}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="ChannelBrowser"
                        component={ChannelBrowser}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="CreateChannel"
                        component={CreateChannel}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="Docs"
                        component={Docs}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="ChannelVisibility"
                        component={ChannelVisibility}
                        options={{ ...TransitionPresets.ModalPresentationIOS }}
                      />
                      <Stack.Screen
                        name="ChannelDetails"
                        component={ChannelDetails}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="ToDo"
                        component={ToDoScreen}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="ExistingOrganizations"
                        component={ExistingOrganizations}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="EditProfile"
                        component={EditProfile}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="InviteLinkScreen"
                        component={InviteLinkScreen}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="CalendarScreen"
                        component={CalendarScreen}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="TodoListScreen"
                        component={TodoListScreen}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="AddNewTask"
                        component={AddNewTaskScreen}
                        options={{ ...TransitionPresets.ModalPresentationIOS }}
                      />
                      <Stack.Screen
                        name="ProjectListScreen"
                        component={ProjectListScreen}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="ProjectScreen"
                        component={ProjectScreen}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="TaskListScreen"
                        component={TaskListScreen}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="TaskDetailScreen"
                        component={TaskDetailScreen}
                        options={{ ...TransitionPresets.ModalPresentationIOS }}
                      />
                      <Stack.Screen
                        name="CreateTaskScreen"
                        component={CreateTaskScreen}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="ClockInOutScreen"
                        component={ClockInOutScreen}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="LeaveRequestScreen"
                        component={LeaveRequestScreen}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="MembersScreen"
                        component={MembersScreen}
                        options={{
                          ...TransitionPresets.ModalSlideFromBottomIOS,
                        }}
                      />
                      <Stack.Screen
                        name="NewChatsScreen"
                        component={NewChatsScreen}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="Search"
                        component={Search}
                        options={{
                          headerShown: false,
                          ...TransitionPresets.SlideFromRightIOS,
                        }}
                      />
                      <Stack.Screen
                        name="UserInformation"
                        component={UserInfo}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{ ...TransitionPresets.SlideFromRightIOS }}
                      />
                      <Stack.Screen
                        name="Logout"
                        component={Logout}
                        options={{
                          // headerShown: false,
                          ...TransitionPresets.SlideFromRightIOS,
                        }}
                      />
                      <Stack.Screen
                        name="MainTabs"
                        component={MainTabs}
                        options={{ headerShown: false }}
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
                </LoadingProvider>
              </ProjectProvider>
            </OrganizationProvider>
          </UserProvider>
        </AppProvider>

        <Toast
          config={{
            customToast: ({ text1, text2, ...rest }) => (
              <View style={styles.toastContainer}>
                <BlurView
                  style={styles.absolute}
                  blurType="light"
                  blurAmount={10}
                />
                <Toast.Base
                  {...rest}
                  text1={text1}
                  text2={text2}
                  style={styles.toast}
                  contentContainerStyle={styles.contentContainer}
                  text1Style={styles.text1}
                  text2Style={styles.text2}
                />
              </View>
            ),
          }}
          position="top"
          bottomOffset={90}
        />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  toastContainer: {
    width: "90%",
    alignSelf: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  toast: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
  contentContainer: {
    padding: 10,
  },
  text1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  text2: {
    fontSize: 14,
    color: "white",
  },
});
