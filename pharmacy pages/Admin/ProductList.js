import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

const ProductListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category, productName } = route.params;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://192.168.43.59:3000/products`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching products:', error.message);
      setError('Failed to fetch products. Please check your network connection and try again.');
    }
  };

  const handleAddProduct = () => {
    navigation.navigate('products', { category });
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View>
        <Text style={styles.productText}>{item.name}</Text>
        <Text style={styles.productPrice}>Rs: {item.price}</Text>
      </View>
    </View>
  );

  const handleRetry = () => {
    setError(null); // Clear error state
    fetchProducts(); // Retry fetching products
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={handleRetry} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.heading}>Products in {category.label}</Text>
      </View>
      {productName && <Text style={styles.productName}>Product Name: {productName}</Text>}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51aca5',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#3d8b87',
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  productList: {
    padding: 10,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 20,
    borderRadius: 8,
  },
  productText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 18,
    color: 'red',
    marginTop: 5,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
  },
});

export default ProductListScreen;
