import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import EmailInput from '../components/EmailInput';
import FullNameInput from '../components/FullNameInput';
import CountryPickerComponent from '../components/CountryPickerComponent';
import countryList from 'react-select-country-list';
import { signup, sendOtp } from '../services/authService';
import { Picker } from '@react-native-picker/picker';

const AddEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('ET');
  const [preferredLanguage, setPreferredLanguage] = useState('en');
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const route = useRoute();
  const { phoneNumber, dialCode, password } = route.params || {};
  const countries = countryList().getData();

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const data = {
        email,
        user_name: fullName,
        password,
        phone_no: `${dialCode}${phoneNumber}`,
        country: countries.find((country) => country.value === selectedCountry).label,
        preferred_language: preferredLanguage,
      };

      const signupResponse = await signup(data);

      if (signupResponse.status === 200) {
        const otpResponse = await sendOtp(email);

        if (otpResponse.status === 200) {
          const { otp } = otpResponse.data;
          console.log(otp)
          Alert.alert('Success', 'Signup successful and OTP sent to your email!');
          navigation.navigate('VerifyEmail', { email, otp, phoneNumber: `${dialCode}${phoneNumber}`, preferredLanguage });
        } else {
          Alert.alert("An error occurred", "Could not send OTP. Please try again.");
        }
      } else {
        Alert.alert('Error', 'An unexpected error occurred during signup. Please try again.');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data.message || 'An unexpected error occurred. Please try again.';

      switch (status) {
        case 400:
          Alert.alert('Error', message || 'Bad Request. Please check your input.');
          break;
        case 401:
          Alert.alert('Unauthorized', 'You are not authorized to perform this action.');
          break;
        case 403:
          Alert.alert('Forbidden', 'You do not have permission to perform this action.');
          break;
        case 404:
          Alert.alert('Not Found', 'The requested resource was not found.');
          break;
        case 422:
          Alert.alert('Unprocessable Entity', 'The provided data was invalid.');
          break;
        case 500:
          Alert.alert('Server Error', 'An error occurred on the server. Please try again later.');
          break;
        default:
          Alert.alert('Error', message);
      }
    } else if (error.request) {
      Alert.alert('Network Error', 'No response received from the server. Please check your internet connection.');
    } else {
      Alert.alert('Error', error.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add your email</Text>
        <Text style={styles.subtitle}>You can use your email to login to your account.</Text>

        <EmailInput email={email} onEmailChange={setEmail} />
        <FullNameInput fullName={fullName} onFullNameChange={setFullName} />
        <CountryPickerComponent
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          countries={countries}
        />

        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => setLanguageModalVisible(true)}
        >
          <Text style={styles.languageButtonText}>Select Language</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignup}
          style={[styles.button, (!email || !fullName) && styles.disabledButton]}
          disabled={!email || !fullName}
        >
          {isLoading ? <ActivityIndicator color='#fff' /> : <Text style={styles.buttonText}>Signup</Text>}
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={languageModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.languageLabel}>Preferred Language</Text>
            <Picker
              selectedValue={preferredLanguage}
              onValueChange={(itemValue) => setPreferredLanguage(itemValue)}
              style={styles.languagePicker}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="French" value="fr" />
              <Picker.Item label="Swahili" value="sw" />
            </Picker>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2c7391',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  languageButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  languageButtonText: {
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  languageLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  languagePicker: {
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2c7391',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default AddEmail;