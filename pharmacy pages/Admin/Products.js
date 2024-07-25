import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert, Image, Modal, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    label: '',
    description: '',
    price: '',
    image: '',
    outOfStock: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.43.59:3000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async () => {
    try {
      const response = await fetch('http://192.168.43.59:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        fetchProducts(); // Refresh the product list
        Alert.alert('Success', 'Product added successfully');
        setNewProduct({
          label: '',
          description: '',
          price: '',
          image: '',
          outOfStock: false,
        });
        setIsModalVisible(false); // Close the modal after adding product
      } else {
        console.error('Failed to add product');
        Alert.alert('Error', 'Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Error adding product');
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://192.168.43.59:3000/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts();
        Alert.alert('Success', 'Product deleted successfully');
      } else {
        console.error('Failed to delete product');
        Alert.alert('Error', 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Error deleting product');
    }
  };

  const confirmDelete = (productId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => handleDelete(productId) },
      ],
      { cancelable: true }
    );
  };

  const startEdit = (product) => {
    setSelectedProduct(product);
    setNewProduct(product);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const saveEdit = async () => {
    try {
      const response = await fetch(`http://192.168.43.59:3000/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        fetchProducts();
        setIsEditing(false);
        setIsModalVisible(false);
        Alert.alert('Success', 'Product updated successfully');
        setNewProduct({
          label: '',
          description: '',
          price: '',
          image: '',
          outOfStock: false,
        });
      } else {
        console.error('Failed to update product');
        Alert.alert('Error', 'Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Error updating product');
    }
  };

  const renderRightActions = (item) => (
    <Animated.View style={styles.rightActions}>
      <RectButton style={styles.actionButton} onPress={() => startEdit(item)}>
        <FontAwesome5Icon name="edit" size={23} color="blue" />
      </RectButton>
      <RectButton style={styles.actionButton} onPress={() => confirmDelete(item.id)}>
        <FontAwesome5Icon name="trash-alt" size={23} color="red" />
      </RectButton>
    </Animated.View>
  );

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Products</Text>
      
      <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
        <FontAwesome5Icon name="plus-circle" size={20} color="white" style={{ marginRight: 5 }} />
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setIsModalVisible(false)}>
            <FontAwesome5Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.modalHeading}>{isEditing ? 'Edit Product' : 'Add New Product'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Product Label"
            placeholderTextColor="#51aca5"
            value={newProduct.label}
            onChangeText={(text) => setNewProduct(prevState => ({ ...prevState, label: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Description"
            placeholderTextColor="#51aca5"
            value={newProduct.description}
            onChangeText={(text) => setNewProduct(prevState => ({ ...prevState, description: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Price"
            placeholderTextColor="#51aca5"
            value={newProduct.price}
            onChangeText={(text) => setNewProduct(prevState => ({ ...prevState, price: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Image URL"
            placeholderTextColor="#51aca5"
            value={newProduct.image}
            onChangeText={(text) => setNewProduct(prevState => ({ ...prevState, image: text }))}
          />
          <View style={styles.switchContainer}>
            <Text style={styles.out}>Out of Stock</Text>
            <Switch
              trackColor={{ false: '#767577', true: 'red' }}
              thumbColor={newProduct.outOfStock ? '#f4f3f4' : '#f4f3f4'}
              onValueChange={(value) => setNewProduct(prevState => ({ ...prevState, outOfStock: value }))}
              value={newProduct.outOfStock}
            />
          </View>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setIsModalVisible(false);
                setIsEditing(false);
                setNewProduct({
                  label: '',
                  description: '',
                  price: '',
                  image: '',
                  outOfStock: false,
                });
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.addButton]}
              onPress={isEditing ? saveEdit : addProduct}
            >
              <Text style={styles.buttonText}>{isEditing ? 'Save Changes' : 'Add Product'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item)}>
            <View style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.text}>{item.label}</Text>
                <Text style={styles.text}>{item.description}</Text>
                <Text style={styles.textprice}>{item.price}</Text>
              </View>
            </View>
          </Swipeable>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#51aca5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#51aca5',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#f2f2f2',
    color: '#51aca5',
    width: 300,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  out: {
    color: 'blue',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#51aca5',
    padding: 20,
    marginVertical: 10,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 20,
  },
  rightActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  actionButton: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51aca5',
    padding: 20,
  },
  modalHeading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
    fontSize: 19,
  },
  textprice: {
    color: 'red',
    fontSize: 18,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginBottom: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  add: {
    backgroundColor: 'green',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});


export default ProductsScreen;
