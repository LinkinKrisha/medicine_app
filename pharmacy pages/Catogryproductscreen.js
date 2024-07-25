import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons'; 

const CategoryProductsScreen = () => {
  const navigation = useNavigation(); 

  const products = [
    {
      id: '1',
      name: '24/7 Pharmacy Smart Blood Glucose Monitoring Bluetooth System with Diabetes Management App, APG-01 + 25 Test Strips, 1 kit',
      price: '₹719.10',
      oldPrice: '₹799',
      discount: '10% off',
      image: 'https://images.apollo247.in/pub/media/catalog/product/a/p/apb0065-pdp_images.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max'
    },
    {
      id: '2',
      name: '24/7 Life Premium Citrus Refreshing Wet Wipes, 60 (2x30) Count',
      price: '₹100',
      oldPrice: '₹160',
      discount: '38% off',
      image: 'https://images.apollo247.in/pub/media/catalog/product/a/p/apr0111_1-qwerf.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max'
    },
    {
      id: '3',
      name: '24/7 Pharmacy Activated Charcoal Soap, 250 gm (2x125 gm)',
      price: '₹100',
      oldPrice: '₹160',
      discount: '38% off',
      image: 'https://images.apollo247.in/pub/media/catalog/product/a/p/apa0097_1-sep2023.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max'
    },
    {
      id: '4',
      name: '24/7 Pharmacy ORS Orange Flavour Drink, 4x200 ml',
      price: '₹100',
      oldPrice: '₹120',
      discount: '17% off',
      image: 'https://images.apollo247.in/pub/media/catalog/product/A/P/APO0086_1-JULY23_1.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max'
    },
    {
      id: '5',
      name: '24/7 Pharmacy Glycerin Bathing Bar, 75 gm (Buy 2 Get 2 Free)',
      price: '₹100',
      oldPrice: '₹160',
      discount: '38% off',
      image: 'https://images.apollo247.in/pub/media/catalog/product/i/m/img_20210115_125103__front__glycerin_soap_1_1.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max'
    },
  ];

  const handleProductPress = (product) => {
    navigation.navigate('productdetails', { product });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productContainer} onPress={() => handleProductPress(item)}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productOldPrice}>{item.oldPrice}</Text>
        <Text style={styles.productDiscount}>{item.discount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffffff" style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.heading}>24/7 Products</Text>
      </View>
      <View style={styles.bottomContainer}>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#51aca5',
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#51aca5',
  },
  backIcon: {
    marginRight: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  productList: {
    paddingBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  productPrice: {
    fontSize: 14,
    color: 'red',
    marginBottom: 5,
  },
  productOldPrice: {
    fontSize: 12,
    color: '#999999',
    textDecorationLine: 'line-through',
    marginBottom: 5,
  },
  productDiscount: {
    fontSize: 14,
    color: '#4CAF50',
  },
});

export default CategoryProductsScreen;
