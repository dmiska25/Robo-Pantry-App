import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { startMockAPIServer } from "./main/content/mockAPI/MockAPI";
import ProductListing from "./main/content/Components/ProductListing";
import ProductDetails from "./main/content/Components/ProductDetails";
import { LogBox } from "react-native";
import * as Sentry from "sentry-expo";
import { ErrorBoundary } from "@sentry/react";
import FallbackError from "./main/content/Components/FallbackError";
import NewPurchaseForm from "./main/content/Components/NewPurchase";
import { QueryClientProvider } from "react-query";
import { getQueryClient } from "./main/content/constants/queryClient";

// TODO: Figure out root cause of this issue
LogBox.ignoreLogs(["Overwriting fontFamily", "Constants.deviceYearClass"]);

// sentry logging
Sentry.init({
  dsn: "https://cd732409b78a4454b2c56793a50c4410@o1119110.ingest.sentry.io/6153383",
  enableInExpoDevelopment: true,
  debug: true,
  tracesSampleRate: 0.01,
});

const Stack = createNativeStackNavigator();

// start mock server
if (window.server) {
  server.shutdown();
}
window.server = startMockAPIServer({ environment: "production" });

const App = () => (
  <ErrorBoundary fallback={FallbackError}>
    <QueryClientProvider client={getQueryClient()}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Product Listing" component={ProductListing} />
          <Stack.Screen name="Product Details" component={ProductDetails} />
          <Stack.Screen name="New Purchase" component={NewPurchaseForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
