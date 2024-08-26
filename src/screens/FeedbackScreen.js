import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';

const FeedbackScreen = ({ navigation }) => { // Add navigation prop
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const userID = 'your-user-id'; // Replace this with the actual user ID or retrieve it from your app's state

  const handlePressStar = (index) => {
    setRating(index);
  };

  const submitFeedback = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter your feedback.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://ai-backend-aip3heuzza-uc.a.run.app/get-ai-service/users/give-user-feedback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            userID: userID,
            feedback: message,
          }).toString(),
        }
      );

      if (response.ok) {
        setLoading(false);
        setModalVisible(true); // Show the modal on successful submission
        setMessage(''); // Reset the feedback message input
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit feedback');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Custom Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Feedback Screen Content */}
      <Text style={styles.title}>Feedback</Text>

      <Text style={styles.subTitle}>Rate Your Experience</Text>
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePressStar(index + 1)}
          >
           
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.commentLabel}>Leave a comment</Text>
      <View style={styles.commentBox}>
        <TextInput
          style={styles.textInput}
          placeholder="Your message here"
          multiline
          onChangeText={setMessage}
          value={message}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={submitFeedback}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Send Feedback</Text>
        )}
      </TouchableOpacity>

      {/* Modal for Thank You Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Thank You for Your Feedback!</Text>
            <Image
              source={require('../../assets/woman-holds-a-clipboard-and-draws-a-check-mark.png')}
              style={styles.modalImage}
            />
            <Text style={styles.modalDescription}>
              Your input helps us enhance our app to better meet your needs.
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
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
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#15718eff',
  },
  title: {
    fontSize: 20.39,
    fontWeight: '600',
    marginBottom: 20,
    color: '#1e1e1eff',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1e1e1eff',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  star: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  commentLabel: {
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: '#1e1e1eff',
  },
  commentBox: {
    width: '100%',
    height: 150,
    borderColor: '#15718eff',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    padding: 10,
  },
  textInput: {
    flex: 1,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#15718eff',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default FeedbackScreen;
