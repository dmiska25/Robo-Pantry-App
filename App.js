import React from 'react';
import ProductListing from './Components/ProductListing';
import ProductDetails from './Components/ProductDetails';
import { View, StatusBar, SafeAreaView, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createServer } from "miragejs";
import { getProduct, getProducts } from './constants/mockProductData';
import { startMockAPIServer } from './mockAPI/MockAPI';

const Stack = createNativeStackNavigator();

if (window.server) {
    server.shutdown();
}
window.server = startMockAPIServer();

const App = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Product Listing" component={ProductListing} />
            <Stack.Screen name="Product Details" component={ProductDetails} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;