import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { getProducts } from '../apiCalls/RoboPantryAPICalls';
import { Link } from '@react-navigation/native';
import { useAPI } from '../Hooks/useAPI';

const ProductListing = () => {
  const [isLoading, products, error] = useAPI(getProducts);

  const renderProduct = ({item}) => {
    return (
      <Link
        style={styles.listingLinkItem}
        to={{screen: 'Product Details', params: {itemId: item.id}}}
      >
        {item.name}
      </Link>
    );
  };
  const productKey = (product) => product.id.toString();
  
  if(isLoading) return <Text>Loading...</Text>;
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