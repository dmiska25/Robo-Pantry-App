import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { startMockAPIServer } from './RoboPantryApp/mockAPI/MockAPI';
import ProductListing from './RoboPantryApp/Components/ProductListing';
import ProductDetails from './RoboPantryApp/Components/ProductDetails';

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