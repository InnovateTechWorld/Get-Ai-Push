import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

const SignupPhone = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ dial_code: '+251', name: 'Ethiopia' });

  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };


  

  const handleContinueClick = () => {
    // Check if phone number and password are filled
    if (phoneNumber && password) {
      setShowModal(true);
    } else {
      // Optionally show an error message if inputs are not valid
      alert("Please enter a valid phone number and password.");
    }
  };

  const handleEditClick = () => {
    setShowModal(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleContinue = () => {
    setShowModal(false);
    navigation.navigate('EmailSignup', {
      phoneNumber,
      dialCode: selectedCountry.dial_code,
      password
    });
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Text style={styles.title}>Create an Account</Text>
        <Text style={styles.subtitle}>Enter your mobile number to verify your account</Text>

        <View style={styles.inputWrapper}>
          <TouchableOpacity
            onPress={() => setShowCountryPicker(true)}
            style={styles.countryPicker}
          >
            <Text>{selectedCountry.dial_code}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Mobile Number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
            <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        mode="contained"
        onPress={handleContinueClick}
        disabled={!phoneNumber || !password}
        style={[styles.button, (!phoneNumber || !password) ? styles.disabledButton : styles.activeButton]}
      >
        <Text>Continue</Text>
        
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>&times;</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/pop.png')} style={styles.modalImage} />
            <Text style={styles.modalTitle}>Confirm Your Phone Number</Text>
            <Text style={styles.modalText}>Is this correct? {selectedCountry.dial_code} {phoneNumber}</Text>
            <Button
              mode="contained"
              onPress={handleContinue}
              buttonColor="#2c7391"
              style={styles.modalButton}
            >
              <Text>Continue</Text>
            </Button>
            <Button mode="outlined" onPress={handleEditClick} style={styles.modalButton}>
            <Text>Edit</Text>
            </Button>
          </View>
        </View>
      </Modal>

      <CountryPicker
        show={showCountryPicker}
        pickerButtonOnPress={(country) => {
          setSelectedCountry({ dial_code: country.dial_code, name: country.name.en });
          setShowCountryPicker(false);
        }}
        style={{ modal: { height: '80%' } }} // Adjust the modal height
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  content: {
    marginTop: 8,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  countryPicker: {
    marginRight: 8,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 8,
  },
  toggleButton: {
    padding: 8,
  },
  button: {
    backgroundColor: '#2c7391',
    borderRadius: 28,
    alignItems: 'center',
    paddingVertical: 12,
    position: 'absolute',
    bottom: 40, // adjust this value to your liking
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  activeButton: {
    backgroundColor: '#2c7391',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  modalCloseText: {
    fontSize: 24,
  },
  modalImage: {
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalText: {
    color: '#6b7280',
    marginBottom: 16,
  },
  modalButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 48,
    marginBottom: 8,
    color: '#2c7391',
  },
});

export default SignupPhone;
