import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { getProductById } from '../apiCalls/RoboPantryAPICalls';
import { useAPI } from '../Hooks/useAPI';

const ProductDetails = ({route, navigation}) => {
    const {itemId} = route.params;
    const [activeSections, setActiveSections] = useState([0]);
    const [isLoading, product, error] = useAPI(getProductById, itemId);

    const renderContent = ({purchases}) => (
        <View>
            <FlatList
                data={purchases}
                renderItem={({item}) => <Text>{item.purchaseDate.toString()}</Text>}
                keyExtractor={({id}) => id.toString()}
            />
        </View>
    );

    const renderHeader = () => (
        <View>
            <Text>Purchases: </Text>
        </View>
    );

    const renderSectionTitle = (productVariant) => (
        <View>
            <Text>{productVariant.brand}</Text>
        </View>
    );

    if (isLoading) return <Text>Loading</Text>;
    // TODO: Should not print error directly to screen!
    if (error) return <Text>{error}</Text>

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{product.name}</Text>
            </View>
            
            {/* TODO: implement product details
            <View styles={styles.productDetails}>
                // unitsOnHand, unit of measure, ect
            </View> */}
            <Accordion
                sections={product.productVariants}
                activeSections={activeSections}
                renderSectionTitle={renderSectionTitle}
                renderContent={renderContent}
                renderHeader={renderHeader}
                onChange={(activeSections) => {setActiveSections(activeSections)}}
            />
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
        flex: 3
    },
    productDetails: {
        flex: 1,
    },
    productVariantListing: {
        flex: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
    productVariantCard: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
        padding: '5%',
        fontSize: 20,
        color: 'blue',
        justifyContent: 'center'
    },
    header: {
        display: 'flex',
        flexDirection: 'row'
    },
    backButton: {
        flex: 1
    },
});

export default ProductDetails;