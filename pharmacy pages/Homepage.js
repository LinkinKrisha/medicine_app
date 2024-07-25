import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity set to 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Duration in milliseconds
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleLocateMe = () => {
    navigation.navigate('welcome');
  };

  const handleProvideLocation = () => {
    navigation.navigate('welcome');
  };
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1872/1872038.png' }}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome, Pharmacy!</Text>
      <Text style={styles.description}>
        Unlock the world of regular and rescued pharmacy by setting up your delivery address.
      </Text>
      <Text style={styles.address}>SELECT LOCATION</Text>

      <TouchableOpacity style={styles.button} onPress={handleLocateMe}>
        <FontAwesome name="location-arrow" color="#fff" size={20} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Locate Me</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleProvideLocation}>
        <FontAwesome name="map-marker" color="#fff" size={20} style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Provide Delivery Location</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51aca5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  address: {
    paddingTop: 10,
    paddingBottom: 20,
    color: 'white',
    fontStyle: 'italic',
    fontWeight: '600'
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#F5F5F5',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 23,
    marginBottom: 20,
  },
  buttonText: {
    color: '#51aca5',
    fontSize: 18,
    marginLeft: 10,
  },
  buttonIcon: {
    color: '#51aca5',
    marginRight: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
});

export default HomePage;
