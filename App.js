import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { startMockAPIServer } from './main/content/mockAPI/MockAPI';
import ProductListing from './main/content/Components/ProductListing';
import ProductDetails from './main/content/Components/ProductDetails';
import { LogBox } from 'react-native';

// TODO: Figure out root cause of this issue
LogBox.ignoreLogs(['Overwriting fontFamily'])

const Stack = createNativeStackNavigator();

// start mock server
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