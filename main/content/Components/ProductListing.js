import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { getProducts } from '../apiCalls/RoboPantryAPICalls';
import { Link } from '@react-navigation/native';
import { useAPI } from '../Hooks/useAPI';


const ProductListing = () => {
  const [isLoading, products, error] = useAPI(getProducts);
  
  if (isLoading) return <ActivityIndicator style={styles.loadingSymbol} size="large" color="#00ff00" testID='loadComponent'/>;
  // TODO: Should not print error directly to screen!
  if(error) return <Text>{error}</Text>;

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

const renderProduct = ({item}) => {
  return (
    <Link
      style={styles.listingLinkItem}
      to={{screen: 'Product Details', params: {itemId: item.id}}}
      testID="listingProduct"
    >
      {item.name}
    </Link>
  );
};

const productKey = (product) => product.id.toString();

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
  },
  loadingSymbol: {
    textAlign: 'center',
    marginTop: '20%'
}
});

export default ProductListing;
export const forTesting = {
  renderProduct,
  productKey
}