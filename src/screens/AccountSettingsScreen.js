import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

const AccountSettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account & Security</Text>
      <View style={styles.pictureSection}>
        
        <TouchableOpacity style={styles.changePictureButton}>
          <Text style={styles.changePictureText}>Change Picture</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.input} defaultValue="Ada Omari" />
            
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.input} defaultValue="AdaOm26@gmail.com" />
           
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <View style={styles.inputWrapper}>
            <TextInput style={styles.input} defaultValue="+25112345678" />
            
          </View>
        </View>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20.39,
    fontWeight: '600',
    color: '#1e1e1eff',
    marginBottom: 20,
    textAlign: 'center',
  },
  pictureSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  changePictureButton: {
    marginTop: 10,
    padding: 8,
    borderRadius: 7.65,
    borderWidth: 1,
    borderColor: '#15718eff',
  },
  changePictureText: {
    fontSize: 12.24,
    fontWeight: '600',
  },
  inputSection: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16.31,
    fontWeight: '600',
    color: '#000000ff',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.02,
    borderColor: '#15718eff',
    borderRadius: 50.98,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16.31,
    color: '#000000ff',
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  saveButton: {
    backgroundColor: '#15718eff',
    padding: 15,
    borderRadius: 101.96,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    fontSize: 13.69,
    fontWeight: '500',
    color: '#fffffff',
  },
});

export default AccountSettingsScreen;
