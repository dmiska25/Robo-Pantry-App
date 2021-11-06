import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getProducts } from '../constants/mockProductCall';
import { Link } from '@react-navigation/native';

const ProductListing = () => {
  const [products, setProducts] = useState(getProducts);

  const renderProduct = ({item}) => {
    return (
      <Link
        style={styles.listingLinkItem}
        to={{screen: 'ProductDetailView'}}
      >
        {item.name}
      </Link>
    );
  };
  const testRender = (item) => <Text>Hello</Text>;
  const productKey = (product) => product.name;
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Pantry</Text>
      <View>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={productKey}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
  },
  listing: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  listingLinkItem: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    flex: 1,
    padding: '5%',
    fontSize: 20,
    color: 'blue',
    justifyContent: 'center',
    color: 'black'
  }
});

export default ProductListing;