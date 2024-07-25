import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation(); 

  const addToCart = () => {
    alert(`Added ${product.name} to cart`);
  };
  
  const addToWishlist = () => {
    alert(`Added ${product.name} to wishlist`);
  };

  const handleBuyNow = () => {
    navigation.navigate('checkout', {product}); 
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={addToCart}>
          <Ionicons name="cart-outline" size={28} color="#ffffff" style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        {product.oldPrice ? (
          <Text style={styles.productOldPrice}>{product.oldPrice}</Text>
        ) : null}
        {product.discount ? (
          <Text style={styles.productDiscount}>{product.discount}</Text>
        ) : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buyButton]} onPress={handleBuyNow}>
            <Ionicons name="cart-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.wishlistButton]} onPress={addToWishlist}>
            <Ionicons name="heart-outline" size={28} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#51aca5',
  },
  cartIcon: {
    marginLeft: 'auto', 
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  productDetails: {
    backgroundColor: '#51aca5',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  productName: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  productPrice: {
    fontSize: 20,
    color: 'red',
    marginBottom: 5,
    textAlign: 'center',
  },
  productOldPrice: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'line-through',
    marginBottom: 5,
    textAlign: 'center',
  },
  productDiscount: {
    fontSize: 16,
    color: 'darkgreen',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    width: 100,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buyButton: {
    backgroundColor: '#2196F3',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  wishlistButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#FFC107', 
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    textAlign: 'justify',
    paddingHorizontal: 20,
  },
});

export default ProductDetail;
