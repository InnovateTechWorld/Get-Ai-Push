import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import FeedbackScreen from '../screens/FeedbackScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import RateGetAiScreen from '../screens/RateGetAiScreen';
import LogoutScreen from '../screens/LogoutScreen';
import ShareScreen from '../screens/ShareScreen';
import TabNavigator from './TabNavigator';  // Import the Tab Navigator
import { useTheme } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { theme } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: theme === 'dark' ? '#1E1E1E' : '#fff',
          width: 240,
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Main" component={TabNavigator} />
      <Drawer.Screen name="Share" component={ShareScreen} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} />
      <Drawer.Screen name="RateGetAi" component={RateGetAiScreen} />
      <Drawer.Screen name="ContactUs" component={ContactUsScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
