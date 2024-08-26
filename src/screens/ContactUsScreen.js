// src/screens/ContactUsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Contact Us Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ContactUsScreen;
