import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params; // Retrieve the selected category

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const handleAddProduct = async () => {
    try {
      const response = await fetch(`http://192.168.43.59:3000/categoryproducts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: label,
          description,
          price: parseFloat(price), // Ensure price is converted to number
          image_url: image,
          categoryId: category.id, // Use the selected category ID
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      Alert.alert('Success', 'Product added successfully', [
        { text: 'OK', onPress: () => navigation.goBack() } // Navigate back after successful addition
      ]);
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Product to {category.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Label"
        value={label}
        onChangeText={(text) => setLabel(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={(text) => setPrice(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        value={image}
        onChangeText={(text) => setImage(text)}
      />
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddProductScreen;
