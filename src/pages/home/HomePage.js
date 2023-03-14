import React, {useEffect, useState} from 'react';
import productData from '../../mock.json';
import {StyleSheet, View, SafeAreaView, FlatList} from 'react-native';
import Card from '../card/Card';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(productData.products);
  }, []);
  return (
    <LinearGradient
      colors={['#fff', '#f7f3fb', '#e8ddf2']}
      style={styles.linearGradient}>
      <SafeAreaView style={styles.home}>
        <View style={styles.listContainer}>
          <FlatList
            numColumns={2}
            data={products}
            renderItem={itemData => {
              return <Card product={itemData.item} navigation={navigation} />;
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
  },
  home: {
    flex: 1,
  },
  listContainer: {
    padding: 25,
    height: '100%',
    flex: 5,
  },
  productHeader: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  productText: {
    fontSize: 20,
    color: '#8c6fa8',
    fontWeight: '700',
  },
  icon: {
    fontSize: 27,
    color: '#8c6fa8',
    fontWeight: '700',
  },
  iconEvil: {
    fontSize: 25,
    color: '#8c6fa8',
    fontWeight: 'bold',
  },
});
export default Home;
