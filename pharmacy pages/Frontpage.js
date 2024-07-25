import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Dimensions, FlatList,  ScrollView,} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Frontpage = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [pressed, setPressed] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Add state for selected category
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  useEffect(() => {
    setFilteredProducts(products.filter(product =>
      product.label.toLowerCase().includes(searchText.toLowerCase())
    ));
  }, [searchText, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://192.168.43.59:3000/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async (newProduct) => {
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
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://192.168.43.59:3000/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts(); // Refresh the product list
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`http://192.168.43.59:3000/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });
      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://192.168.43.59:3000/categorie');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const navigateToProduct = (productId) => {
    navigation.navigate('ProductDetails', { productId });
  };
  useEffect(() => {
    let timer;
    if (autoSlide) {
      timer = setTimeout(changeImage, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [currentImageIndex, autoSlide]);

  const handleMenuPress = () => {
    if (navigation && navigation.openDrawer) {
      navigation.openDrawer();
    } else {
      console.log("Drawer navigation not available");
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const handleNextImage = () => {
    const newIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setAutoSlide(false);
  };
  const handlePrevImage = () => {
    const newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setAutoSlide(false); 
  };


  const galleryImages = [
    'https://images.apollo247.in/pub/media/magestore/bannerslider/images/b/a/baby_festival_cta_web.jpg?tr=w-400,q-80,f-webp,dpr-1.350000023841858,c-at_max',
    'https://images.apollo247.in/pub/media/magestore/bannerslider/images/e/v/evion_cap_824.jpg?tr=w-400,q-80,f-webp,dpr-1.350000023841858,c-at_max',
    'https://images.apollo247.in/pd-cms/cms/2024-06/Consult%20Banner%20_web-%20410X200.jpg?tr=w-1276,q-80,f-webp,dpr-1.350000023841858,c-at_max',
    'https://images.apollo247.in/pub/media/magestore/bannerslider/images/a/v/aveeno_new_824.jpg?tr=w-400,q-80,f-webp,dpr-1.350000023841858,c-at_max',
    'https://images.apollo247.in/pub/media/magestore/bannerslider/images/s/e/sevenseas_824.jpg?tr=w-400,q-80,f-webp,dpr-1.350000023841858,c-at_max',
    'https://images.apollo247.in/pub/media/magestore/bannerslider/images/p/a/pampers_pc_web_new.jpg?tr=w-400,q-80,f-webp,dpr-1.350000023841858,c-at_max',
  ];
  const changeImage = () => {
    const newIndex = (currentImageIndex + 1) % galleryImages.length; 
    setCurrentImageIndex(newIndex);
    if (newIndex === galleryImages.length - 1) {
      setAutoSlide(false);
    }
  };

  const imageWidth = Dimensions.get('window').width - 10;
  
  const dealsOfTheDay = [
    { id: '1', image: 'https://images.apollo247.in/pub/media/catalog/product/a/p/apn0032_1-sep2023.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max', label: 'Neem tulsi face wash', description: 'Return Policy :Returnable Expires on or after,Dec-24',price: 'Rs 99', outOfStock: false },
    { id: '2', image: 'https://www.netmeds.com/images/product-v1/150x150/976671/bahola_worminal_drops_30_ml_0_0.jpg', label: 'worminal', description: 'wormial,returnpolicy:expires jan2',price: 'Rs 100', outOfStock: true },
    { id: '3', image: 'https://images.apollo247.in/pub/media/catalog/product/i/m/img_20210115_125103__front__glycerin_soap_1_1.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max', label: 'glycerin', description: 'Apollo Pharmacy Glycerin Bathing Bar, 75 gm (Buy 2 Get 2 Free) ',price: 'Rs 100', outOfStock: false },
    { id: '5', image: 'https://images.apollo247.in/pub/media/catalog/product/a/p/apa0089_1-sep2023.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max', label: 'aloevera', description: ' Aloe Vera Skin Care Gel, 200 gm (2x100 gm),Expires before Dec-1',price: 'Rs 100', outOfStock: true },
    { id: '6', image: 'https://images.apollo247.in/pub/media/catalog/product/H/U/HUG0242_1-JULY23_1.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max', label: 'huggies', description: 'Huggies Complete Comfort Wonder Baby Diaper Pants XL, 56 Count',price: 'Rs 750', outOfStock: false },
    { id: '7', image: 'https://images.apollo247.in/pub/media/catalog/product/R/A/RAB1635_1_1.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max', label: 'Rablet D 20/30 Capsule 15', description: 'Return PolicyReturnable Expires on or after Jan-25',price: 'Rs 272', outOfStock: false },
    { id: '8', image: 'https://images.apollo247.in/pub/media/catalog/product/L/I/LIT0170_1-AUG23_1.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max', label: 'little wipers', description: 'Littles Soft Cleansing Baby Wipes, 80 Units',price: 'Rs 573', outOfStock: false },
  ];


  const handleCategoryPress =  (category) => {
    navigation.navigate('userproductlist', { categoryId: category.id });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress(item)}>
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDealsItem = ({ item }) => (
    <TouchableOpacity style={styles.dealsItem}>
      <Image source={{ uri: item.image }} style={styles.dealsImage} />
      <View style={[styles.dealsOverlay, item.outOfStock ? styles.outOfStockOverlay : null]}>
        <Text style={[styles.dealsLabel, item.outOfStock ? styles.outOfStockLabel : null]}>{item.label}</Text>
        <Text style={styles.dealsDescription}>{item.description}</Text>
        {!item.outOfStock ? (
          <View>
            <Text style={styles.priceText}>{item.price}</Text>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.outOfStockText}>Out of Stock</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() => toggleWishlistItem(item)}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
      >
        <Text>
        <FontAwesome name={wishlistItems.some(wishlistItem => wishlistItem.id === item.id) ? "heart" : "heart-o"} size={19} color={pressed ? "#51aca5" : "red"} />
      </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  const renderNewProductItem = ({ item }) => (
    <TouchableOpacity style={styles.dealsItem}>
      <Image source={{ uri: item.image }} style={styles.dealsImage} />
      <View style={[styles.dealsOverlay, item.outOfStock ? styles.outOfStockOverlay : null]}>
        <Text style={[styles.dealsLabel, item.outOfStock ? styles.outOfStockLabel : null]}>{item.label}</Text>
        <Text style={styles.dealsDescription}>{item.description}</Text>
        {!item.outOfStock ? (
          <View>
            <Text style={styles.priceText}>{item.price}</Text>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.outOfStockText}>Out of Stock</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() => toggleWishlistItem(item)}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
      >
        <FontAwesome name={wishlistItems.some(wishlistItem => wishlistItem.id === item.id) ? "heart" : "heart-o"} size={19} color={pressed ? "#51aca5" : "red"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  
 
  const addToCart = (item) => {
    if (cartItems.some((cartItem) => cartItem.id === item.id)) {
      // Item already exists in the cart, increase quantity by 1
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCart);
    } else {
      // Item does not exist in the cart, add with initial quantity of 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };
  
  
  
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const toggleWishlistItem = (item) => {
    setPressed(!pressed);
    if (wishlistItems.some(wishlistItem => wishlistItem.id === item.id)) {
      setWishlistItems((prevItems) => prevItems.filter(wishlistItem => wishlistItem.id !== item.id));
    } else {
      setWishlistItems((prevItems) => [...prevItems, item]);
    }
  };

  const handleAddToWishlist = (item) => {
    toggleWishlistItem(item);
  };
  
  const handleDoctorAppointmentPress = () => {
    navigation.navigate('doctorappoitment'); 
  };
  return (
    <ScrollView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <FontAwesome name="bars" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>24/7 Pharmacy</Text>
        <TouchableOpacity onPress={() => {
  navigation.navigate('cart', { cartItems });
}} style={styles.icon}>

  <FontAwesome name="shopping-cart" size={30} color="white" />
  {cartItems.length > 0 && (
    <View style={styles.cartBadge}>
      <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
    </View>
  )}
</TouchableOpacity>

        <TouchableOpacity  onPress={() =>navigation.navigate('Wishlist',{ wishlistItems })}>
        <FontAwesome name="heart-o" size={30} color="white" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={30} color="#51aca5" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search medicines..."
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.filterIcon}>
          <FontAwesome name="filter" size={22} color="#51aca5" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageGallery}>
        <TouchableOpacity style={styles.arrowLeft} onPress={handlePrevImage}>
          <FontAwesome name="chevron-left" size={22} color="#51aca5" />
        </TouchableOpacity>
        <Image source={{ uri: galleryImages[currentImageIndex] }} style={[styles.image, { width: imageWidth }]} />
        <TouchableOpacity style={styles.arrowRight} onPress={handleNextImage}>
          <FontAwesome name="chevron-right" size={22} color="#51aca5" />
        </TouchableOpacity>
        <View style={styles.indicatorContainer}>
          {galleryImages.map((image, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentImageIndex ? styles.activeIndicator : null,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.trendingCategories}>
        <Text style={styles.trendingText}>Trending Categories</Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.categoryList}
        />
      </View>
      <View style={styles.dealsContainer}>
        <Text style={styles.dealsHeading}>Deals of the Day</Text>
        <FlatList
          data={dealsOfTheDay}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dealsList}
          keyExtractor={item => item.id}
          renderItem={renderDealsItem}
        />
      </View>
      <View style={styles.dealsContainer}>
        <View>
        <Text style={styles.dealsHeading}>New Products</Text></View>
        <FlatList
          data={products}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.dealsList}
          keyExtractor={item => item.id}
          renderItem={renderNewProductItem}
        />
      </View>
      <TouchableOpacity style={styles.appointmentButton} onPress={handleDoctorAppointmentPress}>
        <Text style={styles.appointmentButtonText}>Book 24/7 Doctor Appointment</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 24/7 Pharmacy</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#51aca5',
    paddingVertical: 30,
    paddingHorizontal: 25,
    elevation: 5,
  },
  menuButton: {
    padding: 0,
    paddingTop: 22,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    flex: 1,
    textAlign: 'center',
    paddingTop: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 25,
    marginTop: 20,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  filterIcon: {
    padding: 10,
  },
  image: {
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  
  imageGallery: {
    position: 'relative',
    marginVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  icon: {
    paddingTop:15,
    marginHorizontal: 10,
  },
  arrowLeft: {
    position: 'absolute',
    top: '50%',
    left: 10,
    transform: [{ translateY: -15 }],
    zIndex: 1,
  },
  arrowRight: {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{ translateY: -15 }],
    zIndex: 1,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#51aca5',
  },
  trendingCategories: {
    marginTop: 10,
    paddingHorizontal: 25,
  },
  trendingText: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#51aca5',
  },
  categoriesList: {
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  categoryImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  categoryLabel: {
    fontSize: 12,
    marginTop: 3,
    textAlign: 'center',
    color:'#51aca5'
  },
 
  dealsHeading: {
    marginTop: 5,
    paddingLeft:20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#51aca5',
    marginBottom: 10,
  },
  
  dealsItem: {
    marginRight: 3,
    position: 'relative', // Ensure proper stacking context for absolute positioning
  },
  dealsImage: {
    width: 200,
    height: 200,
    borderRadius: 25,
    marginBottom: 10, // Adjust margin as needed for spacing between items
  },
  dealsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding:1, // Increase padding for better readability
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  dealsLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dealsDescription: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 5,
  },
  outOfStockText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  outOfStockOverlay: {
    backgroundColor: '#fdd',
  },
  addToCartButton: {
    backgroundColor: '#51aca5',
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: '100%', 
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center content horizontally and vertically
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 15,
  },
  cartBadge: {
    position: 'absolute',
    top: -1,
    right: -13,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  wishlistButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#51aca5',
    padding: 5,
    borderRadius: 20,
    zIndex: 2, 
  },
  addToWishlistButton: {
    position:'absolute',
    top: 10,
    right: 10,
  },
  appointmentButton: {
    backgroundColor: '#51aca5',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginTop: 30,
    alignSelf: 'center',
    marginBottom:30
    
  },
  appointmentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText:{
    color:'red',
    fontSize: 17,
    fontWeight: 'bold',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#51aca5',
    
  },
  footerText: {
    color: '#666',
    textTransform:'uppercase',
    verticalAlign:'bottom'
  },
  categoryList:{
    color:'#51aca5'
  }
});
export default Frontpage; 