import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrderSuccessScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity 0
  const navigation = useNavigation(); // Get navigation object from useNavigation hook

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  const handleContinue = () => {
    navigation.navigate('frontpage');
  };

  const handleTrackOrder = () => {
    navigation.navigate('trackorder'); // Navigate to TrackOrderScreen
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        {/* Tick Icon */}
        <Image
          source={{ uri: 'https://www.freepnglogos.com/uploads/tick-png/turquoise-tick-check-mark-transparent-png-29.png' }}
          style={styles.tickImage}
        />
        {/* Success Text */}
        <Text style={styles.successText}>Order Successfully</Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Icon name="arrow-forward" size={20} color="#ffffff" style={styles.icon} />
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  content: {
    alignItems: 'center',
    marginBottom: 40,
  },
  tickImage: {
    width: 120,
    height: 120,
  },
  successText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#5fb2b5',
    marginTop: 10,
  },
  continueButton: {
    flexDirection: 'row',
    backgroundColor: '#e5762e',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  trackOrderButton: {
    backgroundColor: '#51aca5',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackOrderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default OrderSuccessScreen;
