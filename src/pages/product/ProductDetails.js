import React, {useEffect, useState} from 'react';
import productData from '../../mock.json';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductDetail = ({navigation, route}) => {
  const [product, setProduct] = useState('');
  useEffect(() => {
    navigation.setOptions({
      title: 'Product',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      headerTintColor: '#8c6fa8',
      headerLeft: () => (
        <AntDesign
          style={styles.icon}
          name="left"
          onPress={() => navigation.navigate('Home')}
        />
      ),
      headerRight: () => (
        <EvilIcons
          style={styles.iconEvil}
          name="cart"
          onPress={() => navigation.navigate('Cart')}
        />
      ),
    });
    const {productId} = route.params;
    const item = productData.products.find(({id}) => id === productId);
    setProduct(item);
  }, [navigation]);
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch({type: 'ADD_TO_CART', id: product.id});
  };
  const addQuantity = () => {
    dispatch({type: 'ADD_QUANTITY', id: product.id});
  };
  const subtractQuantity = () => {
    dispatch({type: 'SUB_QUANTITY', id: product.id});
  };
  const {addedItems: cartItems} = useSelector(state => state);
  const getQuantity = () => {
    const cartProduct = cartItems.find(({id}) => id === product.id);
    return cartProduct ? cartProduct.quantity : 0;
  };
  return (
    <LinearGradient
      colors={['#fff', '#f7f3fb', '#e8ddf2']}
      style={styles.linearGradient}>
      <View style={styles.container}>
        <View style={styles.productDetailsContainer}>
          <View style={styles.imgContainer}>
            {product ? (
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: product.image,
                }}
              />
            ) : null}
          </View>
          <View style={styles.itemDescription}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>Rs. {product.price}</Text>
          </View>
        </View>
        <View style={styles.border} />
        <View style={styles.quantityContainer}>
          <Text style={styles.productDescription}>{product.description}</Text>
          <View style={styles.addIcons}>
            <Text>Quantity</Text>
            <View style={styles.iconsContainer}>
              <Text
                onPress={subtractQuantity}
                style={[styles.minusIcon, styles.ml]}
                name="minuscircleo">
                -
              </Text>
              <Text style={[styles.ml]}>{getQuantity()}</Text>
              <Text
                onPress={addQuantity}
                style={[styles.icon, styles.ml]}
                name="circle-with-plus">
                +
              </Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buyNowBtn}
              onPress={() => alert('Simple Button pressed')}>
              <Text style={styles.buyNowBtnText}>Buy Now</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addToCart} style={styles.cartBtn}>
              <Text style={styles.cartBtnText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
  },
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  productDetailsContainer: {
    flex: 1,
  },
  quantityContainer: {
    flex: 1,
    padding: 20,
  },
  iconEvil: {
    fontSize: 25,
    color: '#8c6fa8',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
    color: '#8c6fa8',
    fontWeight: '700',
  },
  minusIcon: {
    fontSize: 22,
    color: '#8c6fa8',
    fontWeight: '700',
  },
  imgContainer: {
    flex: 1,
    alignItems: 'center',
  },
  tinyLogo: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  itemDescription: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  border: {
    marginBottom: 1,
    borderBottomColor: '#A9A9A9',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  productTitle: {
    color: '#8c6fa8',
    fontWeight: '700',
    fontSize: 20,
  },
  productPrice: {
    color: '#8c6fa8',
    fontWeight: '700',
    fontSize: 20,
  },
  productDescription: {
    flex: 1,
  },
  addIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  ml: {
    marginLeft: 13,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10,
  },
  buyNowBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#8c6fa8',
    width: '35%',
    height: 55,
  },
  buyNowBtnText: {
    color: 'white',
  },
  cartBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#FFAE42',
    width: '35%',
    height: 55,
  },
  cartBtnText: {
    color: 'white',
  },
});
export default ProductDetail;
