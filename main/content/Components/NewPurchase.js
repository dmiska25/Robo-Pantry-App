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

const NewPurchaseForm = () => {
  const [productsAreLoading, products, productsError, reloadProducts] =
    useAPI(getProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productIsLoading, product, productError, reloadProduct] = useAPI(
    getProductById,
    selectedProduct,
    { conditional: (product) => !product || product == "new" }
  );
  const [embeddedProduct, setEmbeddedProduct] = useState(null);
  const [sendingResponse, result, errorSending, retrySending] = useAPI(
    postEmbeddedProduct,
    embeddedProduct,
    { conditional: (embeddedProduct) => !embeddedProduct }
  );
  const [newProductForm, setNewProductForm] = useState(false);
  const [selectedProductVariant, setSelectedProductVariant] = useState(null);
  const [productVariantPicker, setProductVariantPicker] = useState(false);
  const [newProductVariantForm, setNewProductVariantForm] = useState(false);
  const [newPurchaseForm, setNewPurchaseForm] = useState(false);

  useEffect(() => {
    switch (true) {
      case productIsLoading == null || productIsLoading == true:
      case selectedProduct == null:
        setProductVariantPicker(false);
        setSelectedProductVariant(null);
        setNewProductForm(false);
        break;
      case selectedProduct == "new":
        setProductVariantPicker(false);
        setSelectedProductVariant("new");
        setNewProductForm(true);
        break;
      default:
        setProductVariantPicker(true);
        setSelectedProductVariant(null);
        setNewProductForm(false);
    }
  }, [selectedProduct, productIsLoading]);

  useEffect(() => {
    switch (true) {
      case selectedProductVariant == null:
        setNewProductVariantForm(false);
        setNewPurchaseForm(false);
        break;
      case selectedProductVariant == "new":
        setNewProductVariantForm(true);
        setNewPurchaseForm(true);
        break;
      default:
        setNewProductVariantForm(false);
        setNewPurchaseForm(true);
    }
  }, [selectedProductVariant]);

  const { control, handleSubmit } = useForm({
    mode: "",
    defaultValues: {
      productName: "",
      category: null,
      unitOfMeasure: null,
      brand: "",
      unitsPerProduct: "",
      barcode: "",
      purchaseDate: new Date(),
      productsPurchased: "",
    },
  });

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

  const renderProductSelection = (products) => {
    return [
      <Picker.Item label="Select Product" value={null} key={null} />,
      <Picker.Item label="New Product" value="new" key="new" />,
      ...products.map((product) => (
        <Picker.Item label={product.name} value={product.id} key={product.id} />
      )),
    ];
  };

  const renderProductVariantSelection = (productVariants) => {
    const options = [
      <Picker.Item label="Select Variant" value={null} key={null} />,
      <Picker.Item label="New Product Variant" value="new" key="new" />,
    ];
    if (!productVariants) return options;
    options.push(
      ...productVariants.map((productVariant) => (
        <Picker.Item
          label={productVariant.brand}
          value={productVariant.id}
          key={productVariant.id}
        />
      ))
    );
    return options;
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

  const handleProductVariantSelectionChange = (value) => {
    setSelectedProductVariant(value);
  };

  const constructEmbeddedProduct = (value) => ({
    product: (({ productName, category, unitOfMeasure }) => ({
      productName,
      category,
      unitOfMeasure,
    }))(value),
    productVariant: (({ brand, unitsPerProduct, barcode }) => ({
      brand,
      unitsPerProduct,
      barcode,
    }))(value),
    purchase: (({ purchaseDate, productsPurchased }) => ({
      purchaseDate,
      productsPurchased,
    }))(value),
  });

  const getProductVariant = () => {
    const variant = product.productVariants.filter(
      (variant) => variant.id === selectedProductVariant
    )[0];
    return (({ id, brand, unitsPerProduct, barcode }) => ({
      id,
      brand,
      unitsPerProduct,
      barcode,
    }))(variant);
  };

  const getProduct = () => {
    return (({ id, name, category, unitOfMeasure }) => ({
      id,
      productName: name,
      category: category.json,
      unitOfMeasure: unitOfMeasure.json,
    }))(product);
  };

  const onSubmit = (value) => {
    var embeddedProduct = constructEmbeddedProduct(value);

    if (selectedProductVariant !== "new")
      embeddedProduct.productVariant = getProductVariant();
    if (selectedProduct !== "new") embeddedProduct.product = getProduct();

    setEmbeddedProduct(embeddedProduct);
    reloadProducts();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listingContainer}>
        <Picker
          style={styles.objectPickerStyle}
          selectedValue={selectedProduct}
          onValueChange={handleProductSelectionChange}
          testID="productPicker"
        >
          {renderProductSelection(products)}
        </Picker>
        {newProductForm && (
          <View>
            <Controller
              name="productName"
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
          </View>
        )}
        <StandardPageDeliminator />
        <Picker
          style={styles.objectPickerStyle}
          enabled={productVariantPicker}
          selectedValue={selectedProductVariant}
          onValueChange={handleProductVariantSelectionChange}
          testID="productVariantPicker"
        >
          {renderProductVariantSelection(product?.productVariants)}
        </Picker>
        {newProductVariantForm && (
          <View>
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
                  testID="variantBrandInput"
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
                  testID="variantUPPInput"
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
                  testID="variantBarcodeInput"
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
