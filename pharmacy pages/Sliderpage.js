import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 from expo/vector-icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const { width } = Dimensions.get('window');

const images = [
  {
    id: 1,
    uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/drugs-9010444-7414525.png',
    text: 'Best Price Guarantee',
    logoUri: 'https://cdn-icons-png.flaticon.com/512/1872/1872038.png',
  },
  {
    id: 2,
    uri: 'https://as1.ftcdn.net/v2/jpg/05/31/53/24/1000_F_531532462_lIAqeylJa0GgNluVZSBinBIgBR6OE6JH.webp',
    text: 'Quality Assurance',
    logoUri: 'https://cdn-icons-png.flaticon.com/512/1872/1872038.png',
  },
  {
    id: 3,
    uri: 'https://cdni.iconscout.com/illustration/premium/thumb/pharmacy-store-5770635-4826254.png',
    text: 'No Minimum Buy',
    logoUri: 'https://cdn-icons-png.flaticon.com/512/1872/1872038.png',
  },
];

export default function SliderPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const autoSlideTimerRef = useRef(null);
  const navigation = useNavigation();

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideTimerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= images.length) {
          stopAutoSlide();
          return prevIndex;
        }
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 2000);
  };

  const stopAutoSlide = () => {
    if (autoSlideTimerRef.current) {
      clearInterval(autoSlideTimerRef.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleManualSlide = (index) => {
    stopAutoSlide();
    setCurrentIndex(index);
    flatListRef.current.scrollToIndex({ index, animated: true });
  };

  const renderIndicator = ({ index }) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.indicator,
        index === currentIndex ? styles.activeIndicator : null,
      ]}
      onPress={() => handleManualSlide(index)}
    />
  );

  const renderSlideItem = ({ item, index }) => (
    <View style={styles.slideContainer}>
      <Image source={{ uri: item.logoUri }} style={styles.logo} />
      <Text style={styles.text}>{item.text}</Text>
      <Image source={{ uri: item.uri }} style={styles.image} />
      {index === images.length - 1 ? (
        <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate('login')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      ) : null}
      {index === 2 && (
        <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate('admin')}>
                    <Image source={{ uri: 'https://cdn-icons-png.freepik.com/256/3492/3492286.png?ga=GA1.1.690067562.1712817871&semt=ais_hybrid' }} style={{ width: 35, height: 35}} />

        </TouchableOpacity>
      )}
    </View>
  );

  const handleClose = () => {
    // Example: Navigate back or close modal
    navigation.goBack(); // Assuming this screen is part of a stack navigator
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSlideItem}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.indicatorsContainer}>
        {images.map((_, index) => renderIndicator({ index }))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51aca5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 130,
    height: 130,
    borderRadius: 60,
    marginBottom: 10,
  },
  image: {
    width: 260,
    height: 260,
    marginTop: 10,
  },
  text: {
    fontSize: 37,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  indicatorsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#51aca5',
  },
  getStartedButton: {
    position: 'absolute',
    bottom:70, // Adjust position as needed
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal:50,
    borderRadius: 50,
  },
  buttonText: {
    color: '#51aca5',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  adminButton: {
    position: 'absolute',
    top: 40, // Adjust position as needed
    right: 20, // Adjust position as needed
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  closeButtonLeft: {
    position: 'absolute',
    top: 40, // Adjust position as needed
    left: 20, // Adjust position as needed
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 50,
  },
});
