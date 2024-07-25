import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const DisplayPage = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const fadeInDuration = 1000; 
    const fadeOutDuration = 1000; 
    const totalDuration = fadeInDuration + fadeOutDuration;

    const fadeOutTimeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: fadeOutDuration,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace('Slider');
      });
    }, totalDuration);

    return () => clearTimeout(fadeOutTimeout);
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1872/1872038.png' }}
        style={[styles.logo, {opacity: fadeAnim }]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51aca5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 170,
    height: 170,
    borderRadius: 100,
  },
});
export default DisplayPage;
