import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LandingScreen from '../screens/LandingScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import VerifyPhone from '../screens/verifyPhone';
import AddEmail from '../screens/addEmail';
import DrawerNavigator from './DrawerNavigator';  // Import the Drawer Navigator
import FeedbackScreen from '../screens/FeedbackScreen'; // Import FeedbackScreen
import UserContext from '../context/UserContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feedback">
        {/* Other screens can be added here */}
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Stack.Navigator initialRouteName="OnboardingScreen">
      {!user ? (
        <>
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EmailSignup"
            component={AddEmail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerifyEmail"
            component={VerifyPhone}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Feedback"
            component={FeedbackScreen} // Add FeedbackScreen here
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}  // Use DrawerNavigator for authenticated users
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
