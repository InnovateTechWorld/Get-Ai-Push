import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import UserContext from '../context/UserContext';
import { BASEURL } from '../services/api'; // Ensure BASEURL is correctly set in your project

const SettingsScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [language, setLanguage] = useState(user.preferred_language || 'English');
  const [isLanguagePickerVisible, setIsLanguagePickerVisible] = useState(false);

  const toggleNotifications = () =>
    setIsNotificationsEnabled((prevState) => !prevState);
  const toggleDarkMode = () => setIsDarkModeEnabled((prevState) => !prevState);

  const handleLanguageChange = async (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setUser((prevUser) => ({
      ...prevUser,
      preferred_language: selectedLanguage,
    }));

    const { user_id } = user;

    try {
      const response = await axios.patch(
        `${BASEURL}/users/update-user-preference`,
        {
          user_id,
          preferred_language: selectedLanguage,
        }
      );

      if (response.status === 200) {
        console.log('Language preference updated successfully');
      } else {
        console.error('Failed to update language preference');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error updating language preference:', error.response.data);
      } else {
        console.error('Error updating language preference:', error.message);
      }
    }
    setIsLanguagePickerVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Notifications</Text>
        <Switch
          value={isNotificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Account & Security</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Languages</Text>
        <TouchableOpacity
          style={styles.picker}
          onPress={() => setIsLanguagePickerVisible(true)}
        >
          <Text>{language}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch value={isDarkModeEnabled} onValueChange={toggleDarkMode} />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Terms and Conditions</Text>
      </View>

      <Modal visible={isLanguagePickerVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.languagePicker}>
            <TouchableOpacity
              onPress={() => setIsLanguagePickerVisible(false)}
            >
              <Text style={styles.languageOption}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('EN')}>
              <Text style={styles.languageOption}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('FR')}>
              <Text style={styles.languageOption}>French</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('SW')}>
              <Text style={styles.languageOption}>Swahili</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('ZU')}>
              <Text style={styles.languageOption}>Zulu</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('HA')}>
              <Text style={styles.languageOption}>Hausa</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('OR')}>
              <Text style={styles.languageOption}>Oromo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('AM')}>
              <Text style={styles.languageOption}>Amharic</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('TW')}>
              <Text style={styles.languageOption}>Twi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaebffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  },
  settingText: {
    fontSize: 16,
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  languagePicker: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  languageOption: {
    marginVertical: 10,
    fontSize: 16,
    lineHeight: 34.67,
  },
});

export default SettingsScreen;
