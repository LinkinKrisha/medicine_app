import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from Expo icons

const Wishlist = ({ route, navigation }) => {
  const { wishlistItems } = route.params;

  const renderWishlistItem = ({ item }) => {
    const priceStyle = item.outOfStock ? { ...styles.wishlistPrice, color: 'red', textDecorationLine: 'line-through' } : styles.wishlistPrice;
    const stockText = item.outOfStock ? 'Out of Stock' : ''; // Text to display for out of stock items

    const handleBuyNow = () => {
      navigation.navigate('checkout', {
        cartItems: [{ ...item, quantity: 1 }],
        clearCart: () => {} 
      });
    };

    return (
      <View style={styles.wishlistItem}>
        <Image source={{ uri: item.image }} style={styles.wishlistImage} />
        <View style={styles.wishlistTextContainer}>
          <Text style={styles.wishlistLabel}>{item.label}</Text>
          <Text style={styles.wishlistDescription}>{item.description}</Text>
          <Text style={priceStyle}>{item.price}</Text>
          {item.outOfStock && (
            <Text style={styles.outOfStockText}>{stockText}</Text>
          )}
          <TouchableOpacity
            onPress={handleBuyNow}
            style={[styles.buyNowButton, item.outOfStock && { backgroundColor: 'grey' }]}
            disabled={item.outOfStock}
          >
            <Text style={styles.buyNowButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const goBack = () => {
    navigation.goBack(); // Function to navigate back
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.header}>Wishlist</Text>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <FontAwesome name="chevron-left" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={wishlistItems}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between', // Ensures top and bottom containers are spaced out
  },
  topContainer: {
    backgroundColor: '#51aca5', // Example background color for the top container
    paddingHorizontal: 10,
    paddingVertical: 100, // Increased vertical padding
    alignItems: 'center', 
    borderRadius: 28, // Rounded corners
  },
  flatListContainer: {
    paddingBottom: 20, // Padding for the FlatList content
  },
  wishlistItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishlistImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  wishlistTextContainer: {
    flex: 1,
  },
  wishlistLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  wishlistDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    marginBottom: 5,
  },
  wishlistPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  bottomContainer: {
    backgroundColor: '#fff', // Example background color for the bottom container
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center', // Adjust as per your design
  },
  backButton: {
    paddingRight: 300,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    top: 28,
  },
  outOfStockText: {
    fontSize: 12,
    color: 'red',
    marginTop: 2,
  },
  buyNowButton: {
    marginTop: 10,
    backgroundColor: '#51aca5',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buyNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Wishlist;
