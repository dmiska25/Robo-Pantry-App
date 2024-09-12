import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  TextInput,
} from "react-native";
import {
  getProductById,
  getProducts,
  postEmbeddedProduct,
} from "../api/apiCalls/RoboPantryAPICalls";
import { useAPI } from "../api/Hooks/useAPI";
import { getProductCategories } from "../constants/productCategory";
import { getUnitsOfMeasure } from "../constants/unitsOfMeasure";
import DatePickerForm from "./DatePickerForm";
import FallbackError from "./FallbackError";
import StandardPageDeliminator from "./StandardPageDeliminator";

const NewPurchaseForm = ({ route }) => {
  const { control, reset, handleSubmit } = useForm({
    mode: "",
    defaultValues: {
      name: "",
      category: null,
      unitOfMeasure: null,
      brand: "",
      unitsPerProduct: "",
      barcode: "",
      purchaseDate: new Date(),
      productsPurchased: "",
    },
  });

  const [productsAreLoading, products, productsError, reloadProducts] = useAPI(
    getProducts,
    undefined,
    {
      onFailure: (err) => {
        throw Error("Failed to retrieve Products!");
      },
    }
  );
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productIsLoading, product, productError, reloadProduct] = useAPI(
    getProductById,
    selectedProduct,
    {
      conditional: (product) => !product || product == "new",
      onFailure: (err) => {
        throw Error("Failed to retrieve selected Product!");
      },
    }
  );
  const [embeddedProduct, setEmbeddedProduct] = useState(null);
  const [newProductForm, setNewProductForm] = useState(false);
  const [productPicker, setProductPicker] = useState(true);
  const [newPurchaseForm, setNewPurchaseForm] = useState(false);
  const itemId = route?.params?.itemId;

  const [sendingResponse, result, errorSending, retrySending] = useAPI(
    postEmbeddedProduct,
    embeddedProduct,
    {
      conditional: (embeddedProduct) => !embeddedProduct,
      onSuccess: () => {
        reloadProducts();
        reloadProduct();
        reset();
        setSelectedProduct(null);
      },
      onFailure: () => {
        throw Error("Failed to submit new Purchase!");
      },
    }
  );

  useEffect(() => {
    switch (true) {
      case productIsLoading == false && !!itemId:
        setSelectedProduct(itemId);
        setProductPicker(false);
        setNewProductForm(false);
        setNewPurchaseForm(true);
        break;
      case productIsLoading == null || productIsLoading == true:
      case selectedProduct == null:
        setNewProductForm(false);
        setNewPurchaseForm(false);
        break;
      case selectedProduct == "new":
        setNewProductForm(true);
        setNewPurchaseForm(true);
        break;
      default:
        setNewProductForm(false);
        setNewPurchaseForm(true);
    }
  }, [selectedProduct, productIsLoading]);

  if (productsAreLoading)
    return (
      <ActivityIndicator
        style={styles.loadingSymbol}
        size="large"
        color="#00ff00"
        testID="loadComponent"
      />
    );
  if (productsError)
    return <FallbackError error={productsError} resetError={reloadProducts} />;
  else if (productError)
    return <FallbackError error={productError} resetError={reloadProduct} />;
  else if (errorSending)
    return <FallbackError error={errorSending} resetError={retrySending} />;

  const renderProductSelection = (products) => {
    return [
      <Picker.Item label="Select Product" value={null} key={null} />,
      <Picker.Item label="New Product" value="new" key="new" />,
      ...products.map((product) => (
        <Picker.Item label={product.name} value={product.id} key={product.id} />
      )),
    ];
  };

  const renderCategorySelection = () => {
    return [
      <Picker.Item label="Select Category" value={null} key={null} />,
      ...Object.values(getProductCategories()).map((category) => (
        <Picker.Item
          label={category.long}
          value={category.json}
          key={category.json}
        />
      )),
    ];
  };

  const renderUnitsOfMeasureSelection = () => {
    return [
      <Picker.Item label="Select Unit Of Measure" value={null} key={null} />,
      ...Object.values(getUnitsOfMeasure()).map((uom) => (
        <Picker.Item label={uom.long} value={uom.json} key={uom.json} />
      )),
    ];
  };

  const handleProductSelectionChange = (value) => {
    setSelectedProduct(value);
  };

  const constructEmbeddedProduct = (value) => ({
    product: (({ name, category, unitOfMeasure, brand, unitsPerProduct, barcode }) => ({
      name,
      category,
      unitOfMeasure,
      brand,
      unitsPerProduct,
      barcode,
    }))(value),
    purchase: (({ purchaseDate, productsPurchased }) => ({
      purchaseDate,
      productsPurchased,
    }))(value),
  });

  const getProduct = () => {
    return (({ id, name, category, unitOfMeasure, brand, unitsPerProduct, barcode }) => ({
      id,
      name,
      category: category.json,
      unitOfMeasure: unitOfMeasure.json,
      brand,
      unitsPerProduct,
      barcode,
    }))(product);
  };

  const onSubmit = (value) => {
    var embeddedProduct = constructEmbeddedProduct(value);
    
    if (selectedProduct !== "new") embeddedProduct.product = getProduct();

    setEmbeddedProduct(embeddedProduct);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listingContainer}>
        <Picker
          style={styles.objectPickerStyle}
          enabled={productPicker}
          selectedValue={selectedProduct}
          onValueChange={handleProductSelectionChange}
          testID="productPicker"
        >
          {renderProductSelection(products)}
        </Picker>
        {newProductForm && (
          <View>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.inputBar}
                  placeholder="Product Name"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  testID="productNameInput"
                />
              )}
            />
            <View style={styles.pickerBox}>
              <Controller
                name="category"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Picker
                    style={styles.fieldPickerStyle}
                    prompt="Product Category"
                    onValueChange={onChange}
                    selectedValue={value}
                    onBlur={onBlur}
                    testID="productCategoryPicker"
                  >
                    {renderCategorySelection()}
                  </Picker>
                )}
              />
            </View>
            <View style={styles.pickerBox}>
              <Controller
                name="unitOfMeasure"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <Picker
                    style={styles.fieldPickerStyle}
                    prompt="Product Unit Of Measure"
                    onValueChange={onChange}
                    selectedValue={value}
                    onBlur={onBlur}
                    testID="productUOMPicker"
                  >
                    {renderUnitsOfMeasureSelection()}
                  </Picker>
                )}
              />
            </View>
            <Controller
              name="brand"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  style={styles.inputBar}
                  placeholder="Brand"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  testID="productBrandInput"
                />
              )}
            />
            <Controller
              name="unitsPerProduct"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  style={styles.inputBar}
                  keyboardType="decimal-pad"
                  placeholder="Units per Product"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  testID="productUPPInput"
                />
              )}
            />
            <Controller
              name="barcode"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  style={styles.inputBar}
                  keyboardType="number-pad"
                  placeholder="Barcode"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  testID="productBarcodeInput"
                />
              )}
            />
          </View>
        )}
        <StandardPageDeliminator />
        {newPurchaseForm && (
          <View>
            <View style={styles.pickerBox}>
              <Controller
                name="purchaseDate"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <DatePickerForm
                    style={styles.dateStyle}
                    title="Purchase Date: "
                    date={value}
                    setDate={onChange}
                    testID="purchaseDateSelecter"
                  />
                )}
              />
            </View>
            <Controller
              name="productsPurchased"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  style={styles.inputBar}
                  keyboardType="number-pad"
                  placeholder="Products Purchased"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  testID="purchaseProductsPurchasedInput"
                />
              )}
            />
          </View>
        )}
        <Button
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          testID="submitButton"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputBar: {
    borderWidth: 1,
    borderColor: "grey",
    margin: 5,
    padding: 4,
  },
  objectPickerStyle: {
    margin: 8,
  },
  fieldPickerStyle: {
    margin: 5,
    padding: 5,
  },
  pickerBox: {
    margin: 5,
    borderWidth: 1,
    borderColor: "grey",
  },
  dateStyle: {
    alignItems: "center",
    borderColor: "grey",
    padding: 10,
    margin: 5,
  },
});

export default NewPurchaseForm;
