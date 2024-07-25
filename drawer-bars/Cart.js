import React, { useState, useEffect } from 'react';
import { Alert, View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Cart = ({ route, navigation }) => {
  const { cartItems: initialCartItems } = route.params;
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isCartEmpty, setIsCartEmpty] = useState(cartItems.length === 0);

  // Calculate total price of items in the cart
  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
      if (!isNaN(numericPrice)) {
        totalPrice += item.quantity * numericPrice;
      }
    });
    return totalPrice.toFixed(2);
  };

  // Handle increasing item quantity
  const handleIncrease = (id) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
  };

  // Handle decreasing item quantity
  const handleDecrease = (id) => {
    const updatedItems = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedItems);
  };

  // Handle removing item from cart
  const handleRemove = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            const updatedItems = cartItems.filter(item => item.id !== id);
            setCartItems(updatedItems);
          }
        }
      ]
    );
  };

  // Navigate back to previous screen
  const goBack = () => {
    navigation.goBack();
  };

  // Navigate to checkout screen
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Cart is Empty', 'Please add items to your cart before checking out.');
    } else {
      navigation.navigate('checkout', {
        cartItems,
        clearCart: () => setCartItems([]),
      });
    }
  };

  // Update cartItems when navigation params change
  useEffect(() => {
    if (route.params?.updatedCartItems) {
      setCartItems(route.params.updatedCartItems);
      setIsCartEmpty(route.params.updatedCartItems.length === 0);
    }
  }, [route.params?.updatedCartItems]);

  // Render each item in the cart
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.label}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => handleRemove(item.id)}
          style={styles.removeItemButton}
        >
          <Text style={styles.removeItemText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.menuBar}>
          <TouchableOpacity onPress={goBack}>
            <Icon name="close" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>Shopping Cart</Text>
        <View style={styles.bagContainer}>
          <Text style={styles.badge}>{cartItems.length}</Text>
          <Icon name="bag" size={30} color="white" />
        </View>
      </View>

      <View style={styles.middleContainer}>
        {isCartEmpty ? (
          <Text style={styles.emptyCartText}>Your cart is empty. Add items to proceed to checkout.</Text>
        ) : (
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.totalText}>Total: Rs {getTotalPrice()}</Text>
        <TouchableOpacity
          style={[styles.checkoutButton, { opacity: isCartEmpty ? 0.5 : 1 }]}
          onPress={handleCheckout}
          disabled={isCartEmpty}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#51aca5',
    borderRadius: 20,
    marginBottom: 10,
    paddingTop:50
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 30,
    color: 'white',
  },
  bagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 10,
  },
  badge: {
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 5,
  },
  middleContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#51aca5',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#51aca5'
  },
  itemPrice: {
    fontSize: 16,
    color: 'red',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#51aca5',
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  itemQuantity: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  removeItemButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeItemText: {
    color: '#fff',
    fontSize: 16,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  checkoutButton: {
    backgroundColor: '#51aca5',
    padding: 15,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Cart;
