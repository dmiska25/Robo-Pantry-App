import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { getProductById } from '../apiCalls/RoboPantryAPICalls';
import { useAPI } from '../Hooks/useAPI';
import AccordionDetails from './AccordionDetails';
import StandardPageDeliminator from './StandardPageDeliminator';

const ProductDetails = ({route}) => {
    const {itemId} = route.params;
    const [isLoading, product, error] = useAPI(getProductById, itemId);

    const calculateLastPurchase = () => {
        return product.productVariants
        .flatMap(productVariant => productVariant.purchases
            .map(purchase => purchase.purchaseDate))
        .reduce((date1, date2) => 
        date1.getTime() > date2.getTime() ? date1 : date2)
        .toLocaleDateString();
    }

    if (isLoading) return <ActivityIndicator style={styles.loadingSymbol} size="large" color="#00ff00" />;
    // TODO: Should not print error directly to screen!
    if (error) return <Text>{error}</Text>

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{product.name}</Text>
            </View>
            <StandardPageDeliminator/>
            <View style={styles.productDetails}>
                <Text style={styles.subtitle}>Details</Text>
                <Text>Units on Hand: {product.unitsOnHand} {product.unitOfMeasure.plural}</Text>
                <Text>Last Purchased: {calculateLastPurchase()}</Text>
            </View>
            <StandardPageDeliminator/>
            <View style={styles.productPurchases}>
                <Text style={styles.subtitle}>On Hand</Text>
                <AccordionDetails sectionData={product.productVariants}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 40,
        flex: 1
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 20
    },
    productDetails: {
        flex: 1,
    },
    productPurchases: {
        flex: 3
    },
    productVariantListing: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    header: {
        display: 'flex',
        flexDirection: 'row'
    },
    backButton: {
        flex: 1
    },
    loadingSymbol: {
        textAlign: 'center',
        marginTop: '20%'
    }
});

export default ProductDetails;