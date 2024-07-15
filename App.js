import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import { OrganizationProvider } from './context/OrganizationContext';
import { ProjectProvider } from './context/ProjectContext';
import { LoadingProvider } from './context/LoadingContext'; // Adjust the import path as needed
import { UserProvider } from './context/UserContext';
import { AppProvider } from './context/AppContext';
import { handleInvitationLink } from './invitationUtils';
import Welcome from './Screens/Welcome';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import CreateAccountScreen from './Screens/CreateAccountScreen';
import VerifyScreen from './Screens/VerifyScreen';
import SetPassword from './Screens/SetPassword';
import GetStarted from './Screens/GetStarted';
import ForgetPassword from './Screens/ForgetPassword';
import MainHomeScreen from './Screens/MainHomeScreen';
import Startchart from './Screens/Startchart';
import CreateOrganization from './Screens/CreateOrganization';
import OrganizationScreen from './Screens/OrganizationScreen';
import ChatScreen from './Screens/ChatScreen';
import CreateChannelScreen from './Screens/CreateChannelScreen';
import ChannelBrowser from './Screens/ChannelBrowser';
import CreateChannel from './Screens/CreateChannel';
import ChannelVisibility from './Screens/ChannelVisibility';
import ChannelDetails from './Screens/ChannelDetails';
import OfficeScreen from './Screens/OfficeScreen';
import ToDoScreen from './Screens/ToDoScreen';
import Profile from './Screens/Profile';
import ExistingOrganizations from './Screens/ExistingOrganizations';
import EditProfile from './Screens/EditProfile';
import InviteLinkScreen from './Screens/InviteLinkScreen';  
import CalendarScreen from './Screens/CalendarScreen';
import TodoListScreen from './Screens/TodoListScreen';
import AddNewTaskScreen from './Screens/AddNewTaskScreen';
import ProjectListScreen from './Screens/ProjectListScreen';
import ProjectScreen from './Screens/ProjectScreen';
import TaskListScreen from './Screens/TaskListScreen';
import TaskDetailScreen from './Screens/TaskDetailScreen';
import CreateTaskScreen from './Screens/CreateTaskScreen';
import ClockInOutScreen from './Screens/ClockInOutScreen';
import LeaveRequestScreen from './Screens/LeaveRequestScreen';
import ActivityScreen from './Screens/ActivityScreen';
import MembersScreen from './Screens/MembersScreen';
import NewChatsScreen from './Screens/NewChatsScreen';

const Stack = createStackNavigator();

const screens = [
  { name: 'Welcome', component: Welcome },
  { name: 'Login', component: LoginScreen },
  { name: 'CreateNewAccount', component: CreateAccountScreen },
  { name: 'VerifyScreen', component: VerifyScreen },
  { name: 'SetPassword', component: SetPassword },
  { name: 'GetStarted', component: GetStarted },
  { name: 'Home', component: HomeScreen },
  { name: 'Startchart', component: Startchart },
  { name: 'MainHome', component: MainHomeScreen },
  { name: 'ForgetPassword', component: ForgetPassword },
  { name: 'CreateOrganization', component: CreateOrganization },
  { name: 'OrganizationScreen', component: OrganizationScreen },
  { name: 'Chat', component: ChatScreen },
  { name: 'CreateChannelScreen', component: CreateChannelScreen },
  { name: 'ChannelBrowser', component: ChannelBrowser },
  { name: 'CreateChannel', component: CreateChannel },
  { name: 'ChannelVisibility', component: ChannelVisibility },
  { name: 'ChannelDetails', component: ChannelDetails },
  { name: 'OfficeScreen', component: OfficeScreen },
  { name: 'ToDo', component: ToDoScreen },
  { name: 'Profile', component: Profile },
  { name: 'ExistingOrganizations', component: ExistingOrganizations },
  { name: 'EditProfile', component: EditProfile },
  { name: 'InviteLinkScreen', component: InviteLinkScreen },
  { name: 'CalendarScreen', component: CalendarScreen },
  { name: 'TodoListScreen', component: TodoListScreen },
  { name: 'AddNewTask', component: AddNewTaskScreen },
  { name: 'ProjectListScreen', component: ProjectListScreen },
  { name: 'ProjectScreen', component: ProjectScreen },
  { name: 'TaskListScreen', component: TaskListScreen },
  { name: 'TaskDetailScreen', component: TaskDetailScreen },
  { name: 'CreateTaskScreen', component: CreateTaskScreen },
  { name: 'ClockInOutScreen', component: ClockInOutScreen},
  { name: 'LeaveRequestScreen', component: LeaveRequestScreen },
  { name: 'Activity', component: ActivityScreen },
  { name: 'MembersScreen', component: MembersScreen },
  { name: 'NewChatsScreen', component: NewChatsScreen },
];

const prefix = Linking.createURL('/');

export default function App() {
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        JoinOrganization: {
          path: 'join/:linkId',
          parse: {
            linkId: (linkId) => `${linkId}`,
          },
        },
      },
    },
  };

  const handleDeepLink = async (event) => {
    const { path, queryParams } = Linking.parse(event.url);
    if (path && path.includes('join')) {
      const linkId = queryParams.linkId;
      // Assuming userId is available in some way, for example from a context or storage
      const userId = 'currentUserId'; 
      try {
        await handleInvitationLink(linkId, userId);
        console.log('User successfully joined the organization');
      } catch (error) {
        console.error('Failed to join organization:', error);
      }
    }
  };

  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleDeepLink);
    console.log('Linking subscription added', subscription);

    return () => {
      if (subscription && subscription.remove) {
        subscription.remove();
        console.log('Linking subscription removed');
      } else {
        console.error('Linking subscription removal failed', subscription);
      }
    };
  }, []);

  return (
  <AppProvider>
    <UserProvider>
      <OrganizationProvider>
        <ProjectProvider>
          <LoadingProvider>
            <NavigationContainer linking={linking}>
                <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                  {screens.map((screen, index) => (
                  <Stack.Screen key={index} name={screen.name} component={screen.component} />
                   ))}
                </Stack.Navigator>
            </NavigationContainer>
          </LoadingProvider>
        </ProjectProvider>
      </OrganizationProvider>
    </UserProvider>
  </AppProvider>
  );
}
