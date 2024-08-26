import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NoProductHistoryScreen from '../screens/NoProductHistoryScreen';
import ScannerScreen from '../screens/ScannerScreen';
import Chatbot from '../screens/Chatbot';
import UploadScreen from '../screens/UploadScreen';
import SettingsScreen from '../screens/Settings';
import CustomTabBarButton from '../components/CustomTabBarButton';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [showButtons, setShowButtons] = useState(false);
  const navigation = useNavigation();

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="ScannerScreen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'ProductHistory') {
              iconName = focused ? 'time' : 'time-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Middle') {
              iconName = 'add-circle';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Home"
          component={NoProductHistoryScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="ProductHistory"
          component={NoProductHistoryScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Middle"
          component={View}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              toggleButtons();
            },
          }}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={NoProductHistoryScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>

      {showButtons && (
        <View style={styles.popupButtons}>
          <TouchableOpacity style={styles.popupButton} onPress={() => console.log('Upload Pressed')}>
            <Ionicons name="cloud-upload" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.popupButton} onPress={() => console.log('Scan Pressed')}>
            <Ionicons name="scan" size={30} color="black" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.drawerButton} onPress={openDrawer}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popupButtons: {
    position: 'absolute',
    bottom: 70, // Adjust to position the buttons above the tab bar
    left: '50%',
    transform: [{ translateX: -100 }], // Center the buttons horizontally based on their width
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200, // Adjust based on the combined width of your buttons
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white', // Optional: background color to enhance visibility
    borderRadius: 10, // Optional: rounded corners for the popup
    elevation: 5, // Optional: shadow effect for better appearance
  },
  popupButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerButton: {
    position: 'absolute',
    top: 10, // Adjust to position the button at the top
    right: 10, // Adjust to position the button on the right
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 5, // Optional: shadow effect for better appearance
  },
});

export default TabNavigator;
