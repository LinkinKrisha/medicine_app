import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const initialProducts = [
  {
    id: 1,
    title: "NEOMOL 80 Anal Suppositories 5's",
    subtitle: 'Exclusive on Fast Pharmacy',
    description: 'MRP ₹32.80\nInclusive of all taxes\nGet this at ₹26.90',
    imageUri: 'https://www.netmeds.com/images/product-v1/600x600/396323/zincovit_tablet_15s_0_1.jpg',
    outOfStock: false
  },
  {
    id: 2,
    title: 'Digital Thermometer, 1 Count',
    subtitle: 'Exclusive on Fast Pharmacy',
    description: 'MRP ₹110\nInclusive of all taxes\nGet this at ₹99.00',
    imageUri: 'https://images.apollo247.in/pub/media/catalog/product/a/p/apt0020-04.jpg?tr=w-350,q-80,f-webp,dpr-1.350000023841858,c-at_max',
    outOfStock: false
  },
  {
    id: 3,
    title: 'Dolo 650mg Strip Of 15 Tablets',
    subtitle: 'out of stock',
    description: 'MRP ₹40.00\nInclusive of all taxes\nGet this at ₹29.71',
    imageUri: 'https://cdn01.pharmeasy.in/dam/products/059346/dolo-650mg-strip-of-15-tablets-2-1653986150.jpg?dim=320x320&dpr=1&q=100',
    outOfStock: true
  },
  {
    id: 4,
    title: 'Pharmeasy Pill Box Organizer-White',
    subtitle: 'Delivery by Tomorrow, before 10:00 pm',
    description: 'MRP ₹499\nInclusive of all taxes\nGet this at ₹249.5',
    imageUri: 'https://cdn01.pharmeasy.in/dam/products_otc/V70393/pharmeasy-pill-box-organizer-white-6.01-1715862610.jpg?dim=700x0&dpr=1&q=100',
    outOfStock: false
  },
  {
    id: 5,
    title: 'Dr. VaidyS Pain Relief -30 Capsules',
    subtitle: 'Delivery by 26 Jun - 30 Jun',
    description: 'MRP ₹220\nInclusive of all taxes\nGet this at ₹382.5',
    imageUri: 'https://cdn01.pharmeasy.in/dam/products_otc/V15977/dr-vaidyas-pain-relief-30-capsules-2-1687175236.jpg?dim=700x0&dpr=1&q=100',
    outOfStock: false
  },
  {
    id: 6,
    title: 'Fabessentials Aloe Vera Cucumber Mint Face Mask 100 Gm',
    subtitle: '',
    description: 'MRP ₹425\nInclusive of all taxes\nGet this at ₹382.5',
    imageUri: 'https://cdn01.pharmeasy.in/dam/products_otc/J58348/fabessentials-aloe-vera-cucumber-mint-face-mask-100-gm-2-1709029138.jpg?dim=700x0&dpr=1&q=100',
    outOfStock: true
  },
  {
    id: 7,
    title: 'Himalaya Pain Massage Oil 100 Ml',
    subtitle: 'Delivery by 25 Jun - 2 Jul',
    description: 'MRP ₹120\nInclusive of all taxes\nGet this at ₹100',
    imageUri: 'https://cdn01.pharmeasy.in/dam/products_otc/I07417/himalaya-pain-massage-oil-100-ml-2-1669655294.jpg?dim=700x0&dpr=1&q=100',
    outOfStock: false
  },
  {
    id: 8,
    title: 'Zincovit Tablet 15S',
    subtitle: 'Delivery Tomorrow',
    description: 'MRP ₹110.00\nInclusive of all taxes\nGet this at ₹99.00',
    imageUri: 'https://www.netmeds.com/images/product-v1/150x150/396323/zincovit_tablet_15s_0_1.jpg',
    outOfStock: false
  },
  {
    id: 9,
    title: 'Lyef Relieve Joint Pain-Ayurveda Supplement-Relieves Pain - Improves Mobility Of Joints-100%Vegan',
    subtitle: 'out of stock',
    description: 'MRP ₹2999\nInclusive of all taxes\nGet this at ₹1999',
    imageUri: 'https://cdn01.pharmeasy.in/dam/products_otc/D40260/lyef-relieve-joint-pain-ayurveda-supplement-relieves-pain-improves-mobility-of-joints-100vegan-6.2-1689852202.jpg?dim=256x256&q=75',
    outOfStock: true
  },
  {
    id: 10,
    title: 'Dr. VaidyaS Pain Relief -30 Capsules - Pack Of 3',
    subtitle: 'Delivery by 26 Jun - 2 Jul',
    description: 'MRP ₹799\nInclusive of all taxes\nGet this at ₹499',
    imageUri: 'https://cdn01.pharmeasy.in/dam/products_otc/F08915/dr-vaidyas-pain-relief-30-capsules-pack-of-3-2-1687174396.jpg?dim=700x0&dpr=1&q=100',
    outOfStock: false
  },
];

const OffersScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]); // Initialize wishlistItems state

  const navigation = useNavigation();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProducts(initialProducts);
    } else {
      const filtered = initialProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredProducts(initialProducts);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  const toggleWishlist = (product) => {
    if (wishlistItems.some(item => item.id === product.id)) {
      const updatedWishlist = wishlistItems.filter(item => item.id !== product.id);
      setWishlistItems(updatedWishlist);
    } else {
      setWishlistItems([...wishlistItems, product]);
    }
  };
  

  const navigateToCart = () => {
    navigation.navigate('transactions', { cartItems });
  };

  const renderWishlistItems = () => {
    if (wishlistItems.length === 0) {
      return <Text style={{ textAlign: 'center', marginTop: 20 }}>No items in wishlist</Text>;
    }

    return wishlistItems.map((item) => (
      <View key={item.id} style={styles.productItem}>
        <TouchableOpacity
          style={styles.wishlistIcon}
          onPress={() => toggleWishlist(item)}
        >
          <FontAwesome
            name="heart"
            size={20}
            color="#e74c3c"
          />
        </TouchableOpacity>
        <Image source={{ uri: item.imageUri }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={[styles.productTitle, item.outOfStock && styles.outOfStockText]}>{item.title}</Text>
          {item.subtitle !== '' && (
            <Text style={[styles.productSubtitle, item.outOfStock && styles.outOfStockText]}>{item.subtitle}</Text>
          )}
          <Text style={styles.productDescription}>{item.description}</Text>
          <View style={styles.productButtonContainer}>
            <TouchableOpacity style={[styles.productButton, styles.addToCartButton]} onPress={() => addToCart(item)}>
              <FontAwesome name="cart-plus" size={20} color="#51aca5" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{uri: 'https://cdn-icons-png.flaticon.com/512/1872/1872038.png'}}
          style={styles.logo}
        />
      </View>

      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <FontAwesome name="arrow-left" size={24} color="#51aca5" style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.wishlistIconContainer} onPress={() => navigation.navigate('Wishlist')}>
            <FontAwesome name="heart" size={24} color="#e74c3c" />
          </TouchableOpacity>
          <View style={styles.searchBox}>
            <TextInput
              style={styles.searchText}
              placeholder="Search..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <FontAwesome name="search" size={20} color="#51aca5" style={styles.searchIcon} />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearIconContainer}>
                <FontAwesome name="times-circle" size={20} color="#888" style={styles.clearIcon} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Products</Text>
        <View style={styles.productList}>
          {filteredProducts.map((product) => (
            <TouchableOpacity key={product.id} style={styles.productItem}>
              <Image
                source={{uri: product.imageUri}}
                style={styles.productImage}
              />
              <View style={styles.productDetails}>
                <Text style={[styles.productTitle, product.outOfStock && styles.outOfStockText]}>{product.title}</Text>
                {product.subtitle !== '' && (
                  <Text style={[styles.productSubtitle, product.outOfStock && styles.outOfStockText]}>{product.subtitle}</Text>
                )}
                <Text style={styles.productDescription}>{product.description}</Text>
                <View style={styles.productButtonContainer}>
                  {/* Toggle wishlist functionality */}
                  <TouchableOpacity
                    style={[styles.productButton, styles.addToWishlistButton]}
                    onPress={() => toggleWishlist(product)}
                  >
                    <FontAwesome
                      name="heart"
                      size={20}
                      color={
                        
                        
                        
                        
                (item => item.id === product.id) ? '#e74c3c' : '#ccc'}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.productButton, styles.addToCartButton]} onPress={() => addToCart(product)}>
                    <FontAwesome name="cart-plus" size={20} color="#51aca5" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Wishlist Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wishlist</Text>
        <View style={styles.productList}>
          {renderWishlistItems()}
        </View>
      </View>

      {/* Cart Button */}
      <TouchableOpacity style={styles.cartButton} onPress={navigateToCart}>
        <Text style={styles.cartText}>View Cart ({cartItems.length})</Text>
        <FontAwesome name="shopping-cart" size={24} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backIcon: {
    marginRight: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishlistIconContainer: {
    marginRight: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#51aca5',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    flex: 1,
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    paddingVertical: 8,
  },
  clearIconContainer: {
    marginLeft: 5,
  },
  clearIcon: {
    marginLeft: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
    paddingLeft: 10,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  productItem: {
    width: '48%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    backgroundColor: '#fff',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: 'cover',
  },
  productDetails: {
    padding: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444',
  },
  productSubtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: '#888',
  },
  outOfStockText: {
    color: '#d9534f',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  productButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  productButton: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  addToWishlistButton: {
    borderColor: '#e74c3c',
    marginRight: 5,
  },
  addToCartButton: {
    borderColor: '#51aca5',
    marginLeft: 5,
  },
  cartButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51aca5',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  cartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  wishlistIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 5,
    zIndex: 1,
  },
});

export default OffersScreen;
