import React from 'react';
import ProductListing from './Components/ProductListing';
import ProductDetails from './Components/ProductDetails';
import { View, StatusBar, SafeAreaView, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="ProductListing" component={ProductListing} />
            <Stack.Screen name="ProductDetailView" component={ProductDetails} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;