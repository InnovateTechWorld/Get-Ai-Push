import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageContext } from './LanguageContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { switchLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);

          // Switch language if preferred_language is available
          if (parsedUser.preferred_language) {
            switchLanguage(parsedUser.preferred_language.toLowerCase());
          }
        } else {
          console.warn('No user data found in AsyncStorage');
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [switchLanguage]);

  // Function to update user data
  const updateUserData = async (newUserData) => {
    try {
      setUser(prevUser => ({ ...prevUser, ...newUserData }));
      await AsyncStorage.setItem('userData', JSON.stringify({ ...user, ...newUserData }));
    } catch (error) {
      console.error('Failed to update user data', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
