import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FullScreenMapScreen = () => {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 9.9341,
    longitude: 78.1447,
  });
  const [selectedAddress, setSelectedAddress] = useState('Wise Tech Source, 80 Feet Road, Anna Nagar, Madurai, 625020');

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      } 
    } 
    catch (err) {
      console.warn(err);
    }
  };

  const handleMapPress = async (e) => {
    const { coordinate } = e.nativeEvent;
    setSelectedLocation(coordinate);

    try {
      const placeName = await fetchPlaceName(coordinate.latitude, coordinate.longitude);
      setSelectedAddress(placeName);
    } catch (error) {
      console.error('Error fetching place name:', error);
      Alert.alert('Error', 'Failed to fetch place name. Please try again.');
    }
  };

  const fetchPlaceName = async (latitude, longitude) => {
    // Simulating a place name fetch delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const placeName = 'Selected delivery location'; // Replace with actual place name retrieved
        resolve(placeName);
      }, 1000); // Simulating API call delay
    });
  };

  const handleConfirmLocation = async () => {
    if (selectedLocation) {
      try {
        const placeName = await fetchPlaceName(selectedLocation.latitude, selectedLocation.longitude);
        navigation.navigate('mainpage'); // Navigate to 'mainpage' or your desired screen
      } catch (error) {
        console.error('Error fetching place name:', error);
        Alert.alert('Error', 'Failed to fetch place name. Please try again.');
      }
    } else {
      Alert.alert('No Location Selected', 'Please select a location on the map first.');
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="User Location">
            <Callout style={styles.calloutContainer}>
              <FontAwesome name="user" size={34} color="#4caf50" />
            </Callout>
          </Marker>
        )}
      </MapView>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>{selectedAddress}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
          <Text style={styles.buttonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#51aca5',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  addressContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
    elevation: 5,
  },
  addressText: {
    color: '#333',
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  confirmButton: {
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius:50,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  calloutContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default FullScreenMapScreen;
