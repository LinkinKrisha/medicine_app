import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const UserProductListScreen = ({ route }) => {
  const { categoryId } = route.params;
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProductsByCategory(categoryId);
  }, [categoryId]);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://192.168.43.59:3000/products?categoryId=${categoryId}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
  };

  const addToCart = (item) => {
    if (cartItems.some((cartItem) => cartItem.id === item.id)) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const toggleWishlistItem = (item) => {
    if (wishlistItems.some((wishlistItem) => wishlistItem.id === item.id)) {
      setWishlistItems((prevItems) => prevItems.filter((wishlistItem) => wishlistItem.id !== item.id));
    } else {
      setWishlistItems((prevItems) => [...prevItems, item]);
    }
  };

  const handleAddToWishlist = (item) => {
    toggleWishlistItem(item);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productLabel}>{item.label}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>

      <TouchableOpacity style={styles.actionButton} onPress={() => addToCart(item)}>
        <FontAwesome name="cart-plus" size={20} color="#51aca5" />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.actionButton, styles.wishlistButton]} onPress={() => handleAddToWishlist(item)}>
        <FontAwesome name="heart" size={20} color={wishlistItems.some((wishlistItem) => wishlistItem.id === item.id) ? "#ffc107" : "#333"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Category Products</Text>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
      />

      <TouchableOpacity style={styles.cartIconContainer} onPress={() => navigation.navigate('cart', { cartItems })}>
        <FontAwesome name="shopping-cart" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.wishlistIconContainer} onPress={() => navigation.navigate('wishlist', { wishlistItems })}>
        <FontAwesome name="heart" size={25} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:'#51aca5'
    
  },
  productItem: {
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'red',
  },
  productList: {
    paddingBottom: 20,
  },
  actionButton: {
    marginTop: 10,
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 5,
  },
  wishlistButton: {
    marginTop: 5,
  },
  cartIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#51aca5',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistIconContainer: {
    position: 'absolute',
    bottom: 20,
    right: 100,
    backgroundColor: '#51aca5',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#51aca5',
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProductListScreen;
