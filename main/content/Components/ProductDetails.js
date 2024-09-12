import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { getProductById } from "../api/apiCalls/RoboPantryAPICalls";
import { useAPI } from "../api/Hooks/useAPI";
import StandardPageDeliminator from "./StandardPageDeliminator";
import FallbackError from "./FallbackError";
import AddElementButton from "./AddElementButton";
import PurchaseListing from "./PurchaseListing";

const ProductDetails = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [isLoading, product, error, reload] = useAPI(getProductById, itemId);

  if (isLoading)
    return (
      <ActivityIndicator
        style={styles.loadingSymbol}
        size="large"
        color="#00ff00"
        testID="loadComponent"
      />
    );
  if (error || !product)
    return <FallbackError error={error} resetError={reload} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{product.name}</Text>
      </View>
      <StandardPageDeliminator />
      <View style={styles.productDetails}>
        <Text style={styles.subtitle}>Details</Text>
        <Text>Product Category: {product.category.long}</Text>
        <Text>Brand: {product.brand}</Text>
        <Text>Products On Hand: {product.productsOnHand}</Text>
        <Text>Units Per Product: {product.unitsPerProduct}</Text>
        <Text>Barcode: {product.barcode}</Text>
      </View>
      <StandardPageDeliminator />
      <View style={styles.productPurchases}>
        <PurchaseListing purchaseHistory={product.purchases} />
      </View>
      <AddElementButton location="New Purchase" context={{ itemId: itemId }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 40,
    flex: 1,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 20,
  },
  productDetails: {
    flex: 1,
  },
  productPurchases: {
    flex: 3,
  },
  productVariantListing: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  backButton: {
    flex: 1,
  },
  loadingSymbol: {
    textAlign: "center",
    marginTop: "20%",
  },
});

export default ProductDetails;
